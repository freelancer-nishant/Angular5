import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { AppComponent } from '../../app.component';
import { GlobalHelper, MenuType } from './../../shared/app.globals';
import { SelectItem } from 'primeng/primeng';

import { ComparativeListItem, ComparativeItem } from './../../shared/domain/comparative.list'
import { ComparativeListService } from './../../shared/services/comparativelist.service'
import { CommonService } from './../../shared/services/Common.service'

import { SchoolListModel, SchoolModel, SchoolYear, State, City, SchoolType } from './../../shared/domain/Common.model'
import { School } from './../../shared/domain/school'

@Component({
    selector: 'compare-school-year-filter',
    templateUrl: './compare-school-year-filter.html'
})
export class CompareSchoolYearFilter implements OnInit {
    @Output() submit = new EventEmitter();
    @Output() runReport = new EventEmitter();
    sessionInfo: any = {}

    comparativeList: SelectItem[];
    schoolYearList: SelectItem[];
    stateList: SelectItem[];
    countyList: any = {};
    districtList: any = {};
    cityList: any = {};
    schooltypeList: any = {};
    schoolList: any = {};
    fullschoolList: School[];
    dialogVisible: boolean = false;
    isRunReport: boolean = false;

    selectedComparative: any;
    selectedSchoolYear: any;
    SchoolForScorecards: SchoolListModel;
    EditSchoolForScorecards: SchoolListModel;
    newSchool: SchoolModel;
    apiComparativeListItems: ComparativeListItem
    schoolCodes:any = [];

    constructor(public app: AppComponent, private comparativeListService: ComparativeListService, private commonService: CommonService) {
        this.SchoolForScorecards = new SchoolListModel();
        this.newSchool = new SchoolModel();
        this.dialogVisible = false;
        this.sessionInfo = this.app.getSession();
    }

    ngOnInit() {
        this.comparativeList = [];

        let comparativeListItems: ComparativeListItem[] = [];
        this.comparativeListService.get(this.sessionInfo.client_id).subscribe((result: any) => comparativeListItems = result.data,
            (error: any) => { },
            () => {
                this.comparativeList = [];
                //this.comparativeList.push({ label: '--Select--', value: 0 })
                comparativeListItems.map(o => { this.comparativeList.push({ label: o.label, value: o.id }); });
            });


        let schoolYearListItems: SchoolYear[] = [];
        this.commonService.getSchoolYear(true).subscribe((result: any) => schoolYearListItems = result.data,
            (error: any) => { },
            () => {
                this.schoolYearList = [];
                //this.schoolYearList.push({ label: '--Select--', value: 0 })
                schoolYearListItems.map(o => { this.schoolYearList.push({ label: o.school_year, value: o.id }); });
            });

        //Apis for Popup
        //Passes State id=6 for california
        //let stateResult: State[];
        let stateResult: State;
        this.commonService.getStateById(6).subscribe((result: any) => stateResult = result.data,
            (error: any) => { },
            () => {
                this.stateList = [];
                //this.stateList.push({ label: 'Select State', value: 0 })
                this.stateList.push({ label: stateResult.name, value: stateResult.id });
                //stateResult.map(o => { this.stateList.push({ label: o.name, value: o.id }); });
            });

        let schoolTypeResult: SchoolType[] = [];
        this.commonService.getSchoolType().subscribe((result: any) => schoolTypeResult = result.data,
            (error: any) => { },
            () => {
                this.schooltypeList = [];
                //this.schooltypeList.push({ label: 'Select School Type', value: 0 })
                schoolTypeResult.map(o => { this.schooltypeList.push({ label: o.school_type_combined, value: o.school_type_combined_id }); });
            });
    }


