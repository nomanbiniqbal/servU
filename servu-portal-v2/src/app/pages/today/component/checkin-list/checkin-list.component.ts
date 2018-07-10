import {Component, EventEmitter, OnInit, Output} from "@angular/core";
import {EventService} from "../../event.service";
import * as _ from "lodash";

@Component({
    selector: 'app-checkin-list',
    templateUrl: './checkin-list.component.html',
    styleUrls: ['./checkin-list.component.scss']
})
export class CheckinListComponent implements OnInit {
    list: any = [];
    loading: boolean;
    @Output() select = new EventEmitter<any>();

    constructor(public es: EventService) {
    }

    ngOnInit() {
        this.loading = true;
        this.es.getCheckInEvent().subscribe(r => {
            this.list = _.reject(r,{event_status:'Cancelled'});
            this.loading = false;
        });
    }

    detial(i) {
        this.select.emit(i);
    }

    checkIn(i) {
        i.loading = true;
        this.es.checkinEvent({
            id: i.id,
        }).subscribe(r => {
            i.loading = false;
        }, (e) => {
            i.loading = false
        });
    }
}
