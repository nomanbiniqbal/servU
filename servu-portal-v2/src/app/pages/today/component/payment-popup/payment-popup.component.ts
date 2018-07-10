import {Component, OnInit, ViewChild} from "@angular/core";
import {EventService} from "app/pages/today/event.service";
import {BusinessRest} from "app/restServices/businessRest.service";
import * as _ from "lodash";
import {ModalDirective} from "ngx-bootstrap";
import {StripeService} from "../../../../stripe.service";

@Component({
    selector: 'app-payment-popup',
    templateUrl: './payment-popup.component.html',
    styleUrls: ['./payment-popup.component.scss']
})
export class PaymentPopupComponent implements OnInit {
    public membershipList: any = [];
    public methods: any = [];
    @ViewChild('eventPaymentModal') m: ModalDirective;
    public loading: boolean = false;
    public event: any = {};
    public expireInvalid: any;
    public totalCost: number;
    public methodID: number;
    private gatwayId: any;


    constructor(public br: BusinessRest, public strip: StripeService, public es: EventService) {
        this.br.getBusinessPaymentMethod().subscribe((r: any) => {
            this.methods = r.data;
            this.methodID = this.methods[0].id;
        });
        this.br.getBusinessPaymentGateway().subscribe((r: any) => {
            var find: any = _.find(r.data, {payment_gateway: {gateway_name: "stripe"}});
            if (find) {
                this.gatwayId = find.id;
                this.strip.init(JSON.parse(find.configurations).stripe_key);
            }
        });

    }

    ngOnInit() {
    }

    public show(event: any) {
        this.event = event;

        if (event.event_participant) {
            this.es.getEventMemberships(event.id, event.event_participant[0].id).subscribe(r=>{

            });
        }
        this.totalCost = 0;
        this.event.event_product.forEach(r => {
            this.totalCost += r.cost;
        });
        this.m.show();
    }

    submit(val) {
        if (this.methodID == 2) {
            this.expireInvalid = null;
            if (this.strip.validateExpire(val.exp_month, val.exp_year)) {
                this.strip.generateToken(val).subscribe(r => {
                    this.proceedPayment({
                        stripe_accessToken: r,
                        payment_gateway_id: this.gatwayId,
                        payment_method_id: this.methodID
                    });
                }, e => {
                    this.expireInvalid = e;
                });
            } else {
                this.expireInvalid = "Expire date is not valid.";
            }
        } else {
            this.proceedPayment({
                payment_method_id: this.methodID
            });
        }
    }

    private proceedPayment(param: any) {
        param.event_id = this.event.id;
        param.paid_amount = this.totalCost;
        this.es.proceedPayment(param).subscribe(r => {

        });
    }
}
