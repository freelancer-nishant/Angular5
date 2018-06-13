import { Component, OnInit } from '@angular/core';
import { AppComponent } from '../../app.component';
import { GlobalHelper, MenuType } from './../../shared/app.globals';
import * as moment from 'moment';
import { SelectItem } from 'primeng/primeng';

import { TaxonomyService } from './../../shared/services/taxonomy.service';
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

    constructor(public app: AppComponent,  private taxonomyService: TaxonomyService) {
        this.app.displayLeftMenu(true);
        this.app.activeCategoryDropdown = true;
        this.app.pageProfile = GlobalHelper.getSideMenuTitle(MenuType.Taxonomy);
        this.app.LeftMenuItems = GlobalHelper.getMenuItems(MenuType.Taxonomy);
        this.clearType(false);
    }

    ngOnInit() {
        this.getTypeList();
    }
    getTypeList() {
        let typeList: any[] = [];
        this.taxonomyService.getType(this.context_Id).subscribe((result: any) => typeList = result.data,
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
    }

    deleteType(id) {
        this.app.confirmationService.confirm({
            message: 'Are you sure that you want to delete this Type?',
            accept: () => {
                let responseResult: ResponseResult;
                this.taxonomyService.deleteType(id, this.context_Id).subscribe((result: any) => responseResult = result,
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
        let responseResult: ResponseResult;
        this.taxonomyService.saveType(this.TaxonomyType).subscribe((result: any) => responseResult = result,
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
    }
}
