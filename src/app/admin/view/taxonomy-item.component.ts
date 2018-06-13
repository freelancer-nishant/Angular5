import { Component, OnInit } from '@angular/core';
import { AppComponent } from '../../app.component';
import { GlobalHelper, MenuType } from './../../shared/app.globals';
import * as moment from 'moment';
import { SelectItem } from 'primeng/primeng';

import { TaxonomyService } from './../../shared/services/taxonomy.service';
import { ResponseResult } from '../../shared/domain/Common.model';
import { ActivatedRoute } from '@angular/router';
import { TaxonomyItem } from '../../shared/domain/taxonomy';

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

    constructor(public app: AppComponent,private route: ActivatedRoute, private taxonomyService: TaxonomyService) {
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

    }
    getItemList() {
        let typeList: any[] = [];
        this.taxonomyService.getItem(this.subcategory_Id, this.sessionInfo.client_id).subscribe((result: any) => typeList = result.data,
            (error: any) => { },
            () => {
                this.ItemList = [];
                typeList.map(o => {
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
    }

    deleteItem(id, user_id) {
        this.app.confirmationService.confirm({
            message: 'Are you sure that you want to delete this Item?',
            accept: () => {
                let responseResult: ResponseResult;
                this.taxonomyService.deleteItem(id).subscribe((result: any) => responseResult = result,
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
        let responseResult: ResponseResult;
        this.taxonomyService.saveItem(this.TaxonomyItem).subscribe((result: any) => responseResult = result,
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
}
