import {NgModule, ClassProvider} from "@angular/core";
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {NgaModule} from "../../theme/nga.module";
import {routing} from "./setting.routing";
import {Maps} from "./maps.component";
import {BubbleMaps} from "./components/bubbleMaps/bubbleMaps.component";
import {GoogleMaps} from "./components/googleMaps/googleMaps.component";
import {LeafletMaps} from "./components/leafletMaps/leafletMaps.component";
import {LineMaps} from "./components/lineMaps/lineMaps.component";
import {BubbleMapsService} from "./components/bubbleMaps/bubbleMaps.service";
import {LineMapsService} from "./components/lineMaps/lineMaps.service";
import {setting} from "./setting.component";
import {Calendersetting} from "./components/calendersetting/calendersetting.component";
import {Classes} from "./components/classes/classes.component";
import {Notification} from "./components/notification/notification.component";
import {Services} from "./components/services/services.component";
import {StaffSetup} from "./components/staffSetup/staffSetup.component";
import {Branch} from "./components/branch/branch.component";
import {BranchService} from "./components/branch/branch.service";
import {BranchList} from "./components/branch/components/branchList/branchList.component";
import {BranchDetail} from "./components/branch/components/branchDetail/branchDetail.component";
import {ModalModule, AccordionModule, TabsModule} from "ng2-bootstrap";
import {BusinessSetting} from "./components/businessSetting/businessSetting.component";
import {UiSwitchModule} from "angular2-ui-switch";

import {ProviderList} from "./components/notification/components/providerList/providerList.component";
import {ProviderService} from "./provider.service";
import {ServicesList} from "./components/services/components/servicesList/servicesList.component";
import {ServicesService} from "./components/services/services.service";
import {ServiceProviderList} from "./components/services/components/serviceProviderList/serviceProviderList.compnent";
import {ServicesDetail} from "./components/services/components/servicesDetail/servicesDetail.component";
import {ReminderList} from "./components/notification/components/reminderList/reminderList.component";
import {ReminderService} from "./components/notification/reminder.service";
import {FollowUpService} from "./components/notification/followUp.service";
import {followUpList} from "./components/notification/components/followUpList/followUpList.component";
import { ReactiveFormsModule } from '@angular/forms';
import {classesService} from "./components/classes/classes.service";
import {ClassesList} from "./components/classes/components/classList/classList.component";
import {ClassesDetail} from "./components/classes/components/classDetail/classDetail.component";
import {ClassProviderList} from "./components/classes/components/classProviderList/classProviderList.component";


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    NgaModule,
    ModalModule.forRoot(),
    AccordionModule.forRoot(),
    TabsModule.forRoot(),
    UiSwitchModule,
    ReactiveFormsModule,
    routing,

  ],
  declarations: [
    setting,
    BusinessSetting,
    Calendersetting,
    Classes,
    Notification,
    Services,
    ServicesList,
    ServiceProviderList,
    ServicesDetail,
    StaffSetup,
    Branch,
    BranchList,
    BranchDetail,
    ProviderList,
    ReminderList,
    followUpList,
    ClassesList,
    ClassesDetail,
    ClassProviderList

  ],
  providers: [
    BranchService,
    ReminderService,
    ProviderService,
    ServicesService,
    FollowUpService,
    classesService
  ]

})
export class settingModule {
}
