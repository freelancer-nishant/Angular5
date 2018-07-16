import { Component, OnInit, EventEmitter, Output, ViewChild } from '@angular/core';
import { AppComponent } from '../../app.component';
import { GlobalHelper, MenuType } from './../../shared/app.globals';

import { ResponseResult } from './../../shared/domain/Common.model';
import { AssessmentUploadService } from './../../shared/services/assessment-upload.services';
import { AssessmentUploadsComponent } from './assessments-upload.component';

@Component({
    template: '<assessments-upload-component (submit)="submit()"></assessments-upload-component>',
})
export class AssessmentUploadsComponentNwea implements OnInit {
    @ViewChild(AssessmentUploadsComponent) assessmentUploadsComponent: AssessmentUploadsComponent;
    sessionInfo: any = {};

    constructor(public app: AppComponent,
        private assessmentService: AssessmentUploadService) {
        this.app.displayLeftMenu(true);
        this.app.activeCategoryDropdown = true;
        this.app.pageProfile = GlobalHelper.getSideMenuTitle(MenuType.AssessmentUploads);
        this.app.LeftMenuItems = GlobalHelper.getMenuItems(MenuType.AssessmentUploads);
    }

    ngOnInit() {
        this.assessmentUploadsComponent.selectedOption = 'NWEA';
    }

    submit() {
        let responseResult: ResponseResult;
        this.assessmentService.saveNWEA(this.assessmentUploadsComponent.filesAdded).subscribe((result: any) => responseResult = result,
            (error: any) => {
                this.assessmentUploadsComponent.UploadErrorMsgs.push({ severity: 'error', summary: 'error Message', detail: error.error.message });
            },
            () => {
                this.assessmentUploadsComponent.UploadMsgs.push({ severity: 'success', summary: 'success Message', detail: "NWEA added successfully." });
            });
    }
}
