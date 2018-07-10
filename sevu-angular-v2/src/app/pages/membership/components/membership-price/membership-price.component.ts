import {Component, Input, OnInit, ViewChild} from "@angular/core";
import {NgForm} from "@angular/forms";
import {ModalDirective} from "ngx-bootstrap";
import {MembershipService} from "../../membership.service";

@Component({
    selector: 'app-membership-price',
    templateUrl: './membership-price.component.html',
    styleUrls: ['./membership-price.component.scss']
})
export class MembershipPriceComponent implements OnInit {
    public list: any = [];
    @ViewChild('f') f: NgForm;
    public _membershipID: any;

    constructor(public ms: MembershipService) {
    }

    @Input() set membershipID(id) {
        if (id) {
            this.list = [];

            this._membershipID = id;
            this.ms.getMembershipPrice(id).subscribe(r => {
                this.list = r;
            });
        }
    }

    ngOnInit() {
    }

    @ViewChild('create') m: ModalDirective;

    new() {
        this.f.reset({
            price_type: "Select"
        });
        this.m.show();
    }

    edit(item) {
        this.f.reset(item);
        this.m.show();

    }

    submit(val: any) {
        if (!val.id) {
            val.id = this._membershipID;
            this.ms.addMembershipPrice(val).subscribe(r => {
                this.m.hide();
            });
        }else {
            this.ms.updateMembershipPrice(val).subscribe(r => {
                this.m.hide();
            });
        }

    }

    delet(id: any) {
        this.ms.deletMembershipPrice(id).subscribe(r => {
            this.m.hide();
        });
    }
}
