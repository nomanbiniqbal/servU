import {Component, OnInit, ViewChild} from "@angular/core";
import {ModalDirective} from "ngx-bootstrap";
import {BusinessRest} from "../../restServices/businessRest.service";

@Component({
    selector: 'app-payment-popup',
    templateUrl: './payment-popup.component.html',
    styleUrls: ['./payment-popup.component.scss']
})
export class PaymentPopupComponent implements OnInit {
    @ViewChild('cashPopup') m: ModalDirective;
    public methods: any=[];

    constructor(public br: BusinessRest) {
        this.br.getBusinessPaymentMethod().subscribe((r: any) => {
            this.methods = r.data;
        });
    }

    ngOnInit() {
    }

    show() {
        this.m.show();
    }


    submit(val:any) {

    }
}
