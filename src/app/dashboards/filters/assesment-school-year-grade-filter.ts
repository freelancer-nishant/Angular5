import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { AppComponent } from '../../app.component';

import { SelectItem } from 'primeng/primeng';

import { SchoolService } from './../../shared/services/school.service';
import { SchoolYearService } from './../../shared/services/school.year.service';
import { SchoolGradeService } from './../../shared/services/school.grade.service';
import { TestService } from './../../shared/services/test.service';

import { School } from './../../shared/domain/school';
import { SchoolSchoolYear } from './../../shared/domain/school.schoolyear';
import { SchoolGrade } from './../../shared/domain/school.schoolgrade';
import { Test } from './../../shared/domain/test'; 

@Component({
    selector: 'assesment-school-year-grade-filter',
    templateUrl: './assesment-school-year-grade-filter.html'
})

export class AssesmentSchoolYearGradeFilter implements OnInit {
    @Output() submit = new EventEmitter();
    test_type_id: string = "1";
    sessionInfo: any = {}
    tests: SelectItem[];
    selectedTest: any;

    schools: SelectItem[];
    selectedSchool: any;

    schoolYears: SelectItem[];
    selectedYear: any;

    grade: SelectItem[];
    selectedGrades: any[] = [];
    
    constructor(public app: AppComponent, private schoolService: SchoolService, private schoolYearService: SchoolYearService, private schoolGradeService: SchoolGradeService, private testService: TestService  ) {
        this.sessionInfo = this.app.getSession();        
    }

    ngOnInit() {

        this.tests = [];
        this.schools = [];
        this.schoolYears = [];
        this.grade = [];

        let testResult: Test[] = [];
        this.testService.get(this.test_type_id).subscribe((result: any) => testResult = result.data,
            (error: any) => { },
            () => {
                this.tests = [];
                testResult.map(o => { this.tests.push({ label: o.label, value: o.id }); });
            });

        let schoolResult: School[] = [];
        this.schoolService.get(this.sessionInfo.client_id, this.test_type_id).subscribe((result: any) => schoolResult = result.data,
            (error: any) => { },
            () => {
                this.schools = [];
                schoolResult.map(o => { this.schools.push({ label: o.name, value: o.id }); });
            });
    }


    myEvent() {  
        this.submit.emit();
    }

    schoolChange(e) {
        let schollYears: SchoolSchoolYear[] = [];
        let grades: SchoolGrade[] = [];

        this.schoolYears = [];
        this.selectedYear = null;
        this.selectedGrades = [];

        this.schoolYearService.get(this.sessionInfo.client_id, this.selectedSchool, this.test_type_id).subscribe((result: any) => schollYears = result.data,
            (error: any) => { },
            () => {
                this.schoolYears = [];
                schollYears.map(o => { this.schoolYears.push({ label: o.school_year, value: o.school_year_id }); });
            });

        this.schoolGradeService.get(this.sessionInfo.client_id, this.selectedSchool, this.test_type_id).subscribe((result: any) => grades = result.data,
            (error: any) => { },
            () => {
                this.grade = [];
                grades.map(o => { this.grade.push({ label: o.grade, value: o.grade }); });
            });
    }
}
