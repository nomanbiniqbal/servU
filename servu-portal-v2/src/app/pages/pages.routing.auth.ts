import {Injectable} from "@angular/core";
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from "@angular/router";
import {Observable} from "rxjs";
import {AuthRest} from "../restServices/authRest.service";
@Injectable()
export class AuthRouting implements CanActivate {
    constructor(public _authS: AuthRest, public _rout: Router) {

    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):
        Observable<boolean>
        | Promise<boolean>
        | boolean {

        var user = this._authS.getUser();
        if (state.url == "/login" || state.url == "/signup" || state.url == "/forgotPassword") {
            if (user) {
                this._rout.navigate(['/pages']);
                return false;
            }
            return true;
        }
        if (user) {
            return true;
        }
        this._rout.navigate(['/login']);
        return true;
    }

}
