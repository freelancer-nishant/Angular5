import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { AppComponent } from '../../app.component';
import { SelectItem } from 'primeng/primeng';
import { Message } from 'primeng/components/common/api';
import { ResponseResult } from './../../shared/domain/Common.model';
import { EnrollmentAndAttendanceService } from './../../shared/services/enrollment-attendance.services';
import { YearService } from './../../shared/services/year.service';
import { GlobalHelper, MenuType } from './../../shared/app.globals';
import { Year } from './../../shared/domain/year';
import { Student } from './../../shared/domain/student';

@Component({
    selector: 'enrollment-attendance-component',
    templateUrl: './enrollment-attendance.component.html'
})
export class EnrollmentAndAttendanceComponent implements OnInit {
    @Output() submit = new EventEmitter();
    selectedYearName: string;
    selectedOption: any;
    sessionInfo: any = {};
    isPanelVisible: any;
    schoolYears: SelectItem[];
    selectedYear: any;
    fileData: string;
    UploadMsgs = [];
    UploadErrorMsgs = [];
    errorMsgs: Message[] = [];
    filesAdded: any;

    constructor(public app: AppComponent, private yearService: YearService,
        private enrollmentAndAttendanceService: EnrollmentAndAttendanceService) {
        this.sessionInfo = this.app.getSession();
        this.app.displayLeftMenu(true);
        this.app.activeCategoryDropdown = true;
        this.app.pageProfile = GlobalHelper.getSideMenuTitle(MenuType.EnrollmentAndAttendance);
        this.app.LeftMenuItems = GlobalHelper.getMenuItems(MenuType.EnrollmentAndAttendance);
    }

    ngOnInit() {
        this.schoolYears = [];
        this.filesAdded = {};
        let yearResult: Year[] = [];
        this.yearService.get().subscribe((result: any) => yearResult = result.data,
            (error: any) => { },
            () => {
                this.schoolYears = [];
                yearResult.map(o => {
                    this.schoolYears.push({ label: o.school_year, value: o.id });
                });
            });
    }

    onGoClick() {
        this.isPanelVisible = true;
        this.selectedYearName = this.schoolYears.find(x => x.value === this.selectedYear).label;
    }

    schoolYearChange(e) {
        this.isPanelVisible = false;
    }

    uploadFile() {
        if (this.fileData != "" && this.fileData != undefined) {
            let responseResult: ResponseResult;
            this.filesAdded.client_id = this.sessionInfo.client_id;
            this.filesAdded.school_year_id = this.selectedYear;
            this.filesAdded.skip_first_row = true;
            this.submit.emit();
            this.UploadMsgs.push({ severity: 'success', summary: 'success Message', detail: 'Upload Started' });
        }
        else {
            this.errorMsgs.push({ severity: 'error', detail: 'Please input data to add.' });
        }
    }

}
