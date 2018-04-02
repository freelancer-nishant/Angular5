import {Component, OnInit} from '@angular/core';
import { AppComponent } from './../app.component';

@Component({
    templateUrl: './dashboard.component.html'
})
export class DashboardComponent implements OnInit {

    constructor(public app: AppComponent) {
        this.app.displayLeftMenu(false);
    }

    ngOnInit() {
    }
}
