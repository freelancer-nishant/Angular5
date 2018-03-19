import { Injectable } from "@angular/core";
import { HttpParams } from '@angular/common/http';

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

    SchoolComparisonList
}

export class GlobalHelper {
    public static getCategories(menufor: MenuType): any[] {
        let categories:any[] = []
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
                categories = [
                    { name: 'School Scorecards', route: "#/school-scorecards" },
                    { name: 'Comparison Schools', route: "#/comparison-schools" },
                    { name: 'Teacher Scorecards', route: "#/teacher-scorecards" },
                    { name: 'Students Scorecards', route: "#/student-scorecards" }
                ];
                break;
            case MenuType.SchoolComparisonList:
                categories = [
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
                    name: "School Scorecards"                    
                }
                break;
            case MenuType.ComparisonSchools:
                sideMenuInfo = {
                    icon: './assets/layout/images/report/comparison-schools.png',
                    name: "Comparison Schools"
                }
                break;
            case MenuType.TeacherScorecards:
                sideMenuInfo = {
                    icon: './assets/layout/images/report/school-report-card.png',
                    name: "Teacher Scorecards"                    
                }
                break;           
            case MenuType.StudentScorecards:
                sideMenuInfo = {
                    icon: './assets/layout/images/report/school-report-card.png',
                    name: "Student Scorecards"
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
                            { label: 'Compare SBAC Scores', icon: 'fa fa-fw fa-columns', routerLink: ['/comparison-schools/sbac-scores'] },
                            { label: 'Compare School Scorecards', icon: 'fa fa-fw fa-columns', routerLink: ['/comparison-schools/school-scorecards'] },
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

            case MenuType.SchoolComparisonList:
                menuItems = [
                    {
                        label: 'Comparison School Lists', icon: 'fa fa-fw fa-bar-chart', routerLink: ['/school-comparison-list']
                        //items: [
                        //    { label: 'Add/Update Comparison School Lists', icon: '', routerLink: ['/school-comparison-list'] },
                        //]
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
}