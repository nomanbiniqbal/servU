import {Injectable} from "@angular/core";
import {URLSearchParams} from "@angular/http";
import {Api} from "../api.service";

@Injectable()
export class CustomerRest {

    constructor(public _rest: Api) {

    }

    public getList() {
        return this._rest.get(Api.PORTAL_TYPE.portal, "customer");
    }

    create(val: any) {
        return this._rest.post(Api.PORTAL_TYPE.portal, "customer", val);
    }

    update(val: any) {
        return this._rest.put(Api.PORTAL_TYPE.portal, "customer", val);
    }

    delete(val: any) {
        var param = new URLSearchParams();
        param.set("user_id", val);
        return this._rest.delete(Api.PORTAL_TYPE.portal, "customer", param);
    }


    detail(id: any) {
        var param = new URLSearchParams();
        param.set("user_id", id);
        return this._rest.get(Api.PORTAL_TYPE.portal, "customer/detail", param);
    }

    getAddress(userId: string) {
        var param = new URLSearchParams();
        param.set("user_id", userId);
        return this._rest.get(Api.PORTAL_TYPE.portal, "customer/address", param);
    }

    postAddress(val: any) {
        return this._rest.post(Api.PORTAL_TYPE.portal, "customer/address", val);
    }

    putAddress(val: any) {
        return this._rest.put(Api.PORTAL_TYPE.portal, "customer/address", val);
    }

    deleteAddress(id: any) {
        var param = new URLSearchParams();
        param.set("address_id", id);
        return this._rest.delete(Api.PORTAL_TYPE.portal, "customer/address", param);
    }

    getContact(userId: string) {
        var param = new URLSearchParams();
        param.set("user_id", userId);
        return this._rest.get(Api.PORTAL_TYPE.portal, "customer/contact", param);

    }

    postContact(val: any) {
        return this._rest.post(Api.PORTAL_TYPE.portal, "customer/contact", val);
    }

    putContact(val: any) {
        return this._rest.put(Api.PORTAL_TYPE.portal, "customer/contact", val);
    }

    deleteContact(id, userId) {
        var param = new URLSearchParams();
        param.set("contact_id", id);
        param.set("user_id", userId);
        return this._rest.delete(Api.PORTAL_TYPE.portal, "customer/contact", param);
    }

    getNotes(val: any) {
        var param = new URLSearchParams();
        param.set("user_id", val);
        return this._rest.get(Api.PORTAL_TYPE.portal, "customer/note", param);
    }

    createNotes(val: any) {
        return this._rest.post(Api.PORTAL_TYPE.portal, "customer/note", val);
    }

    updateNotes(val: any) {
        return this._rest.put(Api.PORTAL_TYPE.portal, "customer/note", val);
    }

    deleteNotes(val: any) {
        var param = new URLSearchParams();
        param.set("id", val);
        return this._rest.delete(Api.PORTAL_TYPE.portal, "customer/note", param);
    }

    getMemberships(userId: string) {
        var param = new URLSearchParams();
        param.set("user_id", userId);
        return this._rest.get(Api.PORTAL_TYPE.portal, "customer/membership", param);
    }
    postMemberships(params) {
        return this._rest.post(Api.PORTAL_TYPE.portal, "customer/membership", params);
    }
    putMemberships(params) {
        return this._rest.put(Api.PORTAL_TYPE.portal, "customer/membership", params);
    }
    deleteMemberships(id: string) {
        var param = new URLSearchParams();
        param.set("id", id);
        return this._rest.delete(Api.PORTAL_TYPE.portal, "customer/membership", param);
    }
}
