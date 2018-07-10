/**
 * Created by Mian on 2/23/2017.
 */
import {RouterModule, Routes} from "@angular/router";

import {Calender} from "./calender.component";


// noinspection TypeScriptValidateTypes
const routes: Routes = [
    {
        path: '',
        component: Calender
    }
];

export const routing = RouterModule.forChild(routes);
