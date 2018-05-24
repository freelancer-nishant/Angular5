import { Component, OnInit, ViewChild } from '@angular/core';
import { AppComponent } from '../../app.component';
import { GlobalHelper, MenuType } from './../../shared/app.globals';
import { SchoolYearGradeTestFilter } from '../filters/school-year-grade-test-filter';

@Component({
    templateUrl: './assessments-nwea-overview.component.html'
})

export class AssessmentsNWEAOverviewComponent implements OnInit {
    @ViewChild(SchoolYearGradeTestFilter) child: SchoolYearGradeTestFilter;
    parameters: {};
    
    constructor(public app: AppComponent ) {
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
            "School_Year_NWEA": [this.child.selectedYear],
            "School_NWEA": [this.child.selectedSchool],
            "Grade_NWEA": this.child.selectedGrades,
            "Test_Version_NWEA": [this.child.selectedTestVersion],
        });
    }
}
