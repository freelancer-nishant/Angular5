import { Component, OnInit } from '@angular/core';
import { AppComponent } from '../../app.component';
import { GlobalHelper, MenuType } from './../../shared/app.globals';
import * as moment from 'moment';
import { SelectItem } from 'primeng/primeng';
import { Message } from 'primeng/components/common/api';
import { MessageService } from 'primeng/components/common/messageservice';

import { Client } from './../../shared/domain/client'
import { ClientService } from './../../shared/services/client.service'

import { School, SchoolAll } from './../../shared/domain/school'
import { SchoolService } from './../../shared/services/school.service'
import { CommonService } from './../../shared/services/Common.service'
import { ResponseResult } from './../../shared/domain/Common.model'

@Component({
    templateUrl: './manageschoolofclient.component.html'
})

export class ManageSchoolOfClientComponent implements OnInit {
    sessionInfo: any = {}
    msgs: Message[] = [];
    clientList: any = [];
    clientListIndividual: any = [];
    client: any = {};
    schoolList: SchoolAll[];
    school: any = {};
    roleList: any = {};

    newSchool: any;
    addSchool: any;
    updatedSchool: any;

    dialogVisible: boolean = false;
    dialogVisible1: boolean = false;

    constructor(public app: AppComponent, private clientService: ClientService, private schoolService: SchoolService, private messageService: MessageService) {
        this.app.displayLeftMenu(true);
        this.app.activeCategoryDropdown = true;
        this.app.pageProfile = GlobalHelper.getSideMenuTitle(MenuType.Users);
        this.app.LeftMenuItems = GlobalHelper.getMenuItems(MenuType.Users);
        this.sessionInfo = this.app.getSession();
        this.newSchool = {};
        this.dialogVisible = false;
        this.dialogVisible1 = false;
    }

    ngOnInit() {
        this.client = {};
        this.addSchool = {};
        this.updatedSchool = {};
        this.loadClient();
    }

    loadClient() {
        let clientResult: Client[] = [];
        
        this.clientService.get().subscribe((result: any) => clientResult = result.data,
            (error: any) => { },
            () => {
                this.clientList = [];
                this.clientListIndividual = [];
                this.clientList.push({ label: "All", value: "-1" });

                clientResult.map(o => { this.clientList.push({ label: o.name, value: o.id }); });
                clientResult.map(o => { this.clientListIndividual.push({ label: o.name, value: o.id }); });
            });
    }
    
    loadSchools() {

        if (this.newSchool.client_id == undefined || this.newSchool.client_id == null) {
            alert('Please select a client');
            return;
        }

        let schooldetailList: School[] = [];
        this.schoolService.get(this.newSchool.client_id).subscribe((result: any) => schooldetailList = result.data,
            (error: any) => { },
            () => {
                this.schoolList = [];
                schooldetailList.map(o => {
                    this.schoolList.push({
                        id: o.id,
                        client_id: o.client_id,
                        client_name: this.clientList.find(x => x.value === o.client_id).label,
                        abbrev: o.abbrev,
                        abbrev_ps: o.abbrev_ps,
                        code: o.code,
                        name: o.name,
                        state_school_code: o.state_school_code,
                        label: o.label
                    });
                });

            });
    }

    addNewSchool() {
        this.addSchool = {};
        this.dialogVisible = true;
    }

    submitNewSchool() {
        if (this.addSchool != undefined && this.addSchool != null) {
            let responseResult: ResponseResult;

            this.addSchool.label = this.addSchool.name;
            this.schoolService.insert(this.addSchool).subscribe((result: any) => responseResult = result,
                (error: any) => {
                    this.msgs.push({ severity: 'error', detail: error.error.message });
                },
                () => {
                    this.dialogVisible = false;
                    if (this.newSchool.client_id != undefined && this.newSchool.client_id != null) {
                        this.loadSchools();
                    }

                    this.msgs.push({ severity: 'success', detail: "School added successfully." });
                });
        }
        else {
            this.msgs.push({ severity: 'error', detail: "Please input data to add." });
        }
    }

    deleteSchool(id) {
        let responseResult: ResponseResult;
        this.schoolService.delete(id).subscribe((result: any) => responseResult = result.data,
            (error: any) => {
                this.msgs.push({ severity: 'error', detail: error.error.message });
            },
            () => {
                this.loadSchools();
                this.msgs.push({ severity: 'success', detail: "School detail deleted successfully." });
            });
    }

    updateSchool(id, name, client_id, code, abbrev, abbrev_ps) {

        this.updatedSchool.id = id;
        this.updatedSchool.name = name;
        this.updatedSchool.label = this.updatedSchool.name;
        this.updatedSchool.client_id = client_id;
        this.updatedSchool.code = code;
        this.updatedSchool.abbrev = abbrev;
        this.updatedSchool.abbrev_ps = abbrev_ps;

        this.dialogVisible1 = true;
    }

    submitUpdateSchool() {
        let responseResult: ResponseResult;
        this.schoolService.update(this.updatedSchool).subscribe((result: any) => responseResult = result,
            (error: any) => {
                this.msgs.push({ severity: 'error', detail: error.error.message });
            },
            () => {
                this.dialogVisible1 = false;
                this.loadSchools();
                this.msgs.push({ severity: 'success', detail: "School detail updated successfully." });
            });
    }
}
