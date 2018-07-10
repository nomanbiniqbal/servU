import {NgModule} from "@angular/core";
import {Routes, RouterModule} from "@angular/router";
import {HomeComponent} from "./home/home.component";
import {DashboardComponent} from "./home/dashboard/dashboard.component";
import {SignInComponent} from "./auth/sign-in/sign-in.component";
import {SignUpComponent} from "./auth/sign-up/sign-up.component";
import {AuthGuardService} from "./auth-guard.service";
import {TodayComponent} from "./home/today/today.component";
import {CalenderComponent} from "./home/calender/calender.component";
import {CustomersComponent} from "./home/customers/customers.component";
import {StaffSchuduleComponent} from "./home/staff-schudule/staff-schudule.component";
import {ReportComponent} from "./home/report/report.component";
import {BusinessSettingComponent} from "./home/business-setting/business-setting.component";
import {StaffSetupComponent} from "./home/staff-setup/staff-setup.component";
import {ServicesComponent} from "./home/services/services.component";
import {ClassesComponent} from "./home/classes/classes.component";
import {CalenderSettingsComponent} from "./home/calender-settings/calender-settings.component";
import {NotificationSettingsComponent} from "./home/notification-settings/notification-settings.component";

const routes: Routes = [
  {
    path: '',
    canActivate:[AuthGuardService],
    children: [
      {
        path: '',
        component: HomeComponent,
        children: [
          {
            path: '',
            component: DashboardComponent
          },
          {
            path: 'today',
            component: TodayComponent
          },
          {
            path: 'calender/:name',
            component: CalenderComponent
          },
          {
            path: 'Customers',
            component: CustomersComponent
          },
          {
            path: 'staffSchedule',
            component: StaffSchuduleComponent
          },
          {
            path: 'Report',
            component:ReportComponent
          },
          {
            path: 'Report',
            component:ReportComponent
          },
          {
            path: 'Business-Setting',
            component:BusinessSettingComponent
          },
          {
            path: 'Staff-setup',
            component:StaffSetupComponent
          },
          {
            path: 'Services',
            component:ServicesComponent
          },
          {
            path: 'Classes',
            component:ClassesComponent
          },
          {
            path: 'Classes',
            component:ClassesComponent
          },
          {
            path: 'Calender-Settings',
            component:CalenderSettingsComponent
          },
          {
            path: 'Notification-Settings',
            component:NotificationSettingsComponent
          }
        ]
      }
    ]
  }, {
    path: 'auth',
    component: SignInComponent

  },
   {
    path: 'sign-up',
    component: SignUpComponent

  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: []
})
export class AppRoutingModule {
}
