/**
 * Created by Mian on 2/23/2017.
 */
/**
 * Created by Mian on 2/23/2017.
 */
import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {NgaModule} from "../../theme/nga.module";
import {routing} from "./customer.routing";
import {Customer} from "./customer.component";


import {ProviderService} from "./provider.service";
import {CustomerForm} from "./components/customerForm/customerForm.component";
import {CustomerList} from "./components/customerList/customerList.component";



@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    NgaModule,
    routing
  ],
  declarations: [
    Customer,
 CustomerForm,

    CustomerList
  ],
  providers: [
    ProviderService


  ]

})
export class CustomerModule{
}
