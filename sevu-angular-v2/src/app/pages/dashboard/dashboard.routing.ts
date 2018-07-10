import {ModuleWithProviders} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";

import {Dashboard} from "./dashboard.component";

// noinspection TypeScriptValidateTypes
export const routes: Routes = [
    {
        path: '',
        component: Dashboard,
        children: [
            //{ path: 'treeview', component: TreeViewComponent }
        ]
    }
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);
