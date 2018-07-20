import { Component, OnInit } from '@angular/core';
import { AppComponent } from '../../app.component';
import { GlobalHelper, MenuType } from './../../shared/app.globals';
import * as moment from 'moment';
import { SelectItem } from 'primeng/primeng';
import { Message } from 'primeng/components/common/api';
import { MessageService } from 'primeng/components/common/messageservice';

import { Role, RoleName } from './../../shared/domain/role'
import { RoleService } from './../../shared/services/role.service'
import { CommonService } from './../../shared/services/Common.service'
import { ResponseResult } from './../../shared/domain/Common.model'

@Component({
    templateUrl: './manageroles.component.html'
})

export class ManageRolesComponent implements OnInit {
    sessionInfo: any = {}
    msgs: Message[] = [];
    roleList: Role[];
    role: any = {};
    roleAdded: any;
    roleUpdated: any;

    constructor(public app: AppComponent, private roleService: RoleService, private messageService: MessageService) {
        this.app.displayLeftMenu(true);
        this.app.activeCategoryDropdown = true;
        this.app.pageProfile = GlobalHelper.getSideMenuTitle(MenuType.UserRoles);
        this.app.LeftMenuItems = GlobalHelper.getMenuItems(MenuType.UserRoles);
        this.sessionInfo = this.app.getSession();
    }

    ngOnInit() {
        this.role = {};
        this.roleAdded = {};
        this.roleUpdated = {};
        this.loadRole();
    }


    loadRole() {
        this.roleService.get().subscribe((result: any) => this.roleList = result,
            (error: any) => { },
            () => {
                //console.log(this.roleList);
            });
    }

    addRole() {
        if (this.roleAdded != undefined && this.roleAdded != null) {
            let responseResult: ResponseResult;

            this.roleService.insert(this.roleAdded).subscribe((result: any) => responseResult = result,
                (error: any) => {
                    this.msgs.push({ severity: 'error', detail: error.error.message });
                },
                () => {
                    this.loadRole();
                    this.msgs.push({ severity: 'success', detail: "Role added successfully." });
                    this.roleAdded.name = null;
                });
        }
        else {
            this.msgs.push({ severity: 'error', detail: "Please input data to add." });
        }
    }

    deleteRole(roleId) {
        let responseResult: ResponseResult;
        this.roleService.delete(roleId).subscribe((result: any) => responseResult = result.data,
            (error: any) => {
                this.msgs.push({ severity: 'error', detail: error.error.message });
            },
            () => {
                this.loadRole();
                this.msgs.push({ severity: 'success', detail: "Role deleted successfully." });
            });
    }

    updateRole(name, id) {
        this.roleUpdated.name = name;
        this.roleUpdated.id = id;

        let responseResult: ResponseResult;
        this.roleService.update(this.roleUpdated).subscribe((result: any) => responseResult = result,
            (error: any) => {
                this.msgs.push({ severity: 'error', detail: error.error.message });
            },
            () => {
                this.loadRole();
                this.msgs.push({ severity: 'success', detail: "Role updated successfully." });
            });
    }
}