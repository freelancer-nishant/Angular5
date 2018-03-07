import { Component, OnInit } from '@angular/core';
import { AppComponent } from '../../app.component';
import { GlobalHelper, MenuType } from './../../shared/app.globals';

@Component({
    templateUrl: './student.scorecards.report.html'
})
export class StudentScorecardsReportComponent implements OnInit {

    constructor(public app: AppComponent) {
        app.displayLeftMenu(true);
        app.activeCategoryDropdown = true;
        app.pageProfile = GlobalHelper.getSideMenuTitle(MenuType.StudentScorecards);
        app.LeftMenuItems = GlobalHelper.getMenuItems(MenuType.StudentScorecards);

    }

    ngOnInit() {
    }
}
