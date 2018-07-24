import { Component, OnInit } from '@angular/core';
import { AppComponent } from '../../app.component';
import { GlobalHelper, MenuType } from './../../shared/app.globals';
import { AssessmentService } from './../../shared/services/assessment.service';
import { AssessmentSubjectService } from '../../shared/services/assessment-subject.services';
import { ResponseResult } from '../../shared/domain/Common.model';
import { Message } from 'primeng/components/common/message';

@Component({
    templateUrl: './admin-assessmentsubjects.component.html'
})
export class AdminAssessmentSubjectsComponent implements OnInit {
    msgs: Message[] = [];
    assessmentList: any = [];
    assessmentSubjectList: any = [];
    selectedAssessment: any;

    AssessmentSubject: any = {};

    constructor(public app: AppComponent, private assessmentService: AssessmentService, private assessmentSubjectService: AssessmentSubjectService) {
        this.app.displayLeftMenu(true);
        this.app.activeCategoryDropdown = true;
        this.app.pageProfile = GlobalHelper.getSideMenuTitle(MenuType.Assessments);
        this.app.LeftMenuItems = GlobalHelper.getMenuItems(MenuType.Assessments);
    }

    ngOnInit() {
        let assessmentList: any[] = [];
        this.assessmentService.get().subscribe((result: any) => assessmentList = result.data,
            (error: any) => { },
            () => {
                this.assessmentList = [];

                assessmentList.map(o => {
                    this.assessmentList.push({
                        value: o.id,
                        label: o.test_type_name
                    });
                });
            });
    }

    loadAssessmentSubject() {
        let assessmentList: any[] = [];
        this.assessmentSubjectService.get(this.selectedAssessment, null).subscribe((result: any) => assessmentList = result.data,
            (error: any) => { },
            () => {
                this.assessmentSubjectList = [];

                assessmentList.map(o => {
                    this.assessmentSubjectList.push({
                        id: o.id,
                        test_type_id: o.test_type_id,
                        test_type_name: o.test_type_name,
                        subject: o.subject,
                        description: o.description
                    });
                });
            });
    }

    submitAssessmentSubject() {
        let responseResult: ResponseResult;

        this.assessmentSubjectService.post(this.AssessmentSubject).subscribe((result: any) => responseResult = result,
            (error: any) => {
                this.msgs.push({ severity: 'error', detail: error.error.message });
            },
            () => {
                this.AssessmentSubject = {};
                this.loadAssessmentSubject();
                this.msgs.push({ severity: 'success', detail: "Assessment added successfully." });
            });
    }

    
}
