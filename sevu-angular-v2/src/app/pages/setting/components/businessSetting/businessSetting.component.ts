import {AfterViewInit, Component, ViewChild} from "@angular/core";
import {NgForm, NgModel} from "@angular/forms";
import "style-loader!./businessSetting.scss";
import {AuthRest} from "../../../../restServices/authRest.service";
import {BusinessRest} from "../../../../restServices/businessRest.service";
import {BranchSettingService} from "./businessSetting.service";

@Component({
    selector: "businessSetting",
    templateUrl: "businessSetting.html"
})
export class BusinessSetting implements AfterViewInit {

    public items: Array<any> = [];
    public zones: Array<any> = [];
    @ViewChild('f') form: NgForm;
    @ViewChild('country') country: NgModel;
    public payment_gateway_list :any = [];
    public payment_method_list :any = [];
    public payment_method :any = "CASH" ;
    public business_payment_method_list :any = [] ;
    public business_payment_gateway_list :any = [] ;
    @ViewChild('paymentmodal') payment_modal;
    @ViewChild('paymentgatewaymodal') payment_gateway_modal;

    public loading: boolean;
    constructor(public as: AuthRest, public br: BusinessRest, public bs:BranchSettingService) {
        this.loading = true;
        this.br.getBusinessInfo().subscribe(r => {
          this.loading = false;
          this.form.reset(r.data);
        });

        this.as.getCountry().subscribe(l => {
            this.items = l.data;
        });

        this.getPaymentGateway();
        this.getPaymentMethod();
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
        this.br.updateBusinessInfo(val).subscribe(r => {
        });
    }

    getBusinessPaymentGateway()
    {
      this.bs.getBusinessPaymentGateway().subscribe(r => {
        this.business_payment_gateway_list = r;
      });
    }
    createBusinessPaymentGateway(val)
    {
      this.bs.createBusinessPaymentGateway(val).subscribe(r => {
      });
    }
    updateBusinessPaymentGateway(val)
    {
      this.bs.updateBusinessPaymentGateway(val).subscribe(r => {
      });
    }
    deleteBusinessPaymentGateway(val)
    {
      this.bs.deleteBusinessPaymentGateway(val).subscribe(r => {
      });
    }




    getBusinessPaymentMethod()
    {
      this.bs.getBusinessPaymentMethod().subscribe(r => {
        this.business_payment_method_list = r;
      });
    }
    createBusinessPaymentMethod(val)
    {
      this.bs.createBusinessPaymentMethod(val).subscribe(r => {
      });
    }
    updateBusinessPaymentMethod(val)
    {
      this.bs.updateBusinessPaymentMethod(val).subscribe(r => {
      });
    }
    deleteBusinessPaymentMethod(val)
    {
      this.bs.deleteBusinessPaymentMethod(val).subscribe(r => {
      });
    }




    getPaymentMethod() {
      this.loading = true;
      this.as.getPaymentMethod().subscribe(r => {
        this.loading = false;
        this.payment_method_list = r.data;
      });
    }

    getPaymentGateway() {
      this.loading = true;
      this.as.getPaymentGateway().subscribe(r => {
        this.loading = false;
        this.payment_gateway_list = r.data;
      });
    }

    addPaymentMethod()
    {
      this.payment_modal.show();
      this.getPaymentMethod();
    }

    addPaymentGateway()
    {
      this.payment_gateway_modal.show();
      this.getPaymentGateway();
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
