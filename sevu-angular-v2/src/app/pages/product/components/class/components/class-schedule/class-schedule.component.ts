import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from "@angular/core";
import {ProductService} from "app/pages/product/product.service";
import * as _ from "lodash";
import * as moment from "moment";
import {ModalDirective} from "ngx-bootstrap";
import {IMyDateModel, IMyOptions} from "ngx-mydatepicker";
import "style-loader!./class-schedule.component.scss";

@Component({
    selector: 'app-class-schedule',
    templateUrl: './class-schedule.component.html',
    styleUrls: ['./class-schedule.component.scss']
})
export class ClassScheduleComponent implements OnInit {
    public staffList: any = [];
    public scheduleList: any = [];
    public _id: any;
    @Output() schedule = new EventEmitter<any>();
    @ViewChild('screateModel') scheduleModal: ModalDirective;
    public sItem: any = {};
    public isDaily = true;
    public isEndCount = 'true';
    public selectedId: any;
    public loading: boolean;

    @Input() set providerId(id) {
        this.scheduleList = [];
        if (id) {
            this._id = id;
            this.loading = true;
            this._ps.getClassSchedule(id).subscribe((r: any) => {
                this.loading = false;
                this.scheduleList = r;
            });

            this._ps.getProductStaff(id).subscribe((r: any) => {
                this.staffList = r;
            });

        }
    }

    public myOptions: IMyOptions = {
        dateFormat: 'yyyy-mm-dd',
    };

    constructor(public _ps: ProductService) {
    }

    onDateChanged(event: IMyDateModel): void {
        // date selected
    }

    public weeklyCheckList: any = [{
        week_day_id: 1,
        checked: true
    }, {
        week_day_id: 2,
        checked: true
    }, {
        week_day_id: 3,
        checked: true
    }, {
        week_day_id: 4,
        checked: false
    }, {
        week_day_id: 5,
        checked: false
    }, {
        week_day_id: 6,
        checked: false
    }, {
        week_day_id: 7,
        checked: false
    }];

    ngOnInit() {
    }

    editSchedule(item) {
        this.sItem = item;
        var week_days = item.week_day_ids.split(',');
        this.weeklyCheckList = this.weeklyCheckList.map(v => {
            v.checked = _.find(week_days, f => f == v.week_day_id) ? true : false;
            return v;
        });
        var startAt = moment(this.sItem.start_at, 'yyyy-MM-dd HH:mm:ss');
        this.sItem.start_date_modal = {
            date: {year: startAt.year(), month: startAt.month(), day: startAt.day()}
        };
        this.sItem.start_time = startAt.format('HH:mm:ss');
        var endAt = moment(this.sItem.schedule_end_at, 'yyyy-MM-dd');

        this.sItem.schedule_end_at_modal = {
            date: {year: endAt.year(), month: endAt.month(), day: endAt.day()}
        };

        this.scheduleModal.show();

    }

    submit(val: any) {
        val = Object.assign({}, val);
        val.week_day_ids = _.filter(this.weeklyCheckList, {checked: true}).map((v: any) => v.week_day_id).join(",");
        if (val.start_date_modal) {
            val.start_at = `${val.start_date_modal.date.year}-${val.start_date_modal.date.month}-${val.start_date_modal.date.day} ${val.start_time}`;
        }
        if (val.schedule_end_at_modal) {
            val.schedule_end_at = `${val.schedule_end_at_modal.date.year}-${val.schedule_end_at_modal.date.month}-${val.schedule_end_at_modal.date.day}`;
        }
        delete val.schedule_end_at_modal;
        delete val.start_date_modal;
        if (this.isEndCount == 'true') {
            delete val.schedule_end_at
        } else {
            delete val.event_occurrence
        }
        if (this.isDaily) {
            delete val.week_day_ids;
        } else {
            delete val.event_frequency;
        }

        this._ps.addClassSchedule(val).subscribe(r => {
        });
    }

    select(item) {
        this.selectedId = item.id;
        this.schedule.emit(item);
    }
}
