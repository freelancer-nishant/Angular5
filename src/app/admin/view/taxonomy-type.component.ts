import { Component, OnInit } from '@angular/core';
import { AppComponent } from '../../app.component';
import { GlobalHelper, MenuType } from './../../shared/app.globals';
import * as moment from 'moment';
import { SelectItem } from 'primeng/primeng';
import { TaxonomyConfigurationService } from './../../shared/services/taxonomyconfiguration.service';
import { ClientService } from './../../shared/services/client.service';
import { RoleService } from './../../shared/services/role.service';
import { ResponseResult } from '../../shared/domain/Common.model';
import { TaxonomyType } from '../../shared/domain/taxonomy';

@Component({
    templateUrl: './taxonomy-type.component.html'
})
export class TaxonomyTypeComponent implements OnInit {
    TypeList: TaxonomyType[] = [];
    dialogVisible: boolean = false;
    context_Id: number = 2;
    TaxonomyType: TaxonomyType;
    clients: SelectItem[];
    roles: SelectItem[];
    TypeOfClientList: any[] = [];
    TypeInRoleList: any[] = [];
    client_ids: string[];
    role_ids: string[];

    constructor(public app: AppComponent, private taxonomyConfigurationService: TaxonomyConfigurationService, private clientService: ClientService, private roleService: RoleService) {
        this.app.displayLeftMenu(true);
        this.app.activeCategoryDropdown = true;
        this.app.pageProfile = GlobalHelper.getSideMenuTitle(MenuType.Assessments);
        this.app.LeftMenuItems = GlobalHelper.getMenuItems(MenuType.Assessments);
        this.clearType(false);
    }

