import { Component, OnInit } from '@angular/core';
import { AppComponent } from '../../app.component';
import { GlobalHelper, MenuType } from './../../shared/app.globals';
import { SelectItem } from 'primeng/primeng';

import { ComparativeListItem } from './../../shared/domain/comparative.list'
import { ComparativeListService } from './../../shared/services/comparativelist.service'

@Component({
    templateUrl: './compare.school.scorecards.component.html'
})
export class CompareSchoolScorecardsComponent implements OnInit {
    parameters: any = {}
    sessionInfo: any = {}

    comparativeList: SelectItem[];
    selectedComparative: any;

    constructor(public app: AppComponent, private comparativeListService: ComparativeListService) {
        app.displayLeftMenu(true);
        app.activeCategoryDropdown = true;
        app.pageProfile = GlobalHelper.getSideMenuTitle(MenuType.ComparisonSchools);
        app.LeftMenuItems = GlobalHelper.getMenuItems(MenuType.ComparisonSchools);
        this.sessionInfo = this.app.getSession();
    }

    ngOnInit() {
        this.comparativeList = [];

        let comparativeListItems: ComparativeListItem[] = [];
        this.comparativeListService.get(this.sessionInfo.client_id).subscribe((result: any) => comparativeListItems = result.data,
            //error => () => { this.msgError = "Invalid credentials"; this.loginProcessing = false; },
            (error: any) => { },
            () => {
                this.comparativeList = [];
                this.comparativeList.push({ label: '--Select--', value: 0 })
                comparativeListItems.map(o => { this.comparativeList.push({ label: o.label, value: o.id }); });
            });
    }

    submit() {
        //this.parameters = JSON.stringify({
        //    "client_id": [this.sessionInfo.client_id],
        //    "School_Year_CELDT": [this.selectedYear],
        //    "School_CELDT": [this.selectedSchool],
        //    "Grade_CELDT": this.selectedGrades
        //});
    }
}
