import { Routes, RouterModule, CanActivate } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';
//import { DashboardDemoComponent } from './demo/view/dashboarddemo.component';
//import { SampleDemoComponent } from './demo/view/sampledemo.component';
//import { FormsDemoComponent } from './demo/view/formsdemo.component';
//import { DataDemoComponent } from './demo/view/datademo.component';
//import { PanelsDemoComponent } from './demo/view/panelsdemo.component';
//import { OverlaysDemoComponent } from './demo/view/overlaysdemo.component';
//import { MenusDemoComponent } from './demo/view/menusdemo.component';
//import { MessagesDemoComponent } from './demo/view/messagesdemo.component';
//import { MiscDemoComponent } from './demo/view/miscdemo.component';
//import { EmptyDemoComponent } from './demo/view/emptydemo.component';
//import { ChartsDemoComponent } from './demo/view/chartsdemo.component';
//import { FileDemoComponent } from './demo/view/filedemo.component';
//import { UtilsDemoComponent } from './demo/view/utilsdemo.component';
//import { DocumentationComponent } from './demo/view/documentation.component';

import { AuthGuardService as AuthGuard } from './shared/services/auth-guard.service';
import { GlobalConstants } from './shared/app.globals'

import { LoginComponent } from './dashboards/login.component';
import { EmbeddedLoginComponent } from './dashboards/embedded.login.component';
import { HomeComponent } from './dashboards/home.component';
import { DashboardComponent } from './dashboards/dashboard.component';
import { CategoryPageComponent } from './dashboards/categorypage.component'
import { StudentInformationComponent } from './dashboards/view/student-information.component'
import { EnrollmentOverviewComponent } from './dashboards/view/enrollment-overview.component'
import { AttendanceOverviewComponent } from './dashboards/view/attendance-overview.component'
import { AssessmentsComponent } from './dashboards/view/assessments.component'
import { AssessmentsSBACOverviewComponent } from './dashboards/view/assessments-sbac-overview.component'
import { AssessmentsSBACDetailComponent } from './dashboards/view/assessments-sbac-detail.component'
import { AssessmentsPFTOverviewComponent } from './dashboards/view/assessments-pft-overview.component'
import { AssessmentsCELDTOverviewComponent } from './dashboards/view/assessments-celdt-overview.component'
import { AssessmentsNWEAOverviewComponent } from './dashboards/view/assessments-nwea-overview.component'
import { AssessmentsDORAOverviewComponent } from './dashboards/view/assessments-dora-adam-overview.component'
import { AssessmentsDOMAOverviewComponent } from './dashboards/view/assessments-doma-overview.component'

import { ReportsComponent } from './reports/view/reports.component';
import { SchoolScorecardsComponent } from './reports/view/school.scorecards.component';
import { SchoolScorecardsReportComponent } from './reports/view/school.scorecards.report.component';
import { ComparisonSchoolsComponent } from './reports/view/comparison.schools.component';
import { CompareSBACScoresComponent } from './reports/view/compare.sbac.scores.component';
import { CompareSchoolScorecardsComponent } from './reports/view/compare.school.scorecards.component';
import { TeacherScorecardsComponent } from './reports/view/teacher.scorecards.component';
import { TeacherScorecardsReportComponent } from './reports/view/teacher.scorecards.report.component';
import { StudentScorecardsComponent } from './reports/view/student.scorecards.component';
import { StudentScorecardsReportComponent } from './reports/view/student.scorecards.report.component';
import { VoiceOfTheSchoolSurveyReportComponent } from './reports/view/voice.schoolsurvey.report.component';

import { EnrollmentAndAttendanceComponentStudent } from './admin/view/enrollment-attendance.component.student';
import { EnrollmentAndAttendanceComponentPeriodTeacher } from './admin/view/enrollment-attendance.component.period-teacher';
import { EnrollmentAndAttendanceComponentDailyAttendance } from './admin/view/enrollment-attendance.component.daily-attendance';

