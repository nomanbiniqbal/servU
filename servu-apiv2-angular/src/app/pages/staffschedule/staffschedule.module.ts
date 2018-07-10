/**
 * Created by Mian on 2/23/2017.
 */
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
import {routing} from "./staffschedule.routing";
import {today} from "./today.component";
import { Staffschedule} from "./staffschedule.component";
import {StaffScheduleForm} from "./components/staffScheduleForm/staffScheduleForm.component";
import {ProviderList} from "./components/providerList/providerList.component";
import {ProviderFrom} from "./components/providerForm/providerForm.component";
import {ProviderService} from "./provider.service";
import {StaffScheduleList} from "./components/staffScheduleList/staffScheduleList.component";


@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    NgaModule,
    routing
  ],
  declarations: [
    Staffschedule,
    StaffScheduleList,
    StaffScheduleForm

  ],providers: [
    ProviderService


  ]



})
export class staffscheduleModule {
}
