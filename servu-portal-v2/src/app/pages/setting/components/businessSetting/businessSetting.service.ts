import {BusinessRest} from "../../../../restServices/businessRest.service";
import {AuthRest} from "../../../../restServices/authRest.service";
import {Subject} from "rxjs";
import {Injectable} from "@angular/core";
import * as _ from "lodash";
@Injectable()
export class BranchSettingService {
  public _data = [];

  public subject = new Subject<Object>();

  public gateway_data = [];

  public gateway_subject = new Subject<Object>();

  public payment_gateway_list :any = ["hello"];
  public payment_method_list :any = ["hello"];
  constructor(public as: AuthRest, public br: BusinessRest) {

  }

  getBusinessPaymentGateway()
  {
    this.br.getBusinessPaymentGateway().subscribe(r => {
      this.gateway_data = r.data;
      this.gateway_subject.next(this.gateway_data);
    });
    return this.gateway_subject.asObservable();

  }
  createBusinessPaymentGateway(val)
  {
    return this.br.createBusinessPaymentGateway(val).do(r => {
      this.gateway_data.push(r.data);
      this.gateway_subject.next(this.gateway_data);
    });
  }
  updateBusinessPaymentGateway(val)
  {
    return this.br.updateBusinessPaymentGateway(val).do(r => {
      var number = _.findIndex(this.gateway_data, {"id": r.data.id});
      this.gateway_data[number] = r.data;
      this.gateway_subject.next(this.gateway_data);
    });
  }
  deleteBusinessPaymentGateway(val)
  {
    return this.br.deleteBusinessPaymentGateway(val).do(r =>{
      var number = _.findIndex(this.gateway_data, {"id": val.id});
      this.gateway_data.splice(number, 1);
      this.gateway_subject.next(this.gateway_data);
    });
  }




  getBusinessPaymentMethod() {
    this.br.getBusinessPaymentMethod().subscribe(r => {
      this._data = r.data;
      this.subject.next(this._data);
    });
    return this.subject.asObservable();

  }
  createBusinessPaymentMethod(val)
  {
    return this.br.createBusinessPaymentMethod(val).do(r => {
      this._data.push(r.data);
      this.subject.next(this._data);
    });
  }
  updateBusinessPaymentMethod(val)
  {
    return this.br.updateBusinessPaymentMethod(val).do(r => {
      var number = _.findIndex(this._data, {"id": r.data.id});
      this._data[number] = r.data;
      this.subject.next(this._data);
    });
  }
  deleteBusinessPaymentMethod(val)
  {
    return this.br.deleteBusinessPaymentMethod(val).do(r => {
      var number = _.findIndex(this._data, {"id": val.id});
      this._data.splice(number, 1);
      this.subject.next(this._data);
    });
  }




  getPaymentMethod()
  {
    return this.as.getPaymentMethod().subscribe(r => {
      this.payment_method_list.push(r.data);
    });
  }

  getPaymentGateway()
  {
    return this.as.getPaymentGateway().subscribe(r => {
      this.payment_gateway_list.push(r.data);
    });
  }
}
