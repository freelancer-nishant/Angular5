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
    assessmentLevelList: any = [];
    selectedAssessment: any;

    addAssessmentSubject: any = {};
    updateAssessmentSubject: any = {};

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
        this.addAssessmentSubject = {};
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
    add() {
        this.addAssessmentSubject.id = 0;
        this.addAssessmentSubject.test_type_id = this.selectedAssessment;
        this.save(this.addAssessmentSubject);
    }

    save(addAssessmentSubject) {
        let responseResult: ResponseResult;
        let assessmentSubject = {
            id: addAssessmentSubject.id,
            assessment_type_id: addAssessmentSubject.test_type_id,
            subject: addAssessmentSubject.subject,
            desc: addAssessmentSubject.description,
            label: addAssessmentSubject.subject
        }
        this.assessmentSubjectService.post(assessmentSubject).subscribe((result: any) => responseResult = result,
            (error: any) => {
                this.msgs.push({ severity: 'error', detail: error.error.message });
            },
            () => {
                this.addAssessmentSubject = {};
                this.updateAssessmentSubject = {};
                this.loadAssessmentSubject();
                this.msgs.push({ severity: 'success', detail: "Assessment Subject saved successfully." });
            });
    }

    update(id) {
        this.updateAssessmentSubject = this.assessmentSubjectList.find(x => x.id === id);
        this.save(this.updateAssessmentSubject);
    }

    //delete(id) {
    //    let responseResult: ResponseResult;
    //    this.assessmentSubjectService.delete(id).subscribe((result: any) => responseResult = result.data,
    //        (error: any) => {
    //            this.msgs.push({ severity: 'error', detail: error.error.message });
    //        },
    //        () => {
    //            this.loadAssessmentSubject();
    //            this.msgs.push({ severity: 'success', detail: "Assessment Subject deleted successfully." });
    //        });
    //}
}
