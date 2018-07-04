import { Component, OnInit } from '@angular/core';
import { AppComponent } from '../../app.component';
import { GlobalHelper, MenuType } from './../../shared/app.globals';
import * as moment from 'moment';
import { SelectItem } from 'primeng/primeng';
import { Message } from 'primeng/components/common/api';
import { MessageService } from 'primeng/components/common/messageservice';

import { SchoolYear, ResponseResult } from './../../shared/domain/Common.model'
import { School } from './../../shared/domain/school'
import { SchoolSchoolYear } from './../../shared/domain/school.schoolyear'
import { CommonService } from './../../shared/services/Common.service'
import { SchoolService } from './../../shared/services/school.service'
import { SchoolYearService } from './../../shared/services/school.year.service'
import { SchoolGradeService } from './../../shared/services/school.grade.service'
import { SchoolGrade } from './../../shared/domain/school.schoolgrade'
import { SemesterInSchoolYearService } from './../../shared/services/semester.inschoolyear.service'
import { SemesterInSchoolYear } from './../../shared/domain/semester.inschoolyear'
import { GradeService } from './../../shared/services/grade.service'
import { Grade } from './../../shared/domain/grade'
import { DaysInSchoolYearService } from './../../shared/services/days.inschoolyear.service'
import { DaysInSchoolYear } from './../../shared/domain/days.inschoolyear'
declare var $: any;

@Component({
    templateUrl: './schoolyear-school.component.html',
    providers: [MessageService]
})
export class SchoolYearOfSchoolComponent implements OnInit {
    sessionInfo: any = {}
    school: any = {}

    schoolList: SelectItem[];
    selectedSchool: any;

    schoolYearList: SelectItem[];
    selectedSchoolYear: any;

    schoolDetailList: SchoolSchoolYear[];
    gradeAdded: any;

    semesterDetailList: SemesterInSchoolYear[];
    semesterAdded: any;

    schoolGradeList: SchoolGrade[];

    gradeDetailList: SelectItem[];
    schoolGradeAdded: any;
    selectedSchoolGrade: any;

    daysAdded: any;

    DaysInSchool: string;

    msgs: Message[] = [];

    constructor(public app: AppComponent, private schoolService: SchoolService,
        private commonService: CommonService, private schoolYearService: SchoolYearService, private semesterInSchoolYearService: SemesterInSchoolYearService, private gradeService: GradeService,
        private schoolGradeService: SchoolGradeService, private daysInSchoolYearService: DaysInSchoolYearService, private messageService: MessageService) {

        this.app.displayLeftMenu(true);
        this.app.activeCategoryDropdown = true;
        this.app.pageProfile = GlobalHelper.getSideMenuTitle(MenuType.SchoolInSchoolYear);
        this.app.LeftMenuItems = GlobalHelper.getMenuItems(MenuType.SchoolInSchoolYear);
        this.sessionInfo = this.app.getSession();
    }

    ngOnInit() {
        this.schoolList = [];
        this.schoolYearList = [];
        this.semesterAdded = {};
        this.schoolGradeAdded = {};
        this.daysAdded = {};

        let schoolListItems: School[] = [];
        this.schoolService.get(this.sessionInfo.client_id).subscribe((result: any) => schoolListItems = result.data,
            (error: any) => { },
            () => {
                this.schoolList = [];
                schoolListItems.map(o => { this.schoolList.push({ label: o.label, value: o.id }); });
            });
    }
    onGoClick() {
        if (this.onGoClick != undefined && this.selectedSchool != undefined) {
            this.school.SchoolName = this.schoolList.find(x => x.value === this.selectedSchool).label;
        }

        if (this.selectedSchoolYear != undefined) {
            this.school.SchoolYear = this.schoolYearList.find(x => x.value === this.selectedSchoolYear).label
        }
        let schooldetailList: SchoolSchoolYear[] = [];
        this.schoolYearService.get(this.sessionInfo.client_id, this.selectedSchool).subscribe((result: any) => schooldetailList = result.data,
            (error: any) => { },
            () => {
                this.schoolDetailList = [];
                schooldetailList.map(o => {
                    this.schoolDetailList.push({
                        end_date: new Date(o.end_date),
                        id: o.id,
                        schoolyear_num: o.schoolyear_num,
                        school_id: o.school_id,
                        school_name: o.school_name,
                        school_year: o.school_year,
                        school_year_id: o.school_year_id,
                        start_date: new Date(o.start_date)
                    });
                });
                if (this.selectedSchoolYear != undefined) {
                    this.schoolDetailList = this.schoolDetailList.filter(x => x.school_year_id === this.selectedSchoolYear);
                }
            });

        let semesterdetailList: SemesterInSchoolYear[] = [];
        this.semesterInSchoolYearService.get(this.sessionInfo.client_id, this.selectedSchoolYear).subscribe((result: any) => semesterdetailList = result.data,
            (error: any) => { },
            () => {
                this.semesterDetailList = [];
                semesterdetailList.map(o => {
                    this.semesterDetailList.push({
                        end_date: new Date(o.end_date),
                        id: o.id,
                        schoolyear_num: o.schoolyear_num,
                        label: o.label,
                        school_year: o.school_year,
                        school_year_id: o.school_year_id,
                        start_date: new Date(o.start_date)
                    });
                });
            });

        this.loadSemesters();

        let gradedetailList: Grade[] = [];
        this.gradeService.get().subscribe((result: any) => gradedetailList = result.data,
            (error: any) => { },
            () => {
                this.gradeDetailList = [];
                gradedetailList.map(o => {
                    this.gradeDetailList.push({
                        value: o.id,
                        label: o.label
                    });
                });
            });

        let schoolgradeList: SchoolGrade[] = [];
        this.schoolGradeService.get(this.sessionInfo.client_id, this.selectedSchool).subscribe((result: any) => schoolgradeList = result.data,
            (error: any) => { },
            () => {
                this.schoolGradeList = [];
                schoolgradeList.map(o => {
                    this.schoolGradeList.push({
                        client_id: o.client_id,
                        grade: o.grade,
                        grade_id: o.grade_id,
                        grade_int: o.grade_int,
                        id: o.id,
                        school_id: o.school_id
                    });
                });
            });
    }
    editSchool(id) {
        let updatedSchool = this.schoolDetailList.find(x => x.id === id);

        if (this.validateStartEndDate(updatedSchool.start_date, updatedSchool.end_date)) {
            updatedSchool.start_date = moment(updatedSchool.start_date, moment.defaultFormatUtc).format("MM/DD/YYYY");
            updatedSchool.end_date = moment(updatedSchool.end_date, moment.defaultFormatUtc).format("MM/DD/YYYY");
            let responseResult: ResponseResult;
            this.schoolYearService.update(updatedSchool).subscribe((result: any) => responseResult = result,
                (error: any) => {
                    this.msgs.push({ severity: 'error', detail: error.error.message });
                },
                () => {
                    this.loadSchools();
                    this.msgs.push({ severity: 'success', detail: "School year updated successfully." });
                });
        }

    }

