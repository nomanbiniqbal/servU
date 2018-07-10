import {Injectable} from "@angular/core";
import {Headers, Http, RequestOptions, Response, URLSearchParams} from "@angular/http";
import {Observable} from "rxjs";
import {environment} from "../environments/environment";
import {Router} from "@angular/router";

@Injectable()
export class Api {
    public BASE_URL: string = environment.BASE_URL;

    public headers = new Headers({'Content-Type': 'application/json'});
    public options = new RequestOptions({headers: this.headers});
    public static PORTAL_TYPE = {
        open: 'open-portal',
        auth: 'auth',
        portal: 'portal',
    }

    constructor(public http: Http, public _rout: Router) {
    }

    public get(portal_type: string, action: string, param?: URLSearchParams): Observable<any> {
        this.updateHeader();
        return this.http.get(`${this.BASE_URL}/${portal_type}/${action}`, {
            search: param,
            headers: this.headers
        }).map(this.extractData).catch(this.handleError);
    }

    public delete(portal_type: string, action: string, param?: URLSearchParams): Observable<any> {
        this.updateHeader();
        return this.http.delete(`${this.BASE_URL}/${portal_type}/${action}`, {
            search: param,
            headers: this.headers
        }).map(this.extractData).catch(this.handleError);
    }

    public post(portal_type: string, action: string, param: any): Observable<any> {
        this.updateHeader();
        return this.http.post(`${this.BASE_URL}/${portal_type}/${action}`, param, this.options).map(this.extractData).catch(this.handleError);
    }

    public put(portal_type: string, action: string, param: any): Observable<any> {
        this.updateHeader();
        return this.http.put(`${this.BASE_URL}/${portal_type}/${action}`, param, this.options).map(this.extractData).catch(this.handleError);
    }

    public extractData(res: Response) {
        let body = res.json();
        return body || {};
    }

    public handleError(error: Response | any) {
        if (error.json().message.type == 'forbidden') {
            // localStorage.clear();
            // window.location.href='';
        }
        return Observable.throw(error.json().message);
    }
    public updateHeader() {
        var user = window.localStorage.getItem("user") && JSON.parse(window.localStorage.getItem("user"));
        if (user) {
            user = user.data;
            this.headers.set("Authorization", `${user.token.token_type} ${user.token.access_token}`)
        } else {
            this.headers.delete("Authorization");
        }
    }
}
