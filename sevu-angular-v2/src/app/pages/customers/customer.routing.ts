/**
 * Created by Mian on 2/23/2017.
 */

import {RouterModule, Routes} from "@angular/router";

import {Customer} from "./customer.component";


// noinspection TypeScriptValidateTypes
const routes: Routes = [
    {
        path: '',
        component: Customer
    }
];

export const routing = RouterModule.forChild(routes);
