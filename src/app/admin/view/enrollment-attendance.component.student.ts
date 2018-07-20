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
export class EnrollmentAndAttendanceComponentStudent implements OnInit {
    @ViewChild(EnrollmentAndAttendanceComponent) enrollmentAttendanceComponent: EnrollmentAndAttendanceComponent;
    sessionInfo: any = {};

    constructor(public app: AppComponent,
        private enrollmentAttendanceService: EnrollmentAndAttendanceService,
        private year: YearService) {
        this.app.displayLeftMenu(true);
        this.app.activeCategoryDropdown = true;
        this.app.pageProfile = GlobalHelper.getSideMenuTitle(MenuType.EnrollmentAndAttendance);
        this.app.LeftMenuItems = GlobalHelper.getMenuItems(MenuType.EnrollmentAndAttendance);
    }

    ngOnInit() {
        this.enrollmentAttendanceComponent.selectedOption = 'Student';
    }

    submit() {
        console.log('into the child components fun');
        let responseResult: ResponseResult;
        this.enrollmentAttendanceService.saveStudent(this.enrollmentAttendanceComponent.filesAdded).subscribe(
            (result: any) => responseResult = result,
            (error: any) => {
                console.log(this.enrollmentAttendanceComponent.filesAdded);
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
