import {Component, Input, OnInit} from "@angular/core";
import {CustomerService} from "../../../../../customers/customer.service";
import {ProductService} from "../../../../product.service";

@Component({
    selector: 'app-session-customer',
    templateUrl: './session-customer.component.html',
    styleUrls: ['./session-customer.component.scss']
})
export class SessionCustomerComponent implements OnInit {
    _sessionId: any;
    public customers: any = [];
    public allCustomers: any = [];
    public loading: boolean;

    @Input() set sessionId(id) {
        this.customers = [];
        if (id) {
            this._sessionId = id;
            this.loading = true;
            this._sp.getParticipants(id).subscribe((l) => {
                this.loading = false;
                this.customers = l;
            });
        }
    }

    constructor(public _sp: ProductService, public _cs: CustomerService) {
    }

    ngOnInit() {
        this._cs.getList().subscribe(l => this.allCustomers = l);
    }

    addParticipant(item) {
        this._sp.addParticipant(item.id, this._sessionId).subscribe(l => {
        });
    }

}
