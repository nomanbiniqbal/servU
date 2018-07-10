import {CommonModule} from "@angular/common";
import {ModuleWithProviders, NgModule} from "@angular/core";
import {FormsModule} from "@angular/forms";
import {AccordionModule, ModalModule} from "ngx-bootstrap";
import {NgaModule} from "../../theme/nga.module";
import {PupupCustomer} from "./components/customerPopup/customer.component";
import {CustomerService} from "./customer.service";
import {TextMaskModule} from "angular2-text-mask";

@NgModule({
    imports: [
        CommonModule,
        NgaModule,
        FormsModule,
        ModalModule.forRoot(),
        AccordionModule.forRoot(),
        TextMaskModule,
    ],
    declarations: [PupupCustomer],
    providers: [
        CustomerService,
    ],
    exports: [PupupCustomer],

})
export class CustomerGlobalModule {
    static forRoot(): ModuleWithProviders {
        return <ModuleWithProviders> {
            ngModule: CustomerGlobalModule,
        };
    }

}