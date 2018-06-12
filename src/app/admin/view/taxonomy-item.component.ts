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
import { TaxonomyItem } from '../../shared/domain/taxonomy';

@Component({
    templateUrl: './taxonomy-item.component.html',
    providers: [MessageService]
})
export class TaxonomyItemComponent implements OnInit {
    sessionInfo: any = {}
    msgs: Message[] = [];
    ItemList: TaxonomyItem[] = [];
    TaxonomyItem: any = {};
    dialogVisible: boolean = false;
    subcategory_Id: number;
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
                        report_param: o.report_param
                    });
                });
            });
    }

    editItem(id) {
        this.dialogVisible = true;
        this.TaxonomyItem = this.ItemList.find(x => x.id === id);
    }

    deleteItem(id,user_id) {
        let responseResult: ResponseResult;
        this.taxonomyService.deleteSubCategory(id, this.category_Id, this.sessionInfo.client_id,user_id).subscribe((result: any) => responseResult = result,
            (error: any) => {
                this.msgs.push({ severity: 'error', detail: error.error.message });
            },
            () => {
                this.clearItem(false);
                this.getItemList();
                this.msgs.push({ severity: 'success', detail: "Item deleted successfully." });
            });
    }

    saveItem() {
        this.TaxonomyItem.category_Id = this.category_Id;
        this.TaxonomyItem.type_id = this.type_Id;
        let responseResult: ResponseResult;
        this.taxonomyService.saveSubCategory(this.TaxonomyItem).subscribe((result: any) => responseResult = result,
            (error: any) => {
                this.msgs.push({ severity: 'error', detail: error.error.message });
            },
            () => {
                this.clearItem(false);
                this.getItemList();
                this.msgs.push({ severity: 'success', detail: "Item updated successfully." });
            });
    }

    clearItem(visible) {
        this.TaxonomyItem = {};
        this.dialogVisible = visible;
    }
}
