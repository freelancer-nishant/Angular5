import {Component} from '@angular/core';
import {AppComponent} from './app.component';

@Component({
    selector: 'app-client-topbar',
    templateUrl: './app.client.topbar.component.html',
    styleUrls: ['./app.client.topbar.component.scss']
})
export class AppClientTopBarComponent {

    constructor(public app: AppComponent) {}

}
