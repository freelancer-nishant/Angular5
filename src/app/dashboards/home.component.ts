import {Component, OnInit} from '@angular/core';
import { AppComponent } from './../app.component';

@Component({
    templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit {

    constructor(public app: AppComponent) {
        this.app.displayLeftMenu(false);
    }

    ngOnInit() {
        
    }
}
