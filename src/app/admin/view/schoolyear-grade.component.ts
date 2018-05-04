import { Component, OnInit } from '@angular/core';
import { AppComponent } from '../../app.component';
import { GlobalHelper, MenuType } from './../../shared/app.globals';
import * as moment from 'moment';
import { SelectItem } from 'primeng/primeng';
import { Message } from 'primeng/components/common/api';
import { MessageService } from 'primeng/components/common/messageservice';

import { ResponseResult } from './../../shared/domain/Common.model'
import { School } from './../../shared/domain/school'
import { SchoolGrade } from './../../shared/domain/school.schoolgrade'
import { SchoolService } from './../../shared/services/school.service'
import { SchoolGradeService } from './../../shared/services/school.grade.service'

@Component({
    templateUrl: './schoolyear-grade.component.html',
    providers: [MessageService]
})
export class GradeInSchoolYearComponent implements OnInit {
    sessionInfo: any = {}
    selectedSchool: string;
    selectedSchoolYear: string;
    selectedSchoolGrade: SchoolGrade;
    school: any = {}

    schoolList: SelectItem[];
    schoolYearList: SelectItem[];
    schoolGradeList: SchoolGrade[];
    msgs: Message[] = [];

    constructor(public app: AppComponent, private schoolService: SchoolService,
        private schoolGradeService: SchoolGradeService,
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
    }
    getSchoolYearGrades() {
        if (this.selectedSchool != undefined) {
            this.school.SchoolName = this.schoolList.find(x => x.value === this.selectedSchool).label;
        }
        if (this.selectedSchoolYear != undefined) {
            this.school.SchoolYear = this.schoolYearList.find(x => x.value === this.selectedSchoolYear).label;
        }
        let schoolgradeList: SchoolGrade[] = [];
        this.schoolGradeService.get(this.sessionInfo.client_id, this.selectedSchool).subscribe((result: any) => schoolgradeList = result.data,
            (error: any) => { },
            () => {
                this.schoolGradeList = [];
                schoolgradeList.map(o => {
                    this.schoolGradeList.push({
                        client_id: o.client_id,
                        grade: o.grade,
                        grade_id: o.grade_id,
                        grade_int: o.grade_int,
                        id: o.id,
                        school_id: o.school_id
                    });
                });
            });
    }
    addGrade() {
        if (this.selectedSchoolGrade != undefined) {
            let responseResult: ResponseResult;
            this.schoolGradeService.insert(this.selectedSchoolGrade).subscribe((result: any) => responseResult = result,
                (error: any) => {
                    this.msgs.push({ severity: 'error', detail: error.error.message });
                },
                () => {
                    this.msgs.push({ severity: 'success', detail: "School grade added successfully." });
                });
        }
        else {
            this.msgs.push({ severity: 'error', detail: "Please select grade to add." });
        }
    }
}
