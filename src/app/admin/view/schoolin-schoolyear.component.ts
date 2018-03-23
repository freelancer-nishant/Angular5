import { Component, OnInit } from '@angular/core';
import { AppComponent } from '../../app.component';
import { GlobalHelper, MenuType } from './../../shared/app.globals';

@Component({
    templateUrl: './schoolin-schoolyear.component.html'
})
export class SchoolinSchoolYearComponent implements OnInit {

    constructor(public app: AppComponent) {
        app.displayLeftMenu(true);
        app.activeCategoryDropdown = true;        
        app.pageProfile = GlobalHelper.getSideMenuTitle(MenuType.SchoolInSchoolYear);
        app.LeftMenuItems = GlobalHelper.getMenuItems(MenuType.SchoolInSchoolYear);

    }

    ngOnInit() {
    }
}
