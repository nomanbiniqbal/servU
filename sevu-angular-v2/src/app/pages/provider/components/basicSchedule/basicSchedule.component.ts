import {Component, Input, OnInit, ViewChild} from "@angular/core";
import {ModalDirective} from "ngx-bootstrap";
import "style-loader!./basicSchedule.scss";
import {ProviderService} from "../../provider.service";

@Component({
    selector: 'basic-schedule',
    templateUrl: './basicSchedule.html'
})
export class BasicSchedule implements OnInit {
    public loading: boolean = false;
    public schedule = [];
    public id;
    public breaks: any = {};
    public errors: any;
    public progress: any;
    @ViewChild('scheduleModal') model: ModalDirective;
    public editScheduel: any = [];

    constructor(public _ps: ProviderService) {
    }

    @Input()
    set providerId(id) {
        if (id) {
            this.id = id;
            this.loading = true;
            this._ps.getBasicSchedule(id).subscribe((e) => {
                this.loading = false;
                this.schedule = e.data;
            });
        }
    }

    ngOnInit() {
    }

    onEdit() {
        this.editScheduel = Object.assign([], this.schedule);
        this.model.show();
    }

    submit(val) {
        this._ps.updateBasicSchedule(val).subscribe((r: any) => {
            this.schedule = this.editScheduel;
            this.model.hide();
        });
    }

}