    validateStartEndDate(startDate, endDate) {
        if (new Date(startDate) > new Date(endDate)) {
            this.msgs.push({ severity: 'error', detail: "End Date should be greater than start date" });
            return false;
        }
        return true;
    }

    loadSchools() {
        let schooldetailList: SchoolSchoolYear[] = [];
        this.schoolYearService.get(this.sessionInfo.client_id, this.selectedSchool).subscribe((result: any) => schooldetailList = result.data,
            (error: any) => { },
            () => {
                this.schoolDetailList = [];
                schooldetailList.map(o => {
                    this.schoolDetailList.push({
                        end_date: new Date(o.end_date),
                        id: o.id,
                        schoolyear_num: o.schoolyear_num,
                        school_id: o.school_id,
                        school_name: o.school_name,
                        school_year: o.school_year,
                        school_year_id: o.school_year_id,
                        start_date: new Date(o.start_date)
                    });
                });
                if (this.selectedSchoolYear != undefined) {
                    this.schoolDetailList = this.schoolDetailList.filter(x => x.school_year_id === this.selectedSchoolYear);
                }
            });
    }

    loadSemesters() {

        let semesterdetailList: SemesterInSchoolYear[] = [];
        this.semesterInSchoolYearService.get(this.sessionInfo.client_id, this.selectedSchoolYear).subscribe((result: any) => semesterdetailList = result.data,
            (error: any) => { },
            () => {
                this.semesterDetailList = [];
                semesterdetailList.map(o => {
                    this.semesterDetailList.push({
                        end_date: new Date(o.end_date),
                        id: o.id,
                        schoolyear_num: o.schoolyear_num,
                        label: o.label,
                        school_year: o.school_year,
                        school_year_id: o.school_year_id,
                        start_date: new Date(o.start_date)
                    });
                });
            });
    }

    loadSchoolGrades() {
        let schoolgradeList: SchoolGrade[] = [];
        this.schoolGradeService.get(this.sessionInfo.client_id, this.selectedSchool).subscribe((result: any) => schoolgradeList = result.data,
            (error: any) => { },
            () => {
                this.schoolGradeList = [];
                schoolgradeList.map(o => {
                    this.schoolGradeList.push({
                        client_id: o.client_id,
                        grade: o.grade,
                        grade_id: o.grade_id,
                        grade_int: o.grade_int,
                        id: o.id,
                        school_id: o.school_id
                    });
                });
            });
    }

    editSemester(id) {
        let updatedSemester = this.semesterDetailList.find(x => x.id === id);

        if (this.validateStartEndDate(updatedSemester.start_date, updatedSemester.end_date)) {

            updatedSemester.start_date = moment(updatedSemester.start_date, moment.defaultFormatUtc).format("MM/DD/YYYY");
            updatedSemester.end_date = moment(updatedSemester.end_date, moment.defaultFormatUtc).format("MM/DD/YYYY");
            let responseResult: ResponseResult;
            this.semesterInSchoolYearService.update(updatedSemester).subscribe((result: any) => responseResult = result,
                (error: any) => {
                    this.msgs.push({ severity: 'error', detail: error.error.message });
                },
                () => {
                    this.loadSemesters();
                    this.msgs.push({ severity: 'success', detail: "Semester year updated successfully." });
                });
        }
    }

