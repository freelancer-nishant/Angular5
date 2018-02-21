import {Component } from '@angular/core';
import { AppComponent } from './app.component';

@Component({
    selector: 'app-inline-page-profile',
    template: `
        <div class="page-profile">
            <a href="#/student-information">
                <div class="page-profile-image"><img src="{{ app.pageProfile.icon}}" /></div>
                <div class="page-profile-name">{{ app.pageProfile.name}}</div>
                <div class="clear"></div>
            </a>          
        </div>        
    `    
})
export class AppPageProfileComponent {

    active: boolean;
    constructor(public app: AppComponent) { }    
}
