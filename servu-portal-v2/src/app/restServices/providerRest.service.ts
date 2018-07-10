import {Injectable} from "@angular/core";
import {URLSearchParams} from "@angular/http";
import {Api} from "../api.service";

@Injectable()
export class ProviderRest {
    constructor(public _rest: Api) {

    }

    public getList(branchId: string) {
        var param = new URLSearchParams();
        param.set("branch_id", branchId);
        return this._rest.get(Api.PORTAL_TYPE.portal, "staff", param);
    }

    create(val: any) {
        return this._rest.post(Api.PORTAL_TYPE.portal, "staff", val);
    }

    update(val: any) {
        // var param = new URLSearchParams();
        // param.set("user_id", val.business_user[0].user_id);
        // param.set("password", val.password);
        // param.set("name", val.name);
        return this._rest.put(Api.PORTAL_TYPE.portal, "staff", val);
    }

    detail(id: any) {
        var param = new URLSearchParams();
        param.set("user_id", id);
        return this._rest.get(Api.PORTAL_TYPE.portal, "staff/detail", param);
    }

    getContact(userId: string) {
        var param = new URLSearchParams();
        param.set("user_id", userId);
        return this._rest.get(Api.PORTAL_TYPE.portal, "staff/contact", param);

    }


    getSchdule(userId: string) {
        var param = new URLSearchParams();
        param.set("user_id", userId);
        return this._rest.get(Api.PORTAL_TYPE.portal, "staff/schedule", param);
    }

    getBasicSchedule(userId: any) {
        var param = new URLSearchParams();
        param.set("user_id", userId);
        return this._rest.get(Api.PORTAL_TYPE.portal, "staff/schedule/basic", param);
    }

    updateBasicSchedule(val: any) {
        return this._rest.put(Api.PORTAL_TYPE.portal, "staff/schedule/basic", val);
    }

    getAdvanceSchedule(userId: any) {
        var param = new URLSearchParams();
        param.set("user_id", userId);
        return this._rest.get(Api.PORTAL_TYPE.portal, "staff/schedule", param);
    }

    postAdvanceSchedule(val: any) {
        val.effected_to = val.schedule_date;
        val.effected_from = val.schedule_date;
        return this._rest.post(Api.PORTAL_TYPE.portal, "staff/schedule", val);
    }

    putAdvanceSchedule(val: any) {
        return this._rest.put(Api.PORTAL_TYPE.portal, "staff/schedule", val);
    }

    removeAdvanceSchedule(userId: any) {
        var param = new URLSearchParams();
        param.set("user_schedule_id", userId);
        return this._rest.delete(Api.PORTAL_TYPE.portal, "staff/schedule", param);
    }

    getAddress(userId: string) {
        var param = new URLSearchParams();
        param.set("user_id", userId);
        return this._rest.get(Api.PORTAL_TYPE.portal, "staff/address", param);
    }

    postAddress(val: any) {
        return this._rest.post(Api.PORTAL_TYPE.portal, "staff/address", val);
    }

    putAddress(val: any) {
        return this._rest.put(Api.PORTAL_TYPE.portal, "staff/address", val);
    }

    deleteAddress(id: any) {
        var param = new URLSearchParams();
        param.set("address_id", id);
        return this._rest.delete(Api.PORTAL_TYPE.portal, "staff/address", param);
    }

    postContact(val: any) {
        return this._rest.post(Api.PORTAL_TYPE.portal, "staff/contact", val);

    }

    putContact(val: any) {
        return this._rest.put(Api.PORTAL_TYPE.portal, "staff/contact", val);
    }

    deleteContact(id, userId) {
        var param = new URLSearchParams();
        param.set("contact_id", id);
        param.set("user_id", userId);
        return this._rest.delete(Api.PORTAL_TYPE.portal, "staff/contact", param);
    }

    getSessions(id: any) {
        var param = new URLSearchParams();
        param.set("id", id);
        return this._rest.get(Api.PORTAL_TYPE.portal, "product/schedule/session", param);
    }

    getStaffCalendar(id: any) {
        var param = new URLSearchParams();
        param.set("user_id", id);
        return this._rest.get(Api.PORTAL_TYPE.portal, "staff/calendar", param);
    }

    updateStaffCalendar(param: any) {
        return this._rest.put(Api.PORTAL_TYPE.portal, "staff/calendar", param);
    }

    deletStaffCalender(id: any, gId: any) {
        var param = new URLSearchParams();
        param.set("user_id", id);
        param.set("google_account_id", gId);
        return this._rest.delete(Api.PORTAL_TYPE.portal, "staff/calendar", param);

    }
}
