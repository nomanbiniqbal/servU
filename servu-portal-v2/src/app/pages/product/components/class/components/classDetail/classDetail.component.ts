import {Component, Input, ViewChild} from "@angular/core";
import {ModalDirective} from "ngx-bootstrap";

@Component({
    selector: 'classs-detail',
    templateUrl: './classDetail.html'
})
export class ClassesDetail {
    @Input() product;
    @ViewChild('productEditShow') serviceModel: ModalDirective;
    public editP: any = {};

    editProductShow(p) {
        this.editP = Object.assign({}, p);
        this.serviceModel.show();

    }

}
