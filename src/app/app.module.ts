import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';
import { AppRoutes } from './app.routes';
import 'rxjs/add/operator/toPromise';

import { AccordionModule } from 'primeng/primeng';
import { AutoCompleteModule } from 'primeng/primeng';
import { BreadcrumbModule } from 'primeng/primeng';
import { ButtonModule } from 'primeng/primeng';
import { CalendarModule } from 'primeng/primeng';
import { CarouselModule } from 'primeng/primeng';
import { ColorPickerModule } from 'primeng/primeng';
import { ChartModule } from 'primeng/primeng';
import { CheckboxModule } from 'primeng/primeng';
import { ChipsModule } from 'primeng/primeng';
import { CodeHighlighterModule } from 'primeng/primeng';
import { ConfirmDialogModule } from 'primeng/primeng';
import { SharedModule } from 'primeng/primeng';
import { ContextMenuModule } from 'primeng/primeng';
import { DataGridModule } from 'primeng/primeng';
import { DataListModule } from 'primeng/primeng';
import { DataScrollerModule } from 'primeng/primeng';
import { DataTableModule } from 'primeng/primeng';
import { DialogModule } from 'primeng/primeng';
import { DragDropModule } from 'primeng/primeng';
import { DropdownModule } from 'primeng/primeng';
import { EditorModule } from 'primeng/primeng';
import { FieldsetModule } from 'primeng/primeng';
import { FileUploadModule } from 'primeng/primeng';
import { GalleriaModule } from 'primeng/primeng';
import { GMapModule } from 'primeng/primeng';
import { GrowlModule } from 'primeng/primeng';
import { InputMaskModule } from 'primeng/primeng';
import { InputSwitchModule } from 'primeng/primeng';
import { InputTextModule } from 'primeng/primeng';
import { InputTextareaModule } from 'primeng/primeng';
import { LightboxModule } from 'primeng/primeng';
import { ListboxModule } from 'primeng/primeng';
import { MegaMenuModule } from 'primeng/primeng';
import { MenuModule } from 'primeng/primeng';
import { MenubarModule } from 'primeng/primeng';
import { MessagesModule } from 'primeng/primeng';
import { MultiSelectModule } from 'primeng/primeng';
import { OrderListModule } from 'primeng/primeng';
import { OrganizationChartModule } from 'primeng/primeng';
import { OverlayPanelModule } from 'primeng/primeng';
import { PaginatorModule } from 'primeng/primeng';
import { PanelModule } from 'primeng/primeng';
import { PanelMenuModule } from 'primeng/primeng';
import { PasswordModule } from 'primeng/primeng';
import { PickListModule } from 'primeng/primeng';
import { ProgressBarModule } from 'primeng/primeng';
import { RadioButtonModule } from 'primeng/primeng';
import { RatingModule } from 'primeng/primeng';
import { ScheduleModule } from 'primeng/primeng';
import { SelectButtonModule } from 'primeng/primeng';
import { SlideMenuModule } from 'primeng/primeng';
import { SliderModule } from 'primeng/primeng';
import { SpinnerModule } from 'primeng/primeng';
import { SplitButtonModule } from 'primeng/primeng';
import { StepsModule } from 'primeng/primeng';
import { TabMenuModule } from 'primeng/primeng';
import { TabViewModule } from 'primeng/primeng';
import { TerminalModule } from 'primeng/primeng';
import { TieredMenuModule } from 'primeng/primeng';
import { ToggleButtonModule } from 'primeng/primeng';
import { ToolbarModule } from 'primeng/primeng';
import { TooltipModule } from 'primeng/primeng';
import { TreeModule } from 'primeng/primeng';
import { TreeTableModule } from 'primeng/primeng';
import { MessageService } from 'primeng/components/common/messageservice';

import { AppComponent } from './app.component';
import { AppMenuComponent, AppSubMenuComponent } from './app.menu.component';
import { AppTopBarComponent } from './app.topbar.component';
import { AppClientTopBarComponent } from './app.client.topbar.component';
import { AppFooterComponent } from './app.footer.component';
import { ExportComponent } from './export.component';

