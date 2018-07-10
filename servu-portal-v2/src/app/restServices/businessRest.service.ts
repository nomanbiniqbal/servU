import {Injectable} from "@angular/core";
import {URLSearchParams} from "@angular/http";
import {Api} from "../api.service";

@Injectable()
export class BusinessRest {

    constructor(public _rest: Api) {

    }
    public getBranches() {
        return this._rest.get(Api.PORTAL_TYPE.portal, "business/branch");
    }

    public getBranchesList() {
        return this._rest.get(Api.PORTAL_TYPE.portal, "business/branch/mine");
    }

    public getBranchDetail(id: any) {
        return this._rest.get(Api.PORTAL_TYPE.portal, "business/branch/mine");
    }

    getBranchInfo() {
      return this._rest.get(Api.PORTAL_TYPE.portal, "business/branch/info");
    }

    createBranch(val: any) {
        return this._rest.post(Api.PORTAL_TYPE.portal, "business/branch", val);
    }

    switchBranch(id: any) {
        var urlSearchParams = new URLSearchParams();
        urlSearchParams.set("branch_id", id.id);
        return this._rest.get(Api.PORTAL_TYPE.portal, "switch-branch", urlSearchParams);
    }

    editBranch(val: any) {
        return this._rest.put(Api.PORTAL_TYPE.portal, "business/branch", val);
    }

    getBusinessInfo() {
        return this._rest.get(Api.PORTAL_TYPE.portal, "business");
    }

    updateBusinessInfo(val) {
        return this._rest.put(Api.PORTAL_TYPE.portal, "business", val);
    }


    getBusinessPaymentGateway() {
        return this._rest.get(Api.PORTAL_TYPE.portal, "business/payment/gateway");

    }

    createBusinessPaymentGateway(val) {
        return this._rest.post(Api.PORTAL_TYPE.portal, "business/payment/gateway", val);

    }

    updateBusinessPaymentGateway(val) {
        return this._rest.put(Api.PORTAL_TYPE.portal, "business/payment/gateway", val);

    }

    deleteBusinessPaymentGateway(val) {
        return this._rest.delete(Api.PORTAL_TYPE.portal, "business/payment/gateway", val);

    }

    getBusinessPaymentMethod() {
        return this._rest.get(Api.PORTAL_TYPE.portal, "business/payment/method");
    }

    createBusinessPaymentMethod(val) {
        return this._rest.post(Api.PORTAL_TYPE.portal, "business/payment/method", val);

    }

    updateBusinessPaymentMethod(val) {
        return this._rest.put(Api.PORTAL_TYPE.portal, "business/payment/method", val);

    }

    deleteBusinessPaymentMethod(val) {
        return this._rest.delete(Api.PORTAL_TYPE.portal, "business/payment/method", val);
    }


    bpointToken() {
        var param = new URLSearchParams();
        param.set("secret", "6b6800945da21563ecac2fd4ee69cc0124cc9ec2");
        return this._rest.get(Api.PORTAL_TYPE.portal,"business/bpoint/token",param)
    }
}
