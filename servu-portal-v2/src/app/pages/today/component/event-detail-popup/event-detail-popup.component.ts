import {Component, OnInit, ViewChild} from "@angular/core";
import {ModalDirective} from "ngx-bootstrap";
import {EventService} from "app/pages/today/event.service";

@Component({
    selector: 'app-event-detail-popup',
    templateUrl: './event-detail-popup.component.html',
    styleUrls: ['./event-detail-popup.component.scss']
})
export class EventDetailPopupComponent implements OnInit {
    loading: boolean;
    @ViewChild('eventDetailModal') m: ModalDirective;
    public e: any = {};
    public status = '';

    constructor(public es:EventService) {
    }

    show(e) {
        this.e = e;
        this.status = this.e.event_status;
        this.m.show();
    }

    ngOnInit() {
    }

    update(status) {
        this.loading=true;
        this.es.updateStatusEvent({id:this.e.id,event_status:status}).subscribe(r=>{
            this.m.hide();
            this.loading=false;
        })
    }

    getProduct(p) {
        return p.map((r) => {
            return r.business_product.name
        }).join(',');
    }

    getUser(b) {
        return b.map((r) => {
            return r.business_user.user.name
        }).join(',');

    }

}
