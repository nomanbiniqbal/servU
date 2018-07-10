import {CommonModule} from "@angular/common";
import {NgModule} from "@angular/core";
import {FormsModule} from "@angular/forms";
import {TextMaskModule} from "angular2-text-mask";
import {UiSwitchModule} from "angular2-ui-switch";
import {AccordionModule, ModalModule, PopoverModule, TypeaheadModule} from "ngx-bootstrap";
import {PopUpModule} from "../../../../popups/popUp.module";
import {NgaModule} from "../../../../theme/nga.module";
import {Branch} from "./branch.component";
import {routing} from "./branch.routing";
import {BranchService} from "./branch.service";
import {BranchDetail} from "./components/branchDetail/branchDetail.component";
import {BranchList} from "./components/branchList/branchList.component";


@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        routing,
        NgaModule,
        AccordionModule.forRoot(),
        TypeaheadModule.forRoot(),
        ModalModule.forRoot(),
        PopoverModule.forRoot(),
        PopUpModule,
        TextMaskModule,
        UiSwitchModule,
    ],
    declarations: [
        Branch,
        BranchList,
        BranchDetail,
    ],
    providers: [
        BranchService,
    ]
})
export class BranchModule {
}
