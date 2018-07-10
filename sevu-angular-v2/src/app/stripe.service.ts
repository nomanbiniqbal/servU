import {Injectable, NgZone} from "@angular/core";
import {Subject} from "rxjs/Subject";
declare var Stripe: any;

@Injectable()
export class StripeService {
    public isInit: boolean;

    constructor(public zone: NgZone) {

    }

    init(STRIP_KEY) {
        Stripe.setPublishableKey(STRIP_KEY);
        this.isInit = true;
    }

    validateCard(number) {
        return Stripe.card.validateCardNumber(number);
    }

    validateCVC(number) {
        return Stripe.card.validateCVC(number);
    }

    validateExpire(month, year) {
        return Stripe.card.validateExpiry(month, year)
    }

    private subject = new Subject<any>();

    generateToken(val) {
        if (this.isInit) {
            Stripe.card.createToken({
                number: val.card,
                cvc: val.cvc,
                exp_month: val.exp_month,
                exp_year: val.exp_year
            }, (status: number, response: any) => {
                this.zone.run(() => {
                    if (status == 200) {
                        this.subject.next(response.id);
                    } else {
                        this.subject.error(response.error.message);
                    }
                });
            });
        }
        return this.subject.asObservable();
    }
}