import { Component, OnInit } from '@angular/core';
import { AppComponent } from '../../app.component';

@Component({
    templateUrl: './admin.configuration.component.html'
})
export class AdminConfigurationComponent implements OnInit {

    constructor(public app: AppComponent) {
        app.displayLeftMenu(false);
    }

    ngOnInit() {
    }
}
