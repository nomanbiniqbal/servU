import {CommonModule} from "@angular/common";
import {NgModule} from "@angular/core";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {TodayGlobalModule} from "app/pages/today/today.global.module";
import {Ng2DragDropModule} from "ng2-drag-drop";
import {AccordionModule, ModalModule, TabsModule, TypeaheadModule} from "ngx-bootstrap";
import {NgxMyDatePickerModule} from "ngx-mydatepicker";
import {NgaModule} from "../../theme/nga.module";
import {CustomerGlobalModule} from "../customers/customer-global.module";
import {ProductGlobalModule} from "../product/product-global.module";
import {CheckinListComponent} from "./component/checkin-list/checkin-list.component";
import {CheckoutListComponent} from "./component/checkout-list/checkout-list.component";
import {EventCheckoutPopupComponent} from "./component/event-checkout-popup/event-checkout-popup.component";
import {EventDetailPopupComponent} from "./component/event-detail-popup/event-detail-popup.component";
import {PaymentPopupComponent} from "./component/payment-popup/payment-popup.component";
import {Today} from "./today.component";
import {routing} from "./today.routing";


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
        TodayGlobalModule.forRoot(),
        routing,
    ],
    declarations: [
        Today,
        CheckinListComponent,
        CheckoutListComponent,
        EventCheckoutPopupComponent,
        PaymentPopupComponent,
        EventDetailPopupComponent,
    ],

})
export class todayModule {
}
