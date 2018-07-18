import { Component, OnInit, EventEmitter, Output, ViewChild } from '@angular/core';
import { AppComponent } from '../../app.component';
import { GlobalHelper, MenuType } from './../../shared/app.globals';
import { ResponseResult } from './../../shared/domain/Common.model';
import { YearService } from './../../shared/services/year.service';
import { EnrollmentAndAttendanceComponent } from './enrollment-attendance.component';
import { EnrollmentAndAttendanceService } from './../../shared/services/enrollment-attendance.services';

@Component({
    template: '<enrollment-attendance-component (submit)="submit()"></enrollment-attendance-component>',
})
export class EnrollmentAndAttendanceComponentPeriodTeacher implements OnInit {
    @ViewChild(EnrollmentAndAttendanceComponent) enrollmentAttendanceComponent: EnrollmentAndAttendanceComponent;
    sessionInfo: any = {};

    constructor(public app: AppComponent,
        private enrollmentAttendanceService: EnrollmentAndAttendanceService) {
        this.app.displayLeftMenu(true);
        this.app.activeCategoryDropdown = true;
        this.app.pageProfile = GlobalHelper.getSideMenuTitle(MenuType.EnrollmentAndAttendance);
        this.app.LeftMenuItems = GlobalHelper.getMenuItems(MenuType.EnrollmentAndAttendance);
    }

    ngOnInit() {
        this.enrollmentAttendanceComponent.selectedOption = '1st Period Teacher';
    }

    submit() {
        let responseResult: ResponseResult;
        this.enrollmentAttendanceService.saveTeacher(this.enrollmentAttendanceComponent.filesAdded).subscribe(
            (result: any) => responseResult = result,
            (error: any) => {
                this.enrollmentAttendanceComponent.UploadErrorMsgs.push
                ({ severity: 'error', summary: 'error Message', detail: error.error.message });
            },
            () => {
                this.enrollmentAttendanceComponent.UploadErrorMsgs.push
                ({ severity: 'success', summary: 'success Message', detail: "Student added successfully." });
            }
    );

    }
}
