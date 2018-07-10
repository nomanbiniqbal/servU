import {CommonModule} from "@angular/common";

import {NgModule} from "@angular/core";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {TodayGlobalModule} from "app/pages/today/today.global.module";
import {NgaModule} from "../../theme/nga.module";
import {ProviderService} from "../provider/provider.service";
import {EventService} from "../today/event.service";
import {CalendarService} from "./calendar.service";

import {Calender} from "./calender.component";
import {routing} from "./calender.routing";


@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        FormsModule,
        NgaModule,
        TodayGlobalModule.forRoot(),

        routing
    ],
    declarations: [
        Calender,
    ],
    providers: [
        CalendarService,
        EventService,
        ProviderService,
    ]

})
export class calenderModule {
}
