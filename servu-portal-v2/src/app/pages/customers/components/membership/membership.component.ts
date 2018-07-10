import {Component, Input, OnInit, ViewChild} from "@angular/core";
import {CustomerService} from "app/pages/customers/customer.service";
import {MembershipRest} from "app/restServices/membership-rest.service";
import {ModalDirective} from "ngx-bootstrap";
import "style-loader!./membership.component.scss";


@Component({
    selector: 'app-membership',
    templateUrl: './membership.component.html',
})
export class MembershipComponent implements OnInit {
    @ViewChild('addMemberShipModal') m: ModalDirective;
    public memberships: any = [];
    public customerMemberships: any = [];
    public selected: any = {};
    private _id: any;

    @Input() set id(i) {
        this._id = i;
        this.cs.getMemberships(i).subscribe(r => {
            this.customerMemberships = r;
        })

    };

    constructor(public mr: MembershipRest, public cs: CustomerService) {
        this.mr.getMembershipList().subscribe((r: any) => {
            this.memberships = r.data;
        })
    }

    ngOnInit() {
    }

    add() {
        this.m.show();
    }

    submit(val) {
        val.membership_id = this.selected.id;
        val.user_id = this._id;
        this.cs.addMembership(val).subscribe(r => {
            this.m.hide();
        });
    }

}
