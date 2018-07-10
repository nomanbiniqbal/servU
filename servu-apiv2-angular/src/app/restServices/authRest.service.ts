import {Injectable} from "@angular/core";
import {ApiService} from "../api.service";
import {URLSearchParams} from "@angular/http";

@Injectable()
export class AuthRest {
  private _user= window.localStorage.getItem("user") && JSON.parse(window.localStorage.getItem("user"));

  constructor(private _rest: ApiService) {

  }

  public getCountry() {
    return this._rest.get(ApiService.PORTAL_TYPE.open, 'country');
  }

  public getZone(id: string) {
    var params = new URLSearchParams();
    params.set('country_id', id);
    return this._rest.get(ApiService.PORTAL_TYPE.open, 'zone', params);
  }

  public businessSetup(param: any) {
    param.password = param.passwords.password;
    delete param.passwords;
    param.branch_name = param.name;
    return this._rest.post(ApiService.PORTAL_TYPE.open, 'business-setup', param).do((result) => {
      this._user = result;
      window.localStorage.setItem("user", JSON.stringify(this._user));
    });
  }

  public login(param: any) {
    return this._rest.post(ApiService.PORTAL_TYPE.auth, "login", param).do((result) => {
      this._user = result;
      window.localStorage.setItem("user", JSON.stringify(this._user));
    });
  }

  public forgotPassword(param: any) {
    param.secret = "NeedtobeUpdate";
    return this._rest.post(ApiService.PORTAL_TYPE.auth, "forgot-password", param);
  }

  public getUser() {
    return this._user;
  }
  public remove() {
    delete this._user;
    window.localStorage.removeItem("user");
  }
}
