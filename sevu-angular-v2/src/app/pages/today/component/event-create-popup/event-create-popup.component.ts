import {Component, OnInit, ViewChild} from "@angular/core";
import * as moment from "moment";
import {extendMoment} from "moment-range";
import {ModalDirective} from "ngx-bootstrap";
import {IMyDateModel, IMyOptions} from "ngx-mydatepicker";
import {StripeService} from "../../../../stripe.service";
import {CustomerService} from "../../../customers/customer.service";
import {ProductListComponent} from "../../../product/components/common/product-list/product-list.component";
import {ProductService} from "../../../product/product.service";
import {ProviderService} from "../../../provider/provider.service";
import {EventService} from "../../event.service";

const momentR = extendMoment(moment);

@Component({
    selector: 'app-event-create-popup',
    templateUrl: './event-create-popup.component.html',
    styleUrls: ['./event-create-popup.component.scss']
})
export class EventCreatePopupComponent implements OnInit {

    @ViewChild('eventCreateModal') m: ModalDirective;
    @ViewChild('plist') plist: ProductListComponent;

    public providers: any = [];
    public sService: string = '';
    public customers: any = [];
    public sCustomer: any = {};
    private selectedDate: any = moment();

    public sProvider: any = '';
    public datepickerModal: any = {
        date: {
            year: this.selectedDate.year(),
            month: this.selectedDate.month() + 1,
            day: this.selectedDate.date()
        }
    };
    public totalTime: number;
    public selectedSlot: any;
    private sloteLoading: boolean;
    public products: any = [];
    public customerModal: any = '';
    public error: string = '';

    constructor(public cs: CustomerService,
                public ps: ProductService,
                public es: EventService,
                public pros: ProviderService,
                public stripe: StripeService) {
        cs.getList().subscribe(l => {
            this.customers = l;
        });

    }

    public myOptions: IMyOptions = {
        alignSelectorRight: true
    };

    onProductSelect(p) {
        this.products = p;
        if (p) {
            this.totalTime = 0;
            p.forEach(r => {
                this.totalTime += r.duration;
            });
            this.sService = p.map(r => {
                return r.name
            }).join(', ');

            this.ps.getProductStaff(p.map(r => {
                return r.id
            }).join(",")).subscribe((l: any) => {
                this.providers = l;
                this.dateSelect(new Date());
            });

        }
    }

    selectProvider(providerID) {
        if (providerID) {
            this.loadSlots({date: moment()}, providerID);
        }
    }

    onCustomerSelect(val) {
        this.sCustomer = val;
    }

    public weekDates: any = [];

    onDateChanged(date: IMyDateModel, providerID: any) {
        this.loadSlots({date: moment(date.jsdate)}, providerID);
        this.dateSelect(date.jsdate);
    }

    dateSelect(d: any) {
        this.weekDates = [];
        var cDate = moment(d).startOf("isoWeek");
        for (let i = 0; i < 7; i++) {
            this.weekDates.push({name: cDate.format("D"), date: cDate.clone()});
            cDate.add(1, 'day');

        }

    }

    loadSlots(date: any, providerID: any) {
        this.selectedDate = date.date;
        this.sloteLoading = true;
        this.es.getBusySlot(date.date, providerID).subscribe((r: any) => {
            var schedule = r.data.user_schedule;
            if (date.date.isBefore(moment())) {
                schedule.open_at = moment().format("HH:mm:SS");
            }
            this.createSlots(`${date.date.format('YYYY-MM-DD')} ${schedule.open_at}`, `${date.date.format('YYYY-MM-DD')} ${schedule.close_at}`, r.data.busy_slot);
            this.sloteLoading = false;
        });
    }

    public slots: any = [];

    private createSlots(openAt: any, closeAt: any, busy_slot: any) {
        this.slots = [];
        var openAtM = moment(openAt, "YYYY-MM-DD HH:mm:SS");
        var closeAtM = moment(closeAt, "YYYY-MM-DD HH:mm:SS");
        while (openAtM.isBefore(closeAtM)) {
            if (this.canAdd(openAtM, openAtM.clone().add(this.totalTime, 'minute'), busy_slot)) {
                this.slots.push({date: openAtM.clone(), name: openAtM.format("LT")});
            }
            openAtM.add(this.totalTime, 'minute');
        }
    }

    private canAdd(start: moment.Moment, end: moment.Moment, busy_slot: [any]) {
        var canAdd = true;
        var slotRange = momentR.range(start, end);
        busy_slot.forEach((r: any) => {
            let b_start = moment(r.started_at, "YYYY-MM-DD HH:mm:SS");
            let b_end = moment(r.ended_at, "YYYY-MM-DD HH:mm:SS");
            let bRange = momentR.range(b_start, b_end);
            if (slotRange.overlaps(bRange)) {
                canAdd = false;
            }
        });
        return canAdd;
    }

    public selectSlot(time) {
        this.selectedSlot = time;
    }

    public createEvent() {
        this.error = '';
        this.es.createEvent({
            user_id: this.sProvider,
            product_ids: this.products.map(r => {
                return r.id
            }).join(","),
            start_at: this.selectedSlot.format("YYYY-MM-DD HH:mm:SS"),
            customer_id: this.sCustomer.id,
        }).subscribe(r => {
            this.m.hide();
        }, e => {
            this.error = e.description;
        });

    }


    ngOnInit() {
    }

    createNew() {
        this.plist.selectedList = [];
        this.error = '';
        this.customerModal = '';
        this.providers = [];
        this.sService = '';
        this.sCustomer = {};
        this.selectedDate = moment();
        this.sProvider = '';
        this.datepickerModal = {
            date: {
                year: this.selectedDate.year(),
                month: this.selectedDate.month() + 1,
                day: this.selectedDate.date()
            }
        };
        this.totalTime = 0;
        this.selectedSlot = null;
        this.sloteLoading = false;
        this.products = [];
        this.m.show();
    }

}
