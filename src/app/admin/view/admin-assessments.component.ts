import { Component, OnInit } from '@angular/core';
import { AppComponent } from '../../app.component';
import { GlobalHelper, MenuType } from './../../shared/app.globals';

@Component({
    templateUrl: './admin-assessments.component.html'
})
export class AdminAssessmentsComponent implements OnInit {

    constructor(public app: AppComponent) {
        app.displayLeftMenu(true);
        app.activeCategoryDropdown = true;        
        app.pageProfile = GlobalHelper.getSideMenuTitle(MenuType.AdminAssessments);
        app.LeftMenuItems = GlobalHelper.getMenuItems(MenuType.AdminAssessments);

    }

    ngOnInit() {
    }
}
