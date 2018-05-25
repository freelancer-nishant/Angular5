import { Component, OnInit, ViewChild } from '@angular/core';
import { AppComponent } from '../../app.component';
import { GlobalHelper, MenuType } from './../../shared/app.globals';

import { SelectItem } from 'primeng/primeng';

import { SchoolService } from './../../shared/services/school.service';
import { SchoolYearService } from './../../shared/services/school.year.service';
import { SchoolGradeService } from './../../shared/services/school.grade.service';
import { TestService } from './../../shared/services/test.service';

import { School } from './../../shared/domain/school';
import { SchoolSchoolYear } from './../../shared/domain/school.schoolyear';
import { SchoolGrade } from './../../shared/domain/school.schoolgrade';
import { Test } from './../../shared/domain/test';      
import { AssesmentSchoolYearGradeFilter } from '../filters/assesment-school-year-grade-filter';

@Component({
    templateUrl: './assessments-sbac-detail.component.html'
})

export class AssessmentsSBACDetailComponent implements OnInit {

    @ViewChild(AssesmentSchoolYearGradeFilter) child: AssesmentSchoolYearGradeFilter;
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
            "Assess_School_Year": [this.child.selectedYear],
            "Assess_School": [this.child.selectedSchool],
            "Assess_Grade": this.child.selectedGrades,
            "Assessment_Test": [this.child.selectedTest]
        });
    }
}
