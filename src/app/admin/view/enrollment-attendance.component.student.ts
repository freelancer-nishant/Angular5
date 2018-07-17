import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { AppComponent } from '../../app.component';
import { GlobalHelper, MenuType } from './../../shared/app.globals';

import { SelectItem } from 'primeng/primeng';
import { Message } from 'primeng/components/common/api';

import { ResponseResult } from './../../shared/domain/Common.model';
import { YearService } from './../../shared/services/year.service';
import { Year } from './../../shared/domain/year';
@Component({
    templateUrl: './enrollment-attendance.component.html'
})
export class EnrollmentAndAttendanceComponentStudent implements OnInit {
    @Output() submit = new EventEmitter();
    selectedOption: any;
    isPanelVisible: any;
    year: any = {};
    years: SelectItem[];
    selectedYear: any;
    sessionInfo: any = {};
    fileData: string;
    UploadMsgs = [];
    UploadErrorMsgs = [];
    errorMsgs: Message[] = [];
    filesAdded: any;

    constructor(public app: AppComponent, private yearService: YearService) {
        this.app.activeCategoryDropdown = true;
        this.app.pageProfile = GlobalHelper.getSideMenuTitle(MenuType.EnrollmentAndAttendance);
        this.app.LeftMenuItems = GlobalHelper.getMenuItems(MenuType.EnrollmentAndAttendance);
        this.sessionInfo = this.app.getSession();
    }

    ngOnInit() {
        this.selectedOption = 'Student';
        this.years = [];
        let yearResult: Year[] = [];
        this.yearService.get().subscribe((result: any) => yearResult = result.data,
            (error: any) => { },
            () => {
                this.years = [];
                yearResult.map(o => { this.years.push({ label: o.school_year, value: o.id }); });
            });
    }

    schoolYearChange(e) {
        this.selectedYear = null;
        this.isPanelVisible = true;
        // this.year.selectYear = this.years.find(x => x.value === this.selectedYear).label;
        console.log(this.selectedYear);
    }



    uploadFile() {
        if (this.fileData != "" && this.fileData != undefined) {
            this.UploadMsgs.push({ severity: 'success', summary: 'success Message', detail: 'Upload Started' });
            let responseResult: ResponseResult;
            this.filesAdded.client_id = this.sessionInfo.client_id;
            this.filesAdded.school_year_id = this.selectedYear;
            this.filesAdded.skip_first_row = true;
            this.submit.emit();
        }
        else {
            this.errorMsgs.push({ severity: 'error', detail: 'Please input data to add.' });
        }
    }
}
