import {RouterModule, Routes} from "@angular/router";

import {Report} from "./report.component";


// noinspection TypeScriptValidateTypes
const routes: Routes = [
    {
        path: '',
        component: Report
    }
];

export const routing = RouterModule.forChild(routes);
