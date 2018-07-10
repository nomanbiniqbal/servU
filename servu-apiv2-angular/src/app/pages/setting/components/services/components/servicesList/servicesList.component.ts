import {Component} from "@angular/core";
import {ServicesService} from "../../services.service";
@Component({
  selector: 'services-list',
  templateUrl: 'servicesList.html'
})
export class ServicesList {
  private list=[];

  constructor(public _ss:ServicesService) {
    this.list = _ss.getServices();
  }

}
