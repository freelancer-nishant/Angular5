import { Component, OnInit } from '@angular/core';
import { AppComponent } from '../../app.component';
import { GlobalHelper, MenuType } from './../../shared/app.globals';
import * as moment from 'moment';
import { SelectItem } from 'primeng/primeng';
import { Message } from 'primeng/components/common/api';
import { MessageService } from 'primeng/components/common/messageservice';

import { SchoolYear, ResponseResult } from './../../shared/domain/Common.model'
import { School } from './../../shared/domain/school'
import { SchoolSchoolYear } from './../../shared/domain/school.schoolyear'
import { CommonService } from './../../shared/services/Common.service'
import { SchoolService } from './../../shared/services/school.service'
import { SchoolYearService } from './../../shared/services/school.year.service'

@Component({
    templateUrl: './schoolyear-school.component.html',
    providers: [MessageService]
})
export class SchoolYearOfSchoolComponent implements OnInit {
    sessionInfo: any = {}
    selectedSchool: string;
    selectedSchoolYear: string;
    school: any = {}

    schoolList: SelectItem[];
    schoolYearList: SelectItem[];
    schoolDetailList: SchoolSchoolYear[];
    msgs: Message[] = [];

    constructor(public app: AppComponent, private schoolService: SchoolService,
        private commonService: CommonService, private schoolYearService: SchoolYearService,
        private messageService: MessageService) {

        this.app.displayLeftMenu(true);
        this.app.activeCategoryDropdown = true;
        this.app.pageProfile = GlobalHelper.getSideMenuTitle(MenuType.SchoolInSchoolYear);
        this.app.LeftMenuItems = GlobalHelper.getMenuItems(MenuType.SchoolInSchoolYear);
        this.sessionInfo = this.app.getSession();
    }

    ngOnInit() {
        let schoolListItems: School[] = [];
        this.schoolService.get(this.sessionInfo.client_id).subscribe((result: any) => schoolListItems = result.data,
            (error: any) => { },
            () => {
                this.schoolList = [];
                schoolListItems.map(o => { this.schoolList.push({ label: o.label, value: o.id }); });
            });

        let schoolYearListItems: SchoolYear[] = [];
        this.commonService.getSchoolYear(true).subscribe((result: any) => schoolYearListItems = result.data,
            (error: any) => { },
            () => {
                this.schoolYearList = [];
                schoolYearListItems.map(o => { this.schoolYearList.push({ label: o.school_year, value: o.id }); });
            });
    }
    getSchoolYears() {
        if (this.selectedSchool != undefined) {
            this.school.SchoolName = this.schoolList.find(x => x.value === this.selectedSchool).label;
        }
        if (this.selectedSchoolYear != undefined) {
            this.school.SchoolYear = this.schoolYearList.find(x => x.value === this.selectedSchoolYear).label;
        }
        let schooldetailList: SchoolSchoolYear[] = [];
        this.schoolYearService.get(this.sessionInfo.client_id, this.selectedSchool).subscribe((result: any) => schooldetailList = result.data,
            (error: any) => { },
            () => {
                this.schoolDetailList = [];
                schooldetailList.map(o => {
                    this.schoolDetailList.push({
                        end_date: new Date(o.end_date),
                        id: o.id,
                        schoolyear_num: o.schoolyear_num,
                        school_id: o.school_id,
                        school_name:o.school_name,
                        school_year: o.school_year,
                        school_year_id: o.school_year_id,
                        start_date: new Date(o.start_date)
                    });
                });
                if (this.selectedSchoolYear != undefined) {
                    this.schoolDetailList = this.schoolDetailList.filter(x => x.school_year_id === this.selectedSchoolYear);
                }
            });
    }
    editSchool(id) {
        let updatedSchool = this.schoolDetailList.find(x => x.id === id);
        updatedSchool.start_date = moment(updatedSchool.start_date,moment.defaultFormatUtc).format("MM/DD/YYYY");
        updatedSchool.end_date = moment(updatedSchool.end_date, moment.defaultFormatUtc).format("MM/DD/YYYY");
        let responseResult: ResponseResult;
        this.schoolYearService.update(updatedSchool).subscribe((result: any) => responseResult = result,
            (error: any) => {
                this.msgs.push({ severity: 'error', detail: error.error.message });
            },
            () => {
                this.msgs.push({ severity: 'success', detail: "School year updated successfully." });
            });
    }
}