    stateChange(e) {
        let stateResult: State[] = [];
        this.commonService.getCounty(this.newSchool.state).subscribe((result: any) => stateResult = result.data,
            (error: any) => { },
            () => {
                this.countyList = [];
                //this.countyList.push({ label: 'Select County', value: 0 })
                stateResult.map(o => { this.countyList.push({ label: o.label, value: o.id }); });

                this.districtList = [];
                this.cityList = [];
                this.schoolList = [];
                this.newSchool.county = 0;
                this.newSchool.district = 0;
                this.newSchool.city = "";
                this.newSchool.school = 0;

                //this.newSchool.county = 1;
                //this.countyChange(e);
            });
    }
    countyChange(e) {
        let stateResult: State[] = [];
        this.commonService.getDistrict(this.newSchool.county).subscribe((result: any) => stateResult = result.data,
            (error: any) => { },
            () => {
                this.districtList = [];
                //this.districtList.push({ label: 'Select District', value: 0 })
                stateResult.map(o => { this.districtList.push({ label: o.label, value: o.id }); });

                this.cityList = [];
                this.schoolList = [];
                this.newSchool.district = 0;
                this.newSchool.city = "";
                this.newSchool.school = 0;

                //this.newSchool.district = 1;
                //this.districtChange(e);
            });
    }
    districtChange(e) {
        let stateResult: City[] = [];
        this.commonService.getCity(this.newSchool.district).subscribe((result: any) => stateResult = result.data,
            (error: any) => { },
            () => {
                this.cityList = [];
                //this.cityList.push({ label: 'Select City', value: 0 })
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
                    //this.schoolList.push({ label: 'Select School', value: 0 })
                    this.fullschoolList.map(o => { this.schoolList.push({ label: o.name, value: o.id }); });
                });
        }
    }

    myEvent() {
        if (this.selectedComparative != undefined && this.selectedSchoolYear != undefined) {
            this.comparativeListService.getById(this.selectedComparative, this.sessionInfo.client_id).subscribe((result: any) => this.apiComparativeListItems = result.data,
                (error: any) => { },
                () => {
                    let tmpschoolCodes = [];
                    this.apiComparativeListItems.items.forEach(function (value, index) {
                        tmpschoolCodes.push(value.school_code)
                    });
                    this.schoolCodes = tmpschoolCodes;
                    this.submit.emit();
                    //this.parameters = JSON.stringify({
                    //    "test_id1": ['1'],
                    //    "schoolyear_id": [this.selectedSchoolYear],
                    //    "comparative_list_items": [JSON.stringify(this.apiComparativeListItems.items)],
                    //    "test_id2": ['2'],
                    //    "comparative_list_label": [this.apiComparativeListItems.label]
                    //});
                });
        }
    }

    addToList() {
        if (this.newSchool.school != undefined) {
            if (this.SchoolForScorecards.selectedschools == undefined)
                this.SchoolForScorecards.selectedschools = [];

            //Check is school already exist if yes then return without adding school into list
            let isSchoolExist = this.SchoolForScorecards.selectedschools.find(x => x.id === this.newSchool.school);
            if (isSchoolExist != undefined)
                return;

            let school: School = this.fullschoolList.find(x => x.id === this.newSchool.school);
            this.SchoolForScorecards.selectedschools.push({
                id: school.id,
                us_school_id: school.id,
                school_label: school.name,
                alias: school.label,
                target_flag: 0,
                school_code: school.state_school_code,
                state_school_code:school.code
            });
            //this.newSchool = new SchoolModel();
        }
    }
    deleteSchool(id) {
        let findschool: ComparativeItem = this.SchoolForScorecards.selectedschools.find(x => x.id === id);
        let index: number = this.SchoolForScorecards.selectedschools.indexOf(findschool);
        this.SchoolForScorecards.selectedschools.splice(index, 1);
    }
    selectSchools() {
        this.SchoolForScorecards = new SchoolListModel();
        this.newSchool = new SchoolModel();
        this.countyList = [];
        this.districtList = [];
        this.cityList = [];
        this.schoolList = [];

        this.dialogVisible = true;
    }
    editSchools() {
        if (this.EditSchoolForScorecards == undefined)
            this.SchoolForScorecards = new SchoolListModel();
        else
            this.SchoolForScorecards = this.EditSchoolForScorecards;
        this.dialogVisible = true;
    }
    myRunReport() {
        if (this.SchoolForScorecards.selectedschools == undefined || this.SchoolForScorecards.selectedschools.length <= 0) {
            alert('Please select atleast one or more school.')
            return;
        }
        if (this.SchoolForScorecards.schoollabel != undefined && this.SchoolForScorecards.schoolyear != undefined && this.SchoolForScorecards.selectedschools.length > 0) {
            this.dialogVisible = false;
            let tmpschoolCodes = [];
            this.SchoolForScorecards.selectedschools.forEach(function (value, index) {
                value.target_flag = value.target_flag == true ? 1 : 0;
                tmpschoolCodes.push(value.state_school_code)
            });
            this.schoolCodes = tmpschoolCodes;
            this.runReport.emit();
            //this.parameters = JSON.stringify({
            //    "test_id1": ['1'],
            //    "schoolyear_id": [this.SchoolForScorecards.schoolyear],
            //    "comparative_list_items": [JSON.stringify(this.SchoolForScorecards.selectedschools)],
            //    "test_id2": ['2'],
            //    "comparative_list_label": [this.SchoolForScorecards.schoollabel]
            //});
            this.EditSchoolForScorecards = this.SchoolForScorecards;
            this.SchoolForScorecards = new SchoolListModel();
            this.isRunReport = true;
        }
        else {
            alert('Please enter school label or select school year first.')
        }
    }
}