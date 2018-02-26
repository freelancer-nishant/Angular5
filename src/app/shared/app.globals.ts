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
    Assessment
}

export class GlobalHelper {

    public static getMenuItems(menufor: MenuType): any[] {

        let menuItems: any[] = [];
        switch (menufor) {
            case MenuType.StudentInformation:
                menuItems = [
                    {
                        label: 'Enrollment', icon: 'fa fa-fw fa-sitemap',
                        items: [
                            { label: 'Enrollment Overview', icon: 'fa fa-fw fa-columns', routerLink: ['/enrollment-overview'] },
                        ]
                    },
                    {
                        label: 'Attendance', icon: 'fa fa-fw fa-sitemap',
                        items: [
                            { label: 'Attendance Overview', icon: 'fa fa-fw fa-columns', routerLink: ['/attendance-overview'] },
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