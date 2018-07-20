import { Component, OnInit } from '@angular/core';
import { AppComponent } from '../../app.component';
import { GlobalHelper, MenuType } from './../../shared/app.globals';
import * as moment from 'moment';
import { SelectItem } from 'primeng/primeng';
import { Message } from 'primeng/components/common/api';
import { MessageService } from 'primeng/components/common/messageservice';

import { Client } from './../../shared/domain/client'
import { ClientService } from './../../shared/services/client.service'
import { Role } from './../../shared/domain/role'
import { RoleService } from './../../shared/services/role.service'

import { User, UserModel, UserRequest } from './../../shared/domain/user'
import { UserService } from './../../shared/services/users.service'
import { CommonService } from './../../shared/services/Common.service'
import { ResponseResult } from './../../shared/domain/Common.model'

@Component({
    templateUrl: './manageusers.component.html'
})

export class ManageUsersComponent implements OnInit {
    sessionInfo: any = {}
    msgs: Message[] = [];
    clientList: any = [];
    client: any = {};
    userList: User[];
    user: any = {};
    roleList: any = {};
    clientListIndividual: any = [];

    newUser: UserModel;
    addUser: any;
    updateUser: any;

    dialogVisible: boolean = false;
    dialogVisible1: boolean = false;

    constructor(public app: AppComponent, private clientService: ClientService, private roleService: RoleService, private userService: UserService, private messageService: MessageService) {
        this.app.displayLeftMenu(true);
        this.app.activeCategoryDropdown = true;
        this.app.pageProfile = GlobalHelper.getSideMenuTitle(MenuType.Users);
        this.app.LeftMenuItems = GlobalHelper.getMenuItems(MenuType.Users);
        this.sessionInfo = this.app.getSession();
        this.newUser = new UserModel();
        this.dialogVisible = false;
        this.dialogVisible1 = false;
    }

    ngOnInit() {
        this.client = {};
        this.addUser = {};
        this.updateUser = {};
        this.loadClient();
        this.loadRole();
    }

    loadClient() {
        let clientResult: Client[] = [];
        
        this.clientService.get().subscribe((result: any) => clientResult = result.data,
            (error: any) => { },
            () => {
                this.clientList = [];
                this.clientListIndividual = [];
                this.clientList.push({ label: "All", value: "-1" });

                clientResult.map(o => { this.clientList.push({ label: o.name, value: o.id }); });
                clientResult.map(o => { this.clientListIndividual.push({ label: o.name, value: o.id }); });
            });
    }

    loadRole() {
        let roleList: Role[] = [];
        this.roleService.get().subscribe((result: any) => roleList = result,
            (error: any) => { },
            () => {
                this.roleList = [];
                roleList.map(o => { this.roleList.push({ label: o.name, value: o.name }); });
            });
    }

    loadUsers() {
        let userList: User[] = [];
        this.userService.get(this.newUser.client_id).subscribe((result: any) => userList = result,
            (error: any) => { },
            () => {
                this.userList = [];
                userList.map(o => {

                    if (o.client_id != null) {
                        var client_name = this.clientList.find(x => x.value === o.client_id).label;
                        this.userList.push({
                            user_id: o.user_id,
                            client_id: o.client_id,
                            client_name: client_name,
                            email: o.email,
                            role: o.role
                        });
                    }
                    
                });
            });
    }

    AddNewUser() {
        this.addUser = {};
        this.dialogVisible = true;
    }

    SubmitNewUser() {
        if (this.addUser.password != this.addUser.confirmPassword) {
            alert("Password does not match with confirm Password");
            return;
        }

        let responseResult: ResponseResult;

        this.userService.insert(this.addUser).subscribe((result: any) => responseResult = result,
            (error: any) => {
                this.msgs.push({ severity: 'error', detail: error.error.message });
            },
            () => {
                this.addUser = {};
                this.dialogVisible = false;
                this.loadUsers();
                this.msgs.push({ severity: 'success', detail: "User added successfully." });
            });
    }

    UpdateUser(user_id, client_id, email, role) {
        this.updateUser.user_id = user_id;
        this.updateUser.client_id = client_id;
        this.updateUser.email = email;
        this.updateUser.role = role;

        this.dialogVisible1 = true;
    }

    SubmitUpdate() {
        if (this.updateUser.password != this.updateUser.confirmPassword &&
            this.updateUser.password != "" &&
            this.updateUser.confirmPassword != "" &&
            this.updateUser.password != null &&
            this.updateUser.confirmPassword != null) {

                alert("Password does not match with confirm Password");
                return;
        }

        let responseResult: ResponseResult;

        //this.userService.update(this.addUser).subscribe((result: any) => responseResult = result,
        //    (error: any) => {
        //        this.msgs.push({ severity: 'error', detail: error.error.message });
        //    },
        //    () => {
        //        this.addUser = {};
        //        this.dialogVisible = false;
        //        this.loadUsers();
        //        this.msgs.push({ severity: 'success', detail: "User added successfully." });
        //    });
    }

    DeleteUser(id) {
        let responseResult: ResponseResult;
        this.userService.delete(id).subscribe((result: any) => responseResult = result.data,
            (error: any) => {
                this.msgs.push({ severity: 'error', detail: error.error.message });
            },
            () => {
                this.loadUsers();
                this.msgs.push({ severity: 'success', detail: "User deleted successfully." });
            });
    }
}