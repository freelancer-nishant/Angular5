import { Component, OnInit } from '@angular/core';
import { AppComponent } from '../../app.component';
import { GlobalHelper, MenuType } from './../../shared/app.globals';

@Component({
    templateUrl: './enrollment-attendance.component.html'
})
export class EnrollmentAndAttendanceComponent implements OnInit {

    constructor(public app: AppComponent) {
        app.displayLeftMenu(true);
        app.activeCategoryDropdown = true;        
        app.pageProfile = GlobalHelper.getSideMenuTitle(MenuType.EnrollmentAndAttendance);
        app.LeftMenuItems = GlobalHelper.getMenuItems(MenuType.EnrollmentAndAttendance);

    }

    ngOnInit() {
    }
}
