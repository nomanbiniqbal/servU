import {ModuleWithProviders} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {Pages} from "./pages.component";
import {AuthRouting} from "./pages.routing.auth";
// noinspection TypeScriptValidateTypes

// export function loadChildren(path) { return System.import(path); };

export const routes: Routes = [
    {
        path: 'login',
        canActivate: [AuthRouting],
        loadChildren: 'app/pages/login/login.module#LoginModule'
    },
    {
        path: 'forgotPassword',
        canActivate: [AuthRouting],
        loadChildren: 'app/pages/forgotPassword/forgotPassword.module#ForgotPasswordModule'
    },
    {
        path: 'confirmPassword',
        loadChildren: 'app/pages/confirm-password/confirm-password.module#ConfirmPasswordModule'
    },
    {
        path: 'switch',
        canActivate: [AuthRouting],
        loadChildren: 'app/pages/switchBranch/switchBranch.module#SwitchBranchModule'
    },
    {
        path: 'signup',
        canActivate: [AuthRouting],
        loadChildren: 'app/pages/signup/signup.module#SignupModule'
    },
    {
        path: 'switchPlan',
        canActivate: [AuthRouting],
        loadChildren: 'app/pages/switch-plans/switchPlan.module#SwitchPlanModule'
    },
    {
        path: 'pages',
        component: Pages,
        canActivate: [AuthRouting],
        children: [
            {path: '', redirectTo: 'dashboard', pathMatch: 'full'},
            {path: 'dashboard', loadChildren: 'app/pages/dashboard/dashboard.module#DashboardModule'},
            {path: 'provider', loadChildren: 'app/pages/provider/provider.module#ProviderModule'},
            {path: 'calender', loadChildren: 'app/pages/calender/calender.module#calenderModule'},
            {path: 'today', loadChildren: 'app/pages/today/today.module#todayModule'},
            {path: 'report', loadChildren: 'app/pages/report/report.module#reportModule'},
            {path: 'customer', loadChildren: 'app/pages/customers/customer.module#CustomerModule'},
            {path: 'setting', loadChildren: 'app/pages/setting/setting.module#settingModule'},
            {path: 'setting/branch', loadChildren: 'app/pages/setting/components/branch/branch.module#BranchModule'},
            {path: 'product', loadChildren: 'app/pages/product/product.module#ProductModule'},
            {path: 'membership', loadChildren: 'app/pages/membership/membership.module#MembershipModule'}
        ]
    }
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);
