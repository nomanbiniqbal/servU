import {ModuleWithProviders} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {MembershipComponent} from "./membership.component";

// noinspection TypeScriptValidateTypes
export const routes: Routes = [
    {
        path: '',
        component: MembershipComponent
    }
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);
