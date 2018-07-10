import {Component, Input, OnInit, ViewChild} from "@angular/core";
import {ModalDirective} from "ngx-bootstrap";
import "style-loader!./providerDetail.scss";
import {ProviderService} from "../../provider.service";
import {NgModel} from "@angular/forms";
@Component({
    selector: 'provider-detail',
    templateUrl: './providerDetail.html'
})
export class ProviderDetail implements OnInit {
    public pro: any = {};
    public addressList: any = [];
    public contactList: any = [];
    public isEditAble = false;
    public ad: any = {};
    public cn: any = {};

    @ViewChild('addressModal') addressModel: ModalDirective;
    @ViewChild('contactModal') contactModel: ModalDirective;
    @ViewChild('f') addressModelform: NgModel;
    @ViewChild('cf') contactModelform: NgModel;

    constructor(public _ps: ProviderService) {
    }

    @Input()
    set provider(p: any) {
        if (p && p.id) {
            this.isEditAble = true;
            this.pro = p;
            this.loadAddress(this.pro.id);
            this.loadContact(this.pro.id);
        }
    }

    ngOnInit() {
    }

    loadAddress(userId) {
        this._ps.getAddress(userId).subscribe((res: any) => {
            this.addressList = res;
        });
    }

    loadContact(userId) {
        this._ps.getContact(userId).subscribe((res: any) => {
            this.contactList = res;
        });
    }

    createAddress() {
        this.ad = {};
        this.addressModel.show();
        // this.addressModelform.reset({user_id:this.pro.id});
    }

    editAddress(ad: any) {
        this.ad = ad;
        this.addressModel.show();
    }

  submitAddress(val) {
        if (val.address_id) {
            this._ps.editAddress(val).subscribe((r) => {
              this.addressModel.hide();
              // this.addressModelform.reset(val);
            });
            return;
        }
        this._ps.addAddress(val).subscribe((r) => {
          this.addressModel.hide();
          this.addressList = r.data;
          this.ad = r.data;
        });
    }
  submitContact(val) {
    if (val.contact_id) {
      this._ps.editContact(val).subscribe((r) => {
        this.contactModel.hide();

      });
      return;
    }
    this._ps.addContact(val).subscribe((r) => {
      this.contactModel.hide();
      this.contactList = r.data;
      this.cn = r.data;
    });
  }
    deleteAddress(id) {
        this._ps.deletAddress(id).subscribe((r) => {
          this.addressModel.hide();
          // this.addressModelform.reset();

        });
    }

    createContact() {
        this.cn = {};
        this.contactModel.show();
    }

    editContact(cn) {
        this.cn = cn;
        this.contactModel.show();
    }

    deleteContact(id, userId) {
        this._ps.deletContact(id, userId).subscribe((r) => {
          this.contactModel.hide();
        });
    }


}
