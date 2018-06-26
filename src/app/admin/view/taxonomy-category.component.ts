import { Component, OnInit } from '@angular/core';
import { AppComponent } from '../../app.component';
import { GlobalHelper, MenuType } from './../../shared/app.globals';
import * as moment from 'moment';
import { SelectItem } from 'primeng/primeng';

import { TaxonomyConfigurationService } from './../../shared/services/taxonomyconfiguration.service';
import { ResponseResult } from '../../shared/domain/Common.model';
import { ActivatedRoute } from '@angular/router';

@Component({
    templateUrl: './taxonomy-category.component.html'
})
export class TaxonomyCategoryComponent implements OnInit {
    sessionInfo: any = {}
    CategoryList: any[] = [];
    TaxonomyCategory: any = {};
    dialogVisible: boolean = false;
    type_Id: number;

    constructor(public app: AppComponent, private route: ActivatedRoute, private taxonomyConfigurationService: TaxonomyConfigurationService) {
        this.app.displayLeftMenu(true);
        this.app.activeCategoryDropdown = true;
        this.app.pageProfile = GlobalHelper.getSideMenuTitle(MenuType.Taxonomy);
        this.app.LeftMenuItems = GlobalHelper.getMenuItems(MenuType.Taxonomy);
        this.sessionInfo = this.app.getSession();
        try {
            this.route.params.subscribe(params => {
                this.type_Id = params['typeid'];
                this.getCategoryList();
            });
        }
        catch (e) { }
    }

    ngOnInit() {

    }
    getCategoryList() {
        let typeList: any[] = [];
        this.taxonomyConfigurationService.getCategory(this.type_Id, this.sessionInfo.client_id).subscribe((result: any) => typeList = result.data,
            (error: any) => { },
            () => {
                this.CategoryList = [];
                typeList.map(o => {
                    this.CategoryList.push({
                        id: o.id,
                        type_id: o.type_id,
                        name: o.name,
                        icon: o.icon,
                        label: o.label,
                        all_clients_flag: o.all_clients_flag,
                        all_roles_flag: o.all_roles_flag,
                        client_ids: (o.all_clients_flag == 1 ? "All Clients" : o.client_ids),
                        role_ids: (o.all_roles_flag == 1 ? "All Roles" : o.role_ids),
                        user_id: o.user_id
                    });
                });
            });
    }

    editCategory(id) {
        this.dialogVisible = true;
        this.TaxonomyCategory = this.CategoryList.find(x => x.id === id);
    }

    deleteCategory(id) {
        this.app.confirmationService.confirm({
            message: 'Are you sure that you want to delete this Category?',
            accept: () => {
                let responseResult: ResponseResult;
                this.taxonomyConfigurationService.deleteCategory(id).subscribe((result: any) => responseResult = result,
                    (error: any) => {
                        this.app.msgs.push({ severity: 'error', detail: error.error.message });
                    },
                    () => {
                        this.clearCategory(false);
                        this.getCategoryList();
                        this.app.msgs.push({ severity: 'success', detail: "Category deleted successfully." });
                    });
            }
        });
    }

    saveCategory() {
        this.TaxonomyCategory.type_id = this.type_Id;
        let responseResult: ResponseResult;
        this.taxonomyConfigurationService.saveCategory(this.TaxonomyCategory).subscribe((result: any) => responseResult = result,
            (error: any) => {
                this.app.msgs.push({ severity: 'error', detail: error.error.message });
            },
            () => {
                this.clearCategory(false);
                this.getCategoryList();
                this.app.msgs.push({ severity: 'success', detail: "Category updated successfully." });
            });
    }

    clearCategory(visible) {
        this.TaxonomyCategory = {};
        this.dialogVisible = visible;
    }
}
