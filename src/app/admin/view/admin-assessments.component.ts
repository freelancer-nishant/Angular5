import { Component, OnInit } from '@angular/core';
import { AppComponent } from '../../app.component';
import { GlobalHelper, MenuType } from './../../shared/app.globals';
import { Assessment, AssessmentRequest } from './../../shared/domain/assessment';
import { AssessmentService } from './../../shared/services/assessment.service ';
import { ResponseResult } from './../../shared/domain/Common.model'
import { Message } from 'primeng/components/common/api';
import { MessageService } from 'primeng/components/common/messageservice';

@Component({
    templateUrl: './admin-assessments.component.html'
})
export class AdminAssessmentsComponent implements OnInit {

    msgs: Message[] = [];
    assessmentList: AssessmentRequest[];
    assessment: any = {};

    addAssessment: any;
    updateAssessment: any;

    constructor(public app: AppComponent, private assessmentService: AssessmentService, private messageService: MessageService) {
        this.app.displayLeftMenu(true);
        this.app.activeCategoryDropdown = true;        
        this.app.pageProfile = GlobalHelper.getSideMenuTitle(MenuType.Assessments);
        this.app.LeftMenuItems = GlobalHelper.getMenuItems(MenuType.Assessments);

    }

    ngOnInit() {
        this.addAssessment = {};
        this.updateAssessment = {};
        this.loadAssessments();
    }

    loadAssessments() {
        let assessmentList: Assessment[] = [];
        this.assessmentService.get().subscribe((result: any) => assessmentList = result.data,
            (error: any) => { },
            () => {
                this.assessmentList = [];
                assessmentList.map(o => {
                    this.assessmentList.push({
                        id: o.id,
                        assessment_id: o.id,
                        name: o.test_type_name,
                        desc: o.description
                    });
                });
            });
    }

    submitNewAssessment() {
        let responseResult: ResponseResult;
        
        this.assessmentService.insert(this.addAssessment).subscribe((result: any) => responseResult = result,
            (error: any) => {
                this.msgs.push({ severity: 'error', detail: error.error.message });
            },
            () => {
                this.addAssessment = {};
                this.loadAssessments();
                this.msgs.push({ severity: 'success', detail: "Assessment added successfully." });
            });
    }

    submitUpdateAssessment(id, assessment_id, name, desc) {
        this.updateAssessment.id = id;
        this.updateAssessment.assessment_id = assessment_id;
        this.updateAssessment.name = name;
        this.updateAssessment.desc = desc;

        let responseResult: ResponseResult;

        this.assessmentService.update(this.updateAssessment).subscribe((result: any) => responseResult = result,
            (error: any) => {
                this.msgs.push({ severity: 'error', detail: error.error.message });
            },
            () => {
                this.loadAssessments();
                this.msgs.push({ severity: 'success', detail: "Assessment updated successfully." });
            });
    }

    deleteAssessment(id) {
        let responseResult: ResponseResult;
        this.assessmentService.delete(id).subscribe((result: any) => responseResult = result.data,
            (error: any) => {
                this.msgs.push({ severity: 'error', detail: error.error.message });
            },
            () => {
                this.loadAssessments();
                this.msgs.push({ severity: 'success', detail: "Assessment deleted successfully." });
            });
    }
}
