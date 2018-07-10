/**
 * Created by Awais on 4/4/2017.
 */
import {Injectable} from "@angular/core";
import {URLSearchParams} from "@angular/http";
import {Api} from "../api.service";

@Injectable()
export class ProductRest {
    constructor(private _rest: Api) {

    }

    public getList() {
        var param = new URLSearchParams();
        param.set("product_type", "Product");
        return this._rest.get(Api.PORTAL_TYPE.portal, "product", param);
    }

    detail(id: any) {
        var param = new URLSearchParams();
        param.set("product_id", id);
        return this._rest.get(Api.PORTAL_TYPE.portal, "product/detail", param);
    }

    create(val: any) {
        return this._rest.post(Api.PORTAL_TYPE.portal, "product", val);
    }

    getCategories() {
        return this._rest.get(Api.PORTAL_TYPE.portal, "product/category");
    }

    postCategory(val: any) {
        return this._rest.post(Api.PORTAL_TYPE.portal, "product/category", val);
    }

    putCategory(val: any) {
        return this._rest.put(Api.PORTAL_TYPE.portal, "product/category", val);
    }

    deleteCategory(id: any) {
        var param = new URLSearchParams();
        param.set("id", id);
        return this._rest.delete(Api.PORTAL_TYPE.portal, "product/category", param);
    }

    getProduct(type: string) {
        var param = new URLSearchParams();
        param.set("product_type", type);
        return this._rest.get(Api.PORTAL_TYPE.portal, "product", param);
    }

    postProduct(val: any) {
        return this._rest.post(Api.PORTAL_TYPE.portal, "product", val);

    }

    putProduct(val: any) {
        return this._rest.put(Api.PORTAL_TYPE.portal, "product", val);

    }

    deleteProduct(id: any) {
        var param = new URLSearchParams();
        param.set("product_id", id);
        return this._rest.delete(Api.PORTAL_TYPE.portal, "product", param);

    }

    getProductStaff(id: any) {
        var param = new URLSearchParams();
        param.set("product_id", id);
        return this._rest.get(Api.PORTAL_TYPE.portal, "product/staff", param);
    }

    postProductStaff(val: any) {
        return this._rest.post(Api.PORTAL_TYPE.portal, "product/staff", val);

    }

    putProductStaff(val: any) {
        return this._rest.put(Api.PORTAL_TYPE.portal, "product/staff", val);
    }

    deleteProductStaff(id: any) {
        var param = new URLSearchParams();
        param.set("id", id);//business_user_product
        return this._rest.delete(Api.PORTAL_TYPE.portal, "product/staff", param);
    }

    getClassSchedule(id: any) {
        var param = new URLSearchParams();
        param.set("product_id", id);//business_user_product
        return this._rest.get(Api.PORTAL_TYPE.portal, "product/schedule", param);
    }

    postClassSchedule(val: any) {
        return this._rest.post(Api.PORTAL_TYPE.portal, "product/schedule", val);
    }

    putClassSchedule(val: any) {
        return this._rest.put(Api.PORTAL_TYPE.portal, "product/schedule", val);
    }

    deleteClassSchedule(id: any) {
        var param = new URLSearchParams();
        param.set("id", id);//Event Type Id i.e Class Schedule Id
        return this._rest.delete(Api.PORTAL_TYPE.portal, "product/schedule", param);
    }

    getParticipants(id: any) {
        var param = new URLSearchParams();
        param.set("id", id);//Event Type Id i.e Class Schedule Id
        return this._rest.get(Api.PORTAL_TYPE.portal, "product/schedule/session/participant", param);
    }

    deleteParticipants(id: any) {
        var param = new URLSearchParams();
        param.set("id", id);//Event Type Id i.e Class Schedule Id
        return this._rest.delete(Api.PORTAL_TYPE.portal, "product/schedule/session/participant", param);
    }

    postParticipants(val: any) {
        return this._rest.post(Api.PORTAL_TYPE.portal, "product/schedule/session/participant", val);
    }

    getNotificationTypes() {
        return this._rest.get(Api.PORTAL_TYPE.portal, "product/notification/type");
    }

    getNotifications(id) {
        var param = new URLSearchParams();
        param.set("product_id", id);
        return this._rest.get(Api.PORTAL_TYPE.portal, "product/notification", param);
    }

    deleteNotification(val: any) {
        var param = new URLSearchParams();
        param.set("id", val);//Event Type Id i.e Class Schedule Id
        return this._rest.delete(Api.PORTAL_TYPE.portal, "product/notification", param);
    }

    postNotification(val: any) {
        return this._rest.post(Api.PORTAL_TYPE.portal, "product/notification", val);
    }

    putNotification(val: any) {
        return this._rest.put(Api.PORTAL_TYPE.portal, "product/notification", val);
    }

    getProductCommonStaff(ids: any) {
        var param = new URLSearchParams();
        param.set("product_ids", ids);
        return this._rest.get(Api.PORTAL_TYPE.portal, "product/staff/common", param);

    }
}
