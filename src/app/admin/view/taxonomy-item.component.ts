import { Component, OnInit } from '@angular/core';
import { AppComponent } from '../../app.component';
import { GlobalHelper, MenuType } from './../../shared/app.globals';
import * as moment from 'moment';
import { SelectItem } from 'primeng/primeng';

import { TaxonomyConfigurationService } from './../../shared/services/taxonomyconfiguration.service';
import { ClientService } from './../../shared/services/client.service';
import { RoleService } from './../../shared/services/role.service';
import { ResponseResult } from '../../shared/domain/Common.model';
import { ActivatedRoute } from '@angular/router';
import { TaxonomyItem } from '../../shared/domain/taxonomy';
import { School } from '../../shared/domain/school';
import { SchoolService } from '../../shared/services/school.service';

@Component({
    templateUrl: './taxonomy-item.component.html'
})
export class TaxonomyItemComponent implements OnInit {
    sessionInfo: any = {}
    ItemList: TaxonomyItem[] = [];
    TaxonomyItem: any = {};
    dialogVisible: boolean = false;
    subcategory_Id: number;
    category_Id: number;
    type_Id: number;
    clients: SelectItem[];
    schools: SelectItem[];
    roles: SelectItem[];
    ItemOfClientList: any[] = [];
    ItemInRoleList: any[] = [];
    client_id: string;
    school_ids: string[];
    selectedSchoolClients: any[] = [];
    role_ids: string[];
    ItemParam: any = {};
    ItemParamsList: any[] = [];

