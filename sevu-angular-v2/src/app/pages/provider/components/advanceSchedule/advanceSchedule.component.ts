import {Component, Input, ViewChild} from "@angular/core";
import {NgForm} from "@angular/forms";
import * as moment from "moment";
import {ModalDirective} from "ngx-bootstrap";
import "style-loader!./advanceSchedule.scss";
import {ProviderService} from "../../provider.service";
@Component({
    selector: 'advance-schedule',
    templateUrl: './advanceSchedule.html'
})
export class AdvanceSchedule {
    public id;
    public loading: boolean;
    public schedule = [];
    @ViewChild('f') form: NgForm;
    @ViewChild('scheduleModal') model: ModalDirective;

    public s: any = {user_schedule_break: []};


    constructor(public _ps: ProviderService) {
    }

    @Input()
    set providerId(id) {
        if (id) {
            this.id = id;
            this.loading = true;
            this._ps.getAdvanceSchedule(id).subscribe((e: any) => {
                this.loading = false;
                this.schedule = e;
            });
        }
    }

    create() {
        this.s = {user_schedule_break: []};
        this.model.show();
    }

    submit(val) {
        if (val.user_schedule_id) {
            this._ps.editAdvanceSchedule(val).subscribe((r => {
                this.model.hide();
            }));
            return;
        }
        this._ps.addAdvanceSchedule(val).subscribe((r => {
            this.model.hide();
        }));
    }

    edit(s) {
        this.s = Object.assign({}, s);
        this.s.schedule_date = moment(s.schedule_date, "LT").toDate();
        this.model.show();
    }

    delete(id) {
        this._ps.deleteAdvanceSchedule(id).subscribe((r => {
            this.model.hide();
        }));
    }
}