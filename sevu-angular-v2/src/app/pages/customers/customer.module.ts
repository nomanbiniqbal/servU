import {CommonModule} from "@angular/common";
import {NgModule} from "@angular/core";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {TextMaskModule} from "angular2-text-mask";
import {UiSwitchModule} from "angular2-ui-switch";
import {ModalModule, TabsModule} from "ngx-bootstrap";
import {PopUpModule} from "../../popups/popUp.module";
import {NgaModule} from "../../theme/nga.module";
import {CustomerList} from "./components/customerList/customerList.component";
import {MembershipComponent} from "./components/membership/membership.component";
import {CustomerGlobalModule} from "./customer-global.module";
import {Customer} from "./customer.component";
import {routing} from "./customer.routing";
import { NotelistComponent } from './components/Notes/notelist/notelist.component';
import { MembershipPaymentComponent } from './components/membership-payment/membership-payment.component';


@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        FormsModule,
        ModalModule.forRoot(),
        NgaModule,
        routing,
        TextMaskModule,
        TabsModule.forRoot(),
        UiSwitchModule,
        PopUpModule.forRoot(),
        CustomerGlobalModule.forRoot()
    ],
    declarations: [
        Customer,
        CustomerList,
        MembershipComponent,
        NotelistComponent,
        MembershipPaymentComponent
    ],
    providers: [

    ]

})
export class CustomerModule {
}
