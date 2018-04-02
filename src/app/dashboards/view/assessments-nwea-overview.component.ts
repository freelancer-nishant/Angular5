import { Component, OnInit } from '@angular/core';
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

@Component({
    templateUrl: './assessments-nwea-overview.component.html'
})

export class AssessmentsNWEAOverviewComponent implements OnInit {

    test_type_id: string = "2";
    sessionInfo: any = {}

    schools: SelectItem[];
    selectedSchool: any;

    schoolYears: SelectItem[];
    selectedYear: any;

    grade: SelectItem[];
    selectedGrades: any[] = [];

    testVersions: SelectItem[];
    selectedTestVersion: any;

    parameters: {};
    
    constructor(public app: AppComponent, private schoolService: SchoolService, private schoolYearService: SchoolYearService, private schoolGradeService: SchoolGradeService, private testVersionService: TestVersionService ) {
        this.app.displayLeftMenu(true);
        this.app.activeCategoryDropdown = true;
        this.app.LeftMenuItems = GlobalHelper.getMenuItems(MenuType.Assessment);
        this.app.LeftMenuItems = app.LeftMenuItems = GlobalHelper.getMenuItems(MenuType.Assessment);
        this.sessionInfo = this.app.getSession();        
    }

    ngOnInit() {

        this.schools = [];        
        this.schoolYears = [];        
        this.grade = [];
        this.testVersions = [];

        let schoolResult: School[] = [];
        this.schoolService.get(this.sessionInfo.client_id, this.test_type_id).subscribe((result: any) => schoolResult = result.data,
            //error => () => { this.msgError = "Invalid credentials"; this.loginProcessing = false; },
            (error: any) => { },
            () => {
                this.schools = [];
                //this.schools.push({ label: '--Select--', value: 0 })
                schoolResult.map(o => { this.schools.push({ label: o.name, value: o.id }); });
            });
    }


    submit() {                
        
        this.parameters = JSON.stringify({            
            "client_id": [this.sessionInfo.client_id],
            "School_Year_NWEA": [this.selectedYear],
            "School_NWEA": [this.selectedSchool],
            "Grade_NWEA": this.selectedGrades,
            "Test_Version_NWEA": [this.selectedTestVersion],
        });
    }

    schoolChange(e) {        
        let schollYears: SchoolSchoolYear[] = [];
        let grades: SchoolGrade[] = [];

        this.schoolYears = [];
        this.selectedYear = null;
        this.selectedGrades = [];
        this.testVersions = [];
        this.selectedTestVersion = null;

        this.schoolYearService.get(this.sessionInfo.client_id, this.selectedSchool, this.test_type_id).subscribe((result: any) => schollYears = result.data,
            //error => () => { this.msgError = "Invalid credentials"; this.loginProcessing = false; },
            (error: any) => { },
            () => {
                this.schoolYears = [];
                //this.schoolYears.push({ label: '--Select--', value: 0 })
                schollYears.map(o => { this.schoolYears.push({ label: o.school_year, value: o.school_year_id }); });
            });

        this.schoolGradeService.get(this.sessionInfo.client_id, this.selectedSchool, this.test_type_id).subscribe((result: any) => grades = result.data,
            //error => () => { this.msgError = "Invalid credentials"; this.loginProcessing = false; },
            (error: any) => { },
            () => {
                this.grade = [];
                grades.map(o => { this.grade.push({ label: o.grade, value: o.grade }); });
            });
    }

    schoolYearChange(e) {
        let versions: TestVersion[] = [];

        this.testVersions = [];
        this.selectedTestVersion = null;

        this.testVersionService.get(this.selectedSchool, this.selectedYear, this.test_type_id).subscribe((result: any) => versions = result.data,
            //error => () => { this.msgError = "Invalid credentials"; this.loginProcessing = false; },
            (error: any) => { },
            () => {
                this.testVersions = [];
                //this.testVersions.push({ label: '--Select--', value: 0 })
                versions.map(o => { this.testVersions.push({ label: o.version_label, value: o.version_number }); });
            });
    }
}
