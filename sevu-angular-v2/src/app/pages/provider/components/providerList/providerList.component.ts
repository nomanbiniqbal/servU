import {Component, EventEmitter, Output} from "@angular/core";
import * as _ from "lodash";
import "style-loader!./providerList.scss";
import {AuthRest} from "../../../../restServices/authRest.service";
import {ProviderService} from "../../provider.service";

@Component({
    selector: 'provider-list',
    templateUrl: './providerList.html'
})
export class ProviderList {

    public list: (any)[];
    public selected = {};
    s = '';
    @Output() onSelect = new EventEmitter<any>();
    public loading: boolean;
    public listOrignal: any;

    constructor(public _providersService: ProviderService, public _au: AuthRest) {

    }

    _onSelect(c) {
        this.selected = c;
        this.onSelect.emit(c);
    }

    search(s) {
        this.list = _.filter(this.listOrignal, (o: any) => {
            if (s) {
                return _.startsWith(_.lowerCase(o.name), _.lowerCase(s));
            }
            return true;
        });
    }

    ngOnInit() {
        this.loading = true;
        this._providersService.getList(this._au.getBranchId()).subscribe((list: any) => {

            list = _.filter(list, (r: any) => {
                return r.business_user.length > 0;
            });

            this.list = this.listOrignal = list.length && list;
            this.loading = false;
        });
    }

}
