import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { AppComponent } from '../../app.component';
import { GlobalHelper, MenuType } from './../../shared/app.globals';
import { SelectItem } from 'primeng/primeng';

import { ComparativeListItem, ComparativeItem } from './../../shared/domain/comparative.list'
import { ComparativeListService } from './../../shared/services/comparativelist.service'
import { CommonService } from './../../shared/services/Common.service'

import { SchoolListModel, SchoolModel, SchoolYear, State, City, SchoolType } from './../../shared/domain/Common.model'
import { School } from './../../shared/domain/school'
import { SchoolGrade } from '../../shared/domain/school.schoolgrade';
import { SchoolSchoolYear } from '../../shared/domain/school.schoolyear';
import { SchoolYearService } from '../../shared/services/school.year.service';
import { SchoolGradeService } from '../../shared/services/school.grade.service';

@Component({
    selector: 'selectschool-year-grade-filter',
    templateUrl: './selectschool-year-grade-filter.html'
})
export class SelectSchoolYearGradeFilter implements OnInit {
    @Output() submit = new EventEmitter();
    sessionInfo: any = {}

    test_type_id: string = "3";
    comparativeList: SelectItem[];
    stateList: SelectItem[];
    countyList: any = {};
    districtList: any = {};
    cityList: any = {};
    schooltypeList: any = {};
    schoolList: any = {};
    schoolYears: SelectItem[];
    selectedYear: any;
    grade: SelectItem[];
    selectedGrades: any[] = [];
    fullschoolList: School[];
    newSchool: SchoolModel;//

    constructor(public app: AppComponent, private comparativeListService: ComparativeListService, private commonService: CommonService, private schoolYearService: SchoolYearService, private schoolGradeService: SchoolGradeService) {
        this.newSchool = new SchoolModel();
        this.sessionInfo = this.app.getSession();
    }

    ngOnInit() {
        //Apis for Popup
        //Passes State id=6 for california
        //let stateResult: State[];
        let stateResult: State;
        this.commonService.getStateById(6).subscribe((result: any) => stateResult = result.data,
            (error: any) => { },
            () => {
                this.stateList = [];
                this.stateList.push({ label: stateResult.name, value: stateResult.id });
            });

        let schoolTypeResult: SchoolType[] = [];
        this.commonService.getSchoolType().subscribe((result: any) => schoolTypeResult = result.data,
            (error: any) => { },
            () => {
                this.schooltypeList = [];
                schoolTypeResult.map(o => { this.schooltypeList.push({ label: o.school_type_combined, value: o.school_type_combined_id }); });
            });
    }

    stateChange(e) {
        let stateResult: State[] = [];
        this.commonService.getCounty(this.newSchool.state).subscribe((result: any) => stateResult = result.data,
            (error: any) => { },
            () => {
                this.countyList = [];
                stateResult.map(o => { this.countyList.push({ label: o.label, value: o.id }); });

                this.districtList = [];
                this.cityList = [];
                this.schoolList = [];
                this.newSchool.county = 0;
                this.newSchool.district = 0;
                this.newSchool.city = "";
                this.newSchool.school = 0;
            });
    }
    countyChange(e) {
        let stateResult: State[] = [];
        this.commonService.getDistrict(this.newSchool.county).subscribe((result: any) => stateResult = result.data,
            (error: any) => { },
            () => {
                this.districtList = [];
                stateResult.map(o => { this.districtList.push({ label: o.label, value: o.id }); });

                this.cityList = [];
                this.schoolList = [];
                this.newSchool.district = 0;
                this.newSchool.city = "";
                this.newSchool.school = 0;
            });
    }
    districtChange(e) {
        let stateResult: City[] = [];
        this.commonService.getCity(this.newSchool.district).subscribe((result: any) => stateResult = result.data,
            (error: any) => { },
            () => {
                this.cityList = [];
                stateResult.map(o => { this.cityList.push({ label: o.city, value: o.city }); });
            });
        this.schooltypeChange(e);
    }
    schooltypeChange(e) {
        if (this.newSchool.schooltype != undefined) {
            this.commonService.getSchool(this.newSchool.schooltype, this.newSchool.district, this.newSchool.city).subscribe((result: any) => this.fullschoolList = result.data,
                (error: any) => { },
                () => {
                    this.schoolList = [];
                    this.fullschoolList.map(o => { this.schoolList.push({ label: o.name, value: o.id }); });
                });
        }
    }
    schoolChange(e) {
        let schollYears: SchoolSchoolYear[] = [];
        let grades: SchoolGrade[] = [];

        this.schoolYears = [];
        this.selectedYear = null;
        this.selectedGrades = [];

        this.schoolYearService.get(this.sessionInfo.client_id, this.newSchool.school, this.test_type_id).subscribe((result: any) => schollYears = result.data,
            (error: any) => { },
            () => {
                this.schoolYears = [];
                schollYears.map(o => { this.schoolYears.push({ label: o.school_year, value: o.school_year_id }); });
            });

        this.schoolGradeService.get(this.sessionInfo.client_id, this.newSchool.school, this.test_type_id).subscribe((result: any) => grades = result.data,
            (error: any) => { },
            () => {
                this.grade = [];
                grades.map(o => { this.grade.push({ label: o.grade, value: o.grade }); });
            });
    }
    myEvent() {
        this.submit.emit();
    }
}
