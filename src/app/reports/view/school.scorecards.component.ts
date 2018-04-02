import { Component, OnInit } from '@angular/core';
import { AppComponent } from '../../app.component';
import { GlobalHelper, MenuType } from './../../shared/app.globals';

@Component({
    templateUrl: './school.scorecards.component.html'
})
export class SchoolScorecardsComponent implements OnInit {

    constructor(public app: AppComponent) {
        this.app.displayLeftMenu(true);
        this.app.activeCategoryDropdown = true;
        this.app.pageProfile = GlobalHelper.getSideMenuTitle(MenuType.SchoolScorecard);
        this.app.LeftMenuItems = GlobalHelper.getMenuItems(MenuType.SchoolScorecard);

    }

    ngOnInit() {
    }
}
