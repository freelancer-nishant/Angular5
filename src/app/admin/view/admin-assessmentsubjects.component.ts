import { Component, OnInit } from '@angular/core';
import { AppComponent } from '../../app.component';
import { GlobalHelper, MenuType } from './../../shared/app.globals';
import { AssessmentService } from './../../shared/services/assessment.service';

@Component({
    templateUrl: './admin-assessmentsubjects.component.html'
})
export class AdminAssessmentSubjectsComponent implements OnInit {
    constructor(public app: AppComponent) {
        this.app.displayLeftMenu(true);
        this.app.activeCategoryDropdown = true;
        this.app.pageProfile = GlobalHelper.getSideMenuTitle(MenuType.Assessments);
        this.app.LeftMenuItems = GlobalHelper.getMenuItems(MenuType.Assessments);
    }

    ngOnInit() {
    }
}
