import { Component, OnInit } from '@angular/core';
import { AppComponent } from '../../app.component';
import { GlobalHelper, MenuType } from './../../shared/app.globals';
import { Assessment, AssessmentRequest, AssessmentOfClient } from './../../shared/domain/assessment';
import { AssessmentService } from './../../shared/services/assessment.service ';
import { Client } from './../../shared/domain/client';
import { ClientService } from './../../shared/services/client.service';

import { ResponseResult } from './../../shared/domain/Common.model'
import { Message } from 'primeng/components/common/api';
import { MessageService } from 'primeng/components/common/messageservice';

@Component({
    templateUrl: './admin-assessmentsofclient.component.html'
})
export class AdminAssessmentsOfClientComponent implements OnInit {

    msgs: Message[] = [];
    assessmentList: any = [];
    assessmentListIndividual: any = [];

    assessmentOfClientList: any[];
    
    clientList: any = [];
    clientListIndividual: any = [];

    client: any = {};
    assessment: any = {};
    assessmentOfClient: any = {};

    newAssessment: any;
    dialogVisible: boolean = false;

    addMapping: any = [];
    
    constructor(public app: AppComponent, private assessmentService: AssessmentService, private clientService: ClientService, private messageService: MessageService) {
        this.app.displayLeftMenu(true);
        this.app.activeCategoryDropdown = true;        
        this.app.pageProfile = GlobalHelper.getSideMenuTitle(MenuType.AdminAssessments);
        this.app.LeftMenuItems = GlobalHelper.getMenuItems(MenuType.AdminAssessments);
        this.newAssessment = {};
        this.dialogVisible = false;
    }

    ngOnInit() {
        this.client = {};
        this.loadClient();
        this.loadAssessments();
    }

    loadClient() {
        let clientResult: Client[] = [];

        this.clientService.get().subscribe((result: any) => clientResult = result.data,
            (error: any) => { },
            () => {
                this.clientList = [];
                this.clientListIndividual = [];
                this.clientList.push({ label: "All", value: null });

                clientResult.map(o => { this.clientList.push({ label: o.name, value: o.id }); });
                clientResult.map(o => { this.clientListIndividual.push({ label: o.name, value: o.id }); });
            });
    }

    loadAssessments() {
        let assessmentList: Assessment[] = [];

        this.assessmentService.get().subscribe((result: any) => assessmentList = result.data,
            (error: any) => { },
            () => {
                this.assessmentList = [];
                this.assessmentListIndividual = [];
                this.assessmentList.push({ label: "All", value: null });

                assessmentList.map(o => {
                    this.assessmentList.push({
                        value: o.id,
                        label: o.test_type_name
                    });
                });

                assessmentList.map(o => {
                    this.assessmentListIndividual.push({
                        id: o.id,
                        assessment_id: o.id,
                        name: o.test_type_name,
                        desc: o.description,
                        value: o.id,
                        label: o.test_type_name
                    });
                });

            });
    }

    loadAssessmentsOfClient() {
        let assessmentOfClientList: AssessmentOfClient[] = [];

        this.assessmentService.getAssessmentOfClient(this.newAssessment.id, this.newAssessment.client_id).subscribe((result: any) => assessmentOfClientList = result.data,
            (error: any) => { },
            () => {
                this.assessmentOfClientList = [];
                
                assessmentOfClientList.map(o => {
                    this.assessmentOfClientList.push({
                        id: o.id,
                        assessment_id: o.assessment_id,
                        assessment_name: this.assessmentList.find(x => x.value === o.assessment_id).label,
                        client_id: o.client_id,
                        client_name: this.clientList.find(x => x.value === o.client_id).label,
                        desc: this.assessmentListIndividual.find(x => x.id === o.assessment_id).desc,
                    });
                });
            });
    }

    deleteAssessmentOfClient(id) {
        let responseResult: ResponseResult;
        this.assessmentService.deleteAssessmentOfClient(id).subscribe((result: any) => responseResult = result.data,
            (error: any) => {
                this.msgs.push({ severity: 'error', detail: error.error.message });
            },
            () => {
                this.loadAssessmentsOfClient();
                this.msgs.push({ severity: 'success', detail: "Assessment Mapping deleted successfully." });
            });
    }

    addNewMapping() {
        this.dialogVisible = true;
    }

    submitNewMapping() {
        let responseResult: ResponseResult;

        this.assessmentService.insertAssessmentOfClient(this.addMapping).subscribe((result: any) => responseResult = result,
            (error: any) => {
                this.msgs.push({ severity: 'error', detail: error.error.message });
            },
            () => {
                this.dialogVisible = false;
                this.addMapping = {};
                this.loadAssessmentsOfClient();
                this.msgs.push({ severity: 'success', detail: "Assessment Mapping added successfully." });
            });
    }
}
