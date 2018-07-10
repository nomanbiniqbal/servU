import {Component, ViewChild} from "@angular/core";
import {NgForm} from "@angular/forms";
import {ProviderService} from "app/pages/provider/provider.service";
import {ModalDirective} from "ngx-bootstrap";
import "style-loader!./providerPopup.scss";
import {GlobalState} from "../../global.state";
import {AuthRest} from "../../restServices/authRest.service";
import {forEach} from "@angular/router/src/utils/collection";

@Component({
    selector: 'provider-popup',
    templateUrl: './providerPopup.html'
})
export class ProviderPopup {
    public progress: boolean = false;
    public mask = ['(', /[1-9]/, /\d/, /\d/, ')', '-', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/];
    public errors = [];
    public noReset = false;
    public es: any = {};
    public es_data: any = [];
    public breaks:any={};


    @ViewChild('lgModal') model: ModalDirective;
    @ViewChild('providerEditModal') providerEditModal: ModalDirective;
    @ViewChild('f') form: NgForm;
    public countries: any = [];

    constructor(public _cs: ProviderService, public ar: AuthRest, public gs: GlobalState) {
        this.ar.getCountry().subscribe(l => this.countries = l.data);
    }

    ngAfterViewInit() {
    }

    initProviderSchedule() {

        this.es = {
          user_id: "",
            email: "",
            name: "",
            password: "",
            phone_number: "",
            phone_country_code: "",
            address: "",
            user_schedule: [
                {week_day_id: 1, open_at: "09:00", close_at: "17:00", is_open: true, user_schedule_break: []},
                {week_day_id: 2, open_at: "09:00", close_at: "17:00", is_open: true, user_schedule_break: []},
                {week_day_id: 3, open_at: "09:00", close_at: "17:00", is_open: true, user_schedule_break: []},
                {week_day_id: 4, open_at: "09:00", close_at: "17:00", is_open: true, user_schedule_break: []},
                {week_day_id: 5, open_at: "09:00", close_at: "17:00", is_open: true, user_schedule_break: []},
                {week_day_id: 6, open_at: "09:00", close_at: "17:00", is_open: true, user_schedule_break: []},
                {week_day_id: 7, open_at: "09:00", close_at: "17:00", is_open: true, user_schedule_break: []},

            ]
        };
    }

    public formSubmit(val: any) {
        this.progress = true;
        if (val.user_id) {
            this._cs.addNew(val).subscribe((r) => {
                this.progress = false;
                this.model.hide();
            });
            return;
        }
        this._cs.addNew(val).subscribe((result) => {
            if (this.ar.isStartUp) {
                this.gs.notifyDataChanged("popover.hide", 1);
                this.gs.notifyDataChanged("popover.show", 2);
            }
            this.progress = false;
            this.model.hide();
        }, (errors: any) => {
            this.errors = errors.description;
            this.progress = false;
        });
    }


    public create(branch_user_schedule_) {
      this.noReset = true;
      this.form.reset();
      this.noReset = false;
      this.initProviderSchedule();
      this.es.user_schedule =  branch_user_schedule_.map(r=>{
        r.user_schedule_break = [];
        return r;
      });

      console.log(this.es);
      this.model.show();
    }

    public edit(customer) {
      Object.assign(this.es, customer);
      this.providerEditModal.show();
    }


  public editWholeProvider(customer,branch_user_schedule_) {
    this.es.user_schedule =  branch_user_schedule_.map(r=>{
      r.user_schedule_break = [];
      return r;
    });
    this.es.email = customer.email;
    this.es.name = customer.name;
    this.es.user_id = customer.id;
    this.model.show();
  }

}
