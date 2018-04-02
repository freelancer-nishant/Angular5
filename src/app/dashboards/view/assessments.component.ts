import { Component, OnInit } from '@angular/core';
import { AppComponent } from '../../app.component';
import { GlobalHelper, MenuType } from './../../shared/app.globals';

@Component({
    templateUrl: './assessments.component.html'   
})

export class AssessmentsComponent implements OnInit {

    constructor(public app: AppComponent) {
        this.app.displayLeftMenu(true);
        this.app.activeCategoryDropdown = true;
        this.app.LeftMenuItems = GlobalHelper.getMenuItems(MenuType.Assessment);
        this.app.pageProfile = GlobalHelper.getSideMenuTitle(MenuType.Assessment);
    }

    ngOnInit() {

    }
}
