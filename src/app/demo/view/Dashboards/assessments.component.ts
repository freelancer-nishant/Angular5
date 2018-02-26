import { Component, OnInit } from '@angular/core';
import { AppComponent } from '../../../app.component';
import { GlobalHelper, MenuType } from './../../../shared/app.globals';

@Component({
    templateUrl: './assessments.component.html',
    styleUrls: ['./assessments.component.css']
})

export class AssessmentsComponent implements OnInit {

    constructor(public app: AppComponent) {
        app.displayLeftMenu(true);
        app.activeCategoryDropdown = true;
        app.LeftMenuItems = GlobalHelper.getMenuItems(MenuType.Assessment);

        app.pageProfile = {
            icon: './assets/layout/images/dashboard/assessments.png',
            name:"Assessments"
        }
    }

    ngOnInit() {

    }
}
