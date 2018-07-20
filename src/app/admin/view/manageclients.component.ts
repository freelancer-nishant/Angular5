import { Component, OnInit } from '@angular/core';
import { AppComponent } from '../../app.component';
import { GlobalHelper, MenuType } from './../../shared/app.globals';
import * as moment from 'moment';
import { SelectItem } from 'primeng/primeng';
import { Message } from 'primeng/components/common/api';
import { MessageService } from 'primeng/components/common/messageservice';

import { Client } from './../../shared/domain/client'
import { ClientService } from './../../shared/services/client.service'
import { CommonService } from './../../shared/services/Common.service'
import { ResponseResult } from './../../shared/domain/Common.model'

@Component({
    templateUrl: './manageclients.component.html'
})

export class ManageClientsComponent implements OnInit {
    sessionInfo: any = {}
    msgs: Message[] = [];
    clientList: Client[];
    client: any = {};
    clientAdded: any;
    clientUpdated: any;

    constructor(public app: AppComponent, private clientService: ClientService, private messageService: MessageService) {
        this.app.displayLeftMenu(true);
        this.app.activeCategoryDropdown = true;
        this.app.pageProfile = GlobalHelper.getSideMenuTitle(MenuType.Clients);
        this.app.LeftMenuItems = GlobalHelper.getMenuItems(MenuType.Clients);
        this.sessionInfo = this.app.getSession();
    }

    ngOnInit() {
        this.client = {};
        this.clientAdded = {};
        this.clientUpdated = {};
        this.loadClient();
    }


    loadClient() {
        let clientList: Client[] = [];
        this.clientService.get().subscribe((result: any) => clientList = result.data,
            (error: any) => { },
            () => {
                this.clientList = [];
                clientList.map(o => {
                    this.clientList.push({
                        id: o.id,
                        name: o.name
                    });
                });

            });
    }

    addClient() {
        if (this.clientAdded != undefined && this.clientAdded != null) {
            let responseResult: ResponseResult;

            this.clientService.insert(this.clientAdded).subscribe((result: any) => responseResult = result,
                (error: any) => {
                    this.msgs.push({ severity: 'error', detail: error.error.message });
                },
                () => {
                    this.loadClient();
                    this.msgs.push({ severity: 'success', detail: "Client added successfully." });
                    this.clientAdded.name = null;
                });
        }
        else {
            this.msgs.push({ severity: 'error', detail: "Please input data to add." });
        }
    }

    deleteClient(clientId) {
        let responseResult: ResponseResult;
        this.clientService.delete(clientId).subscribe((result: any) => responseResult = result.data,
            (error: any) => {
                this.msgs.push({ severity: 'error', detail: error.error.message });
            },
            () => {
                this.loadClient();
                this.msgs.push({ severity: 'success', detail: "Client deleted successfully." });
            });
    }

    updateClient(name, id) {
        this.clientUpdated.name = name;
        this.clientUpdated.id = id;

        let responseResult: ResponseResult;
        this.clientService.update(this.clientUpdated).subscribe((result: any) => responseResult = result,
            (error: any) => {
                this.msgs.push({ severity: 'error', detail: error.error.message });
            },
            () => {
                this.loadClient();
                this.msgs.push({ severity: 'success', detail: "Client updated successfully." });
            });
    }
}