import {Component, Input, OnInit, ViewChild} from "@angular/core";
import {NgForm} from "@angular/forms";
import {MembershipService} from "app/pages/membership/membership.service";
import * as _ from "lodash";
import {ModalDirective} from "ngx-bootstrap";
import {BusinessRest} from "../../../../restServices/businessRest.service";

@Component({
    selector: 'app-membership-branch',
    templateUrl: './membership-branch.component.html',
    styleUrls: ['./membership-branch.component.scss']
})
export class MembershipBranchComponent implements OnInit {
    public list: any = [];
    public Blist: any = [];
    public _Blist: any = [];
    @ViewChild('f') f: NgForm;
    public _membershipID: any;

    constructor(public ms: MembershipService, public br: BusinessRest) {

        this.br.getBranchesList().subscribe(r => {
            this._Blist = r.data;
        });
    }

    @Input() set membershipID(id) {
        if (id) {
            this.list = [];
            this._membershipID = id;
            this.ms.getMembershipBranch(id).subscribe(r => {
                this.Blist = [];
                this.list = r;
                this.list.forEach(r => {
                    var number = _.findIndex(this._Blist, {id: r.business_location_id});
                    if (number) {
                        this._Blist.splice(number, 1);
                    }

                });
                this.Blist = this._Blist;
            });
        }
    }

    ngOnInit() {
    }

    @ViewChild('create') m: ModalDirective;

    new() {
        this.f.reset();
        this.m.show();
    }

    edit(val) {
        val.branch_id = val.business_location_id;
        this.f.reset(val);
        this.m.show();
    }


    submit(val: any) {
        if (!val.id) {
            val.id = this._membershipID;
            this.ms.addMembershipBranch(val).subscribe(r => {
                this.m.hide();
            });
        } else {
            this.ms.updateMembershipBranch(val).subscribe(r => {
                this.m.hide();
            });
        }
    }

    delet(id: any) {
        this.ms.deletMembershipBranch(id).subscribe(r => {
            this.m.hide();
        });
    }
}
