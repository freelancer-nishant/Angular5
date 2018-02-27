import { Component, OnInit } from '@angular/core';
import { AppComponent } from '../../../app.component';
import { GlobalHelper, MenuType } from './../../../shared/app.globals';

@Component({
    templateUrl: './assessments.component.html'   
})

export class AssessmentsComponent implements OnInit {

    constructor(public app: AppComponent) {
        app.displayLeftMenu(true);
        app.activeCategoryDropdown = true;
        app.LeftMenuItems = GlobalHelper.getMenuItems(MenuType.Assessment);
        app.pageProfile = GlobalHelper.getSideMenuTitle(MenuType.Assessment);
    }

    ngOnInit() {

    }
}
