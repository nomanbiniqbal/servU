import {Component, ViewChild} from "@angular/core";
import {FormGroup} from "@angular/forms";
import "style-loader!./customer.scss";
import {CustomerService} from "./customer.service";
import {NgModel} from "@angular/forms";

@Component({
    selector: "customer",
    templateUrl: "./customer.html"
})
export class Customer {
    public selectedCustomer: any = {};
    public selectedCustomerNotes: any = {};
    public loading: boolean;
    @ViewChild('contactModel') contactModel;
    @ViewChild('addressModel') addressModel;
    @ViewChild('f') customerForm: NgModel;
    public cus: any = {};
    public customer: any = 0;
    public addressList: any = [];
    public contactList: any = [];

    public ad: any = {};
    public cn: any = {};

    constructor(public _cs: CustomerService) {
    }

    onSelect(sc) {
        this.loading = true;
        this.selectedCustomer = {};
        this._cs.getCustomerById(sc.id).subscribe(c => {
            this.selectedCustomer = c;
            this.loading = false;
            this.cus = c;
        });
    }

    // @Input()
    // set customer(p:any) {
    //   if (p && p.id) {
    //     this.cus = p;
    //     this.loadAddress(this.cus.id);
    //     this.loadContact(this.cus.id);
    //   }
    // }
    //
    // loadAddress(userId) {
    //   this._cs.getAddress(userId).subscribe((res: any) => {
    //     this.addressList = res;
    //   });
    // }
    //
    // loadContact(userId) {
    //   this._cs.getContact(userId).subscribe((res: any) => {
    //     this.contactList = res;
    //   });
    // }

    createCustomer(){
      this.addressModel.show();
      this.customerForm.reset({user_id:this.cus.id});


    }
    createContact(form: FormGroup) {
        // form.reset();
        // this.referesh_page();
        this.contactModel.show();
    }

    createAdress(form: FormGroup) {
        // form.reset();
        // this.referesh_page();
        this.addressModel.show();
    }

    editAddress(ad: any, form: FormGroup) {
        this.ad = ad;
        this.addressModel.show();
    }

    editContact(cn, form: FormGroup) {
        this.cn = cn;
        this.contactModel.show();
    }

    submitAddress(val, form: FormGroup) {
        if (val.address_id) {
            this._cs.editAddress(val).subscribe((r) => {
                this.addressModel.hide();
                form.reset();
                this.referesh_page();


            });
            return
        }
        this._cs.addAddress(val).subscribe((r) => {
            this.addressModel.hide();
            this.loading = true;
            this.selectedCustomer = {};
            form.reset();
            this.referesh_page();

        });
    }

    submitContact(val, form: FormGroup) {
        if (val.contact_id) {
            this._cs.editContact(val).subscribe((r) => {
                this.contactModel.hide();
                form.reset();
                this.referesh_page();

            });
            return
        }
        this._cs.addContact(val).subscribe((r) => {
            this.contactModel.hide();
            form.reset();
            this.referesh_page();
        });
    }

    deleteContact(id, userId) {
        this._cs.deletContact(id, userId).subscribe((r) => {
            this.contactModel.hide();
            this.referesh_page();
        });
    }

    deleteAddress(id) {
        this._cs.deletAddress(id).subscribe((r) => {
            this.addressModel.hide();
            this.referesh_page();
        });
    }

    referesh_page() {
        // this.loading=true;
        this.selectedCustomer = {};
        this._cs.getCustomerById(this.cus.id).subscribe(c => {
            this.selectedCustomer = c;
            // this.loading=false;
            this.cus = c;
        });
    }

}
