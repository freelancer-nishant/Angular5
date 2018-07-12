import { Component, OnInit } from '@angular/core';
import { AppComponent } from '../../app.component';
import { ActivatedRoute } from '@angular/router';
import { GlobalHelper, MenuType } from './../../shared/app.globals';
import * as moment from 'moment';
import { SelectItem } from 'primeng/primeng';
import { Message } from 'primeng/components/common/api';
import { MessageService } from 'primeng/components/common/messageservice';

import { ComparativeListItem, ComparativeItem, ComparativeList } from './../../shared/domain/comparative.list'
import { ComparativeListService } from './../../shared/services/comparativelist.service'
import { CommonService } from './../../shared/services/Common.service'
import { ResponseResult } from './../../shared/domain/Common.model'
import { SchoolListModel, SchoolModel, SchoolYear, State, City, SchoolType } from './../../shared/domain/Common.model'
import { School } from './../../shared/domain/school'

@Component({
    templateUrl: './comparativeschoollistitem.component.html'
})

export class ComparativeSchoolListItemComponent implements OnInit {
    sessionInfo: any = {}
    msgs: Message[] = [];

    comparativeSchoolForUpdate: any = {};
    comparativeSchool: ComparativeListItem;
    stateList: SelectItem[];
    comparativeSchoolListLabel: any;
    countyList: any = {};
    districtList: any = {};
    cityList: any = {};
    schooltypeList: any = {};
    schoolList: any = {};
    fullschoolList: School[];
    comparativeItem: ComparativeList[];
    comparativeItemAdded: any;

    dialogVisible: boolean = false;
    comparativeListName: string = ''
    comparativeListId: any = {};
    comparativeItemSchool: any = {};
    newSchool: SchoolModel;
    comparativeListItemSchool: SchoolListModel;

    constructor(public app: AppComponent, private comparativeListService: ComparativeListService, private messageService: MessageService, private commonService: CommonService, private route: ActivatedRoute) {
        this.app.displayLeftMenu(true);
        this.app.activeCategoryDropdown = true;
        this.app.pageProfile = GlobalHelper.getSideMenuTitle(MenuType.SchoolInSchoolYear);
        this.app.LeftMenuItems = GlobalHelper.getMenuItems(MenuType.SchoolInSchoolYear);
        this.sessionInfo = this.app.getSession();
        this.dialogVisible = false;
        this.newSchool = new SchoolModel();
        this.comparativeListItemSchool = new SchoolListModel();
    }

    ngOnInit() {
        this.comparativeItemAdded = {};
        try {
            this.route.params.subscribe(params => {
                this.comparativeListId = params['id'];
            });
        }
        catch (e) { }

        this.loadComparativeListById();

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

    saveListItemFromPopup() {
        this.addToList();
        this.dialogVisible = false;
    }

    addUpdateListItem() {
        this.newSchool = new SchoolModel();
        this.countyList = [];
        this.districtList = [];
        this.cityList = [];
        this.schoolList = [];

        this.dialogVisible = true;
    }

    loadComparativeListById() {
        this.comparativeListService.getById(this.comparativeListId, this.sessionInfo.client_id).subscribe((result: any) => this.comparativeSchool = result.data,
            (error: any) => { },
            () => {
                this.comparativeSchoolListLabel = this.comparativeSchool.name;
            });
    }

    addToList() {
        if (this.newSchool.school != undefined) {

            if (this.comparativeItem == undefined) {
                this.comparativeItem = [];
            }

            //Check is school already exist if yes then return without adding school into list
            let isSchoolExist = this.comparativeItem.find(x => x.id === this.newSchool.school);
            if (isSchoolExist != undefined)
                return;

            let school: School = this.fullschoolList.find(x => x.id === this.newSchool.school);
            this.comparativeItem.push({
                id: school.id,
                us_school_id: school.id,
                school_label: school.name,
                alias: school.label,
                target_flag: 0,
                school_code: school.state_school_code,
                state_school_code: school.code,
                comarative_list_id: this.comparativeListId
            });
        }
    }

    deleteComparativeItemFromList(id) {
        let findschool: ComparativeList = this.comparativeItem.find(x => x.id === id);
        let index: number = this.comparativeItem.indexOf(findschool);
        this.comparativeItem.splice(index, 1);
    }

    saveComparativeItemList() {
        if (this.comparativeItem != undefined || this.comparativeItem != null) {
            if (this.comparativeItem.length <= 0) {
                alert('Please select school from list.');
                return;
            }

            let responseResult: ResponseResult;

            this.comparativeItem.forEach(function (value, index) {
                value.target_flag = value.target_flag == true ? 1 : 0;
            });

            this.comparativeListService.insertListItems(this.comparativeItem).subscribe((result: any) => responseResult = result,
                (error: any) => {
                    this.msgs.push({ severity: 'error', detail: error.error.message });
                },
                () => {
                    this.msgs.push({ severity: 'success', detail: "Comparative Item List added successfully." });
                    this.dialogVisible = false;
                });
        }
        else {
            alert('Please select school from list.')
        }
    }
}