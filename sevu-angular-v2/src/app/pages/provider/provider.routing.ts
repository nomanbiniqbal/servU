import {RouterModule, Routes} from "@angular/router";
import {Provider} from "./provider.component";


// noinspection TypeScriptValidateTypes
const routes: Routes = [
    {
        path: '',
        component: Provider
    }
];

export const routing = RouterModule.forChild(routes);
