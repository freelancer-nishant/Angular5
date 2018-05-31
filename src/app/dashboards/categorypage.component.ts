import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AppComponent } from '../app.component';
import { GlobalHelper, MenuType } from './../shared/app.globals';
import { SelectItem } from 'primeng/primeng';
import { SchoolService } from './../shared/services/school.service';
import { SchoolYearService } from './../shared/services/school.year.service';
import { SchoolGradeService } from './../shared/services/school.grade.service';
import { School } from './../shared/domain/school';
import { SchoolSchoolYear } from './../shared/domain/school.schoolyear';
import { SchoolGrade } from './../shared/domain/school.schoolgrade';
import { TaxonomyService } from './../shared/services/taxonomy.service';
import { TaxonomyType, ItemDetail } from './../shared/domain/taxonomy';
import { SchoolYearGradeFilter } from './filters/school-year-grade-filter';
import { SchoolYearGradeTestFilter } from './filters/school-year-grade-test-filter';
import { AssesmentSchoolYearGradeFilter } from './filters/assesment-school-year-grade-filter';
import { CompareSchoolYearFilter } from './filters/compare.school.year.filter';
import { SchoolYearFilter } from './filters/school-year-filter';

@Component({
    templateUrl: './categorypage.component.html'
})

export class CategoryPageComponent implements OnInit {
    @ViewChild(SchoolYearFilter) schoolyearfilter: SchoolYearFilter;
    @ViewChild(SchoolYearGradeFilter) schoolyeargradefilter: SchoolYearGradeFilter;
    @ViewChild(SchoolYearGradeTestFilter) schoolyeargradetestfilter: SchoolYearGradeTestFilter;
    @ViewChild(AssesmentSchoolYearGradeFilter) assesmentschoolyeargradefilter: AssesmentSchoolYearGradeFilter;
    @ViewChild(CompareSchoolYearFilter) compareschoolyearfilter: CompareSchoolYearFilter;

    sessionInfo: any = {}
    schools: SelectItem[];

    selectedSchool: any;

    schoolYears: SelectItem[];
    selectedYear: any;

    grade: SelectItem[];
    selectedGrades: any[] = [];
    parameters: {};
    taxonomyCategory: any[] = [];
    report: string = "report";
    isVisible: boolean = true;
    itemDetail: ItemDetail = { component_name: '', id: 0, is_pagination: false, label: '', name: '', report_path: '', vjsParam: [] };

    constructor(public app: AppComponent, private route: ActivatedRoute, public taxonomyService: TaxonomyService) {
        this.app.displayLeftMenu(true);
        this.app.activeCategoryDropdown = true;
        try {
            this.route.params.subscribe(params => {
                this.getSubCategory(params['typeid'], params['id'], params['subid'], params['itemid']);
            });
        }
        catch (e) { }
    }

    ngOnInit() {
    }

    getSubCategory(typeid, categoryId, subCategoryId, itemId) {
        try {
            this.sessionInfo = this.app.getSession();
            let sideMenuInfo: any = {};
            let taxonomycategory: TaxonomyType[] = [];
            this.taxonomyService.getCategory(typeid, this.sessionInfo.client_id).subscribe((result: any) => taxonomycategory = result.data,
                (error: any) => { },
                () => {
                    this.taxonomyCategory = [];
                    taxonomycategory.map(o => {
                        this.taxonomyCategory.push({
                            id: o.id,
                            name: o.name,
                            route: '#/categorypage/' + typeid + '/' + o.id + '/' + 0 + '/' + 0,
                            icon: "//" + o.icon,
                            label: o.label
                        });
                    });
                    let selectedcategory = this.taxonomyCategory.find(x => x.id === parseInt(categoryId));
                    this.app.pageProfile = {
                        icon: selectedcategory.icon,
                        name: selectedcategory.label,
                        categories: this.taxonomyCategory
                    };

                });
            this.taxonomyService.getSubCategory(categoryId, this.sessionInfo.client_id).subscribe((result: any) => taxonomycategory = result.data,
                (error: any) => { },
                () => {
                    this.app.LeftMenuItems = [];
                    taxonomycategory.map(c => {
                        let menu = { id: c.id, name: c.name, icon: c.icon, label: c.label, items: [] };
                        let itemcategory: ItemDetail[] = [];
                        this.taxonomyService.getItem(c.id, this.sessionInfo.client_id).subscribe((result: any) => itemcategory = result.data,
                            (error: any) => { },
                            () => {
                                itemcategory.map(i => {
                                    menu.items.push({
                                        id: i.id,
                                        name: i.name,
                                        icon: c.icon,
                                        label: i.label,
                                        routerLink: '/categorypage/' + typeid + '/' + categoryId + '/' + c.id + '/' + i.id
                                    });
                                });
                                this.app.LeftMenuItems.push(menu);
                                this.app.LeftMenuItems.sort(function (a, b) {
                                    if (a.id < b.id) //sort string ascending
                                        return -1
                                    if (a.id > b.id)
                                        return 1
                                    return 0 //default return value (no sorting)
                                });
                            });
                    });
                });
            if (itemId > 0) {
                this.taxonomyService.getItemDetail(subCategoryId, itemId, this.sessionInfo.client_id).subscribe((result: any) => this.itemDetail = result.data, (error: any) => { }, () => { });
                this.isVisible = true;
            }
            else {
                this.isVisible = false;
            }
            this.parameters = undefined;
        }
        catch (e) {
            console.log(e)
        }
    }

