import {ModuleWithProviders} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {ConfirmPassword} from "./confirm-password.component";

// noinspection TypeScriptValidateTypes
export const routes: Routes = [
    {
        path: '',
        component: ConfirmPassword
    }
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);
