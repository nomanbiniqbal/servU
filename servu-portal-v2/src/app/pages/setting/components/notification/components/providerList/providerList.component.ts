import {Component} from "@angular/core";
import "style-loader!./providerList.scss";
import {ProviderService} from "../../../../../provider/provider.service";


@Component({
    selector: 'notification-provider-list',
    templateUrl: 'providerList.html'
})
export class ProviderList {
    public list: (any)[];

    constructor(public _providersService: ProviderService) {
    }

    ngOnInit() {
        // this.list = this._providersService.getData();
    }
}
