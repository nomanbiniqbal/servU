import {CommonModule} from "@angular/common";
import {NgModule} from "@angular/core";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {UiSwitchModule} from "angular2-ui-switch";
import {AccordionModule, ModalModule, PopoverModule, TabsModule, TypeaheadModule} from "ngx-bootstrap";
import {PopUpModule} from "../../popups/popUp.module";
import {NgaModule} from "../../theme/nga.module";
import {ProviderService} from "../provider/provider.service";
import {BusinessSetting} from "./components/businessSetting/businessSetting.component";
import {Calendersetting} from "./components/calendersetting/calendersetting.component";
import {followUpList} from "./components/notification/components/followUpList/followUpList.component";

import {ProviderList} from "./components/notification/components/providerList/providerList.component";
import {ReminderList} from "./components/notification/components/reminderList/reminderList.component";
import {FollowUpService} from "./components/notification/followUp.service";
import {Notification} from "./components/notification/notification.component";
import {ReminderService} from "./components/notification/reminder.service";

import {StaffSetup} from "./components/staffSetup/staffSetup.component";
import {setting} from "./setting.component";
import {routing} from "./setting.routing";
import {BranchSettingService} from "./components/businessSetting/businessSetting.service";


@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        TabsModule.forRoot(),
        NgaModule,
        AccordionModule.forRoot(),
        TypeaheadModule.forRoot(),
        ModalModule.forRoot(),
        PopoverModule.forRoot(),
        PopUpModule,
        UiSwitchModule,
        ReactiveFormsModule,
        routing
    ],
    declarations: [
        setting,
        BusinessSetting,
        Calendersetting,
        Notification,
        StaffSetup,
        ProviderList,
        ReminderList,
        followUpList,
    ],
    providers: [
        ReminderService,
        ProviderService,
        FollowUpService,
        BranchSettingService,
    ]

})
export class settingModule {
}
