import { Component, OnInit } from '@angular/core';
import { AppComponent } from '../../app.component';
import { GlobalHelper, MenuType } from './../../shared/app.globals';

@Component({
    templateUrl: './teacher.scorecards.report.component.html'
})
export class TeacherScorecardsReportComponent implements OnInit {

    constructor(public app: AppComponent) {
        this.app.displayLeftMenu(true);
        this.app.activeCategoryDropdown = true;
        this.app.pageProfile = GlobalHelper.getSideMenuTitle(MenuType.TeacherScorecards);
        this.app.LeftMenuItems = GlobalHelper.getMenuItems(MenuType.TeacherScorecards);

    }

    ngOnInit() {
    }
}
