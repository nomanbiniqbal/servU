import {Component, ViewChild} from "@angular/core";
import {NgForm} from "@angular/forms";
import {ModalDirective} from "ngx-bootstrap";
import "style-loader!./customer.scss";
import {CustomerService} from "../../customer.service";

@Component({
    selector: 'popup-customer',
    templateUrl: './customer.html'

})
export class PupupCustomer {
    public errors = [];
    public progressbar: boolean = false;
    public ec: any = {};
    public switch = true;
    @ViewChild('lgModal') model: ModalDirective;
    @ViewChild('f') form: NgForm;
    public mask = ['(', /[1-9]/, /\d/, /\d/, ')', '-', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/];


    constructor(public _cs: CustomerService) {
    }

    public customerFormSubmit(val: any) {
        this.progressbar = true;
        if (this.ec.id != null) {
            this._cs.update(val).subscribe((result) => {
                this.model.hide();
            }, (errors: any) => {
                this.progressbar = false;
                this.errors = errors.description;
            });
        }
        else {
            this.create_customer(val);
        }
    }

    public create_customer(val: any) {

        this._cs.addNew(val).subscribe((result) => {
            this.model.hide();
        }, (errors: any) => {
            this.errors = errors.description;
        });


    }

    public delete_customer(id) {

        this._cs.delete(id).subscribe((result) => {
            this.model.hide();
        }, (errors: any) => {
            this.errors = errors.description;
        });


    }


    public create() {
        this.ec = {};
        this.form.resetForm();
        this.switch = false;

        this.model.show();

    }

    public edit(customer) {
        this.ec = customer;
        this.model.show();
    }

    public disablebutton() {
        if (this.form.valid) {
            return true;
        }
        else {
            return false;
        }
    }

}
