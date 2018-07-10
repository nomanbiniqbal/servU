import {Injectable} from "@angular/core";
import * as moment from "moment";
import {Subject} from "rxjs/Subject";
import {EventRest} from "../../restServices/event.rest.service";
import * as _ from "lodash";
@Injectable()
export class EventService {

    constructor(private er: EventRest) {
    }

    getBusySlot(date, providerId) {
        return this.er.getBusySlot(date, providerId);
    }


    private checkIEvent: any = [];
    private checkinEventSubject = new Subject<any>();

    getCheckInEvent() {
        var param: any = {};
        param.from_date = moment().subtract(5, 'day');
        param.to_date = moment().add(4, 'day');
        param.type = "pending";
        this.er.getEvent(param).subscribe(r => {
            this.checkIEvent = r.data;
            this.checkinEventSubject.next(this.checkIEvent);
        });
        return this.checkinEventSubject.asObservable();
    }

    createEvent(val) {
        return this.er.postEvent(val).do(r => {
            this.checkIEvent.push(r.data);
            this.checkinEventSubject.next(this.checkIEvent);
        });
    }
    updateStatusEvent(val) {
        return this.er.putEvent(val).do(r => {
            var number = _.findIndex(this.checkIEvent, {"id": r.data.id});
            this.checkIEvent[number] = r.data;
            this.checkinEventSubject.next(this.checkIEvent);
        });
    }

    private checkoEvent: any = [];
    private checkoutEventSubject = new Subject<any>();

    getCheckOutEvent() {
        var param: any = {};
        param.from_date = moment().subtract(5, 'day');
        param.to_date = moment().add(4, 'day');
        param.type = "checkin";
        this.er.getEvent(param).subscribe(r => {
            this.checkoEvent = r.data;
            this.checkoutEventSubject.next(this.checkoEvent);
        });
        return this.checkoutEventSubject.asObservable();
    }

    checkinEvent(val) {
        val.checkin_at = moment().format('YYYY-MM-DD HH:mm:ss');
        return this.er.putEvent(val).do(r => {

            var number = _.findIndex(this.checkIEvent, {"id": r.data.id});
            this.checkIEvent.splice(number, 1);
            this.checkinEventSubject.next(this.checkIEvent);

            this.checkoEvent.push(r.data);
            this.checkoutEventSubject.next(this.checkoEvent);
        });
    }


    checkoutEvent(val) {
        val.checkout_at = moment().format('YYYY-MM-DD HH:mm:ss');
        return this.er.putEvent(val).do(r => {
            var number = _.findIndex(this.checkoEvent, {"id": r.data.id});
            this.checkoEvent[number]=r.data;
            this.checkoutEventSubject.next(this.checkoEvent);
        });
    }

    proceedPayment(param: any) {
        return this.er.postPayment(param).do(r => {

        });
    }

    getEventsByProviderId(start, end, providerID) {
        var param: any = {};
        param.from_date = start;
        param.to_date = end;
        param.type = "all";
        if (providerID) {
            param.user_id= providerID;
        }
        return this.er.getEvent(param);

    }
    getEventMemberships(event_id,event_participant_id){
        return this.er.getEventMemberships(event_id,event_participant_id);

    }
}