    ngOnInit() {
        this.getTypeList();

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
    getTypeList() {
        let typeList: any[] = [];
        this.taxonomyConfigurationService.getType(this.context_Id, undefined).subscribe((result: any) => typeList = result.data,
            (error: any) => { },
            () => {
                this.TypeList = [];
                typeList.map(o => {
                    this.TypeList.push({
                        id: o.id,
                        context_id: o.context_id,
                        name: o.name,
                        icon: o.icon,
                        label: o.label,
                        all_clients_flag: o.all_clients_flag,
                        all_roles_flag: o.all_roles_flag,
                        client_ids: (o.all_clients_flag == 1 ? "All Clients" : o.client_ids),
                        role_ids: (o.all_roles_flag == 1 ? "All Roles" : o.role_ids)
                    });
                });
            });
    }

    editType(id) {
        this.dialogVisible = true;
        this.TaxonomyType = this.TypeList.find(x => x.id === id);
        this.TaxonomyType.client_ids = (this.TaxonomyType.all_clients_flag == 1 ? undefined : this.TaxonomyType.client_ids);
        this.TaxonomyType.role_ids = (this.TaxonomyType.all_roles_flag == 1 ? undefined : this.TaxonomyType.role_ids);

        this.getTypeOfClientList(id);
        this.getTypeInRoleList(id);
    }

    deleteType(id) {
        this.app.confirmationService.confirm({
            message: 'Are you sure that you want to delete this Type?',
            accept: () => {
                let responseResult: ResponseResult;
                this.taxonomyConfigurationService.deleteType(id).subscribe((result: any) => responseResult = result,
                    (error: any) => {
                        this.app.msgs.push({ severity: 'error', detail: error.error.message });
                    },
                    () => {
                        this.clearType(false);
                        this.getTypeList();
                        this.app.msgs.push({ severity: 'success', detail: "Type deleted successfully." });
                    });
            }
        });
    }

    saveType() {
        this.TaxonomyType.context_id = this.context_Id;
        this.TaxonomyType.client_ids = (this.TaxonomyType.all_clients_flag == 1 ? undefined : this.TaxonomyType.client_ids);
        this.TaxonomyType.role_ids = (this.TaxonomyType.all_roles_flag == 1 ? undefined : this.TaxonomyType.role_ids);
        this.TaxonomyType.all_clients_flag = (this.TaxonomyType.all_clients_flag == true ? 1 : 0);
        this.TaxonomyType.all_roles_flag = (this.TaxonomyType.all_roles_flag == true ? 1 : 0);

        let responseResult: ResponseResult;
        this.taxonomyConfigurationService.saveType(this.TaxonomyType).subscribe((result: any) => responseResult = result,
            (error: any) => {
                this.app.msgs.push({ severity: 'error', detail: error.error.message });
            },
            () => {
                this.clearType(false);
                this.getTypeList();
                this.app.msgs.push({ severity: 'success', detail: "Type updated successfully." });
            });
    }

    clearType(visible) {
        this.TaxonomyType = { id: 0, all_clients_flag: 0, all_roles_flag: 0, client_ids: null, context_id: this.context_Id, icon: null, label: null, name: null, role_ids: null };
        this.dialogVisible = visible;
        this.TypeOfClientList = [];
        this.TypeInRoleList = [];
    }
    getTypeOfClientList(id) {
        let typeOfClientList: any[] = [];
        this.taxonomyConfigurationService.getTypeOfClient(id).subscribe((result: any) => typeOfClientList = result.data,
            (error: any) => { },
            () => {
                this.TypeOfClientList = [];
                typeOfClientList.map(o => {
                    this.TypeOfClientList.push({
                        type_id: o.type_id,
                        client_id: o.client_id,
                        name: o.name
                    });
                });
            });
    }
    deleteTypeOfClient(id, client_id) {
        this.app.confirmationService.confirm({
            message: 'Are you sure that you want to delete this Type Of Client?',
            accept: () => {
                let responseResult: ResponseResult;
                this.taxonomyConfigurationService.deleteTypeOfClient(id, client_id).subscribe((result: any) => responseResult = result,
                    (error: any) => {
                        this.app.msgs.push({ severity: 'error', detail: error.error.message });
                    },
                    () => {
                        this.getTypeOfClientList(this.TaxonomyType.id);
                        this.app.msgs.push({ severity: 'success', detail: "Type Of Client deleted successfully." });
                    });
            }
        });
    }
    saveTypeOfClient() {
        let responseResult: ResponseResult;
        this.taxonomyConfigurationService.saveTypeOfClient({ type_id: this.TaxonomyType.id, client_ids: this.client_ids.join(',') }).subscribe((result: any) => responseResult = result,
            (error: any) => {
                this.app.msgs.push({ severity: 'error', detail: error.error.message });
            },
            () => {
                this.clearTypeOfClient();
                this.getTypeOfClientList(this.TaxonomyType.id);
                this.app.msgs.push({ severity: 'success', detail: "Type Of Client added successfully." });
            });
    }
    clearTypeOfClient() {
        this.client_ids = [];
    }
    getTypeInRoleList(id) {
        let typeInRoleList: any[] = [];
        this.taxonomyConfigurationService.getTypeInRole(id).subscribe((result: any) => typeInRoleList = result.data,
            (error: any) => { },
            () => {
                this.TypeInRoleList = [];
                typeInRoleList.map(o => {
                    this.TypeInRoleList.push({
                        type_id: o.type_id,
                        role_id: o.role_id,
                        name: o.name
                    });
                });
            });
    }
    deleteTypeInRole(id, role_id) {
        this.app.confirmationService.confirm({
            message: 'Are you sure that you want to delete this Type In Role?',
            accept: () => {
                let responseResult: ResponseResult;
                this.taxonomyConfigurationService.deleteTypeInRole(id, role_id).subscribe((result: any) => responseResult = result,
                    (error: any) => {
                        this.app.msgs.push({ severity: 'error', detail: error.error.message });
                    },
                    () => {
                        this.getTypeInRoleList(this.TaxonomyType.id);
                        this.app.msgs.push({ severity: 'success', detail: "Type In Role deleted successfully." });
                    });
            }
        });
    }
    saveTypeInRole() {
        let responseResult: ResponseResult;
        this.taxonomyConfigurationService.saveTypeInRole({ type_id: this.TaxonomyType.id, role_ids: this.role_ids.join(',') }).subscribe((result: any) => responseResult = result,
            (error: any) => {
                this.app.msgs.push({ severity: 'error', detail: error.error.message });
            },
            () => {
                this.clearTypeInRole();
                this.getTypeInRoleList(this.TaxonomyType.id);
                this.app.msgs.push({ severity: 'success', detail: "Type In Role added successfully." });
            });
    }
    clearTypeInRole() {
        this.role_ids = [];
    }
}
