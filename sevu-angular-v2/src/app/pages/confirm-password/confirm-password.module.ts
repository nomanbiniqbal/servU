import {CommonModule} from "@angular/common";
import {NgModule} from "@angular/core";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {NgaModule} from "../../theme/nga.module";
import {ConfirmPassword} from "./confirm-password.component";
import {routing} from "./confirm-password.routing";


@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        FormsModule,
        NgaModule,
        routing
    ],
    declarations: [
        ConfirmPassword
    ]
})
export class ConfirmPasswordModule {
}
