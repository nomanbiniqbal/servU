import {CommonModule} from "@angular/common";
import {NgModule} from "@angular/core";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {ModalModule} from "ngx-bootstrap";
import {NgaModule} from "../../theme/nga.module";
import {SwitchPlan} from "./switchPlan.component";
import {routing} from "./switchPlan.routing";


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
        SwitchPlan
    ]
})
export class SwitchPlanModule {
}