    deleteSemester(id) {
        let responseResult: ResponseResult;
        this.semesterInSchoolYearService.delete(id, this.sessionInfo.client_id).subscribe((result: any) => responseResult = result.data,
            (error: any) => {
                this.msgs.push({ severity: 'error', detail: error.error.message });
            },
            () => {
                this.loadSemesters();
                this.msgs.push({ severity: 'success', detail: "Semester deleted successfully." });
            });
    }

    schoolChange(event) {
        let schoolYearListItems: SchoolSchoolYear[] = [];

        this.schoolYearList = [];
        this.selectedSchoolYear = null;

        this.schoolYearService.get(this.sessionInfo.client_id, this.selectedSchool).subscribe((result: any) => schoolYearListItems = result.data,
            (error: any) => { },
            () => {
                this.schoolYearList = [];
                schoolYearListItems.map(o => { this.schoolYearList.push({ label: o.school_year, value: o.school_year_id }); });
            });
    }

    addSemester() {
        if (this.semesterAdded != undefined && this.semesterAdded != null) {
            if (this.validateStartEndDate(this.semesterAdded.start_date, this.semesterAdded.end_date)) {
                let responseResult: ResponseResult;
                this.semesterAdded.start_date = moment(this.semesterAdded.start_date, moment.defaultFormatUtc).format("MM/DD/YYYY");
                this.semesterAdded.end_date = moment(this.semesterAdded.end_date, moment.defaultFormatUtc).format("MM/DD/YYYY");
                this.semesterAdded.school_year_id = this.selectedSchoolYear;

                this.semesterInSchoolYearService.insert(this.semesterAdded).subscribe((result: any) => responseResult = result,
                    (error: any) => {
                        this.msgs.push({ severity: 'error', detail: error.error.message });
                    },
                    () => {
                        this.loadSemesters();
                        this.msgs.push({ severity: 'success', detail: "Semester In School Year added successfully." });
                    });
            }
        }
        else {
            this.msgs.push({ severity: 'error', detail: "Please input data to add." });
        }
    }

    addSchoolGrade() {
        if (this.selectedSchoolGrade != undefined && this.selectedSchoolGrade != null) {
            let responseResult: ResponseResult;
            this.schoolGradeAdded.client_id = this.sessionInfo.client_id;
            this.schoolGradeAdded.school_id = this.selectedSchool;
            this.schoolGradeAdded.grade_id = this.selectedSchoolGrade;
            this.schoolGradeService.insert(this.schoolGradeAdded).subscribe((result: any) => responseResult = result,
                (error: any) => {
                    this.msgs.push({ severity: 'error', detail: error.error.message });
                },
                () => {
                    this.loadSchoolGrades();
                    this.msgs.push({ severity: 'success', detail: "School grade added successfully." });
                });
        }
        else {
            this.msgs.push({ severity: 'error', detail: "Please select grade to add." });
        }
    }

    deleteSchoolGrade(id) {
        let responseResult: ResponseResult;
        this.schoolGradeService.delete(id, this.sessionInfo.client_id, this.selectedSchool).subscribe((result: any) => responseResult = result.data,
            (error: any) => {
                this.msgs.push({ severity: 'error', detail: error.error.message });
            },
            () => {
                this.loadSchoolGrades();
                this.msgs.push({ severity: 'success', detail: "School grade deleted successfully." });
            });
    }

    uploadDays() {
        if (this.daysAdded != undefined && this.daysAdded != null) {
            let responseResult: ResponseResult;
            this.daysAdded.client_id = this.sessionInfo.client_id;
            this.daysAdded.school_id = this.selectedSchool;
            this.daysAdded.school_year_id = this.selectedSchoolYear;
            this.daysInSchoolYearService.insert(this.daysAdded).subscribe((result: any) => responseResult = result,
                (error: any) => {
                    this.msgs.push({ severity: 'error', detail: error.error.message });
                },
                () => {
                    this.loadSemesters();
                    this.msgs.push({ severity: 'success', detail: "Days In School Year added successfully." });
                });
        }
        else {
            this.msgs.push({ severity: 'error', detail: "Please input data to add." });
        }
    }
    uploadDaysInSchool() {
        if (this.DaysInSchool != "" && this.DaysInSchool != undefined) {
            let responseResult: ResponseResult;
            this.daysAdded.client_id = this.sessionInfo.client_id;
            this.daysAdded.school_year_id = this.selectedSchoolYear;
            this.daysAdded.skip_first_row = true;
            this.daysAdded.file_data = this.DaysInSchool;

            this.daysInSchoolYearService.attendance(this.daysAdded).subscribe((result: any) => responseResult = result,
                (error: any) => {
                    this.msgs.push({ severity: 'error', detail: error.error.message });
                },
                () => {
                    this.loadSemesters();
                    this.msgs.push({ severity: 'success', detail: "Days In School Year added successfully." });
                });
        }
        else {
            this.msgs.push({ severity: 'error', detail: "Please input data to add." });
        }
    }
}
