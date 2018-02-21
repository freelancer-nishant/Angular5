import {Component, OnInit} from '@angular/core';
import { AppComponent } from '../../app.component';

@Component({
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

    constructor(public app: AppComponent) {
        app.displayLeftMenu(false);
    }

    ngOnInit() {
    }
}
