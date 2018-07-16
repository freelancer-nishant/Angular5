import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { AppComponent } from '../../app.component';
import { GlobalHelper, MenuType } from './../../shared/app.globals';
import { SelectItem } from 'primeng/primeng';
import { Message } from 'primeng/components/common/api';

import { ResponseResult } from './../../shared/domain/Common.model';
import { AssessmentUploadService } from './../../shared/services/assessment-upload.services';
import { SchoolService } from './../../shared/services/school.service';
import { SchoolYearService } from './../../shared/services/school.year.service';
import { TestVersionService } from './../../shared/services/testversion.service';
import { School } from './../../shared/domain/school';
import { SchoolSchoolYear } from './../../shared/domain/school.schoolyear';
import { TestVersion } from './../../shared/domain/testversion';

@Component({
    templateUrl: './assessments-upload.component.html',
})

export class AssessmentUploadsComponentSbacs implements OnInit {

    selectedOption: any;
    testVersions: any = {};
    school: any = {};
    sessionInfo: any = {};
    schools: SelectItem[];
    selectedSchool: any;
    schoolYears: SelectItem[];
    selectedYear: any;
    selectedTestVersion: any;
    isPanelVisible: boolean = false;
    test_type_ids: any = 1;
    SBACSummative: string;
    SBACSummativeUploadMsgs = [];
    SBACSummativeUploadErrorMsgs = [];
    errorMsgs: Message[] = [];
    filesAdded: any;
    constructor(public app: AppComponent, private schoolService: SchoolService,
        private schoolYearService: SchoolYearService,
        private testVersionService: TestVersionService,
        private assessmentService: AssessmentUploadService) {
        this.sessionInfo = this.app.getSession();
        this.app.displayLeftMenu(true);
        this.app.activeCategoryDropdown = true;
        this.app.pageProfile = GlobalHelper.getSideMenuTitle(MenuType.AssessmentUploads);
        this.app.LeftMenuItems = GlobalHelper.getMenuItems(MenuType.AssessmentUploads);
    }

    ngOnInit() {

        this.selectedOption = 'SBAC Summative';
        this.schools = [];
        this.schoolYears = [];
        this.testVersions = [];
        this.filesAdded = {};

        let schoolResult: School[] = [];
        this.schoolService.get(this.sessionInfo.client_id).subscribe((result: any) => schoolResult = result.data,
            (error: any) => { },
            () => {
                this.schools = [];
                schoolResult.map(o => { this.schools.push({ label: o.name, value: o.id }); });
            });

        let testVersionResult: TestVersion[] = [];
        this.testVersionService.get(this.selectedSchool, this.selectedYear,
            this.selectedTestVersion).subscribe((result: any) => testVersionResult = result.data,
                (error: any) => { },
                () => {
                    this.testVersions = [];
                    testVersionResult.map(o => { this.testVersions.push({ label: o.version_number, value: o.version_label }); });
                });
    }


    onGoClick() {
        this.isPanelVisible = true;
        this.school.SchoolName = this.schools.find(x => x.value === this.selectedSchool).label;
        this.school.SchoolYear = this.schoolYears.find(x => x.value === this.selectedYear).label;
        this.testVersions.TestVersion = this.testVersions.find(x => x.value === this.selectedTestVersion).label;
    }

    schoolChange(e) {
        this.isPanelVisible = false;
        let schollYears: SchoolSchoolYear[] = [];
        this.schoolYears = [];
        this.selectedYear = null;
        this.schoolYearService.get(this.sessionInfo.client_id, this.selectedSchool).subscribe((result: any) => schollYears = result.data,
            (error: any) => { },
            () => {
                this.schoolYears = [];
                schollYears.map(o => { this.schoolYears.push({ label: o.school_year, value: o.school_year_id }); });
            });
    }

    schoolYearChange(e) {
        this.isPanelVisible = false;
        let versions: TestVersion[] = [];
        this.testVersions = [];
        this.selectedTestVersion = null;
        this.testVersionService.get(this.selectedSchool, this.selectedYear).subscribe((result: any) => versions = result.data,
            (error: any) => { },
            () => {
                this.testVersions = [];
                versions.map(o => { this.testVersions.push({ label: o.version_label, value: o.version_number }); });
            });
    }
    // SBAC 2015-2016
    uploadSBACSummative() {
        if (this.SBACSummative != "" && this.SBACSummative != undefined) {
            this.SBACSummativeUploadMsgs.push({ severity: 'success', summary: 'success Message', detail: 'Upload Started' });
            let responseResult: ResponseResult;
            this.filesAdded.client_id = this.sessionInfo.client_id;
            this.filesAdded.school_id = this.selectedSchool;
            this.filesAdded.school_year_id = this.selectedYear;
            this.filesAdded.testversion_id = this.selectedTestVersion;
            this.filesAdded.skip_first_row = true;
            this.assessmentService.saveSBACSummative(this.filesAdded).subscribe((result: any) => responseResult = result,
                (error: any) => {
                    this.SBACSummativeUploadErrorMsgs.push({ severity: 'error', summary: 'error Message', detail: error.error.message });
                },
                () => {
                    this.SBACSummativeUploadMsgs.push({ severity: 'success', summary: 'success Message', detail: "Days In School Year added successfully." });
                });
        }
        else {
            this.errorMsgs.push({ severity: 'error', detail: 'Please input data to add.' });
        }
    }
}
