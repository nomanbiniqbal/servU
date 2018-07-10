import {CommonModule} from "@angular/common";
import {ModuleWithProviders, NgModule} from "@angular/core";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {RouterModule} from "@angular/router";
import {BsDropdownModule, PopoverModule, ProgressbarModule, TypeaheadModule} from "ngx-bootstrap";

import {
    BaBackTop,
    BaCard,
    BaCheckbox,
    BaContentTop,
    BaCountryInput,
    BaFullCalendar,
    BaMenu,
    BaMenuItem,
    BaMultiCheckbox,
    BaPageTop,
    BaSidebar,
    BaValidationMessage
} from "./components";
import {BaSelect2} from "./components/ba-select2/ba-select2.component";

import {BaCardBlur} from "./components/baCard/baCardBlur.directive";
import {BaTimePicker} from "./components/baTimePicker/baTimePicker.component";

import {BaScrollPosition, BaSlimScroll, BaThemeRun} from "./directives";
import {BaFieldFocusValidation} from "./directives/baFieldFocusValidation/baFieldFocusValidation.directive";

import {BaDate, BaWeekNamePipe} from "./pipes";
import {BaPriceTypePipe} from "./pipes/baPriceType/ba-price-type.pipe";

import {BaImageLoaderService, BaMenuService, BaThemePreloader, BaThemeSpinner} from "./services";

import {BaThemeConfig} from "./theme.config";

import {BaThemeConfigProvider} from "./theme.configProvider";

import {AjaxValidator, EmailValidator, EqualPasswordsValidator, PhoneValidator} from "./validators";
import {BaStripCardValidator, BaStripCVCValidator} from "./directives/baStripValidators/ba-strip-validators.directive";

const NGA_COMPONENTS = [
    BaBackTop,
    BaCard,
    BaCheckbox,
    BaContentTop,
    BaFullCalendar,
    BaMenuItem,
    BaMenu,
    BaMultiCheckbox,
    BaPageTop,
    BaTimePicker,
    BaSidebar,
    BaValidationMessage,
    BaCountryInput,
    BaSelect2
];

const NGA_DIRECTIVES = [
    BaScrollPosition,
    BaSlimScroll,
    BaThemeRun,
    BaCardBlur,
    BaFieldFocusValidation,
    BaStripCardValidator,
    BaStripCVCValidator,
];

const NGA_PIPES = [
    BaDate,
    BaWeekNamePipe,
    BaPriceTypePipe,
];

const NGA_SERVICES = [
    BaImageLoaderService,
    BaThemePreloader,
    BaThemeSpinner,
    BaMenuService
];

const NGA_VALIDATORS = [
    EmailValidator,
    EqualPasswordsValidator,
    PhoneValidator,
    AjaxValidator
];

@NgModule({
    declarations: [
        ...NGA_PIPES,
        ...NGA_DIRECTIVES,
        ...NGA_COMPONENTS,
    ],
    imports: [
        CommonModule,
        RouterModule,
        FormsModule,
        ReactiveFormsModule,
        ProgressbarModule.forRoot(),
        BsDropdownModule.forRoot(),
        TypeaheadModule.forRoot(),
        PopoverModule.forRoot(),
    ],
    exports: [
        ...NGA_PIPES,
        ...NGA_DIRECTIVES,
        ...NGA_COMPONENTS
    ]
})
export class NgaModule {
    static forRoot(): ModuleWithProviders {
        return <ModuleWithProviders> {
            ngModule: NgaModule,
            providers: [
                BaThemeConfigProvider,
                BaThemeConfig,
                ...NGA_VALIDATORS,
                ...NGA_SERVICES
            ],
        };
    }
}
