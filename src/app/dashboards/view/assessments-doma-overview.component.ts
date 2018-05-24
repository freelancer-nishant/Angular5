import { Component, ViewChild, OnInit } from '@angular/core';
import { AppComponent } from '../../app.component';
import { GlobalHelper, MenuType } from './../../shared/app.globals';

import { SelectItem } from 'primeng/primeng';

import { SchoolService } from './../../shared/services/school.service';
import { SchoolYearService } from './../../shared/services/school.year.service';
import { SchoolGradeService } from './../../shared/services/school.grade.service';
import { TestVersionService } from './../../shared/services/testversion.service';

import { School } from './../../shared/domain/school';
import { SchoolSchoolYear } from './../../shared/domain/school.schoolyear';
import { SchoolGrade } from './../../shared/domain/school.schoolgrade';
import { TestVersion } from './../../shared/domain/testversion';
import { SchoolYearGradeTestFilter } from './../filters/school-year-grade-test-filter';

@Component({
    templateUrl: './assessments-doma-overview.component.html'
})

export class AssessmentsDOMAOverviewComponent implements OnInit {
    @ViewChild(SchoolYearGradeTestFilter) child: SchoolYearGradeTestFilter;
    parameters: {};
    constructor(public app: AppComponent, private schoolService: SchoolService, private schoolYearService: SchoolYearService, private schoolGradeService: SchoolGradeService, private testVersionService: TestVersionService ) {
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
            "School_Year_DOMA": [this.child.selectedYear],
            "School_DOMA": [this.child.selectedSchool],
            "Grade_DOMA": this.child.selectedGrades,
            "Test_Version_DOMA": [this.child.selectedTestVersion]
        });
    }
}
