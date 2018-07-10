import {ModuleWithProviders} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {SwitchPlan} from "./switchPlan.component";

export const routes: Routes = [
    {
        path: '',
        component: SwitchPlan
    }
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);