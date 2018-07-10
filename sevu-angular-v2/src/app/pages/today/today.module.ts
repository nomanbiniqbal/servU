import {CommonModule} from "@angular/common";
import {NgModule} from "@angular/core";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {AccordionModule, ModalModule, TabsModule, TypeaheadModule} from "ngx-bootstrap";
import {NgxMyDatePickerModule} from "ngx-mydatepicker";
import {NgaModule} from "../../theme/nga.module";
import {CustomerGlobalModule} from "../customers/customer-global.module";
import {CustomerService} from "../customers/customer.service";
import {ProductGlobalModule} from "../product/product-global.module";
import {ProviderService} from "../provider/provider.service";
import {CheckinListComponent} from "./component/checkin-list/checkin-list.component";
import {CheckoutListComponent} from "./component/checkout-list/checkout-list.component";
import {EventCheckoutPopupComponent} from "./component/event-checkout-popup/event-checkout-popup.component";
import {EventCreatePopupComponent} from "./component/event-create-popup/event-create-popup.component";
import {EventService} from "./event.service";
import {Today} from "./today.component";
import {routing} from "./today.routing";
import { PaymentPopupComponent } from './component/payment-popup/payment-popup.component';
import {Ng2DragDropModule} from "ng2-drag-drop";
import { EventDetailPopupComponent } from './component/event-detail-popup/event-detail-popup.component';


@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        AccordionModule.forRoot(),
        ModalModule.forRoot(),
        TabsModule.forRoot(),
        FormsModule,
        NgaModule,
        ProductGlobalModule.forRoot(),
        TypeaheadModule.forRoot(),
        Ng2DragDropModule,
        NgxMyDatePickerModule,
        CustomerGlobalModule.forRoot(),
        routing,
    ],
    declarations: [
        Today,
        CheckinListComponent,
        CheckoutListComponent,
        EventCreatePopupComponent,
        EventCheckoutPopupComponent,
        PaymentPopupComponent,
        EventDetailPopupComponent,
    ],
    providers: [
        CustomerService,
        EventService,
        ProviderService,

    ]


})
export class todayModule {
}
