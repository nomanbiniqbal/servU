/**
 * Created by Mian on 2/23/2017.
 */
/**
 * Created by Mian on 2/23/2017.
 */
import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {NgaModule} from "../../theme/nga.module";
import {BusinessAuth} from "./copmonents/businessAuth/businessAuth.component";
import {BusinessSetup} from "./copmonents/businessSetup/businessSetup.component";

import {calender} from "./calender.component";
import {routing} from "./today.routing";
import {Today} from "./today.component";
import {AccordionModule} from "ng2-bootstrap";


@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    AccordionModule.forRoot(),
    FormsModule,
    NgaModule,
    routing
  ],
  declarations: [
    Today
  ],


})
export class todayModule {
}
