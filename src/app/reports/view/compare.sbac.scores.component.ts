import { Component, OnInit } from '@angular/core';
import { AppComponent } from '../../app.component';
import { GlobalHelper, MenuType } from './../../shared/app.globals';
import { SelectItem } from 'primeng/primeng';

import { ComparativeListItem, ComparativeItem } from './../../shared/domain/comparative.list'
import { ComparativeListService } from './../../shared/services/comparativelist.service'
import { CommonService } from './../../shared/services/Common.service'

import { SchoolListModel, SchoolModel, SchoolYear, State, City, SchoolType } from './../../shared/domain/Common.model'
import { School } from './../../demo/domain/school'

@Component({
    templateUrl: './compare.sbac.scores.component.html'
})
export class CompareSBACScoresComponent implements OnInit {
    parameters: any = {}
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

    selectedComparative: any;
    selectedSchoolYear: any;
    SchoolForScorecards: SchoolListModel;
    newSchool: SchoolModel;

    constructor(public app: AppComponent, private comparativeListService: ComparativeListService, private commonService: CommonService) {
        this.SchoolForScorecards = new SchoolListModel();
        this.newSchool = new SchoolModel();
        this.dialogVisible = false;
        app.displayLeftMenu(true);
        app.activeCategoryDropdown = true;
        app.pageProfile = GlobalHelper.getSideMenuTitle(MenuType.ComparisonSchools);
        app.LeftMenuItems = GlobalHelper.getMenuItems(MenuType.ComparisonSchools);
        this.sessionInfo = this.app.getSession();
    }

    ngOnInit() {
        this.comparativeList = [];

        let comparativeListItems: ComparativeListItem[] = [];
        this.comparativeListService.get(this.sessionInfo.client_id).subscribe((result: any) => comparativeListItems = result.data,
            (error: any) => { },
            () => {
                this.comparativeList = [];
                this.comparativeList.push({ label: '--Select--', value: 0 })
                comparativeListItems.map(o => { this.comparativeList.push({ label: o.label, value: o.id }); });
            });


        let schoolYearListItems: SchoolYear[] = [];
        this.commonService.getSchoolYear().subscribe((result: any) => schoolYearListItems = result.data,
            (error: any) => { },
            () => {
                this.schoolYearList = [];
                this.schoolYearList.push({ label: '--Select--', value: 0 })
                schoolYearListItems.map(o => { this.schoolYearList.push({ label: o.school_year, value: o.id }); });
            });

        //Apis for Popup
        let stateResult: State[] = [];
        this.commonService.getState().subscribe((result: any) => stateResult = result.data,
            (error: any) => { },
            () => {
                this.stateList = [];
                this.stateList.push({ label: 'Select State', value: 0 })
                stateResult.map(o => { this.stateList.push({ label: o.name, value: o.id }); });
            });

        let schoolTypeResult: SchoolType[] = [];
        this.commonService.getSchoolType().subscribe((result: any) => schoolTypeResult = result.data,
            (error: any) => { },
            () => {
                this.schooltypeList = [];
                this.schooltypeList.push({ label: 'Select School Type', value: 0 })
                schoolTypeResult.map(o => { this.schooltypeList.push({ label: o.school_type_combined, value: o.school_type_combined_id }); });
            });
    }


    schoolChange(e) {
        let stateResult: State[] = [];
        this.commonService.getCounty(this.newSchool.state).subscribe((result: any) => stateResult = result.data,
            (error: any) => { },
            () => {
                this.countyList = [];
                this.countyList.push({ label: 'Select County', value: 0 })
                stateResult.map(o => { this.countyList.push({ label: o.label, value: o.id }); });
            });
    }
    countyChange(e) {
        let stateResult: State[] = [];
        this.commonService.getDistrict(this.newSchool.county).subscribe((result: any) => stateResult = result.data,
            (error: any) => { },
            () => {
                this.districtList = [];
                this.districtList.push({ label: 'Select District', value: 0 })
                stateResult.map(o => { this.districtList.push({ label: o.label, value: o.id }); });
            });
    }
    districtChange(e) {
        let stateResult: City[] = [];
        this.commonService.getCity(this.newSchool.district).subscribe((result: any) => stateResult = result.data,
            (error: any) => { },
            () => {
                this.cityList = [];
                this.cityList.push({ label: 'Select City', value: 0 })
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
                    this.schoolList.push({ label: 'Select School', value: 0 })
                    this.fullschoolList.map(o => { this.schoolList.push({ label: o.name, value: o.id }); });
                });
        }
    }

    submit() {
        if (this.selectedComparative != undefined && this.selectedSchoolYear != undefined) {
            let comparativeListItems: ComparativeListItem;
            this.comparativeListService.getById(this.selectedComparative, this.sessionInfo.client_id).subscribe((result: any) => comparativeListItems = result.data,
                (error: any) => { },
                () => {
                    this.parameters = JSON.stringify({
                        "test_id1": ['1'],
                        "schoolyear_id": [this.selectedSchoolYear],
                        "comparative_list_items": [JSON.stringify(comparativeListItems.items)],
                        "test_id2": ['2'],
                        "comparative_list_label": [comparativeListItems.label]
                    });
                });
        }
    }

    addToList() {
        if (this.newSchool.school != undefined) {
            if (this.SchoolForScorecards.selectedschools == undefined)
                this.SchoolForScorecards.selectedschools = [];
            let school: School = this.fullschoolList.find(x => x.id === this.newSchool.school);
            this.SchoolForScorecards.selectedschools.push({
                id: school.id,
                us_school_id: school.id,
                school_label: school.label,
                alias: school.abbrev,
                target_flag: false
            });
            //this.newSchool = new SchoolModel();
        }
    }
    runReport() {
        this.dialogVisible = false;
        this.parameters = JSON.stringify({
            "test_id1": ['1'],
            "schoolyear_id": [this.SchoolForScorecards.schoolyear],
            "comparative_list_items": [JSON.stringify(this.SchoolForScorecards.selectedschools)],
            "test_id2": ['2'],
            "comparative_list_label": [this.SchoolForScorecards.schoollabel]
        });
    }
}
