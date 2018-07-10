import {Injectable} from "@angular/core";
import {URLSearchParams} from "@angular/http";
import {Observable} from "rxjs";
import {Api} from "../api.service";
import {GlobalState} from "../global.state";

@Injectable()
export class AuthRest {
    public _user = window.localStorage.getItem("user") && JSON.parse(window.localStorage.getItem("user"));
    public isStartUp: boolean;
    private _branch = window.localStorage.getItem("branch") && JSON.parse(window.localStorage.getItem("branch"));


    constructor(public _rest: Api, public _state: GlobalState) {

    }

    private lastlist: any;

    public getCountry() {
        if (this.lastlist) {
            return new Observable<any>(o => {
                o.next(this.lastlist);
            });
        }
        return this._rest.get(Api.PORTAL_TYPE.open, 'country').do(l => this.lastlist = l);
    }

    public getZone(id: string) {
        var params = new URLSearchParams();
        params.set('country_id', id);
        return this._rest.get(Api.PORTAL_TYPE.open, 'zone', params);
    }

    public businessSetup(param: any) {
        param.password = param.passwords.password;
        delete param.passwords;
        param.branch_name = param.name;
        return this._rest.post(Api.PORTAL_TYPE.open, 'business-setup', param).do((result) => {
            this._user = result;
            this.isStartUp = true;
            this._state.notifyDataChanged(GlobalState.keys.userDetail, this._user);
            window.localStorage.setItem("user", JSON.stringify(this._user));
        });
    }

    public login(param: any) {
        return this._rest.post(Api.PORTAL_TYPE.auth, "login", param).do((result) => {
            this._user = result;
            this._state.notifyDataChanged(GlobalState.keys.userDetail, this._user);
            window.localStorage.setItem("user", JSON.stringify(this._user));
        });
    }

    public forgotPassword(param: any) {
        param.secret = "NeedtobeUpdate";
        return this._rest.post(Api.PORTAL_TYPE.auth, "forgot-password", param);
    }

    public getUser() {
        this._state.notifyDataChanged(GlobalState.keys.userDetail, this._user);
        return this._user;
    }

    public remove() {
        delete this._user;
        window.localStorage.removeItem("user");
    }

    updateUserBranchId(selectedId: any) {
        if (this._user) {
            var businessUser = this._user.data.profile.business_user;
            this._user.data.profile.business_user[0].business_location_id = selectedId;
            this._state.notifyDataChanged(GlobalState.keys.userDetail, this._user);
            window.localStorage.setItem("user", JSON.stringify(this._user));

        }
    }

    getBranchId() {
        return this._user.data.profile.business_user[0].business_location_id;
    }

    getPaymentMethod() {
        return this._rest.get(Api.PORTAL_TYPE.open, "payment-method");
    }

    getPaymentGateway() {
        return this._rest.get(Api.PORTAL_TYPE.open, "payment-gateway");
    }

    getPlans() {
        return this._rest.get(Api.PORTAL_TYPE.open, "plan");
    }

    public branchDetails(branch?: any) {
        if (branch) {
            this._branch = branch;
            window.localStorage.setItem("branch", JSON.stringify(this._branch));
        }
        return this._branch;
    }
}
