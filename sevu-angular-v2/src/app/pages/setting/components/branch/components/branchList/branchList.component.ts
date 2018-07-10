import {Component, EventEmitter, Output} from "@angular/core";
import * as _ from "lodash";
import "style-loader!./branchList.scss";
import {AuthRest} from "../../../../../../restServices/authRest.service";
import {BranchService} from "../../branch.service";
@Component({
    selector: 'branch-list',
    templateUrl: './branchList.html'
})
export class BranchList {
    public selectedId: any;
    s = '';
    @Output() onSelect = new EventEmitter<any>();
    @Output() onCreate = new EventEmitter<any>();
    public loading: boolean;
    public list;

    constructor(public _bs: BranchService, public au: AuthRest) {
        this.loading = true;
        _bs.getList().subscribe((list: any) => {
            this.list = list.length && list;
            var userID = au.getUser().data.profile.id;
            this.list.forEach(r => {
                var found = (_.find(r.business_user, {is_default: true}));
                if (found) {
                    this._onSelect(r);
                }
            });

            this.loading = false;
        });
    }

    _create() {
        this.onCreate.emit();
    }

    _onSelect(c) {
        this.selectedId = c.id;
        this.onSelect.emit(c);
    }
}
