import {Component, ViewChild} from "@angular/core";
import {NgModel} from "@angular/forms";
import * as _ from "lodash";
import {ModalDirective} from "ngx-bootstrap";
import "style-loader!./branch.scss";
import {AuthRest} from "../../../../restServices/authRest.service";
import {BranchService} from "./branch.service";


@Component({
    selector: "branch",
    templateUrl: "branch.html"
})
export class Branch {


    @ViewChild('branchEditModel') editModel: ModalDirective;
    @ViewChild('form') branchForm: NgModel;
    public branch: any;
    sBranch: any = {};
    public errors: any = [];
    public searchingZones: boolean;
    public countries: any = [];
    public zones: any = [];
    public mask = ['(', /[1-9]/, /\d/, /\d/, ')', '-', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/];
    @ViewChild('country') country: NgModel;
    private progressbar: boolean;

    constructor(public _bs: BranchService, public _ar: AuthRest) {
        this.branchInit();
    }

    branchInit() {
        this.sBranch = {
            zone_id: "",
            business_location_schedule: [
                {week_day_id: 1, open_at: "09:00", close_at: "17:00", is_open: true},
                {week_day_id: 2, open_at: "09:00", close_at: "17:00", is_open: true},
                {week_day_id: 3, open_at: "09:00", close_at: "17:00", is_open: true},
                {week_day_id: 4, open_at: "09:00", close_at: "17:00", is_open: true},
                {week_day_id: 5, open_at: "09:00", close_at: "17:00", is_open: true},
                {week_day_id: 6, open_at: "09:00", close_at: "17:00", is_open: false},
                {week_day_id: 7, open_at: "09:00", close_at: "17:00", is_open: false},
            ]
        }
    }

    CreateBranch()
    {
     //this.branchForm.reset({product_type:'Branch'});
     this.editModel.show();

    }

    ngOnInit() {
        this._ar.getCountry().subscribe((result) => {
            this.countries = result.data;
        });
    }

    public create() {
        this.branchInit();
        this.editModel.show();
    }

    public onEdit(b: any) {
        this.sBranch = b;
        var predicate = {id: b.country_id};
        this.sBranch['country'] = _.find(this.countries, predicate)['nicename'];
        this.editModel.show();
    }

    public save(val) {
        this.progressbar = true;
        if (val.branch_id) {
            this._bs.edit(val).subscribe((r: any) => {
                this.select(r.data);
                this.editModel.hide();
            }, (e: any) => {
                this.progressbar = false;
                this.errors = e.description;
            });
        } else {
            this._bs.createNew(val).subscribe((r: any) => {
                this.progressbar = false;
                Object.assign(this.branch, r.data);
                this.editModel.hide();
            }, (e: any) => {
                this.progressbar = false;
                this.errors = e.description;
            });
        }
    }

    select(b: any) {
        this.branch = b;
    }

    public delete() {
        this.editModel.hide();
    }

    ngAfterViewInit(): void {

        this.country.valueChanges.subscribe(v => {
            if (v) {
                this.searchingZones = true;
                this._ar.getZone(v).subscribe(z => {
                    this.zones = z.data;
                    this.searchingZones = false;
                });
            }
        });
    }
}
