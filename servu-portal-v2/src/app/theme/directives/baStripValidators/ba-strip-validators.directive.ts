import {Directive} from "@angular/core";
import {FormControl, NG_VALIDATORS} from "@angular/forms";
import {StripeService} from "../../../stripe.service";

@Directive({
    selector: '[baStripCVCValidator][ngModel]',
    providers: [
        {provide: NG_VALIDATORS, useExisting: BaStripCVCValidator, multi: true}
    ]
})
export class BaStripCVCValidator {

    constructor(public strip: StripeService) {
    }

    validate(c: FormControl) {
        if (this.strip.validateCVC(c.value)) {
            return null;
        } else {
            return {
                stripCard: {
                    valid: false
                }
            };
        }
    }
}

@Directive({
    selector: '[baStripCardValidator][ngModel]',
    providers: [
        {provide: NG_VALIDATORS, useExisting: BaStripCardValidator, multi: true}
    ]
})
export class BaStripCardValidator {

    constructor(public strip: StripeService) {
    }

    validate(c: FormControl) {
        if (this.strip.validateCard(c.value)) {
            return null;
        } else {
            return {
                stripCard: {
                    valid: false
                }
            };
        }
    }
}
