import { Component, OnInit } from '@angular/core';
import { AppComponent } from '../../app.component';
import { GlobalHelper, MenuType } from './../../shared/app.globals';
import * as moment from 'moment';
import { SelectItem } from 'primeng/primeng';
import { Message } from 'primeng/components/common/api';
import { MessageService } from 'primeng/components/common/messageservice';

import { TaxonomyService } from './../../shared/services/taxonomy.service';
import { ResponseResult } from '../../shared/domain/Common.model';
import { ActivatedRoute } from '@angular/router';
import { TaxonomyCategory } from '../../shared/domain/taxonomy';

@Component({
    templateUrl: './taxonomy-subcategory.component.html',
    providers: [MessageService]
})
export class TaxonomySubCategoryComponent implements OnInit {
    sessionInfo: any = {}
    msgs: Message[] = [];
    CategoryList: TaxonomyCategory[] = [];
    TaxonomyCategory: any = {};
    dialogVisible: boolean = false;
    category_Id: number;
    type_Id: number;

    constructor(public app: AppComponent, private messageService: MessageService, private route: ActivatedRoute, private taxonomyService: TaxonomyService) {
        this.app.displayLeftMenu(true);
        this.app.activeCategoryDropdown = true;
        this.app.pageProfile = GlobalHelper.getSideMenuTitle(MenuType.Taxonomy);
        this.app.LeftMenuItems = GlobalHelper.getMenuItems(MenuType.Taxonomy);
        this.sessionInfo = this.app.getSession();
        try {
            this.route.params.subscribe(params => {
                this.category_Id = params['catid'];
                this.type_Id = params['typeid'];
                this.getSubCategoryList();
            });
        }
        catch (e) { }
    }

    ngOnInit() {

    }
    getSubCategoryList() {
        let typeList: any[] = [];
        this.taxonomyService.getSubCategory(this.category_Id, this.sessionInfo.client_id).subscribe((result: any) => typeList = result.data,
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

    editSubCategory(id) {
        this.dialogVisible = true;
        this.TaxonomyCategory = this.CategoryList.find(x => x.id === id);
    }

    deleteSubCategory(id,user_id) {
        let responseResult: ResponseResult;
        this.taxonomyService.deleteSubCategory(id, this.category_Id, this.sessionInfo.client_id,user_id).subscribe((result: any) => responseResult = result,
            (error: any) => {
                this.msgs.push({ severity: 'error', detail: error.error.message });
            },
            () => {
                this.clearSubCategory(false);
                this.getSubCategoryList();
                this.msgs.push({ severity: 'success', detail: "Sub Category deleted successfully." });
            });
    }

    saveSubCategory() {
        this.TaxonomyCategory.category_Id = this.category_Id;
        this.TaxonomyCategory.type_id = this.type_Id;
        let responseResult: ResponseResult;
        this.taxonomyService.saveSubCategory(this.TaxonomyCategory).subscribe((result: any) => responseResult = result,
            (error: any) => {
                this.msgs.push({ severity: 'error', detail: error.error.message });
            },
            () => {
                this.clearSubCategory(false);
                this.getSubCategoryList();
                this.msgs.push({ severity: 'success', detail: "Sub Category updated successfully." });
            });
    }

    clearSubCategory(visible) {
        this.TaxonomyCategory = {};
        this.dialogVisible = visible;
    }
}
