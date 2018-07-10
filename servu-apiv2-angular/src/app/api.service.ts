import {Injectable} from "@angular/core";
import {Headers, RequestOptions, Http, URLSearchParams, Response} from "@angular/http";
import {Observable} from "rxjs";
import {ENVIRONMENT_VARIABLE} from "./environment";

@Injectable()
export class ApiService {
  private BASE_URL: string = ENVIRONMENT_VARIABLE.BASE_URL;
  private _user= window.localStorage.getItem("user") && JSON.parse(window.localStorage.getItem("user"));

  private headers = new Headers({'Content-Type': 'application/json'});
  private options = new RequestOptions({headers: this.headers});
  public static PORTAL_TYPE = {
    open: 'open-portal',
    auth: 'auth',
  }

  constructor(private http: Http) {
  }

  public get(portal_type: string, action: string, param?: URLSearchParams): Observable<any> {
    return this.http.get(`${this.BASE_URL}/${portal_type}/${action}`, {
      search: param,
      headers: this.headers
    }).map(this.extractData).catch(this.handleError);
  }

  public post(portal_type: string, action: string, param: any): Observable<any> {
    return this.http.post(`${this.BASE_URL}/${portal_type}/${action}`, param, this.options).map(this.extractData).catch(this.handleError);
  }

  private extractData(res: Response) {
    let body = res.json();
    return body || {};
  }

  private handleError(error: Response | any) {
    return Observable.throw(error.json().message);
  }
}
