import {CommonModule} from "@angular/common";
import {NgModule} from "@angular/core";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {TextMaskModule} from "angular2-text-mask";
import {TypeaheadModule} from "ngx-bootstrap";
import {NgaModule} from "../../theme/nga.module";
import {BusinessAuth} from "./copmonents/businessAuth/businessAuth.component";
import {BusinessSetup} from "./copmonents/businessSetup/businessSetup.component";
import {Signup} from "./signup.component";
import {routing} from "./signup.routing";


@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        FormsModule,
        TypeaheadModule.forRoot(),
        NgaModule,
        TextMaskModule,
        routing
    ],
    declarations: [
        Signup,
        BusinessAuth,
        BusinessSetup
    ]
})
export class SignupModule {
}
