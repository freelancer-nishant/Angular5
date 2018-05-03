import { Component, OnInit } from '@angular/core';
import { AppComponent } from '../../app.component';
import { GlobalHelper, MenuType } from './../../shared/app.globals';
import { SelectItem } from 'primeng/primeng';

import { SchoolYear } from './../../shared/domain/Common.model'
import { School } from './../../shared/domain/school'
import { SchoolSchoolYear } from './../../shared/domain/school.schoolyear'
import { CommonService } from './../../shared/services/Common.service'
import { SchoolService } from './../../shared/services/school.service'
import { SchoolYearService } from './../../shared/services/school.year.service'

@Component({
    templateUrl: './schoolyear-ofschool.component.html'
})
export class SchoolYearOfSchoolComponent implements OnInit {
    sessionInfo: any = {}
    selectedSchool: string;
    selectedSchoolYear: string;
    school: any = {}

    schoolList: SelectItem[];
    schoolYearList: SelectItem[];
    schoolDetailList: SchoolSchoolYear[];

    constructor(public app: AppComponent, private schoolService: SchoolService, private commonService: CommonService, private schoolYearService: SchoolYearService) {
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
                schoolListItems.map(o => { this.schoolList.push({ label: o.label, value: o.state_school_code }); });
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
                        end_date: o.end_date,
                        id: o.id,
                        schoolyear_num: o.schoolyear_num,
                        school_id: o.school_id,
                        school_year:o.school_year,
                        school_year_id: o.school_year_id,
                        start_date:o.start_date
                    });
                });
            });
    }
}
