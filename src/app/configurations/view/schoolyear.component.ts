import { Component, OnInit } from '@angular/core';
import { AppComponent } from '../../app.component';
import { GlobalHelper, MenuType } from './../../shared/app.globals';
import * as moment from 'moment';
import { SelectItem } from 'primeng/primeng';
import { Message } from 'primeng/components/common/api';
import { MessageService } from 'primeng/components/common/messageservice';

import { Year } from './../../shared/domain/year'
import { YearService } from './../../shared/services/year.service'
import { CommonService } from './../../shared/services/Common.service'
import { ResponseResult } from './../../shared/domain/Common.model'

@Component({
    templateUrl: './schoolyear.component.html'
})

export class SchoolYearComponent implements OnInit
{
    sessionInfo: any = {}
    msgs: Message[] = [];
    year: any = {}
    schoolYearList: Year[];
    schoolYearAdded: any;

    constructor(public app: AppComponent, private yearService: YearService, private messageService: MessageService)
        {
            this.app.displayLeftMenu(true);
            this.app.activeCategoryDropdown = true;
            this.app.pageProfile = GlobalHelper.getSideMenuTitle(MenuType.SchoolInSchoolYear);
            this.app.LeftMenuItems = GlobalHelper.getMenuItems(MenuType.SchoolInSchoolYear);
            this.sessionInfo = this.app.getSession();
        }

    ngOnInit()
    {
        this.schoolYearAdded = {};
        this.loadSchoolYears();        
    }


    loadSchoolYears()
    {
        let schoolYearList: Year[] = [];
        this.yearService.get().subscribe((result: any) => schoolYearList = result.data,
            (error: any) => { },
            () => {
                this.schoolYearList = [];
                schoolYearList.map(o => {
                    this.schoolYearList.push({
                        id: o.id,
                        school_year: o.school_year,
                        schoolyear_num: o.schoolyear_num
                    });
                });
            });
    }


    addSchoolYear() {
        if (this.schoolYearAdded != undefined && this.schoolYearAdded != null) {
            let responseResult: ResponseResult;
            
            this.yearService.insert(this.schoolYearAdded).subscribe((result: any) => responseResult = result,
                    (error: any) => {
                        this.msgs.push({ severity: 'error', detail: error.error.message });
                    },
                    () => {
                        this.loadSchoolYears();
                        this.msgs.push({ severity: 'success', detail: "Year added successfully." });
                        this.schoolYearAdded.school_year = null;
                        this.schoolYearAdded.schoolyear_num = null;
                    });
        }
        else {
            this.msgs.push({ severity: 'error', detail: "Please input data to add." });
        }
    }

}