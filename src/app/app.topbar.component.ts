import {Component} from '@angular/core';
import { AppComponent } from './app.component';
//import { GlobalConstants } from './shared/app.globals';

@Component({
    selector: 'app-topbar',
    template: `
        <div class="topbar clearfix">
            <div class="topbar-left">
                <img src="assets/layout/images/logo.png" class="topbar-logo" />
            </div>

            <div class="topbar-right">
                <a id="menu-button" href="#" (click)="app.onMenuButtonClick($event)"
                   [ngClass]="{'hide': app.leftMenuToggleButtonActive === false, 'menu-button-rotate': app.rotateMenuButton}">
                    <i class="fa fa-angle-left"></i>
               </a>

                <a id="topbar-menu-button" href="#" (click)="app.onTopbarMenuButtonClick($event)">
                    <i class="fa fa-bars"></i>
                </a>

                <ul class="topbar-items fadeInDown" [ngClass]="{'topbar-items-visible': app.topbarMenuActive}">
                    <li #profile class="profile-item" *ngIf="app.profileMode==='top'||app.isHorizontal()"
                        [ngClass]="{'active-top-menu':app.activeTopbarItem === profile}">

                        <a href="#" (click)="app.onTopbarItemClick($event,profile)">
                            <img class="profile-image" src="assets/layout/images/avatar.png" />
                            <span class="topbar-item-name">Isabel Lopez</span>
                            <span class="topbar-item-role">Marketing</span>
                        </a>

                        <ul class="layout-menu fadeInDown">
                            <li role="menuitem">
                                <a href="#">
                                    <i class="fa fa-fw fa-user"></i>
                                    <span>Profile</span>
                                </a>
                            </li>
                            <li role="menuitem">
                                <a href="#">
                                    <i class="fa fa-fw fa-user-secret"></i>
                                    <span>Privacy</span>
                                </a>
                            </li>
                            <li role="menuitem">
                                <a href="#">
                                    <i class="fa fa-fw fa-cog"></i>
                                    <span>Settings</span>
                                </a>
                            </li>
                            <li role="menuitem">
                                <a href="#">
                                    <i class="fa fa-fw fa-sign-out"></i>
                                    <span>Logout</span>
                                </a>
                            </li>
                        </ul>
                    </li>                   
                    <li #userinfo [ngClass]="{'active-top-menu':app.activeTopbarItem === userinfo}">
                        <a href="#" (click)="app.onTopbarItemClick($event,userinfo)">
                            <i class="topbar-icon material-icons">perm_identity</i>
                            <i class="topbar-icon material-icons">keyboard_arrow_down</i>
                            <span class="topbar-item-name">User Info</span>
                        </a>
                        <ul class="layout-menu fadeInDown">
                          <li role="menuitem">
                                <a href="#" (click)="app.doLogout()">
                                    <i class="fa fa-fw fa-sign-out"></i>
                                    <span>Logout</span>
                                </a>
                            </li>                            
                        </ul>
                    </li>
                    <li #help class="hide" [ngClass]="{'active-top-menu':app.activeTopbarItem === help}">
                        <a href="#" (click)="app.onTopbarItemClick($event,help)">                            
                            <i class="topbar-icon material-icons">help_outline</i>
                            <span class="topbar-item-name">Help</span>
                        </a>
                        <ul class="layout-menu fadeInDown">
                           <li role="menuitem">
                                <a href="#">
                                    <i class="fa fa-fw fa-question-circle-o"></i>
                                    <span>help</span>
                                </a>
                            </li>                            
                        </ul>
                    </li>                    
                    <li #admin [ngClass]="{'active-top-menu':app.activeTopbarItem === admin, 'hide':app.hasAccess('ClientUser') !== true}">
                        <a href="#" (click)="app.onTopbarItemClick($event,admin)">                                                        
                            <i class="topbar-icon material-icons">settings</i>                            
                            <span class="topbar-item-name">Admin</span>
                        </a>
                        <ul class="layout-menu fadeInDown">
                           <li role="menuitem">
                                <a href="#">
                                    <!--<i class="fa fa-fw fa-question-circle-o"></i>-->
                                    <span>Admin</span>
                                </a>
                            </li>                            
                        </ul>
                    </li>    
                </ul>
            </div>
        </div>        
    `
})
export class AppTopBarComponent {

    constructor(public app: AppComponent) {}

}
