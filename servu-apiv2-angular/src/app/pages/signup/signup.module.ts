import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {NgaModule} from "../../theme/nga.module";
import {Signup} from "./signup.component";
import {routing} from "./signup.routing";
import {BusinessAuth} from "./copmonents/businessAuth/businessAuth.component";
import {BusinessSetup} from "./copmonents/businessSetup/businessSetup.component";
import {TypeaheadModule} from "ng2-bootstrap";
import {SignUpService} from "./signup.service";


@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    TypeaheadModule.forRoot(),
    NgaModule,
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
