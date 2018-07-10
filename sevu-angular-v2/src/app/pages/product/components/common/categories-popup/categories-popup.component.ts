import {Component, OnInit, ViewChild} from "@angular/core";

import {ModalDirective} from "ngx-bootstrap";
import "style-loader!./categories-popup.component.scss";
import {ProductService} from "../../../product.service";

@Component({
    selector: 'app-categories',
    templateUrl: './categories-popup.component.html',
    styleUrls: ['./categories-popup.component.scss']
})
export class CategoriesPopupComponent implements OnInit {
    public loadingbar: boolean = false;
    @ViewChild('categoryModal') catModal: ModalDirective;
    public categories: any = [];

    constructor(private _ss: ProductService) {

        this._ss.getCategories().subscribe((cList: any) => {
            this.categories = cList;
        })
    }

    ngOnInit() {
    }

    public show() {
        this.catModal.show()
    }

    addCategory(v) {
        this.loadingbar = true;
        this._ss.addCategory(v).subscribe(r => {
            this.loadingbar = false;

        });

    }



    editCat(v, c) {
        this._ss.editCategory(v).subscribe(r => {
            c.editMode = false;
        });
    }

    deleteCat(id) {

        this._ss.deleteCategory(id).subscribe(r => {

        });


    }

}
