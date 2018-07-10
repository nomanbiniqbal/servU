import {CommonModule} from "@angular/common";
import {NgModule} from "@angular/core";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {UiSwitchModule} from "angular2-ui-switch";
import {ProductGlobalModule} from "app/pages/product/product-global.module";
import {NgaModule} from "app/theme/nga.module";
import {AccordionModule, ModalModule, PopoverModule, TabsModule, TypeaheadModule} from "ngx-bootstrap";
import {NgxMyDatePickerModule} from "ngx-mydatepicker";
import {PopUpModule} from "../../popups/popUp.module";
import {CustomerService} from "../customers/customer.service";
import {ClassComponent} from "./components/class/class.component";
import {ClassScheduleComponent} from "./components/class/components/class-schedule/class-schedule.component";
import {ClassSessionComponent} from "./components/class/components/class-session/class-session.component";
import {ClassesDetail} from "./components/class/components/classDetail/classDetail.component";
import {SessionCustomerComponent} from "./components/class/components/session-customer/session-customer.component";
import {CategoriesPopupComponent} from "./components/common/categories-popup/categories-popup.component";
import {NotificationComponent} from "./components/common/notification/notification.component";
import {ProductDetailComponent} from "./components/product/components/product-detail/product-detail.component";
import {ProductComponent} from "./components/product/product.component";
import {ServiceProviderList} from "./components/services/components/serviceProviderList/serviceProviderList.compnent";
import {ServicesDetail} from "./components/services/components/servicesDetail/servicesDetail.component";
import {ServicesComponent} from "./components/services/services.component";
import {Product} from "./product.component";
import {routing} from "./product.routing";


@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        TabsModule.forRoot(),
        NgaModule,
        AccordionModule.forRoot(),
        TypeaheadModule.forRoot(),
        ModalModule.forRoot(),
        PopoverModule.forRoot(),
        PopUpModule,
        UiSwitchModule,
        ReactiveFormsModule,
        NgxMyDatePickerModule,
        ProductGlobalModule.forRoot(),

        routing
    ],
    declarations: [
        Product,
        ServicesComponent,
        ProductComponent,
        ClassComponent,
        ServiceProviderList,
        ServicesDetail,
        ClassesDetail,
        ClassScheduleComponent,
        ClassSessionComponent,
        ProductDetailComponent,
        CategoriesPopupComponent,
        SessionCustomerComponent,
        NotificationComponent,

    ],
    providers: [CustomerService]
})
export class ProductModule {

}
