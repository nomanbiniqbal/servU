import {ModuleWithProviders, NgModule} from '@angular/core';
import {ProviderPopup} from "./providerPopup/providerPopup.component";
import {CommonModule} from "@angular/common";
import {NgaModule} from "../theme/nga.module";
import {FormsModule} from "@angular/forms";
import {ProviderService} from "../pages/provider/provider.service";
import {ModalModule, TabsModule} from "ngx-bootstrap";
import {UiSwitchModule} from "angular2-ui-switch";
import {TextMaskModule} from "angular2-text-mask";
import { PaymentPopupComponent } from './payment-popup/payment-popup.component';
import {BusinessRest} from "../restServices/businessRest.service";

@NgModule({
    imports: [
        CommonModule,
        NgaModule,
        FormsModule,
        ModalModule.forRoot(),
        TabsModule.forRoot(),
        UiSwitchModule,
        TextMaskModule

    ],
    exports: [ProviderPopup,PaymentPopupComponent],
    declarations: [
        ProviderPopup,
        PaymentPopupComponent
    ],
    providers: [
        ProviderService,
        BusinessRest,

    ],
})
export class PopUpModule {
    static forRoot(): ModuleWithProviders {
        return <ModuleWithProviders> {
            ngModule: PopUpModule,
        };
    }
}
