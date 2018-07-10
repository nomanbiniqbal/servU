import {Component, EventEmitter, OnInit, Output} from "@angular/core";
import * as _ from "lodash";
import "style-loader!./membership-list.component.scss";
import {MembershipService} from "../../membership.service";

@Component({
    selector: 'app-membership-list',
    templateUrl: './membership-list.component.html',
})
export class MembershipListComponent implements OnInit {
    public loading: boolean;
    public memberShips: any = [];
    public selectedId: any;
    @Output() select = new EventEmitter<any>();

    constructor(public ms: MembershipService) {
    }

    ngOnInit() {
        this.loading = true;
        this.ms.getMembershipList().subscribe(l => {
            this.memberShips = l;
            this.loading = false;
            if (this.selectedId) {
                this.select.emit(_.find(this.memberShips, {id: this.selectedId}));
            }
        });
    }

    onSelect(val) {
        this.selectedId = val.id;
        this.select.emit(val);
    }

}
