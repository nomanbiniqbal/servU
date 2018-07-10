import {Component, OnInit, ViewChild} from "@angular/core";
import * as _ from "lodash";
import {ModalDirective} from "ngx-bootstrap";
import {ProductService} from "../../product.service";
import {NgModel} from "@angular/forms";

@Component({
    selector: 'app-class',
    templateUrl: './class.component.html',
    styleUrls: ['./class.component.scss']
})
export class ClassComponent implements OnInit {
    public errors: any = [];
    public progressIcon:boolean=false;
    public editP: any = {};
    @ViewChild('productEdit') serviceModel: ModalDirective;
    @ViewChild('cf') classForm: NgModel;
    public categories: any = [];
    public product: any = {};
    public sessionS: any = {};
    public scheduleS: any = {};


    constructor(private _ss: ProductService) {

        this._ss.getCategories().subscribe((cList: any) => {
            this.categories = cList;
        })
    }

    productSelect(item) {
        this.sessionS = {};
        this.scheduleS = {};

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
        this.classForm.reset(this.editP);

    }


    public createProduct(val: any) {
        this.progressIcon=true;
        if (val.category == '') {
            this._createProduct(val);
        }
        let c = _.find(this.categories, {name: val.category});
        if (c) {
            val.category_id = c['id'];
            this._createProduct(val);
            this.progressIcon=false;
        }
        else {

          this._createProduct(val);
          this.progressIcon=false;

        }
        //else {
        //     alert("No cat found creating new one. :)");
        //     this._ss.addCategory(val.category).subscribe(r => {
        //         val.category_id = r.data['id'];
        //         this._createProduct(val);
        //         this.progressIcon=false;
        //     });
        // }
    }

    public removeProduct(p: any) {
        this._ss.deleteProduct(p).subscribe(r => {
            this.serviceModel.hide();
            this.product.id = null;
            this.product.name = null;

        });
    }

    private _createProduct(val: any) {
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
   createClass() {
     this.serviceModel.show();
    this.classForm.reset({product_type: 'class'});

  }
    onScheduleSelect(s) {
        this.scheduleS = s;
    }

    onSessionSelect(session) {
        this.sessionS = session;
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