    constructor(public app: AppComponent, private route: ActivatedRoute, private taxonomyConfigurationService: TaxonomyConfigurationService, private clientService: ClientService, private schoolService: SchoolService, private roleService: RoleService) {
        this.app.displayLeftMenu(true);
        this.app.activeCategoryDropdown = true;
        this.app.pageProfile = GlobalHelper.getSideMenuTitle(MenuType.Taxonomy);
        this.app.LeftMenuItems = GlobalHelper.getMenuItems(MenuType.Taxonomy);
        this.sessionInfo = this.app.getSession();
        try {
            this.route.params.subscribe(params => {
                this.subcategory_Id = params['subcatid'];
                this.category_Id = params['catid'];
                this.type_Id = params['typeid'];
                this.getItemList();
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

    getItemList() {
        let itemList: any[] = [];
        this.taxonomyConfigurationService.getItemListBySubCategory(this.subcategory_Id).subscribe((result: any) => itemList = result.data,
            (error: any) => { },
            () => {
                this.ItemList = [];
                itemList.map(o => {
                    this.ItemList.push({
                        id: o.id,
                        name: o.name,
                        label: o.label,
                        report_path: o.report_path,
                        component_name: o.component_name,
                        component_out_param: o.component_out_param,
                        is_pagination: o.is_pagination,
                        report_param: o.report_param,
                        all_clients_flag: o.all_clients_flag,
                        all_roles_flag: o.all_roles_flag,
                        client_ids: o.client_ids,
                        content_target: o.content_target,
                        content_type_id: o.content_type_id,
                        role_ids: o.role_ids,
                        subcategory_id: o.subcategory_id,
                        user_id: o.user_id
                    });
                });
            });
    }
    editItem(id) {
        this.dialogVisible = true;
        this.TaxonomyItem = this.ItemList.find(x => x.id === id);
        this.TaxonomyItem.client_ids = (this.TaxonomyItem.all_clients_flag == 1 ? undefined : this.TaxonomyItem.client_ids);
        this.TaxonomyItem.role_ids = (this.TaxonomyItem.all_roles_flag == 1 ? undefined : this.TaxonomyItem.role_ids);

        this.getItemOfClientList(id);
        this.getItemInRoleList(id);
        this.getItemParamList(id);
    }
    deleteItem(id, user_id) {
        this.app.confirmationService.confirm({
            message: 'Are you sure that you want to delete this Item?',
            accept: () => {
                let responseResult: ResponseResult;
                this.taxonomyConfigurationService.deleteItem(id).subscribe((result: any) => responseResult = result,
                    (error: any) => {
                        this.app.msgs.push({ severity: 'error', detail: error.error.message });
                    },
                    () => {
                        this.clearItem(false);
                        this.getItemList();
                        this.app.msgs.push({ severity: 'success', detail: "Item deleted successfully." });
                    });
            }
        });
    }
    saveItem() {
        this.TaxonomyItem.subcategory_id = this.subcategory_Id;
        this.TaxonomyItem.content_type_id = this.type_Id;

        this.TaxonomyItem.client_ids = (this.TaxonomyItem.all_clients_flag == 1 ? undefined : this.TaxonomyItem.client_ids);
        this.TaxonomyItem.role_ids = (this.TaxonomyItem.all_roles_flag == 1 ? undefined : this.TaxonomyItem.role_ids);
        this.TaxonomyItem.all_clients_flag = (this.TaxonomyItem.all_clients_flag == true ? 1 : 0);
        this.TaxonomyItem.all_roles_flag = (this.TaxonomyItem.all_roles_flag == true ? 1 : 0);

        let responseResult: ResponseResult;
        this.taxonomyConfigurationService.saveItem(this.TaxonomyItem).subscribe((result: any) => responseResult = result,
            (error: any) => {
                this.app.msgs.push({ severity: 'error', detail: error.error.message });
            },
            () => {
                this.clearItem(false);
                this.getItemList();
                this.app.msgs.push({ severity: 'success', detail: "Item updated successfully." });
            });
    }
    clearItem(visible) {
        this.TaxonomyItem = {};
        this.dialogVisible = visible;
    }

    clientChange(e) {
        let schoolResult: School[] = [];
        this.schoolService.get(parseInt(this.client_id)).subscribe((result: any) => schoolResult = result.data,
            (error: any) => { },
            () => {
                this.schools = [];
                schoolResult.map(o => { this.schools.push({ label: o.name, value: o.id }); });
            }
        );
    }
    getItemOfClientList(id) {
        let itemOfClientList: any[] = [];
        this.taxonomyConfigurationService.getItemOfClient(id).subscribe((result: any) => itemOfClientList = result.data,
            (error: any) => { },
            () => {
                this.ItemOfClientList = [];
                itemOfClientList.map(o => {
                    this.ItemOfClientList.push({
                        item_id: o.item_id,
                        client_id: o.client_id,
                        name: o.name,
                        school_id: o.school_id,
                        school_name: o.school_name
                    });
                });
            });
    }
    deleteItemOfClient(id, client_id,school_id) {
        this.app.confirmationService.confirm({
            message: 'Are you sure that you want to delete this Item Of Client?',
            accept: () => {
                let responseResult: ResponseResult;
                this.taxonomyConfigurationService.deleteItemOfClient(id, client_id, school_id).subscribe((result: any) => responseResult = result,
                    (error: any) => {
                        this.app.msgs.push({ severity: 'error', detail: error.error.message });
                    },
                    () => {
                        this.getItemOfClientList(this.TaxonomyItem.id);
                        this.app.msgs.push({ severity: 'success', detail: "Item Of Client deleted successfully." });
                    });
            }
        });
    }
    saveItemOfClient() {
        for (var i = 0; i < this.school_ids.length; i++) {
            this.selectedSchoolClients.push({ client_id: this.client_id, school_id: this.school_ids[i] });
        }

        let responseResult: ResponseResult;
        this.taxonomyConfigurationService.saveItemOfClient({ item_id: this.TaxonomyItem.id, client_and_school_ids: JSON.stringify(this.selectedSchoolClients) }).subscribe((result: any) => responseResult = result,
            (error: any) => {
                this.app.msgs.push({ severity: 'error', detail: error.error.message });
            },
            () => {
                this.clearItemOfClient();
                this.getItemOfClientList(this.TaxonomyItem.id);
                this.app.msgs.push({ severity: 'success', detail: "Item Of Client and Schools added successfully." });
            });
    }

    clearItemOfClient() {
        this.client_id = '';
        this.school_ids = [];
        this.schools = [];
    }

    getItemInRoleList(id) {
        let itemInRoleList: any[] = [];
        this.taxonomyConfigurationService.getItemInRole(id).subscribe((result: any) => itemInRoleList = result.data,
            (error: any) => { },
            () => {
                this.ItemInRoleList = [];
                itemInRoleList.map(o => {
                    this.ItemInRoleList.push({
                        item_id: o.item_id,
                        role_id: o.role_id,
                        name: o.name
                    });
                });
            });
    }
    deleteItemInRole(id, role_id) {
        this.app.confirmationService.confirm({
            message: 'Are you sure that you want to delete this Item In Role?',
            accept: () => {
                let responseResult: ResponseResult;
                this.taxonomyConfigurationService.deleteItemInRole(id, role_id).subscribe((result: any) => responseResult = result,
                    (error: any) => {
                        this.app.msgs.push({ severity: 'error', detail: error.error.message });
                    },
                    () => {
                        this.getItemInRoleList(this.TaxonomyItem.id);
                        this.app.msgs.push({ severity: 'success', detail: "Item In Role deleted successfully." });
                    });
            }
        });
    }
    saveItemInRole() {
        let responseResult: ResponseResult;
        this.taxonomyConfigurationService.saveItemInRole({ item_id: this.TaxonomyItem.id, role_ids: this.role_ids.join(',') }).subscribe((result: any) => responseResult = result,
            (error: any) => {
                this.app.msgs.push({ severity: 'error', detail: error.error.message });
            },
            () => {
                this.clearItemInRole();
                this.getItemInRoleList(this.TaxonomyItem.id);
                this.app.msgs.push({ severity: 'success', detail: "Item In Role added successfully." });
            });
    }
    clearItemInRole() {
        this.role_ids = [];
    }

    getItemParamList(id) {
        let itemParamsList: any[] = [];
        this.taxonomyConfigurationService.getItemVJSParam(undefined, id).subscribe((result: any) => itemParamsList = result.data,
            (error: any) => { },
            () => {
                this.ItemParamsList = [];
                itemParamsList.map(o => {
                    this.ItemParamsList.push({
                        id: o.id,
                        item_id: o.item_id,
                        component_out_param: o.component_out_param,
                        report_param: o.report_param
                    });
                });
            });
    }
    editItemParam(id) {
        this.ItemParam = this.ItemParamsList.find(x => x.id === id);
    }
    deleteItemParam(id) {
        this.app.confirmationService.confirm({
            message: 'Are you sure that you want to delete this Item Param?',
            accept: () => {
                let responseResult: ResponseResult;
                this.taxonomyConfigurationService.deleteItemVJSParam(id).subscribe((result: any) => responseResult = result,
                    (error: any) => {
                        this.app.msgs.push({ severity: 'error', detail: error.error.message });
                    },
                    () => {
                        this.getItemParamList(this.TaxonomyItem.id);
                        this.app.msgs.push({ severity: 'success', detail: "Item Param deleted successfully." });
                    });
            }
        });
    }
    saveItemParam() {
        this.ItemParam.item_id = this.TaxonomyItem.id;
        let responseResult: ResponseResult;
        this.taxonomyConfigurationService.saveItemVJSParam(this.ItemParam).subscribe((result: any) => responseResult = result,
            (error: any) => {
                this.app.msgs.push({ severity: 'error', detail: error.error.message });
            },
            () => {
                this.clearItemParam();
                this.getItemParamList(this.TaxonomyItem.id);
                this.app.msgs.push({ severity: 'success', detail: "Item Param updated successfully." });
            });
    }
    clearItemParam() {
        this.ItemParam = {};
    }
}
