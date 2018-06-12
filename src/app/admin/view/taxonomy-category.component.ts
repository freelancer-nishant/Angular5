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

@Component({
    templateUrl: './taxonomy-category.component.html',
    providers: [MessageService]
})
export class TaxonomyCategoryComponent implements OnInit {
    sessionInfo: any = {}
    msgs: Message[] = [];
    CategoryList: any[] = [];
    TaxonomyCategory: any = {};
    dialogVisible: boolean = false;
    type_Id: number;

    constructor(public app: AppComponent, private messageService: MessageService, private route: ActivatedRoute, private taxonomyService: TaxonomyService) {
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
        this.taxonomyService.getCategory(this.type_Id, this.sessionInfo.client_id).subscribe((result: any) => typeList = result.data,
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

    deleteCategory(id,user_id) {
        let responseResult: ResponseResult;
        this.taxonomyService.deleteCategory(id, this.type_Id, this.sessionInfo.client_id,user_id).subscribe((result: any) => responseResult = result,
            (error: any) => {
                this.msgs.push({ severity: 'error', detail: error.error.message });
            },
            () => {
                this.clearCategory(false);
                this.getCategoryList();
                this.msgs.push({ severity: 'success', detail: "Category deleted successfully." });
            });
    }

    saveCategory() {
        this.TaxonomyCategory.type_id = this.type_Id;
        let responseResult: ResponseResult;
        this.taxonomyService.saveCategory(this.TaxonomyCategory).subscribe((result: any) => responseResult = result,
            (error: any) => {
                this.msgs.push({ severity: 'error', detail: error.error.message });
            },
            () => {
                this.clearCategory(false);
                this.getCategoryList();
                this.msgs.push({ severity: 'success', detail: "Category updated successfully." });
            });
    }

    clearCategory(visible) {
        this.TaxonomyCategory = {};
        this.dialogVisible = visible;
    }
}
