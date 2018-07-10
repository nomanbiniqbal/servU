import {RouterModule, Routes} from "@angular/router";
import {Signup} from "./signup.component";


// noinspection TypeScriptValidateTypes
const routes: Routes = [
    {
        path: '',
        component: Signup
    }
];

export const routing = RouterModule.forChild(routes);