import { AssessmentUploadsComponentSbac } from './admin/view/assessments-upload.component.sbac';
import { AssessmentUploadsComponentPft } from './admin/view/assessments-upload.component.pft';
import { AssessmentUploadsComponentCeldt } from './admin/view/assessments-upload.component.celdt';
import { AssessmentUploadsComponentNwea } from './admin/view/assessments-upload.component.nwea';
import { AssessmentUploadsComponentAdam } from './admin/view/assessments-upload.component.adam';
import { AssessmentUploadsComponentDora } from './admin/view/assessments-upload.component.dora';
import { AssessmentUploadsComponentDoma } from './admin/view/assessments-upload.component.doma';

import { AdminConfigurationComponent } from './admin/view/admin.configuration.component'
import { AdminComponent } from './admin/view/admin.component'
import { SchoolinSchoolYearComponent } from './admin/view/schoolin-schoolyear.component'
import { SchoolYearOfSchoolComponent } from './admin/view/schoolyear-school.component'
import { GradeInSchoolYearComponent } from './admin/view/schoolyear-grade.component'
import { EnrollmentAndAttendanceComponent } from './admin/view/enrollment-attendance.component'
import { AdminAssessmentsComponent } from './admin/view/admin-assessments.component'
import { AdminAssessmentsOfClientComponent } from './admin/view/admin-assessmentsofclient.component'
import { AdminAssessmentVersionComponent } from './admin/view/admin-assessmentversion.component';
import { AdminAssessmentSubjectsComponent } from './admin/view/admin-assessmentsubjects.component';
import { AdminAssessmentSubjectStrandsComponent } from './admin/view/admin-assessmentsubjectstrands.component';
import { AdminAssessmentSubjectSubStrandsComponent } from './admin/view/admin-assessmentsubjectsubstrands.component';
import { AdminAssessmentLevelsComponent } from './admin/view/admin-assessmentlevels.component';
import { AssessmentUploadsComponent } from './admin/view/assessments-upload.component'
import { SchoolComparisonListComponent } from './admin/view/school.comparison.list.component'
import { TaxonomyTypeComponent } from './admin/view/taxonomy-type.component';
import { TaxonomyCategoryComponent } from './admin/view/taxonomy-category.component';
import { TaxonomySubCategoryComponent } from './admin/view/taxonomy-subcategory.component';
import { TaxonomyItemComponent } from './admin/view/taxonomy-item.component';
import { ManageRolesComponent } from './admin/view/manageroles.component';
import { ManageClientsComponent } from './admin/view/manageclients.component';
import { ManageUsersComponent } from './admin/view/manageusers.component';
import { ManageSchoolOfClientComponent } from './admin/view/manageschoolofclient.component';

import { SchoolComponent } from './configurations/view/school.component';
import { SchoolYearComponent } from './configurations/view/schoolyear.component';
import { ComparativeSchoolListComponent } from './configurations/view/comparativeschoollist.component';
import { ComparativeSchoolListItemComponent } from './configurations/view/comparativeschoollistitem.component';

