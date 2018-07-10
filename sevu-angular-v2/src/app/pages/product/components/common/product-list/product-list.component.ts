import {Component, EventEmitter, Input, OnInit, Output} from "@angular/core";
import * as _ from "lodash";
import "style-loader!./product-list.component.scss";
import {ProductService} from "../../../product.service";


@Component({
    selector: 'app-product-list',
    templateUrl: './product-list.component.html'

})
export class ProductListComponent implements OnInit {
    public selectedList: any = [];

    public list: any = [];
    public switch: boolean = true;

    public searchlist: (any)[];
    public searchlistresult: (any)[];
    public z: (any);
    s = '';
    @Input() type: string;
    @Input() multiple: boolean;

    @Output('select') _onSelect = new EventEmitter<any>();
    public loading: boolean;
    public listOrignal: any;

    constructor(public _ss: ProductService) {

    }

    ngOnInit() {
        this.loading = true;
        this._ss.getProduct(this.type).subscribe((list: any) => {
            this.loading = false;
            this.createSearchList(list);
            this.list = this.listOrignal = list.length && list;
            this.z = this.list;
        });

    }

    search(s) {
        this.switch = false;
        this.searchlistresult = _.filter(this.searchlist, (o: any) => {
            if (s) {
                return _.startsWith(_.lowerCase(o.productName), _.lowerCase(s));
            }
            this.switch = true;
            return true;
        });
    }

    serviceEdit() {
    }

    onSelect(item) {
        if (!this.multiple) {
            this.selectedList = [];
            this.selectedList.push(item);
            this._onSelect.emit(item);
        } else {
            var find = _.findIndex(this.selectedList, item);
            if (find >= 0) {
                this.selectedList.splice(find, 1);
            } else {
                this.selectedList.push(item);
            }
            this._onSelect.emit(this.selectedList);
        }
    }

    isSelected(id) {
        return _.findIndex(this.selectedList, {id: id}) >= 0;
    }

    private createSearchList(list: any) {
        this.searchlist = [];
        list.forEach((v: any) => {
            v.business_product.forEach((v2: any) => {
                this.searchlist.push({
                    id: v2.id,
                    productName: v2.name,
                    catName: v.name,
                });
            });
        });

    }
}
