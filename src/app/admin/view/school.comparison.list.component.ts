import { Component, OnInit } from '@angular/core';
import { AppComponent } from '../../app.component';
import { GlobalHelper, MenuType } from './../../shared/app.globals';

@Component({
    templateUrl: './school.comparison.list.component.html'
})
export class SchoolComparisonListComponent implements OnInit {

    constructor(public app: AppComponent) {
        app.displayLeftMenu(true);
        app.activeCategoryDropdown = true;        
        app.pageProfile = GlobalHelper.getSideMenuTitle(MenuType.SchoolComparisonList);
        app.LeftMenuItems = GlobalHelper.getMenuItems(MenuType.SchoolComparisonList);

    }

    ngOnInit() {
    }
}
