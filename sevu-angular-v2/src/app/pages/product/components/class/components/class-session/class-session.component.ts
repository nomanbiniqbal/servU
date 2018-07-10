import {Component, EventEmitter, Input, OnInit, Output} from "@angular/core";
import "style-loader!./class-session.component.scss";
import {ProviderService} from "../../../../../provider/provider.service";
@Component({
    selector: 'app-class-session',
    templateUrl: './class-session.component.html',
    styleUrls: ['./class-session.component.scss']
})
export class ClassSessionComponent implements OnInit {
    public sessions: any = [];
    @Output() session = new EventEmitter<any>();
    public selectedId: any;
    private loading: boolean;

    @Input() set scheduleId(id) {
        this.sessions = [];
        if (id) {
            this.loading = true;
            this._sp.getSessions(id).subscribe((l) => {
                this.loading = false;
                this.sessions = l;
            });
        }
    }

    constructor(public _sp: ProviderService) {
    }

    ngOnInit() {
    }

    select(i) {
        this.selectedId = i.id;
        this.session.emit(i);
    }

}
