import {Component, Input, OnInit, ViewChild} from "@angular/core";
import {NgForm} from "@angular/forms";
import {MembershipService} from "app/pages/membership/membership.service";
import {ProductRest} from "app/restServices/productRest.service";
import {ModalDirective} from "ngx-bootstrap";

@Component({
    selector: 'app-membership-product',
    templateUrl: './membership-product.component.html',
    styleUrls: ['./membership-product.component.scss']
})
export class MembershipProductComponent implements OnInit {


    public list: any = [];
    @ViewChild('f') f: NgForm;
    public _membershipID: any;
    public classes: any = [];
    public service: any = [];

    constructor(public ms: MembershipService, public pr: ProductRest) {
        this.pr.getProduct("Service").subscribe((r: any) => {
            this.service = this.getProducts(r.data);
        });
        this.pr.getProduct("Class").subscribe((r: any) => {
            this.classes = this.getProducts(r.data);
        });
    }

    getProducts(p) {
        var temp: any = [];
        p.forEach(v => v.business_product.forEach(r => temp.push(r)));
        return temp;
    }

    @Input() set membershipID(id) {
        if (id) {
            this.list = [];
            this._membershipID = id;
            this.ms.getMembershipProduct(id).subscribe(r => {
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

    submit(val: any) {
        if (!val.id) {
            val.id = this._membershipID;

            this.ms.addMembershipProduct(val).subscribe(r => {
                this.m.hide();
            });
        } else {
            this.ms.updateMembershipProduct(val).subscribe(r => {
                this.m.hide();
            });
        }
    }

    edit(val) {
        this.f.reset(val);
        this.m.show();
    }

    delet(id: any) {
        this.ms.deletMembershipProduct(id).subscribe(r => {
            this.m.hide();
        });
    }

}
