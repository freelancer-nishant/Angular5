import { Component, OnInit } from '@angular/core';
import { AppComponent } from '../../app.component';
import { GlobalHelper, MenuType } from './../../shared/app.globals';

@Component({
    templateUrl: './enrollment-attendance.component.html'
})
export class EnrollmentAndAttendanceComponentDailyAttendance implements OnInit {

    selectedOption: any;
    constructor(public app: AppComponent) {
        this.app.displayLeftMenu(true);
        this.app.activeCategoryDropdown = true;
        this.app.pageProfile = GlobalHelper.getSideMenuTitle(MenuType.EnrollmentAndAttendance);
        this.app.LeftMenuItems = GlobalHelper.getMenuItems(MenuType.EnrollmentAndAttendance);

    }

    ngOnInit() {
        this.selectedOption = 'Daily Attendance';
        console.log('enrollment attendance');
    }
}
