import { Component, OnInit, ViewChild } from '@angular/core';
import { AppComponent } from '../../app.component';
import { GlobalHelper, MenuType } from './../../shared/app.globals';
import { SchoolYearGradeFilter } from '../filters/school-year-grade-filter';

@Component({
    templateUrl: './assessments-pft-overview.component.html'
})

export class AssessmentsPFTOverviewComponent implements OnInit {
    @ViewChild(SchoolYearGradeFilter) child: SchoolYearGradeFilter;
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
            "School_Year_PFT": [this.child.selectedYear],
            "School_PFT": [this.child.selectedSchool],
            "Grade_PFT": this.child.selectedGrades
        });
    }
}
