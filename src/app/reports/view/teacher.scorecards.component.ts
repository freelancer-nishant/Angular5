import { Component, OnInit } from '@angular/core';
import { AppComponent } from '../../app.component';
import { GlobalHelper, MenuType } from './../../shared/app.globals';

@Component({
    templateUrl: './teacher.scorecards.component.html'
})
export class TeacherScorecardsComponent implements OnInit {

    constructor(public app: AppComponent) {
        this.app.displayLeftMenu(true);
        this.app.activeCategoryDropdown = true;
        this.app.pageProfile = GlobalHelper.getSideMenuTitle(MenuType.TeacherScorecards);
        this.app.LeftMenuItems = GlobalHelper.getMenuItems(MenuType.TeacherScorecards);

    }

    ngOnInit() {
    }
}
