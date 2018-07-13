import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { AppComponent } from '../../app.component';
import { GlobalHelper, MenuType } from './../../shared/app.globals';

import { SelectItem } from 'primeng/primeng';
import { Message } from 'primeng/components/common/api';
import { MessageService } from 'primeng/components/common/messageservice';
import { SBACSummative } from './../../shared/domain/sbac.summative';
import { SBACInterim } from './../../shared/domain/sbac.interim';
import { PFT } from './../../shared/domain/pft';
import { CELDT } from './../../shared/domain/celdt';
import { NWEA } from './../../shared/domain/nwea';
import { LGLAdam } from './../../shared/domain/lgl.adam';
import { LGLDora } from './../../shared/domain/lgl.dora';
import { LGLDomaAlgebra } from './../../shared/domain/lgl.doma.algebra';

import { SchoolService } from './../../shared/services/school.service';
import { SchoolYearService } from './../../shared/services/school.year.service';
import { SchoolGradeService } from './../../shared/services/school.grade.service';
import { TestVersionService } from './../../shared/services/testversion.service';
import { School } from './../../shared/domain/school';
import { SchoolSchoolYear } from './../../shared/domain/school.schoolyear';
import { TestVersion } from './../../shared/domain/testversion';

@Component({
    templateUrl: './assessments-upload.component.html'
})
export class AssessmentUploadsComponent implements OnInit {
    testVersions: any = {};
    school: any = {};
    sessionInfo: any = {};
    schools: SelectItem[];
    selectedSchool: any;
    schoolYears: SelectItem[];
    selectedYear: any;
    // testVersions: SelectItem[];
    selectedTestVersion: any;
    isPanelVisible: boolean = false;
    test_type_ids: any = 1;

    constructor(public app: AppComponent, private schoolService: SchoolService,
        private schoolYearService: SchoolYearService,
        private testVersionService: TestVersionService) {
        this.sessionInfo = this.app.getSession();
        this.app.displayLeftMenu(true);
        this.app.activeCategoryDropdown = true;
        this.app.pageProfile = GlobalHelper.getSideMenuTitle(MenuType.AssessmentUploads);
        this.app.LeftMenuItems = GlobalHelper.getMenuItems(MenuType.AssessmentUploads);
    }

    ngOnInit() {

        this.schools = [];
        this.schoolYears = [];
        this.testVersions = [];

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

}
