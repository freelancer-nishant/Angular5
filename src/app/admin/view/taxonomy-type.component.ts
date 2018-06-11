import { Component, OnInit } from '@angular/core';
import { AppComponent } from '../../app.component';
import { GlobalHelper, MenuType } from './../../shared/app.globals';
import * as moment from 'moment';
import { SelectItem } from 'primeng/primeng';
import { Message } from 'primeng/components/common/api';
import { MessageService } from 'primeng/components/common/messageservice';

import { TaxonomyService } from './../../shared/services/taxonomy.service';
import { TaxonomyType } from '../../shared/domain/taxonomy';
import { ResponseResult } from '../../shared/domain/Common.model';

@Component({
    templateUrl: './taxonomy-type.component.html',
    providers: [MessageService]
})
export class TaxonomyTypeComponent implements OnInit {
    sessionInfo: any = {}
    msgs: Message[] = [];
    TypeList: any[] = [];
    TaxonomyType: any = {};
    dialogVisible: boolean = false;

    constructor(public app: AppComponent, private messageService: MessageService, private taxonomyService: TaxonomyService) {

        this.app.displayLeftMenu(true);
        this.app.activeCategoryDropdown = true;
        this.app.pageProfile = GlobalHelper.getSideMenuTitle(MenuType.Taxonomy);
        this.app.LeftMenuItems = GlobalHelper.getMenuItems(MenuType.Taxonomy);
        this.sessionInfo = this.app.getSession();
    }

    ngOnInit() {
        this.TypeList = [];

        let typeList: any[] = [];
        this.taxonomyService.getType(2).subscribe((result: any) => typeList = result.data,
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
                        client_ids: o.client_ids,
                        role_ids: o.role_ids
                    });
                });
            });
    }
    editType(id) {
        this.dialogVisible = true;
        this.TaxonomyType = this.TypeList.find(x => x.id === id);
    }
    deleteType(id,context_id) {
        let responseResult: ResponseResult;
        this.taxonomyService.deleteType(id, context_id).subscribe((result: any) => responseResult = result,
            (error: any) => {
                this.msgs.push({ severity: 'error', detail: error.error.message });
            },
            () => {
                this.clearType(false);
                this.msgs.push({ severity: 'success', detail: "Type updated successfully." });
            });
    }
    saveType() {
        let responseResult: ResponseResult;
        this.taxonomyService.addType(this.TaxonomyType).subscribe((result: any) => responseResult = result,
            (error: any) => {
                this.msgs.push({ severity: 'error', detail: error.error.message });
            },
            () => {
                this.clearType(false);
                this.msgs.push({ severity: 'success', detail: "Type updated successfully." });
            });
    }
    clearType(visible) {
        this.TaxonomyType = {};
        this.dialogVisible = visible;
    }
}
