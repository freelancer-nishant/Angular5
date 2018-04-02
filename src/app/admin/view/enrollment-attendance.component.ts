import { Component, OnInit } from '@angular/core';
import { AppComponent } from '../../app.component';
import { GlobalHelper, MenuType } from './../../shared/app.globals';

@Component({
    templateUrl: './enrollment-attendance.component.html'
})
export class EnrollmentAndAttendanceComponent implements OnInit {

    constructor(public app: AppComponent) {
        this.app.displayLeftMenu(true);
        this.app.activeCategoryDropdown = true;        
        this.app.pageProfile = GlobalHelper.getSideMenuTitle(MenuType.EnrollmentAndAttendance);
        this.app.LeftMenuItems = GlobalHelper.getMenuItems(MenuType.EnrollmentAndAttendance);

    }

    ngOnInit() {
    }
}
