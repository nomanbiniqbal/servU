import {Component, OnInit, ViewChild} from "@angular/core";
import {NgModel} from "@angular/forms";
import * as _ from "lodash";
import {ModalDirective} from "ngx-bootstrap";
import {ProductService} from "../../product.service";

@Component({
    selector: 'app-product',
    templateUrl: './product.component.html',
    styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {
    public errors: any = [];
    public editP: any = {};
    @ViewChild('productEdit') serviceModel: ModalDirective;
    @ViewChild('sf') serviceForm: NgModel;
    public categories: any = [];
    public product: any = {};

    constructor(public _ss: ProductService) {

        this._ss.getCategories().subscribe((cList: any) => {
            this.categories = cList;
        })
    }

    productSelect(item) {
        this.product = item;
        var find: any = _.find(this.categories, {id: this.product.product_category_id});
        if (find) {
            this.product.category = find.name;
        }
    }

    ngOnInit() {

    }


    editProduct(p) {
        this.editP = Object.assign({}, p);
        this.serviceModel.show();
    }


    createProduct(val: any) {
        this._createProduct(val);
    }

     removeProduct(p: any) {
        this._ss.deleteProduct(p).subscribe(r => {
            this.serviceModel.hide();
            this.product.id = null;
            this.product.name = null;
        });
    }

     _createProduct(val: any) {
        if (val.product_id) {
            this._ss.editProduct(val).subscribe((r: any) => {
                this.serviceModel.hide();
            });
        } else {
            this._ss.addProduct(val).subscribe((r: any) => {
                this.serviceModel.hide();
            });

        }
    }

    productCreate() {
        this.serviceForm.reset({product_type: 'Product'});
        this.serviceModel.show();
    }

    isAddAble(catName: string) {
        return catName && !_.find(this.categories, {name: catName});
    }

    public loadingCat: boolean;

    addNewCat(name: string) {
        this.loadingCat = true;
        this._ss.addCategory(name).subscribe(r => this.loadingCat = false);
    }
}
