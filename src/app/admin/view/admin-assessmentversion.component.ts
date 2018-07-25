import { Component, OnInit } from '@angular/core';
import { AppComponent } from '../../app.component';
import { GlobalHelper, MenuType } from './../../shared/app.globals';
import { AssessmentService } from './../../shared/services/assessment.service';
import { SelectItem } from 'primeng/primeng';
import { Message } from 'primeng/components/common/api';
import { ResponseResult } from './../../shared/domain/Common.model';
import { SchoolService } from './../../shared/services/school.service';
import { SchoolYearService } from './../../shared/services/school.year.service';
import { School } from './../../shared/domain/school';
import { Client } from './../../shared/domain/client';
import { SchoolSchoolYear } from './../../shared/domain/school.schoolyear';
import { ClientService } from './../../shared/services/client.service';
//import { AssessmentVersionRequest} from './../../shared/domain/assessment';
import { Assessment, AssessmentVersion, AssessmentVersionRequest } from '../../shared/domain/assessment';


@Component({
    templateUrl: './admin-assessmentversion.component.html'
})
export class AdminAssessmentVersionComponent implements OnInit {
    assessmentVersion: any = {};
    assessmentList: AssessmentVersionRequest[];
    client: any = {};
    clients: SelectItem[];
    selectedClient: any;
    school: any = {};
    schools: SelectItem[];
    selectedSchool: any;
    schoolYears: SelectItem[];
    selectedYear: any;
    assessments: SelectItem[];
    selectedAssessment: any;
    assessmentVersionList: AssessmentVersion[];
    isPanelVisible: boolean = false;
    UploadMsgs = [];
    UploadErrorMsgs = [];
    errorMsgs: Message[] = [];
    msgs: Message[] = [];
    updateAssessmentVersion: any;
    insertAssessmentVersion: any;

    constructor(public app: AppComponent,
        private assessmentService: AssessmentService,
        private schoolService: SchoolService,
        private schoolYearService: SchoolYearService,
        private clientService: ClientService) {
        this.app.displayLeftMenu(true);
        this.app.activeCategoryDropdown = true;
        this.app.pageProfile = GlobalHelper.getSideMenuTitle(MenuType.Assessments);
        this.app.LeftMenuItems = GlobalHelper.getMenuItems(MenuType.Assessments);

    }

    ngOnInit() {
        this.insertAssessmentVersion = {};
        this.clients = [];
        this.schools = [];
        this.schoolYears = [];
        this.assessments = [];
        this.selectedClient = null;

        let clientResult: Client[] = [];
        this.clientService.get().subscribe((result: any) => clientResult = result.data,
            (error: any) => { },
            () => {
                this.clients = [];
                clientResult.map(o => { this.clients.push({ label: o.name, value: o.id }); });
            }
        );
    }

    clientChange(e) {
        this.isPanelVisible = false;
        this.schoolYears = [];
        this.assessments = [];

        let schoolResult: School[] = [];
        this.schoolService.get(this.selectedClient).subscribe((result: any) => schoolResult = result.data,
            (error: any) => { },
            () => {
                this.selectedSchool = null;
                this.schools = [];
                schoolResult.map(o => { this.schools.push({ label: o.name, value: o.id }); });
            }
        );
    }

    schoolChange(e) {
        this.isPanelVisible = false;
        this.assessments = [];

        let schollYears: SchoolSchoolYear[] = [];
        this.schoolYearService.get(this.selectedClient, this.selectedSchool).subscribe((result: any) => schollYears = result.data,
            (error: any) => { },
            () => {
                this.selectedYear = null;
                this.schoolYears = [];
                schollYears.map(o => { this.schoolYears.push({ label: o.school_year, value: o.school_year_id }); });
            });
    }

    schoolYearChange(e) {
        this.isPanelVisible = false;

        let assessment: any[] = [];
        this.assessmentService.getAssessmentOfClient(null, this.selectedClient).subscribe((result: any) => assessment = result.data,
            (error: any) => { },
            () => {
                this.selectedAssessment = null;
                this.assessments = [];
                assessment.map(o => { this.assessments.push({ label: o.test_type_name, value: o.assessment_id }); });
            });
    }

    updateVersion(id) {
        let updateVersion = this.assessmentList.find(x => x.id === id);
        this.updateAssessmentVersion = {};
        this.updateAssessmentVersion.id = updateVersion.id;
        this.updateAssessmentVersion.term_id =updateVersion.test_version_number;
        this.updateAssessmentVersion.label = updateVersion.label;
        this.updateAssessmentVersion.client_id = this.selectedClient;
        this.updateAssessmentVersion.school_id = this.selectedSchool;
        this.updateAssessmentVersion.school_year_id = this.selectedYear;
        this.updateAssessmentVersion.assessment_id = this.selectedAssessment;
        this.updateAssessmentVersion.weekofkey = '';
        this.saveAssessmentVersion(this.updateAssessmentVersion);
    }


    insertVersion() {
        this.insertAssessmentVersion.id = 0;
        this.insertAssessmentVersion.client_id = this.selectedClient;
        this.insertAssessmentVersion.school_id = this.selectedSchool;
        this.insertAssessmentVersion.school_year_id = this.selectedYear;
        this.insertAssessmentVersion.assessment_id = this.selectedAssessment;
        this.insertAssessmentVersion.weekofkey = '';
        this.saveAssessmentVersion(this.insertAssessmentVersion);
    }

    saveAssessmentVersion(assessmentVersion) {
        let responseResult: ResponseResult;
        this.assessmentService.saveAssessmentVersion(assessmentVersion).subscribe((result: any) => responseResult = result,
            (error: any) => {
                this.msgs.push({ severity: 'error', detail: error.error.message });
            },
            () => {
                this.insertAssessmentVersion = {};
                this.loadAssessmentVersion();
                this.msgs.push({ severity: 'success', detail: "Assessment saved successfully." });
            });
    }

    loadAssessmentVersion() {
        let assessmentList: AssessmentVersionRequest[] = [];
        this.assessmentService.getAssessmentVersion(this.selectedClient, this.selectedSchool, this.selectedYear, this.selectedAssessment).subscribe((result: any) => assessmentList = result.data,
            (error: any) => { },
            () => {
                this.assessmentList = [];
                assessmentList.map(o => {
                    this.assessmentList.push({
                        id: o.id,
                        test_version_number: o.test_version_number,
                        label: o.label
                    });
                });
            });
    }
}
