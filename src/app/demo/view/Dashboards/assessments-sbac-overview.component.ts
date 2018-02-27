import { Component, OnInit } from '@angular/core';
import { AppComponent } from '../../../app.component';
import { GlobalHelper, MenuType } from './../../../shared/app.globals';

import { SelectItem } from 'primeng/primeng';

import { SchoolService } from './../../service/school.service';
import { SchoolYearService } from './../../service/school.year.service';

import { School } from './../../domain/school';
import { SchoolSchoolYear } from './../../domain/school.schoolyear';

@Component({
    templateUrl: './assessments-sbac-overview.component.html'
})

export class AssessmentsSBACOverviewComponent implements OnInit {

    sessionInfo: any = {}
    schools: SelectItem[];

    selectedSchool: any;

    schoolYears: SelectItem[];
    selectedYear: any;

    grade: SelectItem[];
    selectedGrades: any[] = [];
    parameters: {};
    
    constructor(public app: AppComponent, private schoolService: SchoolService, private schoolYearService: SchoolYearService ) {
        app.displayLeftMenu(true);
        app.activeCategoryDropdown = true;
        app.LeftMenuItems = GlobalHelper.getMenuItems(MenuType.Assessment);
        app.LeftMenuItems = app.LeftMenuItems = GlobalHelper.getMenuItems(MenuType.Assessment);
        this.sessionInfo = this.app.getSession();        
    }

    ngOnInit() {

        this.schools = [];        
        this.schoolYears = [];        
        this.grade = [];


        let schoolResult: School[] = [];
        this.schoolService.get(this.sessionInfo.client_id).subscribe((result: any) => schoolResult = result.data,
            //error => () => { this.msgError = "Invalid credentials"; this.loginProcessing = false; },
            (error: any) => { },
            () => {
                this.schools = [];
                this.schools.push({ label: 'Select School', value: 0 })
                schoolResult.map(o => { this.schools.push({ label: o.name, value: o.id }); });
            });
        
        
        this.grade.push({ label: '1', value: 1 });
        this.grade.push({ label: '2', value: 2 });
        this.grade.push({ label: '3', value: 3 });
        this.grade.push({ label: '4', value: 4 });
        this.grade.push({ label: '5', value: 5 });
        this.grade.push({ label: '6', value: 6 });
        this.grade.push({ label: '7', value: 7 });
        this.grade.push({ label: '8', value: 8 });

        //this.parameters = JSON.stringify({
        //    "School_Year": [this.selectedYear], "School": [this.selectedSchool], "Grade": this.selectedGrades
        //});
    }


    submit() {        
        this.parameters = JSON.stringify({            
            "client_id": [this.sessionInfo.client_id], "Assess_School_Year": [this.selectedYear], "Assess_School": [this.selectedSchool], "Assess_Grade": this.selectedGrades
        });
    }

    schoolChange(e) {        
        let schollYears: SchoolSchoolYear[] = [];

        this.schoolYears = [];
        this.selectedYear = null;
        this.selectedGrades = [];

        this.schoolYearService.get(this.sessionInfo.client_id, this.selectedSchool).subscribe((result: any) => schollYears = result.data,
            //error => () => { this.msgError = "Invalid credentials"; this.loginProcessing = false; },
            (error: any) => { },
            () => {
                this.schoolYears = [];
                this.schoolYears.push({ label: 'Select School Year', value: 0 })
                schollYears.map(o => { this.schoolYears.push({ label: o.school_year, value: o.school_year_id }); });
            });
    }
}
