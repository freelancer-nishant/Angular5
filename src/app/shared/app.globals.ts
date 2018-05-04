import { Injectable } from "@angular/core";
import { HttpParams} from '@angular/common/http';

@Injectable()

export class GlobalConstants {

    public static API_BASE_URL: string = 'https://devapi.charterforesight.com';

    public static ROLE_ADMIN: string = 'Admin';
    public static ROLE_CLIENT_ADMIN: string = 'Client_Admin';
    public static ROLE_CLIENT_USER: string = 'ClientUser';
    public static ROLE_GUEST: string = 'Guest';



}

export enum MenuType {
    StudentInformation,
    Assessment,

    SchoolScorecard,
    ComparisonSchools,
    TeacherScorecards,
    StudentScorecards,
    VoiceOfTheSchoolSurveys,

    SchoolConfiguration,
    SchoolInSchoolYear,
    EnrollmentAndAttendance,
    AdminAssessments,
    AssessmentUploads,
    SchoolComparisonList
}
export class GlobalHelper {
    public static getCategories(menufor: MenuType): any[] {
        let categories: any[] = []
        switch (menufor) {
            case MenuType.StudentInformation:
            case MenuType.Assessment:
                categories = [
                    { name: 'Student Information', route: "#/student-information" },
                    { name: 'Assesments', route: "#/assessments" }
                ];
                break;
            case MenuType.SchoolScorecard:
            case MenuType.ComparisonSchools:
            case MenuType.TeacherScorecards:
            case MenuType.StudentScorecards:
            case MenuType.VoiceOfTheSchoolSurveys:
                categories = [
                    { name: 'School Scorecards (Sample)', route: "#/school-scorecards" },
                    { name: 'Comparison Schools (Sample)', route: "#/comparison-schools" },
                    { name: 'Teacher Scorecards (Sample)', route: "#/teacher-scorecards" },
                    { name: 'Students Scorecards (Sample)', route: "#/student-scorecards" },
                    { name: 'Voice of the School Surveys (Sample)', route: "#/voice-schoolsurvey" }
                ];
                break;
            case MenuType.SchoolInSchoolYear:
            case MenuType.EnrollmentAndAttendance:
            case MenuType.AdminAssessments:
            case MenuType.AssessmentUploads:
            case MenuType.SchoolComparisonList:
                categories = [
                    { name: 'School in School Year', route: "#/schoolyear/school" },
                    { name: 'Enrollment & Attendance', route: "#/enrollment-attendance" },
                    { name: 'Assessments', route: "#/admin-assessments" },
                    { name: 'Assessment Uploads', route: "#/admin-assessments-upload" },
                    { name: 'School Comparison List', route: "#/school-comparison-list" },
                ];
                break;
            default:
        }

        return categories;
    }

    public static getSideMenuTitle(menufor: MenuType): any {
        let sideMenuInfo: any = {};

        switch (menufor) {
            case MenuType.StudentInformation:
                sideMenuInfo = {
                    icon: './assets/layout/images/dashboard/student-information.png',
                    name: "Student Information"
                };
                break;
            case MenuType.Assessment:
                sideMenuInfo = {
                    icon: './assets/layout/images/dashboard/assessments.png',
                    name: "Assessments"
                }
                break;
            case MenuType.SchoolScorecard:
                sideMenuInfo = {
                    icon: './assets/layout/images/report/school-scorecard.png',
                    name: "School Scorecards (Sample)"
                }
                break;
            case MenuType.ComparisonSchools:
                sideMenuInfo = {
                    icon: './assets/layout/images/report/comparison-schools.png',
                    name: "Comparison Schools (Sample)"
                }
                break;
            case MenuType.TeacherScorecards:
                sideMenuInfo = {
                    icon: './assets/layout/images/report/school-scorecard.png',
                    name: "Teacher Scorecards (Sample)"
                }
                break;
            case MenuType.StudentScorecards:
                sideMenuInfo = {
                    icon: './assets/layout/images/report/school-scorecard.png',
                    name: "Student Scorecards (Sample)"
                }
                break;
            case MenuType.VoiceOfTheSchoolSurveys:
                sideMenuInfo = {
                    icon: './assets/layout/images/report/voice-survey.png',
                    name: "Voice of the School Surveys (Sample)"
                }
                break;
            case MenuType.SchoolInSchoolYear:
                sideMenuInfo = {
                    icon: './assets/layout/images/admin/calendar.png',
                    name: "School in School Year"
                }
                break;
            case MenuType.EnrollmentAndAttendance:
                sideMenuInfo = {
                    icon: './assets/layout/images/admin/studentinfo.png',
                    name: "Enrollment & Attendance"
                }
                break;
            case MenuType.AdminAssessments:
                sideMenuInfo = {
                    icon: './assets/layout/images/admin/assessment.png',
                    name: "Assessments"
                }
                break;
            case MenuType.AssessmentUploads:
                sideMenuInfo = {
                    icon: './assets/layout/images/admin/uploads.png',
                    name: "Assessment Uploads"
                }
                break;
            case MenuType.SchoolComparisonList:
                sideMenuInfo = {
                    icon: './assets/layout/images/admin/comparative-school-list.png',
                    name: "School Comparison List"
                }
                break;

            default:
        }

        sideMenuInfo.categories = this.getCategories(menufor);

        return sideMenuInfo;

    }

