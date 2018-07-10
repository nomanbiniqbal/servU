import {ModuleWithProviders} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {SwitchBranch} from "./switchBranch.component";

// noinspection TypeScriptValidateTypes
export const routes: Routes = [
    {
        path: '',
        component: SwitchBranch
    }
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);
