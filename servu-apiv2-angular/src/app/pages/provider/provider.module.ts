import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {NgaModule} from "../../theme/nga.module";
import {routing} from "./provider.routing";

import {Provider} from "./provider.component";
import {ProviderList} from "./components/providerList/providerList.component";
import {ProviderService} from "./provider.service";
import {ProviderFrom} from "./components/providerForm/providerForm.component";
import {GapiService} from "./components/googleCalenderList/gapi.service";
import {GoogleCalenderList} from "./components/googleCalenderList/googleCalenderList.component";



@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    NgaModule,
    routing
  ],
  declarations: [
    Provider,
    ProviderList,
    ProviderFrom,
    GoogleCalenderList
  ],
  providers: [
    ProviderService,
    GapiService

  ]
})
export class ProviderModule {
}
