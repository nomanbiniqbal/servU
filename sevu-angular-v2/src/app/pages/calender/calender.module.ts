import {CommonModule} from "@angular/common";

import {NgModule} from "@angular/core";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {NgaModule} from "../../theme/nga.module";
import {CalendarService} from "./calendar.service";

import {Calender} from "./calender.component";
import {routing} from "./calender.routing";
import {EventService} from "../today/event.service";
import {ProviderService} from "../provider/provider.service";
import {EventCreatePopupComponent} from "app/pages/calender/component/event-create-popup/event-create-popup.component";
import {CustomerGlobalModule} from "app/pages/customers/customer-global.module";
import {AccordionModule, TabsModule, ModalModule, TypeaheadModule} from "ngx-bootstrap";
import {ProductGlobalModule} from "../product/product-global.module";
import {NgxMyDatePickerModule} from "ngx-mydatepicker";


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
        NgxMyDatePickerModule,
        CustomerGlobalModule.forRoot(),
        routing
    ],
    declarations: [
        Calender,
        EventCreatePopupComponent,
    ],
    providers: [
        CalendarService,
        EventService,
        ProviderService,
    ]

})
export class calenderModule {
}
