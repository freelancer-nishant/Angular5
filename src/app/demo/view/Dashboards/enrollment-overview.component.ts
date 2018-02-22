import { Component, OnInit } from '@angular/core';
import { AppComponent } from '../../../app.component';

import { SelectItem } from 'primeng/primeng';

@Component({
    templateUrl: './enrollment-overview.component.html',
    styleUrls: ['./enrollment-overview.component.css']
})

export class EnrollmentOverviewComponent implements OnInit {

    schools: SelectItem[];

    selectedSchool: any;

    schoolYears: SelectItem[];
    selectedYear: any;

    grade: SelectItem[];
    selectedGrades: any[] = [];

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
                    { label: 'Attendance Overview', icon: 'fa fa-fw fa-columns', routerLink: ['/'] },
                ]
            }
        ];

        app.pageProfile = {
            icon: './assets/layout/images/dashboard/student-information.png',
            name:"Enrollment Overview"
        }
    }

    ngOnInit() {

        //Schools
        this.schools = [];
        this.schools.push({ label: 'Select School', value: 0 });
        //this.schools.push({ label: 'Alta Public Schools', value: { id: 1, name: 'Alta Public Schools', code: 'APC' } });
        this.schools.push({ label: 'Alta Public Schools', value: { id: 1, name: 'Alta Public Schools' } });
        this.schools.push({ label: 'ABC Public Schools', value: { id: 2, name: 'ABC Public Schools' } });

        //SchoolYears
        this.schoolYears = [];
        this.schoolYears.push({ label: 'Select Year', value: 0 });        
        this.schoolYears.push({ label: '2014-2015', value: { id: 1, name: '2014-2015' } });
        this.schoolYears.push({ label: '2015-2016', value: { id: 2, name: '2015-2016' } });
        this.schoolYears.push({ label: '2016-2017', value: { id: 3, name: '2016-2017' } });
        this.schoolYears.push({ label: '2017-2018', value: { id: 4, name: '2017-2018' } });

        //Grade
        this.grade = [];        
        this.grade.push({ label: '1', value: { id: 1, name: '1' } });
        this.grade.push({ label: '2', value: { id: 2, name: '2' } });
        this.grade.push({ label: '3', value: { id: 3, name: '3' } });
        this.grade.push({ label: '4', value: { id: 4, name: '4' } });
        this.grade.push({ label: '5', value: { id: 5, name: '5' } });
        this.grade.push({ label: '6', value: { id: 6, name: '6' } });
        this.grade.push({ label: '7', value: { id: 7, name: '7' } });
        this.grade.push({ label: '8', value: { id: 8, name: '8' } });
    }
}
