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
import { SemesterInSchoolYearService } from './../../shared/services/semester.inschoolyear.service'
import { SemesterInSchoolYear } from './../../shared/domain/semester.inschoolyear'

@Component({
    templateUrl: './schoolyear-school.component.html',
    providers: [MessageService]
})
export class SchoolYearOfSchoolComponent implements OnInit {
    sessionInfo: any = {}
    school: any = {}
    semester: any = {}

    schoolList: SelectItem[];
    selectedSchool: any;

    schoolYearList: SelectItem[];
    selectedSchoolYear: any;

    schoolDetailList: SchoolSchoolYear[];

    semesterDetailList: SemesterInSchoolYear[];
    semesterAdded: any;
    msgs: Message[] = [];

    constructor(public app: AppComponent, private schoolService: SchoolService,
        private commonService: CommonService, private schoolYearService: SchoolYearService, private semesterInSchoolYearService: SemesterInSchoolYearService,
        private messageService: MessageService) {

        this.app.displayLeftMenu(true);
        this.app.activeCategoryDropdown = true;
        this.app.pageProfile = GlobalHelper.getSideMenuTitle(MenuType.SchoolInSchoolYear);
        this.app.LeftMenuItems = GlobalHelper.getMenuItems(MenuType.SchoolInSchoolYear);
        this.sessionInfo = this.app.getSession();
    }

    ngOnInit() {
        this.schoolList = [];
        this.schoolYearList = [];
        this.semesterAdded = {};

        let schoolListItems: School[] = [];
        this.schoolService.get(this.sessionInfo.client_id).subscribe((result: any) => schoolListItems = result.data,
            (error: any) => { },
            () => {
                this.schoolList = [];
                schoolListItems.map(o => { this.schoolList.push({ label: o.label, value: o.id }); });
            });
    }
    onGoClick() {
        if (this.onGoClick != undefined) {
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
                        school_name: o.school_name,
                        school_year: o.school_year,
                        school_year_id: o.school_year_id,
                        start_date: new Date(o.start_date)
                    });
                });
                if (this.selectedSchoolYear != undefined) {
                    this.schoolDetailList = this.schoolDetailList.filter(x => x.school_year_id === this.selectedSchoolYear);
                }
            });

        let semesterdetailList: SemesterInSchoolYear[] = [];
        this.semesterInSchoolYearService.get(this.sessionInfo.client_id, this.selectedSchoolYear).subscribe((result: any) => semesterdetailList = result.data,
            (error: any) => { },
            () => {
                this.semesterDetailList = [];
                semesterdetailList.map(s => {
                    this.semesterDetailList.push({
                        end_date: new Date(s.end_date),
                        id: s.id,
                        schoolyear_num: s.schoolyear_num,
                        label: s.label,
                        school_year: s.school_year,
                        school_year_id: s.school_year_id,
                        start_date: new Date(s.start_date)
                    });
                });
                if (this.selectedSchoolYear != undefined) {
                    this.semesterDetailList = this.semesterDetailList.filter(x => x.school_year_id === this.selectedSchoolYear);
                }
            });
    }
    editSchool(id) {
        let updatedSchool = this.schoolDetailList.find(x => x.id === id);
        updatedSchool.start_date = moment(updatedSchool.start_date, moment.defaultFormatUtc).format("MM/DD/YYYY");
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

    schoolChange(e) {
        let schoolYearListItems: SchoolSchoolYear[] = [];

        this.schoolYearList = [];
        this.selectedSchoolYear = null;

        this.schoolYearService.get(this.sessionInfo.client_id, this.selectedSchool).subscribe((result: any) => schoolYearListItems = result.data,
            (error: any) => { },
            () => {
                this.schoolYearList = [];
                schoolYearListItems.map(o => { this.schoolYearList.push({ label: o.school_year, value: o.school_year_id }); });
            });
    }

    addSemester() {
        if (this.semesterAdded != undefined && this.semesterAdded != null) {
            let responseResult: ResponseResult;
            this.semesterInSchoolYearService.insert(this.semesterAdded).subscribe((result: any) => responseResult = result,
                (error: any) => {
                    debugger
                    this.msgs.push({ severity: 'error', detail: error.error.message });
                },
                () => {
                    debugger
                    this.msgs.push({ severity: 'success', detail: "Semester In School Year added successfully." });
                });
        }
        else {
            this.msgs.push({ severity: 'error', detail: "Please input data to add." });
        }
    }
}
