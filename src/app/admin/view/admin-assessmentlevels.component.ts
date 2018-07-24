import { Component, OnInit } from '@angular/core';
import { AppComponent } from '../../app.component';
import { GlobalHelper, MenuType } from './../../shared/app.globals';
import { Message } from 'primeng/components/common/message';
import { ResponseResult } from '../../shared/domain/Common.model';
import { AssessmentService } from '../../shared/services/assessment.service';
import { AssessmentSubjectService } from '../../shared/services/assessment-subject.services';
import { AssessmentLevelService } from '../../shared/services/assessment-level.services';

@Component({
    templateUrl: './admin-assessmentlevels.component.html'
})
export class AdminAssessmentLevelsComponent implements OnInit {
    msgs: Message[] = [];
    assessmentList: any = [];
    assessmentSubjectList: any = [];
    assessmentLevelList: any = [];
    selectedAssessment: any;
    selectedSubject: any;

    addAssessmentLevel: any = {};
    updateAssessmentLevel: any = {};

    constructor(public app: AppComponent, private assessmentService: AssessmentService, private assessmentSubjectService: AssessmentSubjectService, private assessmentLevelService: AssessmentLevelService) {
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
        this.addAssessmentLevel = {};
        let assessmentList: any[] = [];
        this.assessmentSubjectService.get(this.selectedAssessment,null).subscribe((result: any) => assessmentList = result.data,
            (error: any) => { },
            () => {
                this.assessmentSubjectList = [];

                assessmentList.map(o => {
                    this.assessmentSubjectList.push({
                        value: o.id,
                        label: o.subject
                    });
                });
            });
        this.loadAssessmentLevel();
    }
    loadAssessmentLevel() {
        this.addAssessmentLevel = {};
        let assessmentList: any[] = [];
        this.assessmentLevelService.get(this.selectedAssessment).subscribe((result: any) => assessmentList = result.data,
            (error: any) => { },
            () => {
                this.assessmentLevelList = [];

                assessmentList.map(o => {
                    this.assessmentLevelList.push({
                        id: o.id,
                        assessment_type_id: o.assessment_type_id,
                        assessment_id: o.assessment_id,
                        level: o.level,
                        label: o.label
                    });
                });
            });
    }
    add() {
        this.addAssessmentLevel.id = 0;
        this.addAssessmentLevel.assessment_type_id = this.selectedAssessment;
        this.save(this.addAssessmentLevel);
    }

    save(addAssessmentLevel) {
        let responseResult: ResponseResult;

        this.assessmentLevelService.post(addAssessmentLevel).subscribe((result: any) => responseResult = result,
            (error: any) => {
                this.msgs.push({ severity: 'error', detail: error.error.message });
            },
            () => {
                this.addAssessmentLevel = {};
                this.updateAssessmentLevel = {};
                this.loadAssessmentLevel();
                this.msgs.push({ severity: 'success', detail: "Assessment Level saved successfully." });
            });
    }

    update(id) {
        this.updateAssessmentLevel = this.assessmentLevelList.find(x => x.id === id);
        this.save(this.updateAssessmentLevel);
    }
}