export const routes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: 'embedded-report/:user/:pwd', component: EmbeddedLoginComponent },
    { path: '', component: HomeComponent, canActivate: [AuthGuard], data: { expectedRoles: [GlobalConstants.ROLE_CLIENT_USER, GlobalConstants.ROLE_ADMIN, GlobalConstants.ROLE_CLIENT_ADMIN], hasClientAccess: true } },

    //Dashboards
    { path: 'dashboard/:id/:name', component: DashboardComponent, canActivate: [AuthGuard], data: { expectedRoles: [GlobalConstants.ROLE_CLIENT_USER, GlobalConstants.ROLE_ADMIN, GlobalConstants.ROLE_CLIENT_ADMIN], hasClientAccess: true } },
    { path: 'categorypage/:typeid/:id/:subid/:itemid', component: CategoryPageComponent, canActivate: [AuthGuard], data: { hasClientAccess: true } },
    { path: 'student-information', component: EnrollmentOverviewComponent, canActivate: [AuthGuard], data: { hasClientAccess: true } },
    { path: 'enrollment-overview', component: EnrollmentOverviewComponent, canActivate: [AuthGuard], data: { hasClientAccess: true } },
    { path: 'attendance-overview', component: AttendanceOverviewComponent, canActivate: [AuthGuard], data: { hasClientAccess: true } },
    { path: 'assessments', component: AssessmentsSBACOverviewComponent, canActivate: [AuthGuard], data: { hasClientAccess: true } },
    { path: 'assessments/sbac-overview', component: AssessmentsSBACOverviewComponent, canActivate: [AuthGuard], data: { hasClientAccess: true } },
    { path: 'assessments/sbac-detail', component: AssessmentsSBACDetailComponent, canActivate: [AuthGuard], data: { hasClientAccess: true } },
    { path: 'assessments/pft-overview', component: AssessmentsPFTOverviewComponent, canActivate: [AuthGuard], data: { hasClientAccess: true } },
    { path: 'assessments/celdt-overview', component: AssessmentsCELDTOverviewComponent, canActivate: [AuthGuard], data: { hasClientAccess: true } },
    { path: 'assessments/nwea-overview', component: AssessmentsNWEAOverviewComponent, canActivate: [AuthGuard], data: { hasClientAccess: true } },
    { path: 'assessments/dora-adam-overview', component: AssessmentsDORAOverviewComponent, canActivate: [AuthGuard], data: { hasClientAccess: true } },
    { path: 'assessments/doma-overview', component: AssessmentsDOMAOverviewComponent, canActivate: [AuthGuard], data: { hasClientAccess: true } },

    //Reports
    { path: 'reports', component: ReportsComponent, canActivate: [AuthGuard] },
    { path: 'school-scorecards', component: SchoolScorecardsReportComponent, canActivate: [AuthGuard] },
    { path: 'school-scorecards/report', component: SchoolScorecardsReportComponent, canActivate: [AuthGuard] },

    { path: 'comparison-schools', component: CompareSBACScoresComponent, canActivate: [AuthGuard] },
    { path: 'comparison-schools/sbac-scores', component: CompareSBACScoresComponent, canActivate: [AuthGuard] },
    { path: 'comparison-schools/school-scorecards', component: CompareSchoolScorecardsComponent, canActivate: [AuthGuard] },
    { path: 'teacher-scorecards', component: TeacherScorecardsReportComponent, canActivate: [AuthGuard] },
    { path: 'teacher-scorecards/report', component: TeacherScorecardsReportComponent, canActivate: [AuthGuard] },
    { path: 'student-scorecards', component: StudentScorecardsReportComponent, canActivate: [AuthGuard] },
    { path: 'student-scorecards/report', component: StudentScorecardsReportComponent, canActivate: [AuthGuard] },
    { path: 'voice-schoolsurvey', component: VoiceOfTheSchoolSurveyReportComponent, canActivate: [AuthGuard] },


    //Admin pages
    { path: 'admin-configuration', component: AdminConfigurationComponent, canActivate: [AuthGuard], data: { expectedRoles: [GlobalConstants.ROLE_CLIENT_ADMIN, GlobalConstants.ROLE_ADMIN] } },

    { path: 'schoolyear/school', component: SchoolYearOfSchoolComponent, canActivate: [AuthGuard], data: { expectedRoles: [GlobalConstants.ROLE_CLIENT_ADMIN, GlobalConstants.ROLE_ADMIN] } },
    { path: 'schoolyear/grades', component: GradeInSchoolYearComponent, canActivate: [AuthGuard], data: { expectedRoles: [GlobalConstants.ROLE_CLIENT_ADMIN, GlobalConstants.ROLE_ADMIN] }},

    { path: 'enrollment-attendance', component: EnrollmentAndAttendanceComponentStudent, canActivate: [AuthGuard], data: { expectedRoles: [GlobalConstants.ROLE_CLIENT_ADMIN, GlobalConstants.ROLE_ADMIN] }},
    { path: 'enrollment-attendance/students', component: EnrollmentAndAttendanceComponentStudent, canActivate: [AuthGuard], data: { expectedRoles: [GlobalConstants.ROLE_CLIENT_ADMIN, GlobalConstants.ROLE_ADMIN] }},
    { path: 'enrollment-attendance/1st-period-teachers', component: EnrollmentAndAttendanceComponentPeriodTeacher, canActivate: [AuthGuard], data: { expectedRoles: [GlobalConstants.ROLE_CLIENT_ADMIN, GlobalConstants.ROLE_ADMIN] } },
    { path: 'enrollment-attendance/attendance', component: EnrollmentAndAttendanceComponentDailyAttendance, canActivate: [AuthGuard], data: { expectedRoles: [GlobalConstants.ROLE_CLIENT_ADMIN, GlobalConstants.ROLE_ADMIN] } },

    //{ path: 'admin-assessments', component: AdminAssessmentsComponent, canActivate: [AuthGuard], data: { expectedRoles: [GlobalConstants.ROLE_CLIENT_ADMIN] } },

    { path: 'admin-assessments-upload', component: AssessmentUploadsComponentSbac, canActivate: [AuthGuard], data: { expectedRoles: [GlobalConstants.ROLE_CLIENT_ADMIN, GlobalConstants.ROLE_ADMIN] } },
    { path: 'admin-assessments-upload/SBAC', component: AssessmentUploadsComponentSbac, canActivate: [AuthGuard], data: { expectedRoles: [GlobalConstants.ROLE_CLIENT_ADMIN, GlobalConstants.ROLE_ADMIN] }},
    { path: 'admin-assessments-upload/PFT', component: AssessmentUploadsComponentPft, canActivate: [AuthGuard], data: { expectedRoles: [GlobalConstants.ROLE_CLIENT_ADMIN, GlobalConstants.ROLE_ADMIN] }},
    { path: 'admin-assessments-upload/CELDT', component: AssessmentUploadsComponentCeldt, canActivate: [AuthGuard], data: { expectedRoles: [GlobalConstants.ROLE_CLIENT_ADMIN, GlobalConstants.ROLE_ADMIN] }},
    { path: 'admin-assessments-upload/NWEA', component: AssessmentUploadsComponentNwea, canActivate: [AuthGuard], data: { expectedRoles: [GlobalConstants.ROLE_CLIENT_ADMIN, GlobalConstants.ROLE_ADMIN] }},
    { path: 'admin-assessments-upload/ADAM', component: AssessmentUploadsComponentAdam, canActivate: [AuthGuard], data: { expectedRoles: [GlobalConstants.ROLE_CLIENT_ADMIN, GlobalConstants.ROLE_ADMIN] } },
    { path: 'admin-assessments-upload/DORA', component: AssessmentUploadsComponentDora, canActivate: [AuthGuard], data: { expectedRoles: [GlobalConstants.ROLE_CLIENT_ADMIN, GlobalConstants.ROLE_ADMIN] } },
    { path: 'admin-assessments-upload/DOMA', component: AssessmentUploadsComponentDoma, canActivate: [AuthGuard], data: { expectedRoles: [GlobalConstants.ROLE_CLIENT_ADMIN, GlobalConstants.ROLE_ADMIN] } },

    { path: 'school-comparison-list', component: SchoolComparisonListComponent, canActivate: [AuthGuard], data: { expectedRoles: [GlobalConstants.ROLE_CLIENT_ADMIN, GlobalConstants.ROLE_ADMIN] }},

    { path: 'admin', component: AdminComponent, canActivate: [AuthGuard] },
    { path: 'admin-assessments', component: AdminAssessmentsComponent, canActivate: [AuthGuard] },
    { path: 'admin-assessmentsofclient', component: AdminAssessmentsOfClientComponent, canActivate: [AuthGuard] },
    { path: 'admin-assessment-version', component: AdminAssessmentVersionComponent, canActivate: [AuthGuard] },
    { path: 'admin-assessment-subjects', component: AdminAssessmentSubjectsComponent, canActivate: [AuthGuard] },
    { path: 'admin-assessment-subject-strands', component: AdminAssessmentSubjectStrandsComponent, canActivate: [AuthGuard] },
    { path: 'admin-assessment-subject-sub-strands', component: AdminAssessmentSubjectSubStrandsComponent, canActivate: [AuthGuard] },
    { path: 'admin-assessment-levels', component: AdminAssessmentLevelsComponent, canActivate: [AuthGuard] },
    { path: 'taxonomy/type', component: TaxonomyTypeComponent, canActivate: [AuthGuard], data: { expectedRoles: [GlobalConstants.ROLE_ADMIN] } },
    { path: 'taxonomy/category/:typeid', component: TaxonomyCategoryComponent, canActivate: [AuthGuard], data: { expectedRoles: [GlobalConstants.ROLE_ADMIN] } },
    { path: 'taxonomy/subcategory/:typeid/:catid', component: TaxonomySubCategoryComponent, canActivate: [AuthGuard], data: { expectedRoles: [GlobalConstants.ROLE_ADMIN] } },
    { path: 'taxonomy/item/:typeid/:catid/:subcatid', component: TaxonomyItemComponent, canActivate: [AuthGuard], data: { expectedRoles: [GlobalConstants.ROLE_ADMIN] } },

    { path: 'admin/manageroles', component: ManageRolesComponent, canActivate: [AuthGuard] },
    { path: 'admin/manageclients', component: ManageClientsComponent, canActivate: [AuthGuard] },
    { path: 'admin/manageusers', component: ManageUsersComponent, canActivate: [AuthGuard] },
    { path: 'admin/manageschoolofclient', component: ManageSchoolOfClientComponent, canActivate: [AuthGuard] },
    
    //Configuration pages

    { path: 'configurations/school', component: SchoolComponent, canActivate: [AuthGuard] },
    { path: 'configurations/schoolyear', component: SchoolYearComponent, canActivate: [AuthGuard] },
    { path: 'configurations/comparativeschoollist', component: ComparativeSchoolListComponent, canActivate: [AuthGuard] },
    { path: 'configurations/comparativeschoollistitem/:id', component: ComparativeSchoolListItemComponent, canActivate: [AuthGuard] },

    //Theme routes
    //{ path: 'dashboard-theme', component: DashboardDemoComponent, canActivate: [AuthGuard], data: { expectedRole: GlobalConstants.ROLE_ADMIN } },
    //{ path: 'sample', component: SampleDemoComponent, canActivate: [AuthGuard] },
    //{ path: 'forms', component: FormsDemoComponent, canActivate: [AuthGuard] },
    //{ path: 'data', component: DataDemoComponent, canActivate: [AuthGuard] },
    //{ path: 'panels', component: PanelsDemoComponent, canActivate: [AuthGuard] },
    //{ path: 'overlays', component: OverlaysDemoComponent, canActivate: [AuthGuard] },
    //{ path: 'menus', component: MenusDemoComponent, canActivate: [AuthGuard] },
    //{ path: 'messages', component: MessagesDemoComponent, canActivate: [AuthGuard] },
    //{ path: 'misc', component: MiscDemoComponent, canActivate: [AuthGuard] },
    //{ path: 'empty', component: EmptyDemoComponent, canActivate: [AuthGuard] },
    //{ path: 'charts', component: ChartsDemoComponent, canActivate: [AuthGuard] },
    //{ path: 'file', component: FileDemoComponent, canActivate: [AuthGuard] },
    //{ path: 'utils', component: UtilsDemoComponent, canActivate: [AuthGuard] },
    //{ path: 'documentation', component: DocumentationComponent, canActivate: [AuthGuard] }
];

export const AppRoutes: ModuleWithProviders = RouterModule.forRoot(routes);
