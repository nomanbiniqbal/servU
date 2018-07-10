/**
 * Created by Mian on 2/23/2017.
 */
import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {NgaModule} from "../../theme/nga.module";
import {BusinessAuth} from "./copmonents/businessAuth/businessAuth.component";
import {BusinessSetup} from "./copmonents/businessSetup/businessSetup.component";

import { Calender} from "./calender.component";
import {routing} from "./calender.routing";
import {CalendarService} from "./calendar.service";


@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    NgaModule,
    routing
  ],
  declarations: [
    Calender
  ],
providers:[
  CalendarService
]

})
export class calenderModule {
}
