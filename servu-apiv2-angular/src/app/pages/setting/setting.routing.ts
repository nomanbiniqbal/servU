/**
 * Created by Mian on 2/23/2017.
 */
import { Routes, RouterModule }  from '@angular/router';

import { Maps } from './maps.component';
import { BubbleMaps } from './components/bubbleMaps/bubbleMaps.component';
import { GoogleMaps } from './components/googleMaps/googleMaps.component';
import { LeafletMaps } from './components/leafletMaps/leafletMaps.component';
import { LineMaps } from './components/lineMaps/lineMaps.component';

import {Calendersetting} from "./components/calendersetting/calendersetting.component";
import {Notification} from "./components/notification/notification.component";
import {Classes} from "./components/classes/classes.component";
import {setting} from "./setting.component";
import {Services} from "./components/services/services.component";

import {BusinessSetting} from "./components/businessSetting/businessSetting.component";
import {StaffSetup} from "./components/staffSetup/staffSetup.component";
import {Branch} from "./components/branch/branch.component";

// noinspection TypeScriptValidateTypes
const routes: Routes = [
  {
    path: '',
    component: setting,
    children: [
      { path: 'businessSetting', component: BusinessSetting },
      { path: 'calendersetting', component: Calendersetting },
      { path: 'classes', component: Classes },
      { path: 'notification', component: Notification },
      { path: 'services', component: Services },
      { path: 'staffSetup', component: StaffSetup },
      { path: 'branch', component: Branch },
    ]
  }
];

export const routing = RouterModule.forChild(routes);
