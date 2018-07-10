import {ModuleWithProviders} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {ForgotPassword} from "./forgotPassword.component";

// noinspection TypeScriptValidateTypes
export const routes: Routes = [
    {
        path: '',
        component: ForgotPassword
    }
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);
