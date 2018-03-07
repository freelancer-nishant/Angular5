import { Component, OnInit } from '@angular/core';
import { AppComponent } from '../../app.component';

@Component({
    templateUrl: './reports.component.html'
})
export class ReportsComponent implements OnInit {

    constructor(public app: AppComponent) {
        app.displayLeftMenu(false);
    }

    ngOnInit() {
    }
}
