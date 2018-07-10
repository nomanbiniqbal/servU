import {Component, Input, ViewChild} from "@angular/core";
import "style-loader!./googleCalenderList.scss";
import {ProviderService} from "../../provider.service";
import {ModalDirective} from "ngx-bootstrap";

@Component({
    selector: 'google-calender-list',
    templateUrl: './googleCalenderList.html',
})
export class GoogleCalenderList {
    removing: boolean;
    calenderList: any = [];
    account: any;
    loading: boolean;
    _id: any;
    @ViewChild('celandarModal') model: ModalDirective;

    public list;
    public setup = false;

    @Input() businessUserId;
    @Input() set providerId(id) {
        this._id = id;
        if (id) {
            this.setup = false;
            this.loading = true;
            this.ps.getStaffCalender(this._id).subscribe((r) => {
                this.loading = false;
                if (r.data.google_account) {
                    this.account = r.data.google_account;
                    this.calenderList = r.data.google_calendar;
                    this.setup = true;
                }
            });
        }
    };

    updateStatus(g) {
        g.loading = true;
        this.ps.updateCalenderStatus({
            user_id: this._id,
            google_calendar_id: g.id,
            write_on_calender: g.write_on_calender,
            read_from_calender: g.read_from_calender
        }).subscribe((r) => {
            g.loading = false;
        });
    }

    remove() {
        this.removing=true;
        this.ps.deletStaffCalender(this._id,this.account.id).subscribe(r=>{
            this.model.hide();
            this.setup = false;
            this.removing=false;
        });
    }

    constructor(public ps: ProviderService) {
    }

    // onAction(s) {
    //     if (!s) {
    //         window.location.href = `http://beta.servuapp.com.au/google/auth?provider_id=${this.businessUserId}`;
    //     }
    // }

    onAction() {
        window.location.href = `http://beta.servuapp.com.au/google/auth?provider_id=${this.businessUserId}`;
    }
}