//import { AppProfileComponent } from './app.profile.component';


import { AppPageProfileComponent } from './app.page-profile.component';
import { AppHotizontalMenuComponent } from './app.hotizontal.menu.component';


import { LoginComponent } from './dashboards/login.component';
import { EmbeddedLoginComponent } from './dashboards/embedded.login.component';

import { DashboardComponent } from './dashboards/dashboard.component'
import { HomeComponent } from './dashboards/home.component'
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
import { VoiceOfTheSchoolSurveyReportComponent } from './reports/view/voice.schoolsurvey.report.component'

import { AdminConfigurationComponent } from './admin/view/admin.configuration.component'
import { SchoolinSchoolYearComponent } from './admin/view/schoolin-schoolyear.component'
import { SchoolYearOfSchoolComponent } from './admin/view/schoolyear-school.component'
import { GradeInSchoolYearComponent } from './admin/view/schoolyear-grade.component'
import { EnrollmentAndAttendanceComponent } from './admin/view/enrollment-attendance.component'
import { AdminAssessmentsComponent } from './admin/view/admin-assessments.component'
import { AssessmentUploadsComponent } from './admin/view/assessments-upload.component'
import { SchoolComparisonListComponent } from './admin/view/school.comparison.list.component'

import { SchoolComponent } from './configurations/view/school.component'


import { SchoolYearGradeFilter } from './dashboards/filters/school-year-grade-filter';
import { SchoolYearGradeTestFilter } from './dashboards/filters/school-year-grade-test-filter';
import { AssesmentSchoolYearGradeFilter } from './dashboards/filters/assesment-school-year-grade-filter';
import { CompareSchoolYearFilter } from './dashboards/filters/compare-school-year-filter';
import { SchoolYearFilter } from './dashboards/filters/school-year-filter';

import { VJSComponent } from './vjs.component'
import { TranslateComponent } from './translate-component'


import { VJSConfig } from './shared/services/vjsconfig.service';

import { HttpClient } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';
import { NgHttpLoaderModule } from 'ng-http-loader/ng-http-loader.module';//Added

//services
import { LoginService } from './shared/services/loginservice';
import { SchoolService } from './shared/services/school.service';
import { SchoolYearService } from './shared/services/school.year.service';
import { SchoolGradeService } from './shared/services/school.grade.service';
import { ComparativeListService } from './shared/services/comparativelist.service'
import { CommonService } from './shared/services/Common.service'
import { TaxonomyService } from './shared/services/taxonomy.service'
import { SemesterInSchoolYearService } from './shared/services/semester.inschoolyear.service'
import { GradeService } from './shared/services/grade.service'
import { DaysInSchoolYearService } from './shared/services/days.inschoolyear.service'

import { TestService } from './shared/services/test.service'
import { TestVersionService } from './shared/services/testversion.service'
import { JwtModule, JwtHelperService } from '@auth0/angular-jwt';
import { AuthService } from './shared/services/auth.service';
import { AuthGuardService } from './shared/services/auth-guard.service';


