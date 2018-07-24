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
    versions: any = {};
    assessments: SelectItem[];
    selectedAssessment: any;
    assessmentVersionList: AssessmentVersion[];
    isPanelVisible: boolean = false;
    UploadMsgs = [];
    UploadErrorMsgs = [];
    errorMsgs: Message[] = [];
    clientInfo: any;
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
        this.schools = [];
        this.schoolYears = [];
        this.clients = [];
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
        this.schools = [];
        this.selectedSchool = null;
        let schoolResult: School[] = [];
        this.schoolService.get(this.clientInfo).subscribe((result: any) => schoolResult = result.data,
            (error: any) => { },
            () => {
                this.schools = [];
                schoolResult.map(o => { this.schools.push({ label: o.name, value: o.id }); });
            }
        );
    }

    schoolChange(e) {
        this.isPanelVisible = false;
        let schollYears: SchoolSchoolYear[] = [];
        this.schoolYears = [];
        this.selectedYear = null;
        this.schoolYearService.get(this.selectedClient, this.selectedSchool).subscribe((result: any) => schollYears = result.data,
            (error: any) => { },
            () => {
                this.schoolYears = [];
                schollYears.map(o => { this.schoolYears.push({ label: o.school_year, value: o.school_year_id }); });
            });
    }

    schoolYearChange(e) {
        this.isPanelVisible = false;
        let assessment: Assessment[] = [];
        this.assessments = [];
        this.selectedAssessment = null;
        this.assessmentService.get().subscribe((result: any) => assessment = result.data,
            (error: any) => { },
            () => {
                this.assessments = [];
                assessment.map(o => { this.assessments.push({ label: o.test_type_name, value: o.id }); });
            });
    }

    assessmentChange(e) {
        // console.log('assessment change');
    }

    onGoClick() {
        this.isPanelVisible = true;
        this.UploadMsgs = [];
        this.UploadErrorMsgs = [];
        this.errorMsgs = [];
        this.school.ClientName = this.clients.find(x => x.value === this.selectedClient).label;
        this.school.SchoolName = this.schools.find(x => x.value === this.selectedSchool).label;
        this.school.SchoolYear = this.schoolYears.find(x => x.value === this.selectedYear).label;
        this.school.Assessment = this.assessments.find(x => x.value === this.selectedAssessment).label;
        let version: AssessmentVersion[] = [];
        this.assessmentService.getAssessmentVersion(this.selectedClient, this.selectedSchool,
            this.selectedYear, this.selectedAssessment).subscribe((result: any) => version = result.data,
                (error: any) => { },
                () => {
                    this.versions = [];
                    version.map(o => { this.versions.push({ label: o.label, value: o.term_id }); });
                }
            );
        this.loadAssessments();
    }

    updateVersion(id, test_version, label) {
        this.updateAssessmentVersion.id = id;
        this.updateAssessmentVersion.test_version_number = test_version;
        this.updateAssessmentVersion.label = label;
        let responseResult: ResponseResult;
        this.assessmentService.updateAssessmentVersion(this.updateAssessmentVersion).subscribe((result: any) => responseResult = result,
            (error: any) => {
                this.msgs.push({ severity: 'error', detail: error.error.message });
            },
            () => {
                this.loadAssessments();
                this.msgs.push({ severity: 'success', detail: "Assessment updated successfully." });
            });
    }


    deleteAssessmentVersion(id) {
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


    insertVersion() {
        /*console.log('id',this.insertAssessmentVersion.id);
        console.log('client',this.selectedClient);
        console.log('school',this.selectedSchool);
        console.log('school year',this.selectedYear);
        console.log('assessment',this.selectedAssessment);
        console.log('term id',this.insertAssessmentVersion.id);
        console.log('label',this.insertAssessmentVersion.label);
        console.log('test version',this.insertAssessmentVersion.test_version_number);
        console.log('insert module');*/
        let templabel = this.insertAssessmentVersion.label;
        let temptestver = this.insertAssessmentVersion.test_version_number;
        this.insertAssessmentVersion = [];
        this.insertAssessmentVersion.id = 0;
        this.insertAssessmentVersion.client = this.selectedClient;
        this.insertAssessmentVersion.school = this.selectedSchool;
        this.insertAssessmentVersion.year = this.selectedYear;
        this.insertAssessmentVersion.assessment = this.selectedAssessment;
        this.insertAssessmentVersion.term_id = 0;
        this.insertAssessmentVersion.label = templabel;
        this.insertAssessmentVersion.version = temptestver;
        console.log(this.insertAssessmentVersion);
        let responseResult: ResponseResult;
        this.assessmentService.insertAssessmentVersion(this.insertAssessmentVersion).subscribe((result: any) => responseResult = result,
            (error: any) => {
                this.msgs.push({ severity: 'error', detail: error.error.message });
            },
            () => {
                this.insertAssessmentVersion = {};
                this.loadAssessments();
                this.msgs.push({ severity: 'success', detail: "Assessment added successfully." });
            });
    }


    loadAssessments() {
        console.log('load data');
        let assessmentList: AssessmentVersionRequest[] = [];
        this.assessmentService.getAssessmentVersion(this.selectedClient, this.selectedSchool,
            this.selectedYear, this.selectedAssessment).subscribe((result: any) => assessmentList = result.data,
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
