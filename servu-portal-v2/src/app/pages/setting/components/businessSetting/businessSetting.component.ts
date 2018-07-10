///<reference path="../../../../../../node_modules/@types/lodash/index.d.ts"/>
import {AfterViewInit, Component, ViewChild} from "@angular/core";
import {NgForm, NgModel} from "@angular/forms";
import "style-loader!./businessSetting.scss";
import {AuthRest} from "../../../../restServices/authRest.service";
import {BusinessRest} from "../../../../restServices/businessRest.service";
import {BranchSettingService} from "./businessSetting.service";
import {forEach} from "@angular/router/src/utils/collection";
import * as _ from "lodash";

@Component({
    selector: "businessSetting",
    templateUrl: "businessSetting.html"
})
export class BusinessSetting implements AfterViewInit {

    public items: Array<any> = [];
    public zones: Array<any> = [];
    @ViewChild('f') form: NgForm;
    @ViewChild('f2') form_gateway_update: NgForm;
    @ViewChild('country') country: NgModel;
    public payment_gateway_list :any = [];
    public payment_method_list :any = [];
    public payment_method :any = "CASH" ;
    public business_payment_method_list :any = [] ;
    public business_payment_gateway_list :any = [] ;
    @ViewChild('paymentmodal') payment_modal;
    @ViewChild('paymentgatewaymodal') payment_gateway_modal;
    @ViewChild('editpaymentgatewaymodal') editpaymentgatewaymodal;
    @ViewChild('confirmpopup1') confirmpopup1;
    @ViewChild('confirmpopup2') confirmpopup2;

    public business_setting_loader: boolean;
    public payment_method_loader: boolean;
    public payment_gateway_loader: boolean;
    public payment_gateway_update_loader: boolean;
    public loading: boolean;

    public payment_gateway_id :any;
    public payment_gateway_key :any=[];
    public delete_method_value : any;
    constructor(public as: AuthRest, public br: BusinessRest, public bs:BranchSettingService) {
        this.business_setting_loader = true;
        this.br.getBusinessInfo().subscribe(r => {
          this.business_setting_loader = false;
          this.form.reset(r.data);
        });

        this.as.getCountry().subscribe(l => {
            this.items = l.data;
        });

      this.getBusinessPaymentMethod();

      this.getBusinessPaymentGateway();
    }

    ngAfterViewInit(): void {

        this.country.valueChanges.subscribe(v => {
            if (v) {
                this.as.getZone(v).subscribe(z => {
                    this.zones = z.data;
                });
            }
        });
    }

    update(val) {
        this.business_setting_loader = true;
        this.br.updateBusinessInfo(val).subscribe(r => {
          this.business_setting_loader = false;

        });
    }

    getBusinessPaymentGateway()
    {
      this.payment_gateway_loader = true;

      this.bs.getBusinessPaymentGateway().subscribe(r => {
        this.business_payment_gateway_list = r;
        this.getPaymentGateway();
        this.payment_gateway_loader = false;

      });
    }
    createBusinessPaymentGateway(val)
    {
      this.bs.createBusinessPaymentGateway(val).subscribe(r => {
      });
    }
    editBusinessPaymentGateway(value)
    {
      this.payment_gateway_id = value.id;
      this.payment_gateway_key = JSON.parse(value.configurations);
      this.editpaymentgatewaymodal.show();
    }
    updateBusinessPaymentGateway(val)
    {
      // console.log(val);
      this.payment_gateway_update_loader = true;
      this.bs.updateBusinessPaymentGateway(val).subscribe(r => {
      this.payment_gateway_update_loader = false;
      this.editpaymentgatewaymodal.hide();

      });
    }
    deleteBusinessPaymentGateway(val)
    {
      this.delete_method_value = val;
      this.confirmpopup1.show();
      // this.payment_gateway_loader = true;
      //
      // this.bs.deleteBusinessPaymentGateway(val).subscribe(r => {
      //   this.payment_gateway_loader = false;
      // });
    }
    after_confirm_deleteBusinessPaymentGateway()
    {

      this.payment_gateway_loader = true;

      this.confirmpopup1.hide();

      this.bs.deleteBusinessPaymentGateway(this.delete_method_value).subscribe(r => {
        this.payment_gateway_loader = false;
      });
    }






    getBusinessPaymentMethod()
    {
      this.payment_method_loader = true;
      this.bs.getBusinessPaymentMethod().subscribe(r => {
        this.business_payment_method_list = r;
        this.getPaymentMethod();
        this.payment_method_loader = false;
      });
    }
    createBusinessPaymentMethod(val)
    {
      this.bs.createBusinessPaymentMethod(val).subscribe(r => {
      });
    }

    updateBusinessPaymentMethod(val)
    {
      this.payment_method_loader = true;
      this.bs.updateBusinessPaymentMethod(val).subscribe(r => {
        this.payment_method_loader = false;

      });
    }
    deleteBusinessPaymentMethod(val)
    {

      this.delete_method_value = val;
      this.confirmpopup2.show();
      // this.bs.deleteBusinessPaymentMethod(val).subscribe(r => {
      //   this.payment_method_loader = true;
      // });
    }

    after_confirm_deleteBusinessPaymentMethod()
    {
      this.payment_method_loader = true;
      this.confirmpopup2.hide();
      this.bs.deleteBusinessPaymentMethod(this.delete_method_value).subscribe(r => {
        this.payment_method_loader = false;
      });
    }




    getPaymentMethod() {
      this.as.getPaymentMethod().subscribe(r => {
        this.payment_method_list = r.data;
        var remaining_payment_method: any = [];
        for (var i= 0 ;i< this.business_payment_method_list.length ; i++)
        {
          remaining_payment_method.push(_.filter(this.payment_method_list, {id: this.business_payment_method_list[i].payment_method.id}));
        }
        // this.payment_method_list = remaining_payment_method;


      });
    }

    getPaymentGateway() {
      this.as.getPaymentGateway().subscribe(r => {
        this.payment_gateway_list = r.data;
        var remaining_payment_method: any = [];
        for (var i= 0 ;i< this.business_payment_gateway_list.length ; i++)
        {
          remaining_payment_method.push(_.filter(this.payment_gateway_list, {id: this.business_payment_gateway_list[i].payment_gateway.id}));
        }
        // this.payment_gateway_list = remaining_payment_method;
        // console.log(this.payment_gateway_list);

      });
    }

    addPaymentMethod()
    {
      this.payment_modal.show();
      // this.getPaymentMethod();
    }

    addPaymentGateway()
    {
      this.payment_gateway_modal.show();
      // this.getPaymentGateway();
    }

    submitPaymentGateway(val)
    {
      this.loading = true;
      this.bs.createBusinessPaymentGateway(val).subscribe(r=>{
        this.loading = false;
        this.payment_gateway_modal.hide();
      });
    }

    submitPaymentMethod(val)
    {
      this.loading = true;
      this.bs.createBusinessPaymentMethod(val).subscribe(r=>{
        this.loading = false;
        this.payment_modal.hide();

      });

    }


}
