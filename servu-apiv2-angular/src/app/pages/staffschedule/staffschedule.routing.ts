
import { Routes, RouterModule }  from '@angular/router';

import {calender} from "./calender.component";
import {today} from "./today.component";
import {Staffschedule} from "./staffschedule.component";


// noinspection TypeScriptValidateTypes
const routes: Routes = [
  {
    path: '',
    component: Staffschedule
  }
];

export const routing = RouterModule.forChild(routes);
