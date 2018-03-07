import { Component, OnInit } from '@angular/core';
import { AppComponent } from '../../app.component';
import { GlobalHelper, MenuType } from './../../shared/app.globals';

@Component({
    templateUrl: './comparison.schools.component.html'
})
export class ComparisonSchoolsComponent implements OnInit {

    constructor(public app: AppComponent) {
        app.displayLeftMenu(true);
        app.activeCategoryDropdown = true;        
        app.pageProfile = GlobalHelper.getSideMenuTitle(MenuType.ComparisonSchools);
        app.LeftMenuItems = GlobalHelper.getMenuItems(MenuType.ComparisonSchools);

    }

    ngOnInit() {
    }
}
