import { Component, OnInit } from '@angular/core';
import { AppComponent } from '../../../app.component';

@Component({
    templateUrl: './student-information.component.html',
    styleUrls: ['./student-information.component.css']
})

export class StudentInformationComponent implements OnInit {

    constructor(public app: AppComponent) {
        app.displayLeftMenu(true);
        app.activeCategoryDropdown = true;
        app.LeftMenuItems = [
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

        app.pageProfile = {
            icon: './assets/layout/images/dashboard/student-information.png',
            name:"Student Information"
        }
    }

    ngOnInit() {

    }
}
