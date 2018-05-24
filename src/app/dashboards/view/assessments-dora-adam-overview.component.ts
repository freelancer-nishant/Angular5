import { Component, OnInit, ViewChild } from '@angular/core';
import { AppComponent } from '../../app.component';
import { GlobalHelper, MenuType } from './../../shared/app.globals';
import { SchoolYearGradeTestFilter } from '../filters/school-year-grade-test-filter';

@Component({
    templateUrl: './assessments-dora-adam-overview.component.html'    
})

export class AssessmentsDORAOverviewComponent implements OnInit {
    @ViewChild(SchoolYearGradeTestFilter) child: SchoolYearGradeTestFilter;
    parameters: {};

    constructor(public app: AppComponent) {
        this.app.displayLeftMenu(true);
        this.app.activeCategoryDropdown = true;
        this.app.LeftMenuItems = GlobalHelper.getMenuItems(MenuType.Assessment);
        this.app.LeftMenuItems = app.LeftMenuItems = GlobalHelper.getMenuItems(MenuType.Assessment);
    }

    ngOnInit() {
    }


    submit() {
        this.parameters = JSON.stringify({
            "client_id": [this.child.sessionInfo.client_id],
            "School_Year_DORA_ADAM": [this.child.selectedYear],
            "School_DORA_ADAM": [this.child.selectedSchool],
            "Garde_DORA_ADAM": this.child.selectedGrades,
            "Test_Version_DORA_ADAM": [this.child.selectedTestVersion]
        });
    }
    
}
