
import { Routes, RouterModule }  from '@angular/router';

import {calender} from "./calender.component";
import {today} from "./today.component";
import { Report} from "./report.component";


// noinspection TypeScriptValidateTypes
const routes: Routes = [
  {
    path: '',
    component: Report
  }
];

export const routing = RouterModule.forChild(routes);
