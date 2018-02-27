import { Component, OnInit} from '@angular/core';
import {AppComponent} from './app.component';

@Component({
    selector: 'app-top-horizontal-menu',
    templateUrl: './app.hotizontal.menu.component.html'
})
export class AppHotizontalMenuComponent implements OnInit {

    
    constructor(public app: AppComponent) { }

    selectedItem: any = {};

    ngOnInit() {
        this.app.categories = [
            { name: 'Student Information', route: "#/student-information" },
            { name: 'Assesments', route: "#/assessments" }
        ]
    }

    onItemClick(val) {        
        this.selectedItem = val;
    }
}
