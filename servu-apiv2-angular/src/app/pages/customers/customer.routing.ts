/**
 * Created by Mian on 2/23/2017.
 */

import { Routes, RouterModule }  from '@angular/router';

import {calender} from "./calender.component";
import {today} from "./today.component";
import { Customer} from "./customer.component";


// noinspection TypeScriptValidateTypes
const routes: Routes = [
  {
    path: '',
    component: Customer
  }
];

export const routing = RouterModule.forChild(routes);
