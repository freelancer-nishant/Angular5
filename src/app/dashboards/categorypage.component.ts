import { Component, OnInit } from '@angular/core';
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
import { TaxonomyType } from './../shared/domain/taxonomy';

@Component({
    templateUrl: './categorypage.component.html'
})

export class CategoryPageComponent implements OnInit {

    sessionInfo: any = {}
    schools: SelectItem[];

    selectedSchool: any;

    schoolYears: SelectItem[];
    selectedYear: any;

    grade: SelectItem[];
    selectedGrades: any[] = [];
    parameters: {};
    taxonomyCategory: any[] = [];
    typeName: string = ''

    constructor(public app: AppComponent, private route: ActivatedRoute, private schoolService: SchoolService,
        private schoolYearService: SchoolYearService, private schoolGradeService: SchoolGradeService, public taxonomyService: TaxonomyService) {
        this.app.displayLeftMenu(true);
        this.app.activeCategoryDropdown = true;
        this.app.LeftMenuItems = GlobalHelper.getMenuItems(MenuType.StudentInformation);

        try {
            this.sessionInfo = this.app.getSession();
            this.route.params.subscribe(params => {
                this.typeName = params['name'];
                this.getSubCategory(params['typeid'], params['id']);
            });
        }
        catch (e) { }
    }

    ngOnInit() {
    }

    getSubCategory(typeid, categoryId) {
        try {
            this.sessionInfo = this.app.getSession();
            let sideMenuInfo: any = {};
            let taxonomycategory: TaxonomyType[] = [];
            this.taxonomyService.getCategory(typeid, this.sessionInfo.role, this.sessionInfo.client_id).subscribe((result: any) => taxonomycategory = result.data,
                (error: any) => { },
                () => {
                    this.taxonomyCategory = [];
                    taxonomycategory.map(o => {
                        this.taxonomyCategory.push({
                            id: o.id,
                            name: o.name,
                            route:'#/categorypage/' + typeid + '/' + o.id,
                            icon: o.icon,
                            label: o.label,
                            mini_icon: o.mini_icon,
                            small_icon: o.small_icon
                        });
                    });
                    let selectedcategory = this.taxonomyCategory.find(x => x.id === parseInt(categoryId));
                    this.app.pageProfile = {
                        icon: './assets/layout/images/dashboard/student-information.png',
                        name: selectedcategory.label,
                        categories: this.taxonomyCategory
                    };
                    
                });
            this.taxonomyService.getSubCategory(categoryId, this.sessionInfo.role, this.sessionInfo.client_id).subscribe((result: any) => taxonomycategory = result.data,
                (error: any) => { },
                () => {
                    this.app.LeftMenuItems = [];
                    taxonomycategory.map(o => {
                        this.app.LeftMenuItems.push({
                            id: o.id,
                            name: o.name,
                            icon: o.icon,
                            label: o.label,
                            mini_icon: o.mini_icon,
                            small_icon: o.small_icon
                        });
                    });
                });
        }
        catch (e) {
            console.log(e)
        }
    }
}
