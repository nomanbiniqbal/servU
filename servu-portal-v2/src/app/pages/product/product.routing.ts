import {ModuleWithProviders} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {ClassComponent} from "./components/class/class.component";
import {ProductComponent} from "./components/product/product.component";
import {ServicesComponent} from "./components/services/services.component";
import {Product} from "./product.component";

export const routes: Routes = [
    {
        path: '',
        component: Product,
        children: [
            {path: 'service', component: ServicesComponent},
            {path: 'classes', component: ClassComponent},
            {path: 'product', component: ProductComponent},

        ]
    }
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);
