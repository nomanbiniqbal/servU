import {CommonModule} from "@angular/common";
import {ModuleWithProviders, NgModule} from "@angular/core";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {AccordionModule, ModalModule, TypeaheadModule, TabsModule} from "ngx-bootstrap";
import {TextMaskModule} from "angular2-text-mask";
import {EventCreatePopupComponent} from "app/pages/today/component/event-create-popup/event-create-popup.component";
import {CustomerService} from "app/pages/customers/customer.service";
import {EventService} from "app/pages/today/event.service";
import {ProviderService} from "../provider/provider.service";
import {CustomerGlobalModule} from "app/pages/customers/customer-global.module";
import {NgxMyDatePickerModule} from "ngx-mydatepicker";
import {ProductGlobalModule} from "app/pages/product/product-global.module";
import {NgaModule} from "app/theme/nga.module";

@NgModule({
  imports: [
    TabsModule.forRoot(),
    ProductGlobalModule.forRoot(),
    TypeaheadModule.forRoot(),
    NgxMyDatePickerModule,
    CommonModule,
    NgaModule,
    FormsModule,
    ModalModule.forRoot(),
    AccordionModule.forRoot(),
    CustomerGlobalModule.forRoot(),
    TextMaskModule,
  ],
  declarations: [
    EventCreatePopupComponent
  ],
  providers: [
    CustomerService,
    EventService,
    ProviderService,
  ],
  exports: [EventCreatePopupComponent],

})
export class TodayGlobalModule {
  static forRoot(): ModuleWithProviders {
    return <ModuleWithProviders> {
      ngModule: TodayGlobalModule ,
    };
  }

}