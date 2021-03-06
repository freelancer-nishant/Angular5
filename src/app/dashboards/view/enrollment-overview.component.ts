import { Component, OnInit } from '@angular/core';
import { AppComponent } from '../../app.component';
import { GlobalHelper, MenuType } from './../../shared/app.globals';
import { SelectItem } from 'primeng/primeng';
import { SchoolService } from './../../shared/services/school.service';
import { SchoolYearService } from './../../shared/services/school.year.service';
import { SchoolGradeService } from './../../shared/services/school.grade.service';
import { School } from './../../shared/domain/school';
import { SchoolSchoolYear } from './../../shared/domain/school.schoolyear';
import { SchoolGrade } from './../../shared/domain/school.schoolgrade';

@Component({
    templateUrl: './enrollment-overview.component.html'   
})

export class EnrollmentOverviewComponent implements OnInit {

    sessionInfo: any = {}
    schools: SelectItem[];

    selectedSchool: any;

    schoolYears: SelectItem[];
    selectedYear: any;

    grade: SelectItem[];
    selectedGrades: any[] = [];
    parameters: {};
    
    constructor(public app: AppComponent, private schoolService: SchoolService, private schoolYearService: SchoolYearService, private schoolGradeService: SchoolGradeService) {
        this.app.displayLeftMenu(true);
        this.app.activeCategoryDropdown = true;
        this.app.pageProfile = GlobalHelper.getSideMenuTitle(MenuType.StudentInformation);
        this.app.LeftMenuItems = GlobalHelper.getMenuItems(MenuType.StudentInformation);

        this.sessionInfo = this.app.getSession();        
    }

    ngOnInit() {

        this.schools = [];        
        this.schoolYears = [];        
        this.grade = [];
        console.log(sessionStorage.getItem('isClientPage'))
        console.log(this.sessionInfo)

        let schoolResult: School[] = [];
        this.schoolService.get(this.sessionInfo.client_id).subscribe((result: any) => schoolResult = result.data,
            //error => () => { this.msgError = "Invalid credentials"; this.loginProcessing = false; },
            (error: any) => { },
            () => {
                this.schools = [];
                //this.schools.push({ label: 'Select School', value: 0 })
                schoolResult.map(o => { this.schools.push({ label: o.name, value: o.id }); });
            });

        
        //this.parameters = JSON.stringify({
        //    "client_id": [this.sessionInfo.client_id], "School_Year": [this.selectedYear], "School": [this.selectedSchool], "Grade": this.selectedGrades
        //});
    }


    submit() {        
        this.parameters = JSON.stringify({
            "client_id": [this.sessionInfo.client_id], "School_Year": [this.selectedYear], "School": [this.selectedSchool], "Grade": this.selectedGrades
        });
    }

    schoolChange(e) {        
        let schollYears: SchoolSchoolYear[] = [];
        let grades: SchoolGrade[] = [];

        this.schoolYears = [];
        this.grade = [];
        this.selectedYear = null;
        this.selectedGrades = [];

        this.schoolYearService.get(this.sessionInfo.client_id, this.selectedSchool).subscribe((result: any) => schollYears = result.data,
            //error => () => { this.msgError = "Invalid credentials"; this.loginProcessing = false; },
            (error: any) => { },
            () => {
                this.schoolYears = [];
                //this.schoolYears.push({ label: 'Select School Year', value: 0 })
                schollYears.map(o => { this.schoolYears.push({ label: o.school_year, value: o.school_year_id }); });
            });

        this.schoolGradeService.get(this.sessionInfo.client_id, this.selectedSchool).subscribe((result: any) => grades = result.data,
            //error => () => { this.msgError = "Invalid credentials"; this.loginProcessing = false; },
            (error: any) => { },
            () => {
                this.grade = [];
                grades.map(o => { this.grade.push({ label: o.grade, value: o.grade }); });
            });
    }
}
