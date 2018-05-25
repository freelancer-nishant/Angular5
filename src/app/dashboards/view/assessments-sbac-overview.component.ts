import { Component, OnInit, ViewChild } from '@angular/core';
import { AppComponent } from '../../app.component';
import { GlobalHelper, MenuType } from './../../shared/app.globals';

import { SelectItem } from 'primeng/primeng';

import { SchoolService } from './../../shared/services/school.service';
import { SchoolYearService } from './../../shared/services/school.year.service';
import { SchoolGradeService } from './../../shared/services/school.grade.service';

import { School } from './../../shared/domain/school';
import { SchoolSchoolYear } from './../../shared/domain/school.schoolyear';
import { SchoolGrade } from './../../shared/domain/school.schoolgrade';
import { SchoolYearGradeFilter } from '../filters/school-year-grade-filter';

@Component({
    templateUrl: './assessments-sbac-overview.component.html'
})

export class AssessmentsSBACOverviewComponent implements OnInit {
    @ViewChild(SchoolYearGradeFilter) child: SchoolYearGradeFilter;
    parameters: {};
    
    constructor(public app: AppComponent) {
        this.app.displayLeftMenu(true);
        this.app.activeCategoryDropdown = true;
        this.app.LeftMenuItems = GlobalHelper.getMenuItems(MenuType.Assessment);
        this.app.pageProfile = GlobalHelper.getSideMenuTitle(MenuType.Assessment);
    }

    ngOnInit() {
    }


    submit() {        
        this.parameters = JSON.stringify({            
            "client_id": [this.child.sessionInfo.client_id],
            "Assess_School_Year": [this.child.selectedYear],
            "Assess_School": [this.child.selectedSchool],
            "Assess_Grade": this.child.selectedGrades
        });
    }
}
