import {CommonModule} from "@angular/common";
import {ModuleWithProviders, NgModule} from "@angular/core";
import {FormsModule} from "@angular/forms";
import {AccordionModule} from "ngx-bootstrap";
import {NgaModule} from "../../theme/nga.module";
import {ProductListComponent} from "./components/common/product-list/product-list.component";
import {ProductService} from "./product.service";

@NgModule({
    imports: [
        CommonModule,
        NgaModule,
        FormsModule,
        AccordionModule.forRoot(),
    ],
    declarations: [
        ProductListComponent,
    ],
    providers: [
        ProductService,
    ],
    exports: [ProductListComponent],

})
export class ProductGlobalModule {
    static forRoot(): ModuleWithProviders {
        return <ModuleWithProviders> {
            ngModule: ProductGlobalModule,
        };
    }

}