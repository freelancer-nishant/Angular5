import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { AppComponent } from '../../app.component';
import { GlobalHelper, MenuType } from './../../shared/app.globals';
import { SelectItem } from 'primeng/primeng';

import { ComparativeListItem } from './../../shared/domain/comparative.list'
import { SchoolYear } from './../../shared/domain/Common.model'
import { School } from './../../shared/domain/school'
import { CommonService } from './../../shared/services/Common.service'
import { SchoolService } from './../../shared/services/school.service'



@Component({
    selector: 'school-year-filter',
    templateUrl: './school-year-filter.html'
})
export class SchoolYearFilter implements OnInit {
    @Output() submit = new EventEmitter();

    sessionInfo: any = {}

    schoolList: SelectItem[];
    schoolYearList: SelectItem[];

    selectedSchool: any;
    selectedSchoolYear: any;

    constructor(public app: AppComponent, private schoolService: SchoolService, private commonService: CommonService ) {
        this.sessionInfo = this.app.getSession();
    }

    ngOnInit() {
        let schoolListItems: School[] = [];
        this.schoolService.get(this.sessionInfo.client_id).subscribe((result: any) => schoolListItems = result.data,
            (error: any) => { },
            () => {
                this.schoolList = [];
                schoolListItems.map(o => { this.schoolList.push({ label: o.label, value: o.state_school_code }); });
            });

        let schoolYearListItems: SchoolYear[] = [];
        this.commonService.getSchoolYear(true).subscribe((result: any) => schoolYearListItems = result.data,
            (error: any) => { },
            () => {
                this.schoolYearList = [];
                schoolYearListItems.map(o => { this.schoolYearList.push({ label: o.school_year, value: o.id }); });
            });
    }

    myEvent() {
        this.submit.emit();
    }
}