@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        AppRoutes,
        HttpModule,
        HttpClientModule,
        NgHttpLoaderModule,
        BrowserAnimationsModule,
        AccordionModule,
        AutoCompleteModule,
        BreadcrumbModule,
        ButtonModule,
        CalendarModule,
        CarouselModule,
        ColorPickerModule,
        ChartModule,
        CheckboxModule,
        ChipsModule,
        CodeHighlighterModule,
        ConfirmDialogModule,
        SharedModule,
        ContextMenuModule,
        DataGridModule,
        DataListModule,
        DataScrollerModule,
        DataTableModule,
        DialogModule,
        DragDropModule,
        DropdownModule,
        EditorModule,
        FieldsetModule,
        FileUploadModule,
        GalleriaModule,
        GMapModule,
        GrowlModule,
        InputMaskModule,
        InputSwitchModule,
        InputTextModule,
        InputTextareaModule,
        LightboxModule,
        ListboxModule,
        MegaMenuModule,
        MenuModule,
        MenubarModule,
        MessagesModule,
        MultiSelectModule,
        OrderListModule,
        OrganizationChartModule,
        OverlayPanelModule,
        PaginatorModule,
        PanelModule,
        PanelMenuModule,
        PasswordModule,
        PickListModule,
        ProgressBarModule,
        RadioButtonModule,
        RatingModule,
        ScheduleModule,
        SelectButtonModule,
        SlideMenuModule,
        SliderModule,
        SpinnerModule,
        SplitButtonModule,
        StepsModule,
        TabMenuModule,
        TabViewModule,
        TerminalModule,
        TieredMenuModule,
        ToggleButtonModule,
        ToolbarModule,
        TooltipModule,
        TreeModule,
        TreeTableModule,

        JwtModule.forRoot({
            config: {
                tokenGetter: () => {
                    //let jwtHelper = new JwtHelperService({
                    //    tokenGetter: () => {
                    //        if (sessionStorage.getItem('isClientPage') == "true")
                    //            return sessionStorage.getItem('token');
                    //        else
                    //            return localStorage.getItem('token');
                    //    }
                    //});

                    if (sessionStorage.getItem('isClientPage') == "true") {
                        //if (jwtHelper.isTokenExpired()) {
                        //    console.log('call');
                        //    //LoginService.getRefreshToken(sessionStorage.getItem('refreshtoken'))
                        //}

                        return sessionStorage.getItem('token');
                    }
                    else
                        return localStorage.getItem('token');
                },
                whitelistedDomains: ['devapi.charterforesight.com'],
                skipWhenExpired: true
                //,throwNoTokenError: true
            }
        })
    ],
    declarations: [
        AppComponent,
        AppMenuComponent,
        AppSubMenuComponent,
        AppTopBarComponent,
        AppClientTopBarComponent,
        AppFooterComponent,
        ExportComponent,
        //AppProfileComponent,

        AppPageProfileComponent,
        AppHotizontalMenuComponent,

        LoginComponent,
        EmbeddedLoginComponent,
        HomeComponent,
        DashboardComponent,
        CategoryPageComponent,

        StudentInformationComponent,
        EnrollmentOverviewComponent,
        AttendanceOverviewComponent,
        AssessmentsSBACOverviewComponent,
        AssessmentsSBACDetailComponent,
        AssessmentsPFTOverviewComponent,
        AssessmentsCELDTOverviewComponent,
        AssessmentsNWEAOverviewComponent,
        AssessmentsDORAOverviewComponent,
        AssessmentsDOMAOverviewComponent,
        AssessmentsComponent,

        ReportsComponent,
        SchoolScorecardsComponent,
        SchoolScorecardsReportComponent,
        ComparisonSchoolsComponent,
        CompareSBACScoresComponent,
        CompareSchoolScorecardsComponent,
        TeacherScorecardsComponent,
        TeacherScorecardsReportComponent,
        StudentScorecardsComponent,
        StudentScorecardsReportComponent,
        VoiceOfTheSchoolSurveyReportComponent,

        AdminConfigurationComponent,
        SchoolinSchoolYearComponent,
        SchoolYearOfSchoolComponent,
        GradeInSchoolYearComponent,
        EnrollmentAndAttendanceComponent,
        AdminAssessmentsComponent,
        AssessmentUploadsComponent,
        SchoolComparisonListComponent,

        SchoolYearGradeFilter,
        SchoolYearGradeTestFilter,
        AssesmentSchoolYearGradeFilter,
        CompareSchoolYearFilter,
        SchoolYearFilter,
        SchoolComponent,
        VJSComponent,
        TranslateComponent
    ],
    providers: [
        { provide: LocationStrategy, useClass: HashLocationStrategy },
        HttpClient,
        LoginService, SchoolService, SchoolYearService, SchoolGradeService, TestService, TestVersionService, ComparativeListService,
        CommonService, TaxonomyService, SemesterInSchoolYearService, GradeService, DaysInSchoolYearService,
        MessageService,
        JwtHelperService, AuthService, AuthGuardService,
        VJSConfig
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
