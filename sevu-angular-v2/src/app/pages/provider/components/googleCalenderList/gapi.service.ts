/**
 * Created by Mian on 3/1/2017.
 */
import {Injectable} from "@angular/core";
import {Observable} from "rxjs";
import {environment} from "../../../../../environments/environment";
declare const gapi: any;

@Injectable()
export class GapiService {
    public clientId: string = environment.GOOGLE_API_CLIENT_ID;
    public scope = [
        'https://www.googleapis.com/auth/calendar',
        'https://www.googleapis.com/auth/calendar.readonly'
    ].join(' ');
    public DISCOVERY_DOCS = ["https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest"];

    public auth2: any;
    public observable;


    constructor() {
        gapi.load('client:auth2', () => {
            gapi.client.init({
                discoveryDocs: this.DISCOVERY_DOCS,
                clientId: this.clientId,
                scope: this.scope
            }).then(() => {
                if (gapi.auth2.getAuthInstance().isSignedIn.get()) {
                    gapi.auth2.getAuthInstance().signOut();
                }
                gapi.auth2.getAuthInstance().isSignedIn.listen((isSignedIn: any) => {
                    if (isSignedIn) {
                        this.getCalender()
                    }
                });
            });
        });
    }

    public getList(): Observable<any> {
        gapi.auth2.getAuthInstance().signIn();
        return new Observable<any>((ob) => {
            this.observable = ob
        });
    }

    public getCalender() {
        gapi.client.calendar.calendarList.list({
            'calendarId': 'primary'
        }).then((result: any) => {
            this.observable.next(JSON.parse(result.body));
        });
    }
}
