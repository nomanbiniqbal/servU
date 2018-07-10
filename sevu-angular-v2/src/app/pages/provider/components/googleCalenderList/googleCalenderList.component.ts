import {Component} from "@angular/core";
import {GapiService} from "./gapi.service";

@Component({
    selector: 'google-calender-list',
    templateUrl: './googleCalenderList.html',
})
export class GoogleCalenderList {

    public list;

    constructor(public _gpi: GapiService) {
    }

    public sync() {
        this._gpi.getList().subscribe((result: any) => {
            this.list = result;
        });
    }

}