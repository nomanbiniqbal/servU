import {Component, EventEmitter, Output} from "@angular/core";
import * as _ from "lodash";
import "style-loader!./customerList.scss";
import {CustomerService} from "../../customer.service";


@Component({
    selector: 'customer-list',
    templateUrl: './customerList.html'
})
export class CustomerList {
    public list: (any)[];
    public selected = {};
    s = '';
    @Output() onSelect = new EventEmitter<any>();
    public loading: boolean;
    public listOrignal: any;

    constructor(public _providersService: CustomerService) {
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
        this._providersService.getList().subscribe((list: any) => {
            this.list = this.listOrignal = list.length && list;
            this.loading = false;
        });
    }
}
