import {Component, Input} from "@angular/core";
import * as _ from "lodash";
import "style-loader!./serviceProviderList.scss";
import {AuthRest} from "../../../../../../restServices/authRest.service";
import {ProviderService} from "../../../../../provider/provider.service";
import {ProductService} from "../../../../product.service";
@Component({
    selector: 'service-provider-list',
    templateUrl: './serviceProviderList.html'
})
export class ServiceProviderList {
    public staffList: any = [];
    public _id: any;
    public allList: any = [];
    public filterList: any = [];
    public loading: boolean;

    @Input()
    set servicId(id) {
        if (id) {
            this.staffList = [];
            this._id = id;
            this.loading = true;

            this._ss.getProductStaff(id).subscribe((l: any) => {
                this.staffList = _.filter(l, (v: any) => {
                    return _.find(v.business_user_product, {business_product_id: this._id});
                });
                this.loading = false;
            });
        }
    }

    constructor(public _ss: ProductService, public ps: ProviderService, public ar: AuthRest) {
        this.ps.getList(ar.getBranchId()).subscribe((list: any) => {
            list = _.filter(list, (r: any) => {
                return r.business_user.length > 0;
            });
            this.filterList = this.allList = list;
        });
    }

    searchList(s) {
        if (s) {
            this.filterList = _.filter(this.allList, (o: any) => {
                return _.startsWith(_.lowerCase(o.name), _.lowerCase(s));
            });
        } else {
            this.filterList = this.allList;
        }

    }

    added(staff) {
        this._ss.addProductStaff({
            product_id: this._id,
            business_user_id: staff.id
        }).subscribe((l: any) => {
        });
    }

    remove(staff) {
        var product: any = _.find(staff.business_user_product, {business_product_id: this._id});
        this._ss.deleteProductStaff(product).subscribe(r => {

        });
    }

    isStaff(staff) {
        return false;
        // return _.find(staff.business_user_product, {business_product_id: this._id});
    }

}
