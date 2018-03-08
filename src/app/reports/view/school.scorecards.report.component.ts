import { Component, OnInit } from '@angular/core';
import { AppComponent } from '../../app.component';
import { GlobalHelper, MenuType } from './../../shared/app.globals';
import { SelectItem } from 'primeng/primeng';

import { ComparativeListItem } from './../../shared/domain/comparative.list'
import { SchoolYear } from './../../shared/domain/Common.model'
import { ComparativeListService } from './../../shared/services/comparativelist.service'
import { CommonService } from './../../shared/services/Common.service'



@Component({
    templateUrl: './school.scorecards.report.component.html'
})
export class SchoolScorecardsReportComponent implements OnInit {

    parameters: any = {}
    sessionInfo: any = {}

    comparativeList: SelectItem[];
    schoolYearList: SelectItem[];

    selectedComparative: any;
    selectedSchoolYear: any;

    constructor(public app: AppComponent, private comparativeListService: ComparativeListService, private commonService: CommonService) {
        app.displayLeftMenu(true);
        app.activeCategoryDropdown = true;
        app.pageProfile = GlobalHelper.getSideMenuTitle(MenuType.SchoolScorecard);
        app.LeftMenuItems = GlobalHelper.getMenuItems(MenuType.SchoolScorecard);

        this.sessionInfo = this.app.getSession();

    }

    ngOnInit() {
        let comparativeListItems: ComparativeListItem[] = [];
        this.comparativeListService.get(this.sessionInfo.client_id).subscribe((result: any) => comparativeListItems = result.data,
            //error => () => { this.msgError = "Invalid credentials"; this.loginProcessing = false; },
            (error: any) => { },
            () => {
                this.comparativeList = [];
                this.comparativeList.push({ label: '--Select--', value: 0 })

                comparativeListItems.map(o => { this.comparativeList.push({ label: o.label, value: o.id }); });
            });

        let schoolYearListItems: SchoolYear[] = [];
        this.commonService.getSchoolYear().subscribe((result: any) => schoolYearListItems = result.data,
            (error: any) => { },
            () => {
                this.schoolYearList = [];
                this.schoolYearList.push({ label: '--Select--', value: 0 })
                schoolYearListItems.map(o => { this.schoolYearList.push({ label: o.school_year, value: o.id }); });
            });
    }

    submit() {
        this.parameters = JSON.stringify({
            "School_Code": ['0112607'], //this.selectedComparative,
            "School_Year": [this.selectedSchoolYear]
        });
    }
}

