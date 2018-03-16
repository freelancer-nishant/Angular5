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
import { GlobalConstants } from './shared/app.globals'

import { LoginComponent } from './demo/view/login.component';
import { EmbeddedLoginComponent } from './demo/view/embedded.login.component';
import { HomeComponent } from './demo/view/home.component';
import { DashboardComponent } from './demo/view/dashboard.component';
import { StudentInformationComponent } from './demo/view/Dashboards/student-information.component'
import { EnrollmentOverviewComponent } from './demo/view/Dashboards/enrollment-overview.component'
import { AttendanceOverviewComponent } from './demo/view/Dashboards/attendance-overview.component'
import { AssessmentsComponent } from './demo/view/Dashboards/assessments.component'
import { AssessmentsSBACOverviewComponent } from './demo/view/Dashboards/assessments-sbac-overview.component'
import { AssessmentsSBACDetailComponent } from './demo/view/Dashboards/assessments-sbac-detail.component'
import { AssessmentsPFTOverviewComponent } from './demo/view/Dashboards/assessments-pft-overview.component'
import { AssessmentsCELDTOverviewComponent } from './demo/view/Dashboards/assessments-celdt-overview.component'
import { AssessmentsNWEAOverviewComponent } from './demo/view/Dashboards/assessments-nwea-overview.component'
import { AssessmentsDORAOverviewComponent } from './demo/view/Dashboards/assessments-dora-adam-overview.component'
import { AssessmentsDOMAOverviewComponent } from './demo/view/Dashboards/assessments-doma-overview.component'

import { ReportsComponent } from './reports/view/reports.component'
import { SchoolScorecardsComponent } from './reports/view/school.scorecards.component'
import { SchoolScorecardsReportComponent } from './reports/view/school.scorecards.report.component'
import { ComparisonSchoolsComponent } from './reports/view/comparison.schools.component'
import { CompareSBACScoresComponent } from './reports/view/compare.sbac.scores.component'
import { CompareSchoolScorecardsComponent } from './reports/view/compare.school.scorecards.component'
import { TeacherScorecardsComponent } from './reports/view/teacher.scorecards.component'
import { TeacherScorecardsReportComponent } from './reports/view/teacher.scorecards.report.component'
import { StudentScorecardsComponent } from './reports/view/student.scorecards.component'
import { StudentScorecardsReportComponent } from './reports/view/student.scorecards.report.component'

import { AdminConfigurationComponent } from './admin/view/admin.configuration.component'
import { SchoolComparisonListComponent } from './admin/view/school.comparison.list.component'

export const routes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: 'embedded-report/:user/:pwd', component: EmbeddedLoginComponent},
    { path: '', component: HomeComponent, canActivate: [AuthGuard], data: { expectedRole: GlobalConstants.ROLE_CLIENT_USER } },

    //Dashboards
    { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard], data: { expectedRole: GlobalConstants.ROLE_CLIENT_USER, hasClientAccess: true } },
    { path: 'student-information', component: EnrollmentOverviewComponent, canActivate: [AuthGuard], data: { hasClientAccess: true } },
    { path: 'enrollment-overview', component: EnrollmentOverviewComponent, canActivate: [AuthGuard], data: { hasClientAccess: true } },
    { path: 'attendance-overview', component: AttendanceOverviewComponent, canActivate: [AuthGuard], data: { hasClientAccess: true }},
    { path: 'assessments', component: AssessmentsSBACOverviewComponent, canActivate: [AuthGuard], data: { hasClientAccess: true } },
    { path: 'assessments/sbac-overview', component: AssessmentsSBACOverviewComponent, canActivate: [AuthGuard], data: { hasClientAccess: true } },
    { path: 'assessments/sbac-detail', component: AssessmentsSBACDetailComponent, canActivate: [AuthGuard], data: { hasClientAccess: true } },
    { path: 'assessments/pft-overview', component: AssessmentsPFTOverviewComponent, canActivate: [AuthGuard], data: { hasClientAccess: true } },
    { path: 'assessments/celdt-overview', component: AssessmentsCELDTOverviewComponent, canActivate: [AuthGuard], data: { hasClientAccess: true } },
    { path: 'assessments/nwea-overview', component: AssessmentsNWEAOverviewComponent, canActivate: [AuthGuard], data: { hasClientAccess: true }},
    { path: 'assessments/dora-adam-overview', component: AssessmentsDORAOverviewComponent, canActivate: [AuthGuard], data: { hasClientAccess: true }},
    { path: 'assessments/doma-overview', component: AssessmentsDOMAOverviewComponent, canActivate: [AuthGuard], data: { hasClientAccess: true } },

    //Reports
    { path: 'reports', component: ReportsComponent, canActivate: [AuthGuard] },
    { path: 'school-scorecards', component: SchoolScorecardsReportComponent, canActivate: [AuthGuard] },
    { path: 'school-scorecards/report', component: SchoolScorecardsReportComponent, canActivate: [AuthGuard] },

    { path: 'comparison-schools', component: CompareSBACScoresComponent, canActivate: [AuthGuard] },
    { path: 'comparison-schools/sbac-scores', component: CompareSBACScoresComponent, canActivate: [AuthGuard] },    
    { path: 'comparison-schools/school-scorecards', component: CompareSchoolScorecardsComponent, canActivate: [AuthGuard] },
    { path: 'teacher-scorecards', component: TeacherScorecardsComponent, canActivate: [AuthGuard] },
    { path: 'teacher-scorecards/report', component: TeacherScorecardsReportComponent, canActivate: [AuthGuard] },
    { path: 'student-scorecards', component: StudentScorecardsComponent, canActivate: [AuthGuard] },
    { path: 'student-scorecards/report', component: StudentScorecardsReportComponent, canActivate: [AuthGuard] },

    //Admin pages
    { path: 'admin-configuration', component: AdminConfigurationComponent, canActivate: [AuthGuard] },
    { path: 'school-comparison-list', component: SchoolComparisonListComponent, canActivate: [AuthGuard] },

    //Theme routes
    { path: 'dashboard-theme', component: DashboardDemoComponent, canActivate: [AuthGuard], data: { expectedRole: GlobalConstants.ROLE_ADMIN } },
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
