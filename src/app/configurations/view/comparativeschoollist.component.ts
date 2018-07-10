import { Component, OnInit } from '@angular/core';
import { AppComponent } from '../../app.component';
import { ActivatedRoute } from '@angular/router';
import { GlobalHelper, MenuType } from './../../shared/app.globals';
import * as moment from 'moment';
import { SelectItem } from 'primeng/primeng';
import { Message } from 'primeng/components/common/api';
import { MessageService } from 'primeng/components/common/messageservice';

import { ComparativeListItem } from './../../shared/domain/comparative.list'
import { ComparativeListService } from './../../shared/services/comparativelist.service'
import { School } from './../../shared/domain/school'
import { SchoolService } from './../../shared/services/school.service'
import { CommonService } from './../../shared/services/Common.service'
import { ResponseResult } from './../../shared/domain/Common.model'

@Component({
    templateUrl: './comparativeschoollist.component.html'
})

export class ComparativeSchoolListComponent implements OnInit {
    sessionInfo: any = {}
    msgs: Message[] = [];
    school: any = {};
    comparativeSchoolSelected: any = {};
    schoolDetailList: School[];
    comparativeSchoolList: ComparativeListItem[];
    schoolList: SelectItem[];

    schoolAdded: any;
    selectedSchool: any;
    dialogVisible: boolean = false;
    saveVisible: boolean = false;
    updateVisible: boolean = false;

    constructor(public app: AppComponent, private comparativeListService: ComparativeListService, private schoolService: SchoolService,  private messageService: MessageService) {
        this.app.displayLeftMenu(true);
        this.app.activeCategoryDropdown = true;
        this.app.pageProfile = GlobalHelper.getSideMenuTitle(MenuType.SchoolInSchoolYear);
        this.app.LeftMenuItems = GlobalHelper.getMenuItems(MenuType.SchoolInSchoolYear);
        this.sessionInfo = this.app.getSession();
        this.dialogVisible = false;
        this.saveVisible = false;
        this.updateVisible = false;
    }

    ngOnInit() {
        this.loadComparativeSchools();
    }
 
    loadComparativeSchools() {
        let comparativeSchoolList: ComparativeListItem[] = [];
        this.comparativeListService.get(this.sessionInfo.client_id).subscribe((result: any) => comparativeSchoolList = result.data,
            (error: any) => { },
            () => {
                this.comparativeSchoolList = [];
                this.schoolList = [];

                comparativeSchoolList.map(o => {
                    this.comparativeSchoolList.push({
                        id: o.id,
                        name: o.name,
                        label: o.label,
                        desc: o.desc,
                        items: o.items,
                        base_school_id: o.school_id,
                        base_school_name: o.base_school_name,
                        school_id: o.school_id
                    });

                    this.schoolList.push({
                        label: o.base_school_name,
                        value: o.school_id
                    });

                });

            });
    }

    addNewComparativeSchools() {
        this.comparativeSchoolSelected = {};
        this.dialogVisible = true;
        this.saveVisible = true;
        this.updateVisible = false;
    }

    updateComparativeSchools(id, name, label, desc, base_school_name) {
        this.dialogVisible = true;
        this.saveVisible = false;
        this.updateVisible = true;

        this.comparativeSchoolSelected.id = id;
        this.comparativeSchoolSelected.name = name;
        this.comparativeSchoolSelected.label = label;
        this.comparativeSchoolSelected.desc = desc;
        this.comparativeSchoolSelected.base_school_name = base_school_name;
    }

    addComparativeSchool() {

        if (this.comparativeSchoolSelected.id != null && this.comparativeSchoolSelected.id != undefined) {
            this.editComparativeSchool();
            return;
        }
        
        if (this.selectedSchool != undefined && this.selectedSchool != null) {
            let responseResult: ResponseResult;

            this.comparativeSchoolSelected.school_id = this.selectedSchool;
            this.comparativeSchoolSelected.client_id = this.sessionInfo.client_id;
            this.comparativeListService.insert(this.comparativeSchoolSelected).subscribe((result: any) => responseResult = result,
                (error: any) => {
                    this.msgs.push({ severity: 'error', detail: error.error.message });
                },
                () => {
                    this.msgs.push({ severity: 'success', detail: "Comparative School added successfully." });
                    this.dialogVisible = false;
                    this.loadComparativeSchools();
                });
        }
        else {
            this.msgs.push({ severity: 'error', detail: "Please input data to add." });
        }
    }

    deleteComparativeSchool(id) {
        let responseResult: ResponseResult;
        this.comparativeListService.delete(id, this.sessionInfo.client_id).subscribe((result: any) => responseResult = result.data,
            (error: any) => {
                this.msgs.push({ severity: 'error', detail: error.error.message });
            },
            () => {
                this.loadComparativeSchools();
                this.msgs.push({ severity: 'success', detail: "Comparative School deleted successfully." });
            });
    }

    editComparativeSchool() {
        if (this.selectedSchool != undefined && this.selectedSchool != null) {
            let responseResult: ResponseResult;

            this.comparativeSchoolSelected.school_id = this.selectedSchool;
            this.comparativeSchoolSelected.client_id = this.sessionInfo.client_id;
            this.comparativeListService.update(this.comparativeSchoolSelected).subscribe((result: any) => responseResult = result,
                (error: any) => {
                    this.msgs.push({ severity: 'error', detail: error.error.message });
                },
                () => {
                    this.msgs.push({ severity: 'success', detail: "Comparative School updated successfully." });
                    this.dialogVisible = false;
                    this.loadComparativeSchools();
                });
        }
        else {
            this.msgs.push({ severity: 'error', detail: "Please input data to update." });
        }
    }

}