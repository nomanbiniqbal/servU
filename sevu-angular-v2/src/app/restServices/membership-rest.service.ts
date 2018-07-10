import {Injectable} from "@angular/core";
import {URLSearchParams} from "@angular/http";
import {Api} from "../api.service";

@Injectable()
export class MembershipRest {

    constructor(public api: Api) {
    }

    getMembershipList() {
        return this.api.get(Api.PORTAL_TYPE.portal, 'membership');
    }

    createMebership(data: any) {
        return this.api.post(Api.PORTAL_TYPE.portal, 'membership', data);
    }

    putMembership(val: any) {
        return this.api.put(Api.PORTAL_TYPE.portal, 'membership', val);
    }

    deleteMembership(id: any) {
        var param = new URLSearchParams();
        param.set("id", id);
        return this.api.delete(Api.PORTAL_TYPE.portal, 'membership', param);
    }

    getMembershipPrice(id: any) {
        var param = new URLSearchParams();
        param.set("id", id);
        return this.api.get(Api.PORTAL_TYPE.portal, 'membership/price', param);
    }

    postMembershipPrice(data: any) {
        return this.api.post(Api.PORTAL_TYPE.portal, 'membership/price', data);
    }

    putMembershipPrice(data: any) {
        return this.api.put(Api.PORTAL_TYPE.portal, 'membership/price', data);
    }

    deleteMembershipPrice(id: any) {
        var param = new URLSearchParams();
        param.set("id", id);
        return this.api.delete(Api.PORTAL_TYPE.portal, 'membership/price', param);
    }


    getMembershipProduct(data: any) {
        var param = new URLSearchParams();
        param.set("id", data);
        return this.api.get(Api.PORTAL_TYPE.portal, 'membership/product', param);
    }

    postMembershipProduct(data: any) {
        return this.api.post(Api.PORTAL_TYPE.portal, 'membership/product', data);
    }

    putMembershipProduct(data: any) {
        return this.api.put(Api.PORTAL_TYPE.portal, 'membership/product', data);
    }

    deleteMembershipProduct(data: any) {
        var param = new URLSearchParams();
        param.set("id", data);
        return this.api.delete(Api.PORTAL_TYPE.portal, 'membership/product', param);
    }


    getMembershipBranch(id: any) {
        var param = new URLSearchParams();
        param.set("id", id);
        return this.api.get(Api.PORTAL_TYPE.portal, 'membership/branch', param);
    }

    postMembershipBranch(data: any) {
        return this.api.post(Api.PORTAL_TYPE.portal, 'membership/branch', data);
    }

    putMembershipBranch(data: any) {
        return this.api.put(Api.PORTAL_TYPE.portal, 'membership/branch', data);
    }

    deleteMembershipBranch(id: any) {
        var param = new URLSearchParams();
        param.set("id", id);
        return this.api.delete(Api.PORTAL_TYPE.portal, 'membership/branch', param);
    }


}
