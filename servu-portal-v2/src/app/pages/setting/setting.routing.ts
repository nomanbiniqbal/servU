/**
 * Created by Mian on 2/23/2017.
 */
import {RouterModule, Routes} from "@angular/router";

import {BusinessSetting} from "./components/businessSetting/businessSetting.component";

import {Calendersetting} from "./components/calendersetting/calendersetting.component";
import {Notification} from "./components/notification/notification.component";
import {StaffSetup} from "./components/staffSetup/staffSetup.component";

import {setting} from "./setting.component";

// noinspection TypeScriptValidateTypes
const routes: Routes = [
    {
        path: '',
        component: setting,
        children: [
            {path: 'businessSetting', component: BusinessSetting},
            {path: 'calendersetting', component: Calendersetting},
            {path: 'notification', component: Notification},
            {path: 'staffSetup', component: StaffSetup},
        ]
    }
];

export const routing = RouterModule.forChild(routes);
