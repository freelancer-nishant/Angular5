import { Component, OnInit } from '@angular/core';
import { AppComponent } from '../../app.component';
import { GlobalHelper, MenuType } from './../../shared/app.globals';
import * as moment from 'moment';
import { SelectItem } from 'primeng/primeng';

import { TaxonomyConfigurationService } from './../../shared/services/taxonomyconfiguration.service';
import { ResponseResult } from '../../shared/domain/Common.model';
import { ActivatedRoute } from '@angular/router';
import { TaxonomyCategory } from '../../shared/domain/taxonomy';
import { ClientService } from '../../shared/services/client.service';
import { RoleService } from '../../shared/services/role.service';

@Component({
    templateUrl: './taxonomy-subcategory.component.html'
})
export class TaxonomySubCategoryComponent implements OnInit {
    sessionInfo: any = {}
    CategoryList: TaxonomyCategory[] = [];
    TaxonomyCategory: any = {};
    dialogVisible: boolean = false;
    category_Id: number;
    type_Id: number;
    clients: SelectItem[];
    roles: SelectItem[];
    SubCategoryOfClientList: any[] = [];
    SubCategoryInRoleList: any[] = [];
    client_ids: string[];
    role_ids: string[];

    constructor(public app: AppComponent, private route: ActivatedRoute,
                private taxonomyConfigurationService: TaxonomyConfigurationService,
                private clientService: ClientService, private roleService: RoleService) {

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
        let clients: any[] = [];
        this.clientService.get().subscribe((result: any) => clients = result.data,
            (error: any) => { },
            () => {
                this.clients = [];
                clients.map(o => { this.clients.push({ label: o.name, value: o.id }); });
            });

        let roles: any[] = [];
        this.roleService.get().subscribe((result: any) => roles = result,
            (error: any) => { },
            () => {
                this.roles = [];
                roles.map(o => { this.roles.push({ label: o.name, value: o.id }); });
            });
    }
    getSubCategoryList() {
        let typeList: any[] = [];
        this.taxonomyConfigurationService.getSubCategory(this.category_Id, this.sessionInfo.client_id).subscribe((result: any) => typeList = result.data,
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
        this.TaxonomyCategory.client_ids = (this.TaxonomyCategory.all_clients_flag == 1 ? undefined : this.TaxonomyCategory.client_ids);
        this.TaxonomyCategory.role_ids = (this.TaxonomyCategory.all_roles_flag == 1 ? undefined : this.TaxonomyCategory.role_ids);

        this.getSubCategoryOfClientList(id);
        this.getSubCategoryInRoleList(id);
    }

    deleteSubCategory(id) {
        this.app.confirmationService.confirm({
            message: 'Are you sure that you want to delete this Sub Category?',
            accept: () => {
                let responseResult: ResponseResult;
                this.taxonomyConfigurationService.deleteSubCategory(id).subscribe((result: any) => responseResult = result,
                    (error: any) => {
                        this.app.msgs.push({ severity: 'error', detail: error.error.message });
                    },
                    () => {
                        this.clearSubCategory(false);
                        this.getSubCategoryList();
                        this.app.msgs.push({ severity: 'success', detail: "Sub Category deleted successfully." });
                    });
            }
        });
    }

    saveSubCategory() {
        this.TaxonomyCategory.category_Id = this.category_Id;
        this.TaxonomyCategory.type_id = this.type_Id;
        this.TaxonomyCategory.client_ids = (this.TaxonomyCategory.all_clients_flag == 1 ? undefined : this.TaxonomyCategory.client_ids);
        this.TaxonomyCategory.role_ids = (this.TaxonomyCategory.all_roles_flag == 1 ? undefined : this.TaxonomyCategory.role_ids);
        this.TaxonomyCategory.all_clients_flag = (this.TaxonomyCategory.all_clients_flag == true ? 1 : 0);
        this.TaxonomyCategory.all_roles_flag = (this.TaxonomyCategory.all_roles_flag == true ? 1 : 0);

        let responseResult: ResponseResult;
        this.taxonomyConfigurationService.saveSubCategory(this.TaxonomyCategory).subscribe((result: any) => responseResult = result,
            (error: any) => {
                this.app.msgs.push({ severity: 'error', detail: error.error.message });
            },
            () => {
                this.clearSubCategory(false);
                this.getSubCategoryList();
                this.app.msgs.push({ severity: 'success', detail: "Sub Category updated successfully." });
            });
    }

    clearSubCategory(visible) {
        this.TaxonomyCategory = {};
        this.dialogVisible = visible;
    }

    getSubCategoryOfClientList(id) {
        let subCategoryOfClientList: any[] = [];
        this.taxonomyConfigurationService.getSubCategoryOfClient(id).subscribe((result: any) => subCategoryOfClientList = result.data,
            (error: any) => { },
            () => {
                this.SubCategoryOfClientList = [];
                subCategoryOfClientList.map(o => {
                    this.SubCategoryOfClientList.push({
                        subcategory_id: o.subcategory_id,
                        client_id: o.client_id,
                        name: o.name
                    });
                });
            });
    }
    deleteSubCategoryOfClient(id, client_id) {
        this.app.confirmationService.confirm({
            message: 'Are you sure that you want to delete this Sub Category Of Client?',
            accept: () => {
                let responseResult: ResponseResult;
                this.taxonomyConfigurationService.deleteSubCategoryOfClient(id, client_id).subscribe((result: any) => responseResult = result,
                    (error: any) => {
                        this.app.msgs.push({ severity: 'error', detail: error.error.message });
                    },
                    () => {
                        this.getSubCategoryOfClientList(this.TaxonomyCategory.id);
                        this.app.msgs.push({ severity: 'success', detail: "Sub Category Of Client deleted successfully." });
                    });
            }
        });
    }
    saveSubCategoryOfClient() {
        let responseResult: ResponseResult;
        this.taxonomyConfigurationService.saveSubCategoryOfClient({ subCategory_id: this.TaxonomyCategory.id, client_ids: this.client_ids.join(',') }).subscribe((result: any) => responseResult = result,
            (error: any) => {
                this.app.msgs.push({ severity: 'error', detail: error.error.message });
            },
            () => {
                this.clearSubCategoryOfClient();
                this.getSubCategoryOfClientList(this.TaxonomyCategory.id);
                this.app.msgs.push({ severity: 'success', detail: "Sub Category Of Client added successfully." });
            });
    }
    clearSubCategoryOfClient() {
        this.client_ids = [];
    }
    getSubCategoryInRoleList(id) {
        let subCategoryInRoleList: any[] = [];
        this.taxonomyConfigurationService.getSubCategoryInRole(id).subscribe((result: any) => subCategoryInRoleList = result.data,
            (error: any) => { },
            () => {
                this.SubCategoryInRoleList = [];
                subCategoryInRoleList.map(o => {
                    this.SubCategoryInRoleList.push({
                        subcategory_id: o.subcategory_id,
                        role_id: o.role_id,
                        name: o.name
                    });
                });
            });
    }
    deleteSubCategoryInRole(id, role_id) {
        this.app.confirmationService.confirm({
            message: 'Are you sure that you want to delete this Sub Category In Role?',
            accept: () => {
                let responseResult: ResponseResult;
                this.taxonomyConfigurationService.deleteSubCategoryInRole(id, role_id).subscribe((result: any) => responseResult = result,
                    (error: any) => {
                        this.app.msgs.push({ severity: 'error', detail: error.error.message });
                    },
                    () => {
                        this.getSubCategoryInRoleList(this.TaxonomyCategory.id);
                        this.app.msgs.push({ severity: 'success', detail: "Sub Category In Role deleted successfully." });
                    });
            }
        });
    }
    saveSubCategoryInRole() {
        let responseResult: ResponseResult;
        this.taxonomyConfigurationService.saveSubCategoryInRole({ subCategory_id: this.TaxonomyCategory.id, role_ids: this.role_ids.join(',') }).subscribe((result: any) => responseResult = result,
            (error: any) => {
                this.app.msgs.push({ severity: 'error', detail: error.error.message });
            },
            () => {
                this.clearSubCategoryInRole();
                this.getSubCategoryInRoleList(this.TaxonomyCategory.id);
                this.app.msgs.push({ severity: 'success', detail: "Sub Category In Role added successfully." });
            });
    }
    clearSubCategoryInRole() {
        this.role_ids = [];
    }
}
