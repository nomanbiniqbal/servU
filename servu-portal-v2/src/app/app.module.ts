import {ApplicationRef, NgModule} from "@angular/core";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HttpModule} from "@angular/http";
import {BrowserModule} from "@angular/platform-browser";
import {RouterModule} from "@angular/router";
import {Api} from "./api.service";
// App is our top level component
import {App} from "./app.component";
/*
 * Platform and Environment providers/directives/pipes
 */
import {routing} from "./app.routing";
import {AppState, InternalStateType} from "./app.service";
import {GlobalState} from "./global.state";
import {PagesModule} from "./pages/pages.module";
import {AuthRest} from "./restServices/authRest.service";
import {BusinessRest} from "./restServices/businessRest.service";
import {CustomerRest} from "./restServices/customerRest.service";
import {MembershipRest} from "./restServices/membership-rest.service";
import {ProductRest} from "./restServices/productRest.service";
import {ProviderRest} from "./restServices/providerRest.service";
import {NgaModule} from "./theme/nga.module";
import {EventRest} from "./restServices/event.rest.service";
import {StripeService} from "app/stripe.service";
import {BPointService} from "./b-point.service";
import {ToastModule} from "ng2-toastr";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";

// Application wide providers
const APP_PROVIDERS = [
    AppState,
    GlobalState,
    Api,
    AuthRest,
    BusinessRest,
    CustomerRest,
    ProviderRest,
    ProductRest,
    MembershipRest,
    EventRest,
    StripeService,
    BPointService

];

export type StoreType = {
    state: InternalStateType,
    restoreInputValues: () => void,
    disposeOldHosts: () => void
};

/**
 * `AppModule` is the main entry point into Angular2's bootstraping process
 */
@NgModule({
    bootstrap: [App],
    declarations: [
        App
    ],
    imports: [ // import Angular's modules
        BrowserModule,
        BrowserAnimationsModule,
        ToastModule.forRoot(),
        HttpModule,
        RouterModule,
        FormsModule,
        ReactiveFormsModule,
        NgaModule.forRoot(),
        PagesModule,
        routing
    ],
    providers: [ // expose our Services and Providers into Angular's dependency injection
        APP_PROVIDERS
    ]
})

export class AppModule {

    constructor(public appRef: ApplicationRef, public appState: AppState) {
    }

    hmrOnInit(store: StoreType) {
        if (!store || !store.state) return;
        console.log('HMR store', JSON.stringify(store, null, 2));
        // set state
        this.appState._state = store.state;
        // set input values
        if ('restoreInputValues' in store) {
            let restoreInputValues = store.restoreInputValues;
            setTimeout(restoreInputValues);
        }
        this.appRef.tick();
        delete store.state;
        delete store.restoreInputValues;
    }

    hmrOnDestroy(store: StoreType) {
        const cmpLocation = this.appRef.components.map(cmp => cmp.location.nativeElement);
        // save state
        const state = this.appState._state;
        store.state = state;
        // recreate root elements

        // store.disposeOldHosts = createNewHosts(cmpLocation);
        // // save input values
        // store.restoreInputValues = createInputTransfer();
        // // remove styles
        // removeNgStyles();
    }

    hmrAfterDestroy(store: StoreType) {
        // display new elements
        store.disposeOldHosts();
        delete store.disposeOldHosts;
    }
}
