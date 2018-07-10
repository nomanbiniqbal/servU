import {Component, OnInit, ViewChild} from "@angular/core";
import {BusinessRest} from "app/restServices/businessRest.service";
import * as _ from "lodash";
import {ModalDirective} from "ngx-bootstrap";
import {StripeService} from "../../../../stripe.service";

@Component({
    selector: 'app-membership-payment',
    templateUrl: './membership-payment.component.html',
    styleUrls: ['./membership-payment.component.scss']
})
export class MembershipPaymentComponent implements OnInit {
    @ViewChild('membershipPaymentModal') modal: ModalDirective;

    public methods: any = [];
    public m: any = {};
    public expireInvalid: any;

    constructor(public br: BusinessRest, public strip: StripeService) {
        this.br.getBusinessPaymentMethod().subscribe((r: any) => {
            this.methods = r.data;
        });
        this.br.getBusinessPaymentGateway().subscribe((r: any) => {
            var find: any = _.find(r.data, {payment_gateway: {gateway_name: "stripe"}});
            if (find) {
                this.strip.init(JSON.parse(find.configurations).stripe_key);
            }
        });
    }

    ngOnInit() {
    }

    show(val: any) {
        this.m = val;
        this.modal.show();
    }

    submit(val) {
        this.expireInvalid = null;
        if (this.strip.validateExpire(val.exp_month, val.exp_year)) {
            this.strip.generateToken(val).subscribe(r => {

            }, e => {
                this.expireInvalid = e;
            });
        } else {
            this.expireInvalid = "Expire date is not valid.";
        }
    }
}
