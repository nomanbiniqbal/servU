import {ModuleWithProviders} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {Branch} from "./branch.component";

// noinspection TypeScriptValidateTypes
export const routes: Routes = [
    {
        path: '',
        component: Branch
    }
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);