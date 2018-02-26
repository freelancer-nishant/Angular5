import { Component, OnInit } from '@angular/core';
import { AppComponent } from '../../../app.component';
import { GlobalHelper, MenuType } from './../../../shared/app.globals';
@Component({
    templateUrl: './student-information.component.html',
    styleUrls: ['./student-information.component.css']
})

export class StudentInformationComponent implements OnInit {

    constructor(public app: AppComponent) {
        app.displayLeftMenu(true);
        app.activeCategoryDropdown = true;
        app.LeftMenuItems = GlobalHelper.getMenuItems(MenuType.StudentInformation);

        app.pageProfile = {
            icon: './assets/layout/images/dashboard/student-information.png',
            name:"Student Information"
        }
    }

    ngOnInit() {

    }
}
