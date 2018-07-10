import {Component, OnInit, ViewChild,Pipe} from "@angular/core";
import {NgForm} from "@angular/forms";
import * as moment from "moment";
import {ModalDirective} from "ngx-bootstrap";
import {NgxMyDatePickerDirective} from "ngx-mydatepicker";
import {ProductRest} from "../../restServices/productRest.service";
import {BranchService} from "../setting/components/branch/branch.service";
import {MembershipService} from "./membership.service";
@Pipe({name: 'baDate'})
@Component({
    selector: 'app-membership',
    templateUrl: './membership.component.html',
    styleUrls: ['./membership.component.scss']
})
export class MembershipComponent implements OnInit {
    public selectedM: any = {};

    public m: any = {};

    @ViewChild('membershipModal') modal: ModalDirective;
    @ViewChild('meditModal') mEModal: ModalDirective;
    @ViewChild('f') f: NgForm;
    @ViewChild('f2') f2: NgForm;
    @ViewChild('dp') date1: NgxMyDatePickerDirective;
    @ViewChild('dp2') date2: NgxMyDatePickerDirective;
    @ViewChild('edp') edate1: NgxMyDatePickerDirective;
    @ViewChild('edp2') edate2: NgxMyDatePickerDirective;

    public branches: any = [];
    public classes: any = [];
    public service: any = [];
    public noReset: boolean;

    public progressIcon: boolean = false;

    constructor(public b: BranchService, public pr: ProductRest, public ms: MembershipService) {
    }

    ngOnInit() {
        this.b.getList().subscribe(r => this.branches = r);
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

    submit(val) {
        this.progressIcon = true;
        this.ms.createMembership(val).subscribe(r => {
            this.progressIcon = false;
            this.modal.hide();
        });
    }

    onSelect(v) {
        this.selectedM = v;
    }


    new() {
        this.date1.clearDate();
        this.date2.clearDate();
        this.noReset = false;
        this.f.resetForm();
        this.m = {membership_price: [{}], membership_business_product: [{business_product: {}}]};
        this.modal.show();
        this.noReset = true;

    }

    edit(val) {
        this.f2.reset(val);
        this.edate1.writeValue(this.getDate(val.affected_from));
        this.edate2.writeValue(this.getDate(val.affected_to));
        this.mEModal.show()
    }

    getDate(d) {
        var date = moment(d, 'DD-MM-YYYY HH:mm:SS');
        return {
          //date: {day: date.get('D'), month: date.get('M') + 1, year: date.get('years') }
          date: {day:date.get('D'),month:date.get('M'),year:date.get('years')}
            //date: {year: date.get('years'), month: date.get('M') + 1, day: date.get('D')}
        }

    }

    editSubmit(val) {
        this.progressIcon = true;
        this.ms.editMembership(val).subscribe(r => {
            this.progressIcon = false;
            this.mEModal.hide();
        });
    }

    remove(id) {
        this.progressIcon = true;
        this.ms.removeMembership(id).subscribe(r => {
            this.progressIcon = false;
            this.mEModal.hide();
        });

    }
}

