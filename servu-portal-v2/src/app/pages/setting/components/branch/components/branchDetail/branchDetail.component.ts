import {Component, EventEmitter, Input, Output, ViewChild} from "@angular/core";
import * as _ from "lodash";
import {PopoverDirective} from "ngx-bootstrap";
import "style-loader!./branchDetail.scss";
import {AuthRest} from "../../../../../../restServices/authRest.service";
import {ProviderService} from "../../../../../provider/provider.service";
import {BranchService} from "../../branch.service";
import {forEach} from "@angular/router/src/utils/collection";
import {Branch} from "../../branch.component";
@Component({
    selector: 'branch-detail',
    templateUrl: './branchDetail.html'

})
export class BranchDetail {
    public loading: boolean;
    @Output() edit = new EventEmitter<any>();
    @ViewChild('pop') pop: PopoverDirective;
    public _branch: any = {};
    public user: any;
    public isEditAble = false;
    public providers = [];
    public country_names :any =  [] ;
    public country_name_text :any = [] ;
    public countrydata :any;

    @Input()
    set branch(b) {
        if (b) {
          this.loading = true;
          setTimeout(r => {
                if (this._au.isStartUp) {
                    this.pop.show();
                }
            this.loading = false;
            this._branch = b;
            this.countrydata  = _.find (this.country_names,{id:b.country_id});
          },500);
            this.canEdit();
            this.loadProvider(b.id);
        }
    };

    constructor(public _bs: BranchService, public _ps: ProviderService, public _au: AuthRest) {
        this.user = _au.getUser();
        this._au.getCountry().subscribe(l => this.country_names = l.data);
    }

    public onEdit() {
        this.edit.emit(this._branch);
    }

    public loadProvider(id) {
        this.loading = true;
        this._ps.getList(id).subscribe((r: any) => {
            this.loading = false;
            this.providers = r;
        });

    }

    public canEdit() {
        if (this._branch && this.user) {
            this.isEditAble = _.find(this._branch.business_user, {is_default: true}) && true;
        }
    }

    isAssigned(p, branchId) {
        return _.find(p.business_user, {business_location_id: branchId}) && true;
    }
}
