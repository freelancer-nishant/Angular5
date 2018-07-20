import { Component, OnInit } from '@angular/core';
import { AppComponent } from '../../app.component';

@Component({
    templateUrl: './admin.component.html'
})
export class AdminComponent implements OnInit {

    constructor(public app: AppComponent) {
        this.app.displayLeftMenu(false);
    }

    ngOnInit() {
    }
}
