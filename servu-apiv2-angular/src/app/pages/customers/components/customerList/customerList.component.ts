/**
 * Created by Mian on 3/2/2017.
 */
import {Component} from "@angular/core";
import "style-loader!./customerList.scss";
import {ProviderService} from "../../provider.service";

@Component({
  selector: 'customer-list',
  templateUrl: './customerList.html'
})
export class CustomerList {
  private list: (any)[];

  constructor(public _providersService: ProviderService) {
  }

  ngOnInit() {
    this.list = this._providersService.getData();
  }
}
