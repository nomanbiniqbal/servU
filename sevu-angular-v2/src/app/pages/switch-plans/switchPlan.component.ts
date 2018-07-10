import {Component, ViewChild} from "@angular/core";
import {Router} from "@angular/router";
import {ModalDirective} from "ngx-bootstrap";
import "style-loader!./switchPlan.scss";
import {BPointService} from "../../b-point.service";
import {AuthRest} from "../../restServices/authRest.service";
import {BusinessRest} from "../../restServices/businessRest.service";
import {StripeService} from "../../stripe.service";

@Component({
    selector: 'switch-plan',
    templateUrl: './switchPlan.html',
})
export class SwitchPlan {
    selectedP: any;
    expireInvalid: string;
    public plans: any;
    @ViewChild('smModal') childModal: ModalDirective;

    public errors: any;
    public list = [];
    public loading: boolean;

    constructor(public router: Router,
                public _au: AuthRest,
                public strip: StripeService,
                public br: BusinessRest,
                public bpoint: BPointService) {
        this.loading = true;
        this._au.getPlans().subscribe((r: any) => {
            this.plans = r.data.map(p => {
                if (p.id == 1) {
                    p.features = [p.features];
                } else
                    p.features = JSON.parse(p.features);
                return p;
            });
        });
    }

    public switchMe(val: any): void {
        this.selectedP = val.plan;
        console.log(this.selectedP);
        this.childModal.show();
    }

    public confirmMe(val) {
        this.expireInvalid = null;
        if (this.strip.validateExpire(val.exp_month, val.exp_year)) {
            this.br.bpointToken().subscribe(r => {
                val.AuthKey = r.data.AuthKey;
                val.amount = this.selectedP.cost;
                val.id = this.selectedP.id;
                this.bpoint.processPayment(val).subscribe(r1 => {
                    console.log(r1);
                })
            });
        } else {
            this.expireInvalid = "Expire date is not valid.";
        }

    }
}