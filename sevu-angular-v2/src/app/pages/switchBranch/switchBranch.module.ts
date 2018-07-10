import {CommonModule} from "@angular/common";
import {NgModule} from "@angular/core";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {ModalModule} from "ngx-bootstrap";
import {NgaModule} from "../../theme/nga.module";
import {SwitchBranch} from "./switchBranch.component";
import {routing} from "./switchBranch.routing";


@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        FormsModule,
        ModalModule.forRoot(),
        NgaModule,
        routing
    ],
    declarations: [
        SwitchBranch
    ]
})
export class SwitchBranchModule {
}