    submit() {
        let params = {};
        switch (this.itemDetail.component_name) {
            case "SchoolYearFilter":
                this.itemDetail.vjsParam.map(p => {
                    switch (p.component_out_param) {
                        case "selectedSchool":
                            params[p.report_param] = [this.schoolyearfilter.selectedSchool];
                            break;
                        case "selectedSchoolYear":
                            params[p.report_param] = [this.schoolyearfilter.selectedSchoolYear];
                            break;
                        default:
                    }
                });
                break;
            case "SchoolYearGradeFilter":
                params["client_id"] = [this.schoolyeargradefilter.sessionInfo.client_id];
                this.itemDetail.vjsParam.map(p => {
                    switch (p.component_out_param) {
                        case "selectedGrades":
                            params[p.report_param] = this.schoolyeargradefilter.selectedGrades;
                            break;
                        case "selectedSchool":
                            params[p.report_param] = [this.schoolyeargradefilter.selectedSchool];
                            break;
                        case "selectedYear":
                            params[p.report_param] = [this.schoolyeargradefilter.selectedYear];
                            break;
                        default:
                    }
                });
                break;
            case "SchoolYearGradeTestFilter":
                params["client_id"] = [this.schoolyeargradetestfilter.sessionInfo.client_id];
                this.itemDetail.vjsParam.map(p => {
                    switch (p.component_out_param) {
                        case "selectedGrades":
                            params[p.report_param] = this.schoolyeargradetestfilter.selectedGrades;
                            break;
                        case "selectedSchool":
                            params[p.report_param] = [this.schoolyeargradetestfilter.selectedSchool];
                            break;
                        case "selectedYear":
                            params[p.report_param] = [this.schoolyeargradetestfilter.selectedYear];
                            break;
                        case "selectedTestVersion":
                            params[p.report_param] = [this.schoolyeargradetestfilter.selectedTestVersion];
                            break;
                        default:
                    }
                });
                break;
            case "AssesmentSchoolYearGradeFilter":
                params["client_id"] = [this.assesmentschoolyeargradefilter.sessionInfo.client_id];
                this.itemDetail.vjsParam.map(p => {
                    switch (p.component_out_param) {
                        case "selectedGrades":
                            params[p.report_param] = this.assesmentschoolyeargradefilter.selectedGrades;
                            break;
                        case "selectedSchool":
                            params[p.report_param] = [this.assesmentschoolyeargradefilter.selectedSchool];
                            break;
                        case "selectedYear":
                            params[p.report_param] = [this.assesmentschoolyeargradefilter.selectedYear];
                            break;
                        case "selectedTest":
                            params[p.report_param] = [this.assesmentschoolyeargradefilter.selectedTest];
                            break;
                        default:
                    }
                });
                break;
            case "CompareSchoolYearFilter":
                this.itemDetail.vjsParam.map(p => {
                    switch (p.component_out_param) {
                        case "selectedSchoolYear":
                            params[p.report_param] = [this.compareschoolyearfilter.selectedSchoolYear];
                            break;
                        case "apiComparativeListItems.items":
                            params[p.report_param] = [JSON.stringify(this.compareschoolyearfilter.apiComparativeListItems.items)];
                            break;
                        case "apiComparativeListItems.label":
                            params[p.report_param] = [this.compareschoolyearfilter.apiComparativeListItems.label];
                            break;
                        default:
                    }
                });
        }
        this.parameters = JSON.stringify(params);
    }

    runReport() {
        this.parameters = JSON.stringify({
            "test_id1": ['1'],
            "schoolyear_id": [this.compareschoolyearfilter.SchoolForScorecards.schoolyear],
            "comparative_list_items": [JSON.stringify(this.compareschoolyearfilter.SchoolForScorecards.selectedschools)],
            "test_id2": ['2'],
            "comparative_list_label": [this.compareschoolyearfilter.SchoolForScorecards.schoollabel]
        });
    }
}
