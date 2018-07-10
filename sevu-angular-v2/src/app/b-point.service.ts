import {Injectable, NgZone} from "@angular/core";
import {Subject} from "rxjs/Subject";
declare var CBA: any;
@Injectable()
export class BPointService {

    constructor(public zone: NgZone) {

    }

    private sub = new Subject<any>();

    processPayment(val) {
        var params = {
            AuthKey: val.AuthKey,
            Amount: val.amount,
            StoreCard: true,
            Crn1: val.id,
            CardNumber: val.card,
            Cvn: val.cvc,
            ExpiryMonth: val.exp_month,
            ExpiryYear: val.exp_year,
            CallbackFunction: (res: any) => {
                this.zone.run(() => {
                    if (res.ApiResponseCode == 0) {
                        this.sub.next(res.ResultKey);
                    } else {
                        this.sub.error(res.Errors);
                    }
                });
            }
        };
        console.log(params);
        CBA.ProcessPayment(params);
        return this.sub.asObservable();
    }
}
