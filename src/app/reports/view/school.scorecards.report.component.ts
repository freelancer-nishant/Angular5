import { Component, OnInit } from '@angular/core';
import { AppComponent } from '../../app.component';
import { GlobalHelper, MenuType } from './../../shared/app.globals';
import { SelectItem } from 'primeng/primeng';

import { ComparativeListItem } from './../../shared/domain/comparative.list'
import { SchoolYear } from './../../shared/domain/Common.model'
import { School } from './../../demo/domain/school'
import { CommonService } from './../../shared/services/Common.service'
import { SchoolService } from './../../demo/service/school.service'



@Component({
    templateUrl: './school.scorecards.report.component.html'
})
export class SchoolScorecardsReportComponent implements OnInit {

    parameters: any = {}
    sessionInfo: any = {}

    schoolList: SelectItem[];
    schoolYearList: SelectItem[];

    selectedSchool: any;
    selectedSchoolYear: any;

    constructor(public app: AppComponent, private schoolService: SchoolService, private commonService: CommonService ) {
        app.displayLeftMenu(true);
        app.activeCategoryDropdown = true;
        app.pageProfile = GlobalHelper.getSideMenuTitle(MenuType.SchoolScorecard);
        app.LeftMenuItems = GlobalHelper.getMenuItems(MenuType.SchoolScorecard);

        this.sessionInfo = this.app.getSession();

    }

    ngOnInit() {
        let schoolListItems: School[] = [];
        this.schoolService.get(this.sessionInfo.client_id).subscribe((result: any) => schoolListItems = result.data,
            //error => () => { this.msgError = "Invalid credentials"; this.loginProcessing = false; },
            (error: any) => { },
            () => {
                this.schoolList = [];
                //this.schoolList.push({ label: '--Select--', value: 0 })

                schoolListItems.map(o => { this.schoolList.push({ label: o.label, value: o.state_school_code }); });
            });

        let schoolYearListItems: SchoolYear[] = [];
        this.commonService.getSchoolYear(true).subscribe((result: any) => schoolYearListItems = result.data,
            (error: any) => { },
            () => {
                this.schoolYearList = [];
                //this.schoolYearList.push({ label: '--Select--', value: 0 })
                schoolYearListItems.map(o => { this.schoolYearList.push({ label: o.school_year, value: o.id }); });
            });
    }

    submit() {
        this.parameters = JSON.stringify({
            "School_Code": [this.selectedSchool],
            "School_Year": [this.selectedSchoolYear]
        });
    }
}

