// Angular 2
// rc2 workaround
import { enableDebugTools, disableDebugTools } from '@angular/platform-browser';
import { enableProdMode, ApplicationRef } from '@angular/core';
// Environment Providers
let PROVIDERS: any[] = [
  // common env directives
];
let VARIABLES={
  BASE_URL:"",
  GOOGLE_API_CLIENT_ID:"",
};

// Angular debug tools in the dev console
// https://github.com/angular/angular/blob/86405345b781a9dc2438c0fbe3e9409245647019/TOOLS_JS.md
let _decorateModuleRef = function identity<T>(value: T): T { return value; };

if ('production' === ENV || 'renderer' === ENV) {
  // Production
  disableDebugTools();
  enableProdMode();
  VARIABLES.BASE_URL = "http://52.91.46.134/api/v2";
  VARIABLES.GOOGLE_API_CLIENT_ID = "ABC";
  PROVIDERS = [
    ...PROVIDERS,
    // custom providers in production
  ];

} else {

  _decorateModuleRef = (modRef: any) => {
    const appRef = modRef.injector.get(ApplicationRef);
    const cmpRef = appRef.components[0];

    let _ng = (<any>window).ng;
    enableDebugTools(cmpRef);
    (<any>window).ng.probe = _ng.probe;
    (<any>window).ng.coreTokens = _ng.coreTokens;
    return modRef;
  };

  // Development
  VARIABLES.BASE_URL = "http://52.91.46.134/api/v2";
  VARIABLES.GOOGLE_API_CLIENT_ID = '298648037336-alp5hbd2faj896qpc0n258hkvldlhm4d.apps.googleusercontent.com';
  PROVIDERS = [
    ...PROVIDERS,
    // custom providers in development
  ];

}

export const decorateModuleRef = _decorateModuleRef;
export const ENVIRONMENT_VARIABLE=VARIABLES;
export const ENV_PROVIDERS = [
  ...PROVIDERS
];
