import { Routes, RouterModule }  from '@angular/router';
import { Pages } from './pages.component';
import { ModuleWithProviders } from '@angular/core';
import {AuthRouting} from "./pages.routing.auth";
// noinspection TypeScriptValidateTypes

// export function loadChildren(path) { return System.import(path); };

export const routes: Routes = [
  {
    path: 'login',
    canActivate:[AuthRouting],
    loadChildren: 'app/pages/login/login.module#LoginModule'
  },
  {
    path: 'register',
    canActivate:[AuthRouting],
    loadChildren: 'app/pages/register/register.module#RegisterModule'
  },
  {
    path: 'signup',
    canActivate:[AuthRouting],
    loadChildren: 'app/pages/signup/signup.module#SignupModule'
  },
  {
    path: 'forgotPassword',
    canActivate:[AuthRouting],
    loadChildren: 'app/pages/forgotPassword/forgotPassword.module#ForgotPasswordModule'
  },
  {
    path: 'pages',
    component: Pages,
    canActivate:[AuthRouting],
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'dashboard', loadChildren: 'app/pages/dashboard/dashboard.module#DashboardModule' },
      { path: 'provider', loadChildren: 'app/pages/provider/provider.module#ProviderModule' },
      { path: 'calender', loadChildren: 'app/pages/calender/calender.module#calenderModule' },
      { path: 'today', loadChildren: 'app/pages/today/today.module#todayModule' },
      { path: 'report', loadChildren: 'app/pages/report/report.module#reportModule' },
     // { path: 'calenderSetting', loadChildren: 'app/pages/calenderSetting/calendersetting.module#calendersettingdModule' },
      //{ path: 'classes', loadChildren: 'app/pages/classes/classes.module#classesModule' },
      //{ path: 'notification', loadChildren: 'app/pages/notification/notification.module#notificationModule' },
      { path: 'customer', loadChildren: 'app/pages/customers/customer.module#CustomerModule' },
     // { path: 'Staffsetup', loadChildren: 'app/pages/Staffsetup/Staffsetup.module#StaffsetupModule' },
     // { path: 'Services', loadChildren: 'app/pages/Services/Services.module#ServicesModule' },
      { path: 'staffschedule', loadChildren: 'app/pages/staffschedule/staffschedule.module#staffscheduleModule' },
      //{ path: 'businesssetting', loadChildren: 'app/pages/businesssettings/businesssettings.module#businesssettingsModule' },
      { path: 'editors', loadChildren: 'app/pages/editors/editors.module#EditorsModule' },
      { path: 'components', loadChildren: 'app/pages/components/components.module#ComponentsModule' },
      { path: 'charts', loadChildren: 'app/pages/charts/charts.module#ChartsModule' },
      { path: 'ui', loadChildren: 'app/pages/ui/ui.module#UiModule' },
      { path: 'forms', loadChildren: 'app/pages/forms/forms.module#FormsModule' },
      { path: 'tables', loadChildren: 'app/pages/tables/tables.module#TablesModule' },
      { path: 'maps', loadChildren: 'app/pages/maps/maps.module#MapsModule' },
      { path: 'setting', loadChildren: 'app/pages/setting/setting.module#settingModule' }
    ]
  }
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);
