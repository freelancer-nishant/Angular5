import { Component, OnInit } from '@angular/core';
import { AppComponent } from '../../app.component';
import { GlobalHelper, MenuType } from './../../shared/app.globals';
import * as moment from 'moment';
import { SelectItem } from 'primeng/primeng';

import { TaxonomyConfigurationService } from './../../shared/services/taxonomyconfiguration.service';
import { ResponseResult } from '../../shared/domain/Common.model';
import { ActivatedRoute } from '@angular/router';
import { ClientService } from '../../shared/services/client.service';
import { RoleService } from '../../shared/services/role.service';

@Component({
    templateUrl: './taxonomy-category.component.html'
})
export class TaxonomyCategoryComponent implements OnInit {
    sessionInfo: any = {}
    CategoryList: any[] = [];
    TaxonomyCategory: any = {};
    dialogVisible: boolean = false;
    type_Id: number;
    clients: SelectItem[];
    roles: SelectItem[];
    CategoryOfClientList: any[] = [];
    CategoryInRoleList: any[] = [];
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
                this.type_Id = params['typeid'];
                this.getCategoryList();
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
        this.TaxonomyCategory.client_ids = (this.TaxonomyCategory.all_clients_flag == 1 ? undefined : this.TaxonomyCategory.client_ids);
        this.TaxonomyCategory.role_ids = (this.TaxonomyCategory.all_roles_flag == 1 ? undefined : this.TaxonomyCategory.role_ids);

        this.getCategoryOfClientList(id);
        this.getCategoryInRoleList(id);
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
        this.TaxonomyCategory.client_ids = (this.TaxonomyCategory.all_clients_flag == 1 ? undefined : this.TaxonomyCategory.client_ids);
        this.TaxonomyCategory.role_ids = (this.TaxonomyCategory.all_roles_flag == 1 ? undefined : this.TaxonomyCategory.role_ids);
        this.TaxonomyCategory.all_clients_flag = (this.TaxonomyCategory.all_clients_flag == true ? 1 : 0);
        this.TaxonomyCategory.all_roles_flag = (this.TaxonomyCategory.all_roles_flag == true ? 1 : 0);
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
        this.CategoryOfClientList = [];
        this.CategoryInRoleList = [];
    }
    getCategoryOfClientList(id) {
        let typeOfClientList: any[] = [];
        this.taxonomyConfigurationService.getCategoryOfClient(id).subscribe((result: any) => typeOfClientList = result.data,
            (error: any) => { },
            () => {
                this.CategoryOfClientList = [];
                typeOfClientList.map(o => {
                    this.CategoryOfClientList.push({
                        category_id: o.category_id,
                        client_id: o.client_id,
                        name: o.name
                    });
                });
            });
    }
    deleteCategoryOfClient(id, client_id) {
        this.app.confirmationService.confirm({
            message: 'Are you sure that you want to delete this Category Of Client?',
            accept: () => {
                let responseResult: ResponseResult;
                this.taxonomyConfigurationService.deleteCategoryOfClient(id, client_id).subscribe((result: any) => responseResult = result,
                    (error: any) => {
                        this.app.msgs.push({ severity: 'error', detail: error.error.message });
                    },
                    () => {
                        this.getCategoryOfClientList(this.TaxonomyCategory.id);
                        this.app.msgs.push({ severity: 'success', detail: "Category Of Client deleted successfully." });
                    });
            }
        });
    }
    saveCategoryOfClient() {
        let responseResult: ResponseResult;
        this.taxonomyConfigurationService.saveCategoryOfClient({ category_id: this.TaxonomyCategory.id, client_ids: this.client_ids.join(',') }).subscribe((result: any) => responseResult = result,
            (error: any) => {
                this.app.msgs.push({ severity: 'error', detail: error.error.message });
            },
            () => {
                this.getCategoryOfClientList(this.TaxonomyCategory.id);
                this.app.msgs.push({ severity: 'success', detail: "Category Of Client added successfully." });
            });
    }
    clearCategoryOfClient() {
        this.client_ids = [];
    }
    getCategoryInRoleList(id) {
        let typeInRoleList: any[] = [];
        this.taxonomyConfigurationService.getCategoryInRole(id).subscribe((result: any) => typeInRoleList = result.data,
            (error: any) => { },
            () => {
                this.CategoryInRoleList = [];
                typeInRoleList.map(o => {
                    this.CategoryInRoleList.push({
                        category_id: o.category_id,
                        role_id: o.role_id,
                        name: o.name
                    });
                });
            });
    }
    deleteCategoryInRole(id, role_id) {
        this.app.confirmationService.confirm({
            message: 'Are you sure that you want to delete this Category In Role?',
            accept: () => {
                let responseResult: ResponseResult;
                this.taxonomyConfigurationService.deleteCategoryInRole(id, role_id).subscribe((result: any) => responseResult = result,
                    (error: any) => {
                        this.app.msgs.push({ severity: 'error', detail: error.error.message });
                    },
                    () => {
                        this.getCategoryInRoleList(this.TaxonomyCategory.id);
                        this.app.msgs.push({ severity: 'success', detail: "Category In Role deleted successfully." });
                    });
            }
        });
    }
    saveCategoryInRole() {
        let responseResult: ResponseResult;
        this.taxonomyConfigurationService.saveCategoryInRole({ category_id: this.TaxonomyCategory.id, role_ids: this.role_ids.join(',') }).subscribe((result: any) => responseResult = result,
            (error: any) => {
                this.app.msgs.push({ severity: 'error', detail: error.error.message });
            },
            () => {
                this.getCategoryInRoleList(this.TaxonomyCategory.id);
                this.app.msgs.push({ severity: 'success', detail: "Category In Role added successfully." });
            });
    }
    clearCategoryInRole() {
        this.role_ids = [];
    }
}
