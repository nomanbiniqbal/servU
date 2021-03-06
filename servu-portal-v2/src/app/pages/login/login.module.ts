import {CommonModule} from "@angular/common";
import {NgModule} from "@angular/core";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {NgaModule} from "../../theme/nga.module";

import {Login} from "./login.component";
import {routing} from "./login.routing";


@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        FormsModule,
        NgaModule,
        routing
    ],
    declarations: [
        Login
    ]
})
export class LoginModule {
}
