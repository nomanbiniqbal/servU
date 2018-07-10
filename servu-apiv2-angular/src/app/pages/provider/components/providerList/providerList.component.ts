import {Component} from "@angular/core";
import "style-loader!./providerList.scss";
import {ProviderService} from "../../provider.service";

@Component({
  selector: 'provider-list',
  templateUrl: './providerList.html'
})
export class ProviderList {
  private list: (any)[];

  constructor(public _providersService: ProviderService) {
  }

  ngOnInit() {
    this.list = this._providersService.getData();
  }
}
