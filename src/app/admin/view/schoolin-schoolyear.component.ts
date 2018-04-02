import { Component, OnInit } from '@angular/core';
import { AppComponent } from '../../app.component';
import { GlobalHelper, MenuType } from './../../shared/app.globals';

@Component({
    templateUrl: './schoolin-schoolyear.component.html'
})
export class SchoolinSchoolYearComponent implements OnInit {

    constructor(public app: AppComponent) {
        this.app.displayLeftMenu(true);
        this.app.activeCategoryDropdown = true;        
        this.app.pageProfile = GlobalHelper.getSideMenuTitle(MenuType.SchoolInSchoolYear);
        this.app.LeftMenuItems = GlobalHelper.getMenuItems(MenuType.SchoolInSchoolYear);

    }

    ngOnInit() {
    }
}
