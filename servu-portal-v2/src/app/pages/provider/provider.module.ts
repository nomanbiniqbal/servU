import {CommonModule} from "@angular/common";
import {NgModule} from "@angular/core";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {TextMaskModule} from "angular2-text-mask";
import {UiSwitchModule} from "angular2-ui-switch";
import {DatepickerModule, ModalModule} from "ngx-bootstrap";
import {PopUpModule} from "../../popups/popUp.module";
import {NgaModule} from "../../theme/nga.module";
import {AdvanceSchedule} from "./components/advanceSchedule/advanceSchedule.component";
import {BasicSchedule} from "./components/basicSchedule";
import {GoogleCalenderList} from "./components/googleCalenderList/googleCalenderList.component";
import {ProviderDetail} from "./components/providerDetail/providerDetail.component";
import {ProviderList} from "./components/providerList/providerList.component";
import {Provider} from "./provider.component";
import {routing} from "./provider.routing";
import {ProviderService} from "./provider.service";


@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        FormsModule,
        NgaModule,
        PopUpModule,
        ModalModule.forRoot(),
        DatepickerModule.forRoot(),
        UiSwitchModule,
        TextMaskModule,
        routing
    ],
    declarations: [
        Provider,
        ProviderList,
        ProviderDetail,
        BasicSchedule,
        AdvanceSchedule,
        GoogleCalenderList,
    ],
    providers: [
        ProviderService,
    ]
})
export class ProviderModule {
}
