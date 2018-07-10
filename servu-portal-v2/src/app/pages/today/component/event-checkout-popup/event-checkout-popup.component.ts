import {Component, OnInit, ViewChild} from "@angular/core";
import * as _ from "lodash";
import {ModalDirective} from "ngx-bootstrap";
import {ProductRest} from "../../../../restServices/productRest.service";
import {EventService} from "../../event.service";
import {PaymentPopupComponent} from "../payment-popup/payment-popup.component";

@Component({
    selector: 'app-event-checkout-popup',
    templateUrl: './event-checkout-popup.component.html',
    styleUrls: ['./event-checkout-popup.component.scss']
})
export class EventCheckoutPopupComponent implements OnInit {
    public products: any = [];
    @ViewChild('eventCheckoutModal') m: ModalDirective;
    @ViewChild('paymentPopup') pp: PaymentPopupComponent;
    public eventProducts: any = [];
    public selectedProduct: any;
    public productModal = '';
    private event: any;
    public totalCost: number = 0;

    constructor(public ps: ProductRest, public es: EventService) {
        this.ps.getProduct("Product").subscribe((r: any) => {
            r.data.forEach(l => {
                this.products = [...this.products, ...l.business_product];
            });
        });
    }

    ngOnInit() {
    }

    checkout(item: any) {
        this.totalCost = 0;
        this.event = item;
        this.eventProducts = item.event_product.map(r => {
            this.totalCost += r.business_product.cost;
            return r.business_product;
        });

        this.m.show();
    }

    selectProduct(prodcut) {
        this.selectedProduct = prodcut;
    }

    onCheckout(p) {
        this.es.checkoutEvent({
            id: this.event.id, products: p.map(r => {
                return {product_id: r.id, quantity: 1};
            })
        }).subscribe((r: any) => {
            this.m.hide();
        });
    }

    addNewProduct() {
        if (this.selectedProduct) {
            this.productModal = '';
            let p = Object.assign({}, this.selectedProduct);
            let number = _.findIndex(this.products, {id: p.id});
            this.products.splice(number, 1);
            this.products = Object.assign([], this.products);
            this.totalCost += p.cost;
            this.eventProducts.push(p);
            this.selectedProduct = null;
        }
    }
}
