import { Component, OnInit } from '@angular/core';
import { AppComponent } from '../../../app.component';

@Component({
    templateUrl: './assessments.component.html',
    styleUrls: ['./assessments.component.css']
})

export class AssessmentsComponent implements OnInit {

    constructor(public app: AppComponent) {
        app.displayLeftMenu(true);
        app.LeftMenuItems = [
            {
                label: 'SBAC', icon: 'fa fa-fw fa-sitemap',
                items: [
                    { label: 'SBAC Overview', icon: 'fa fa-fw fa-columns', routerLink: ['/enrollment-overview'] },
                    { label: 'SBAC Detail', icon: 'fa fa-fw fa-columns', routerLink: ['/enrollment-details'] },
                ]
            },
            {
                label: 'Physical Fitness Test', icon: 'fa fa-fw fa-sitemap',
                items: [
                    { label: 'PFT Overview', icon: 'fa fa-fw fa-columns', routerLink: ['/enrollment-details'] },
                ]
            },
            {
                label: 'English Proficiency', icon: 'fa fa-fw fa-sitemap',
                items: [
                    { label: 'CELDT Overview', icon: 'fa fa-fw fa-columns', routerLink: ['/enrollment-details'] },
                ]
            },
            {
                label: 'NWEA', icon: 'fa fa-fw fa-sitemap',
                items: [
                    { label: 'NWEA Overview', icon: 'fa fa-fw fa-columns', routerLink: ['/enrollment-details'] },
                ]
            },
            {
                label: 'Let\'s Go Learn', icon: 'fa fa-fw fa-sitemap',
                items: [
                    { label: 'DORA / ADAM Overview', icon: 'fa fa-fw fa-columns', routerLink: ['/enrollment-details'] },
                    { label: 'DOMA Overview', icon: 'fa fa-fw fa-columns', routerLink: ['/enrollment-details'] },
                ]
            }
        ];

        app.pageProfile = {
            icon: './assets/layout/images/dashboard/assessments.png',
            name:"Assessments"
        }
    }

    ngOnInit() {

    }
}
