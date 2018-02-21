import { Routes, RouterModule, CanActivate } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';
import { DashboardDemoComponent } from './demo/view/dashboarddemo.component';
import { SampleDemoComponent } from './demo/view/sampledemo.component';
import { FormsDemoComponent } from './demo/view/formsdemo.component';
import { DataDemoComponent } from './demo/view/datademo.component';
import { PanelsDemoComponent } from './demo/view/panelsdemo.component';
import { OverlaysDemoComponent } from './demo/view/overlaysdemo.component';
import { MenusDemoComponent } from './demo/view/menusdemo.component';
import { MessagesDemoComponent } from './demo/view/messagesdemo.component';
import { MiscDemoComponent } from './demo/view/miscdemo.component';
import { EmptyDemoComponent } from './demo/view/emptydemo.component';
import { ChartsDemoComponent } from './demo/view/chartsdemo.component';
import { FileDemoComponent } from './demo/view/filedemo.component';
import { UtilsDemoComponent } from './demo/view/utilsdemo.component';
import { DocumentationComponent } from './demo/view/documentation.component';



import { AuthGuardService as AuthGuard } from './demo/service/auth-guard.service';

import { LoginComponent } from './demo/view/login.component';
import { HomeComponent } from './demo/view/home.component';
import { DashboardComponent } from './demo/view/dashboard.component';
import { StudentInformationComponent } from './demo/view/Dashboards/student-information.component'
import { AssessmentsComponent } from './demo/view/Dashboards/assessments.component'


export const routes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: '', component: HomeComponent, canActivate: [AuthGuard], data: { expectedRole: 'ClientUser' } },

    { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard], data: { expectedRole: 'ClientUser' } },
    { path: 'student-information', component: StudentInformationComponent, canActivate: [AuthGuard] },
    { path: 'assessments', component: AssessmentsComponent, canActivate: [AuthGuard] },

    { path: 'dashboard-theme', component: DashboardDemoComponent, canActivate: [AuthGuard], data: { expectedRole: 'admin' } },
    { path: 'sample', component: SampleDemoComponent, canActivate: [AuthGuard] },
    { path: 'forms', component: FormsDemoComponent, canActivate: [AuthGuard] },
    { path: 'data', component: DataDemoComponent, canActivate: [AuthGuard] },
    { path: 'panels', component: PanelsDemoComponent, canActivate: [AuthGuard] },
    { path: 'overlays', component: OverlaysDemoComponent, canActivate: [AuthGuard] },
    { path: 'menus', component: MenusDemoComponent, canActivate: [AuthGuard] },
    { path: 'messages', component: MessagesDemoComponent, canActivate: [AuthGuard] },
    { path: 'misc', component: MiscDemoComponent, canActivate: [AuthGuard] },
    { path: 'empty', component: EmptyDemoComponent, canActivate: [AuthGuard] },
    { path: 'charts', component: ChartsDemoComponent, canActivate: [AuthGuard] },
    { path: 'file', component: FileDemoComponent, canActivate: [AuthGuard] },
    { path: 'utils', component: UtilsDemoComponent, canActivate: [AuthGuard] },
    { path: 'documentation', component: DocumentationComponent, canActivate: [AuthGuard] }
];

export const AppRoutes: ModuleWithProviders = RouterModule.forRoot(routes);
