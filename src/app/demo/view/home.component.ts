import {Component, OnInit} from '@angular/core';
import { AppComponent } from '../../app.component';

@Component({
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

    constructor(public app: AppComponent) {
        app.displayLeftMenu(false);
    }

    ngOnInit() {
        
    }
}
