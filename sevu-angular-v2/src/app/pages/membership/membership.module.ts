import {CommonModule} from "@angular/common";
import {NgModule} from "@angular/core";
import {FormsModule} from "@angular/forms";
import {UiSwitchModule} from "angular2-ui-switch";
import {ModalModule} from "ngx-bootstrap";
import {NgxMyDatePickerModule} from "ngx-mydatepicker";
import {NgaModule} from "../../theme/nga.module";
import {ProductService} from "../product/product.service";
import {BranchService} from "../setting/components/branch/branch.service";
import {MembershipBranchComponent} from "./components/membership-branch/membership-branch.component";
import {MembershipDetailComponent} from "./components/membership-detail/membership-detail.component";
import {MembershipListComponent} from "./components/membership-list/membership-list.component";
import {MembershipPriceComponent} from "./components/membership-price/membership-price.component";
import {MembershipProductComponent} from "./components/membership-product/membership-product.component";
import {MembershipComponent} from "./membership.component";
import {routing} from "./membership.routing";
import {MembershipService} from "./membership.service";

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        NgaModule,
        ModalModule.forRoot(),
        NgxMyDatePickerModule,
        UiSwitchModule,
        routing
    ],
    declarations: [MembershipComponent, MembershipListComponent, MembershipDetailComponent, MembershipPriceComponent, MembershipBranchComponent, MembershipProductComponent],
    providers: [MembershipService, BranchService, ProductService]
})
export class MembershipModule {
}
