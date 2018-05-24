import { Component, OnInit, ViewChild } from '@angular/core';
import { AppComponent } from '../../app.component';
import { GlobalHelper, MenuType } from './../../shared/app.globals';
import { SchoolYearGradeFilter } from './../filters/school-year-grade-filter';

@Component({
    templateUrl: './assessments-celdt-overview.component.html'
})

export class AssessmentsCELDTOverviewComponent implements OnInit {
    @ViewChild(SchoolYearGradeFilter) child: SchoolYearGradeFilter;
    parameters: {};

    constructor(public app: AppComponent) {
        this.app.displayLeftMenu(true);
        this.app.activeCategoryDropdown = true;
        this.app.LeftMenuItems = GlobalHelper.getMenuItems(MenuType.Assessment);
        this.app.LeftMenuItems = GlobalHelper.getMenuItems(MenuType.Assessment);
    }

    ngOnInit() {
    }
    submit() {
        this.parameters = JSON.stringify({
            "client_id": [this.child.sessionInfo.client_id],
            "School_Year_CELDT": [this.child.selectedYear],
            "School_CELDT": [this.child.selectedSchool],
            "Grade_CELDT": this.child.selectedGrades
        });
    }
}
