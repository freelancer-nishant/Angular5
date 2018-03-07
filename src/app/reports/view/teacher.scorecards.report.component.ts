import { Component, OnInit } from '@angular/core';
import { AppComponent } from '../../app.component';
import { GlobalHelper, MenuType } from './../../shared/app.globals';

@Component({
    templateUrl: './teacher.scorecards.report.component.html'
})
export class TeacherScorecardsReportComponent implements OnInit {

    constructor(public app: AppComponent) {
        app.displayLeftMenu(true);
        app.activeCategoryDropdown = true;
        app.pageProfile = GlobalHelper.getSideMenuTitle(MenuType.TeacherScorecards);
        app.LeftMenuItems = GlobalHelper.getMenuItems(MenuType.TeacherScorecards);

    }

    ngOnInit() {
    }
}
