/**
 * Created by Mian on 2/23/2017.
 */
/**
 * Created by Mian on 2/23/2017.
 */
import { Routes, RouterModule }  from '@angular/router';

import {calender} from "./calender.component";
import {Today} from "./today.component";


// noinspection TypeScriptValidateTypes
const routes: Routes = [
  {
    path: '',
    component: Today
  }
];

export const routing = RouterModule.forChild(routes);
