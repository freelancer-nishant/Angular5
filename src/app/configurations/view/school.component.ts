import { Component, OnInit } from '@angular/core';
import { AppComponent } from '../../app.component';
import { GlobalHelper, MenuType } from './../../shared/app.globals';
import * as moment from 'moment';
import { SelectItem } from 'primeng/primeng';
import { Message } from 'primeng/components/common/api';
import { MessageService } from 'primeng/components/common/messageservice';

import { School } from './../../shared/domain/school'
import { SchoolService } from './../../shared/services/school.service'
import { CommonService } from './../../shared/services/Common.service'
import { ResponseResult } from './../../shared/domain/Common.model'

@Component({
    templateUrl: './school.component.html'

})

export class SchoolComponent implements OnInit
{
    sessionInfo: any = {}
    msgs: Message[] = [];
    school: any = {}
    schoolDetailList: School[];
    schoolAdded: any;

    constructor(public app: AppComponent, private schoolService: SchoolService, private messageService: MessageService)
        {
            this.app.displayLeftMenu(true);
            this.app.activeCategoryDropdown = true;
            this.app.pageProfile = GlobalHelper.getSideMenuTitle(MenuType.SchoolInSchoolYear);
            this.app.LeftMenuItems = GlobalHelper.getMenuItems(MenuType.SchoolInSchoolYear);
            this.sessionInfo = this.app.getSession();
        }

    ngOnInit()
    {
        this.schoolAdded = {};
        this.loadSchools();        
    }


    loadSchools()
    {
        let schooldetailList: School[] = [];
        this.schoolService.get(this.sessionInfo.client_id).subscribe((result: any) => schooldetailList = result.data,
            (error: any) => { },
            () => {
                this.schoolDetailList = [];
                schooldetailList.map(o => {
                    this.schoolDetailList.push({
                        id: o.id,
                        client_id: o.client_id,
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


    addSchool() {
        if (this.schoolAdded != undefined && this.schoolAdded != null) {
            let responseResult: ResponseResult;

            this.schoolAdded.client_id = this.sessionInfo.client_id;
            this.schoolAdded.label = this.schoolAdded.name; 
            this.schoolService.insert(this.schoolAdded).subscribe((result: any) => responseResult = result,
                    (error: any) => {
                        this.msgs.push({ severity: 'error', detail: error.error.message });
                    },
                    () => {
                        this.loadSchools();
                        this.msgs.push({ severity: 'success', detail: "School added successfully." });
                    });
        }
        else {
            this.msgs.push({ severity: 'error', detail: "Please input data to add." });
        }
    }

    editSchool(id) {
        let updatedSchool = this.schoolDetailList.find(x => x.id === id);
        let responseResult: ResponseResult;
            updatedSchool.client_id = this.sessionInfo.client_id;
            this.schoolService.update(updatedSchool).subscribe((result: any) => responseResult = result,
                (error: any) => {
                    this.msgs.push({ severity: 'error', detail: error.error.message });
                },
                () => {
                    this.loadSchools();
                    this.msgs.push({ severity: 'success', detail: "School detail updated successfully." });
                });
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

}