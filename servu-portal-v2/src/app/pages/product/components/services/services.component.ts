import {Component, ViewChild} from "@angular/core";
import * as _ from "lodash";
import {ModalDirective} from "ngx-bootstrap";
import "style-loader!./services.scss";
import {ProductService} from "../../product.service";
import {NgModel} from "@angular/forms";
import {debug} from "util";


@Component({
  selector: "services",
  templateUrl: "./services.html"
})
export class ServicesComponent {

  public errors: any = [];
  public editP: any = {};
  @ViewChild('serviceEdit') serviceModel: ModalDirective;
  @ViewChild('sf') serviceForm: NgModel;
  @ViewChild('pId') pid: NgModel;
  public categories: any = [];
  public product: any = {};


  constructor(private _ss: ProductService) {

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
    //this.serviceForm.reset({product_id : this.editP.id});

  }

  productEdit(){

    this.serviceModel.show();
    this.serviceForm.reset({product_id : this.editP.id});

  }


  public createProduct(val: any) {
    if (val.category == '') {
      this._createProduct(val);
    }
    let c = _.find(this.categories, {name: val.category});
    if (c) {
      val.category_id = c['id'];
      this._createProduct(val);
    } else {
      alert("No cat found creating new one. :)");
      this._ss.addCategory(val.category).subscribe(r => {
        val.category_id = r.data['id'];
        this._createProduct(val);
      });
    }
  }

  public removeProduct(p: any) {
    this._ss.deleteProduct(p).subscribe(r => {
      this.serviceModel.hide();
      this.product.id = null;
      this.product.name = null;
      // this.sf.reset();
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

  createService() {
    this.serviceForm.reset({product_type: 'Service'});
    this.serviceModel.show()
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
