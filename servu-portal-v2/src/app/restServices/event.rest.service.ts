import {Injectable} from "@angular/core";
import {URLSearchParams} from "@angular/http";
import {Api} from "../api.service";


@Injectable()
export class EventRest {

    constructor(public api: Api) {
    }

    getBusySlot(date: any, providerId: any) {
        var params = new URLSearchParams();
        params.set("date", date.format("YYYY-MM-DD"));
        params.set("user_id", providerId);
        return this.api.get(Api.PORTAL_TYPE.portal, "event/busy-slot", params);
    }

    postEvent(val: any) {
        return this.api.post(Api.PORTAL_TYPE.portal, "event", val);
    }

    putEvent(val: any) {
        return this.api.put(Api.PORTAL_TYPE.portal, "event", val);
    }


    getEvent(param) {
        var params = new URLSearchParams();
        params.set("from_date", param.from_date.format("YYYY-MM-DD HH:mm:ss"));
        params.set("to_date", param.to_date.endOf('day').format("YYYY-MM-DD HH:mm:ss"));
        params.set("type", param.type);//checkin|checkout
        params.set("status", param.status);//Scheduled | Confirmed | Done | Cancelled
        params.set("user_id", param.user_id);
        return this.api.get(Api.PORTAL_TYPE.portal, "event", params);
    }

    postPayment(param: any) {
        return this.api.post(Api.PORTAL_TYPE.portal, "event/payment", param);
    }

    getEventMemberships(event_id: any, event_participant_id: any) {
        var params = new URLSearchParams();
        params.set("event_id", event_id);
        params.set("event_participant_id", event_participant_id);
        return this.api.get(Api.PORTAL_TYPE.portal, "event/membership", params);
    }
}
