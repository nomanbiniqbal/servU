import {Component, ViewChild} from "@angular/core";
import "style-loader!./provider.scss";
import {GoogleCalenderList} from "./components/googleCalenderList/googleCalenderList.component";
import {ProviderService} from "./provider.service";

@Component({
    selector: "provider",
    templateUrl: "./provider.html"
})
export class Provider {
    @ViewChild(GoogleCalenderList) gcl: GoogleCalenderList;
    public pro: any = {};

    public mon: any;
    public tue: any;
    public wed: any;
    public thu: any;
    public fri: any;
    public sat: any;
    public sun: any;

    constructor(public _ps: ProviderService) {
        this.initSchedule();
    }

    onSync() {
        this.gcl.sync();
    }

    select(provider) {
        this.pro = provider;
    }

    initSchedule() {
        this.mon = {open_at: "07:00", close_at: "17:00", is_open: true, user_schedule_break: []};
        this.tue = {open_at: "07:00", close_at: "17:00", is_open: true, user_schedule_break: []};
        this.wed = {open_at: "07:00", close_at: "17:00", is_open: true, user_schedule_break: []};
        this.thu = {open_at: "07:00", close_at: "17:00", is_open: true, user_schedule_break: []};
        this.fri = {open_at: "07:00", close_at: "17:00", is_open: true, user_schedule_break: []};
        this.sat = {open_at: "07:00", close_at: "17:00", is_open: false, user_schedule_break: []};
        this.sun = {open_at: "07:00", close_at: "17:00", is_open: false, user_schedule_break: []};
    }
}

