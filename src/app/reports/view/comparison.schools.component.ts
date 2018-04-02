import { Component, OnInit } from '@angular/core';
import { AppComponent } from '../../app.component';
import { GlobalHelper, MenuType } from './../../shared/app.globals';

@Component({
    templateUrl: './comparison.schools.component.html'
})
export class ComparisonSchoolsComponent implements OnInit {

    constructor(public app: AppComponent) {
        this.app.displayLeftMenu(true);
        this.app.activeCategoryDropdown = true;        
        this.app.pageProfile = GlobalHelper.getSideMenuTitle(MenuType.ComparisonSchools);
        this.app.LeftMenuItems = GlobalHelper.getMenuItems(MenuType.ComparisonSchools);

    }

    ngOnInit() {
    }
}