    public static getMenuItems(menufor: MenuType): any[] {

        let menuItems: any[] = [];
        switch (menufor) {
            case MenuType.StudentInformation:
                menuItems = [
                    {
                        label: 'Enrollment', icon: 'fa fa-fw fa-indent',
                        items: [
                            { label: 'Enrollment Overview', icon: '', routerLink: ['/enrollment-overview'] },
                        ]
                    },
                    {
                        label: 'Attendance', icon: 'fa fa-fw fa-check',
                        items: [
                            { label: 'Attendance Overview', icon: '', routerLink: ['/attendance-overview'] },
                        ]
                    }
                ];
                break;
            case MenuType.Assessment:
                menuItems = [
                    {
                        label: 'SBAC', icon: 'fa fa-fw fa-sitemap',
                        items: [
                            { label: 'SBAC Overview', icon: 'fa fa-fw fa-columns', routerLink: ['/assessments/sbac-overview'] },
                            { label: 'SBAC Detail', icon: 'fa fa-fw fa-columns', routerLink: ['/assessments/sbac-detail'] },
                        ]
                    },
                    {
                        label: 'Physical Fitness Test', icon: 'fa fa-fw fa-sitemap',
                        items: [
                            { label: 'PFT Overview', icon: 'fa fa-fw fa-columns', routerLink: ['/assessments/pft-overview'] },
                        ]
                    },
                    {
                        label: 'English Proficiency', icon: 'fa fa-fw fa-sitemap',
                        items: [
                            { label: 'CELDT Overview', icon: 'fa fa-fw fa-columns', routerLink: ['/assessments/celdt-overview'] },
                        ]
                    },
                    {
                        label: 'NWEA', icon: 'fa fa-fw fa-sitemap',
                        items: [
                            { label: 'NWEA Overview', icon: 'fa fa-fw fa-columns', routerLink: ['/assessments/nwea-overview'] },
                        ]
                    },
                    {
                        label: 'Let\'s Go Learn', icon: 'fa fa-fw fa-sitemap',
                        items: [
                            { label: 'DORA / ADAM Overview', icon: 'fa fa-fw fa-columns', routerLink: ['/assessments/dora-adam-overview'] },
                            { label: 'DOMA Overview', icon: 'fa fa-fw fa-columns', routerLink: ['/assessments/doma-overview'] },
                        ]
                    }
                ];
                break;
            case MenuType.SchoolScorecard:
                menuItems = [
                    {
                        label: 'School Scorecards', icon: 'fa fa-fw fa-bar-chart',
                        items: [
                            { label: 'School Scorecards', icon: '', routerLink: ['/school-scorecards/report'] },
                        ]
                    }
                ];
                break;
            case MenuType.ComparisonSchools:
                menuItems = [
                    {
                        label: 'Comparison Schools', icon: 'fa fa-fw fa-bar-chart',
                        items: [
                            { label: 'Compare SBAC Scores', routerLink: ['/comparison-schools/sbac-scores'] },
                            { label: 'Compare School Scorecards', routerLink: ['/comparison-schools/school-scorecards'] },
                        ]
                    }
                ];
                break;
            case MenuType.TeacherScorecards:
                menuItems = [
                    {
                        label: 'Teacher Scorecards', icon: 'fa fa-fw fa-bar-chart',
                        items: [
                            { label: 'Teacher Scorecards', icon: '', routerLink: ['/teacher-scorecards/report'] },
                        ]
                    }
                ];
                break;
            case MenuType.StudentScorecards:
                menuItems = [
                    {
                        label: 'Student Scorecards', icon: 'fa fa-fw fa-bar-chart',
                        items: [
                            { label: 'Student Scorecards', icon: '', routerLink: ['/student-scorecards/report'] },
                        ]
                    }
                ];
                break;
            case MenuType.VoiceOfTheSchoolSurveys:
                menuItems = [
                    {
                        label: 'Voice of the School Surveys', icon: 'fa fa-fw fa-bar-chart',
                        items: [
                            { label: 'Voice of the School Surveys', icon: '', routerLink: ['/voice-schoolsurvey'] },
                        ]
                    }
                ];
                break;
            case MenuType.SchoolInSchoolYear:
            case MenuType.EnrollmentAndAttendance:
            case MenuType.AdminAssessments:
            case MenuType.AssessmentUploads:
            case MenuType.SchoolComparisonList:
                menuItems = [
                    {
                        label: 'School in School Year', icon: 'fa fa-fw fa-bar-chart',
                        items: [
                            { label: 'School Year of School', icon: 'fa fa-fw fa-columns', routerLink: ['/schoolyear/school'] },
                            { label: 'Semester in School Year', icon: 'fa fa-fw fa-columns', routerLink: ['/schoolyear/semester'] },
                            { label: 'Grades in School Year', icon: 'fa fa-fw fa-columns', routerLink: ['/schoolyear/grades'] },
                            { label: 'Teachers in School Year', icon: 'fa fa-fw fa-columns', routerLink: ['/schoolyear/teachers'] },
                            { label: 'Days in School Year', icon: 'fa fa-fw fa-columns', routerLink: ['/schoolyear/days'] }
                        ]
                    },
                    {
                        label: 'Enrollment & Attendance', icon: 'fa fa-fw fa-bar-chart', 
                        items: [
                            { label: 'Students', icon: 'fa fa-fw fa-columns', routerLink: ['/schoolyear/school'] },
                            { label: '1st Period Teachers', icon: 'fa fa-fw fa-columns', routerLink: ['/schoolyear/semester'] },
                            { label: 'Daily Attendance', icon: 'fa fa-fw fa-columns', routerLink: ['/schoolyear/grades'] }
                        ]
                    },
                    {
                        label: 'Assessments', icon: 'fa fa-fw fa-bar-chart',
                        items: [
                            { label: 'Assessments of School', icon: 'fa fa-fw fa-columns', routerLink: ['/schoolyear/school'] },
                            { label: 'Assessments in School Year', icon: 'fa fa-fw fa-columns', routerLink: ['/schoolyear/semester'] }
                        ]
                    },
                    {
                        label: 'Assessment Uploads', icon: 'fa fa-fw fa-bar-chart',
                        items: [
                            { label: 'SBAC Summative', icon: 'fa fa-fw fa-columns', routerLink: ['/schoolyear/school'] },
                            { label: 'SBAC Interim', icon: 'fa fa-fw fa-columns', routerLink: ['/schoolyear/semester'] },
                            { label: 'Physical Fitness Test', icon: 'fa fa-fw fa-columns', routerLink: ['/schoolyear/grades'] },
                            { label: 'CELDT', icon: 'fa fa-fw fa-columns', routerLink: ['/schoolyear/teachers'] },
                            { label: 'NWEA', icon: 'fa fa-fw fa-columns', routerLink: ['/schoolyear/days'] },
                            { label: 'LGL - ADAM', icon: 'fa fa-fw fa-columns', routerLink: ['/schoolyear/days'] },
                            { label: 'LGL - DORA', icon: 'fa fa-fw fa-columns', routerLink: ['/schoolyear/days'] },
                            { label: 'LGL - DOMA Algebra', icon: 'fa fa-fw fa-columns', routerLink: ['/schoolyear/days'] }
                        ]
                    },
                    {
                        label: 'Comparison School Lists', icon: 'fa fa-fw fa-bar-chart',
                        items: [
                            { label: 'Manage Comparison School Lists', icon: 'fa fa-fw fa-columns', routerLink: ['/schoolyear/school'] }
                        ]
                    }
                ];
                break;
            default:
        }

        return menuItems;
    }

    public static toHttpParams(obj: any): HttpParams {
        let params = new HttpParams();
        for (const key in obj) {
            if (obj.hasOwnProperty(key)) {
                const val = obj[key];
                if (val !== null && val !== undefined) {
                    params = params.append(key, val.toString());
                }
            }
        }
        return params;
    }

    public static loadScript(key: string, url: string) {
        var isFound = false;
        var scripts = document.getElementsByTagName("script")
        for (var i = 0; i < scripts.length; ++i) {
            if (scripts[i].getAttribute('src') != null && scripts[i].getAttribute('src').includes(key)) {
                isFound = true;
            }
        }

        if (!isFound) {
            var dynamicScripts = [url];

            for (var i = 0; i < dynamicScripts.length; i++) {
                let node = document.createElement('script');
                node.src = dynamicScripts[i];
                node.type = 'text/javascript';
                node.async = false;
                node.charset = 'utf-8';
                document.getElementsByTagName('head')[0].appendChild(node);
            }

        }
    }
}