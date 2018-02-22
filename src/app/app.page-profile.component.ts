import { Component, EventEmitter, ViewChild, trigger, state, transition, style, animate } from '@angular/core';
import { AppComponent } from './app.component';
import { MenuItem } from 'primeng/primeng';

@Component({
    selector: 'app-inline-page-profile',
    template: `
        <div class="page-profile">
            <a href="#">
                <div class="page-profile-image"><img src="{{ app.pageProfile.icon}}" /></div>
                <div class="page-profile-name">
                    <span>{{ app.pageProfile.name}}</span>                                        
                </div>
                <div class="clear"></div>
            </a>          
             <a href="#" (click)="onClick($event)">
                 <div class="page-profile-role">Change Catrgory <i class="fa fa-fw fa-caret-down"></i></div>
             </a>               
        </div> 

        <ul id="profile-menu" class="layout-menu" [@menu]="active ? 'visible' : 'hidden'">

            <li role="menuitem" *ngFor="let category of app.categories">                  
                <a href="{{ category.route }}" [attr.tabindex]="!active ? '-1' : null">                    
                    <span>{{ category.name }}</span>
                </a>
                <div class="layout-menu-tooltip">
                    <div class="layout-menu-tooltip-arrow"></div>
                    <div class="layout-menu-tooltip-text">{{ category.name }}</div>
                </div>
            </li>
        </ul>
    `, animations: [
        trigger('menu', [
            state('hidden', style({
                height: '0px'
            })),
            state('visible', style({
                height: '*'
            })),
            transition('visible => hidden', animate('400ms cubic-bezier(0.86, 0, 0.07, 1)')),
            transition('hidden => visible', animate('400ms cubic-bezier(0.86, 0, 0.07, 1)'))
        ])
    ]
})
export class AppPageProfileComponent {

    active: boolean;
    constructor(public app: AppComponent) { }

    onClick(event) {
        this.active = !this.active;
        event.preventDefault();
    }
}
