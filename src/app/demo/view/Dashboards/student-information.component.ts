import { Component, OnInit } from '@angular/core';
import { AppComponent } from '../../../app.component';
import { GlobalHelper, MenuType } from './../../../shared/app.globals';
@Component({
    templateUrl: './student-information.component.html'
})

export class StudentInformationComponent implements OnInit {

    constructor(public app: AppComponent) {
        app.displayLeftMenu(true);
        app.activeCategoryDropdown = true;
        app.pageProfile = GlobalHelper.getSideMenuTitle(MenuType.StudentInformation);
        app.LeftMenuItems = GlobalHelper.getMenuItems(MenuType.StudentInformation);
        
    }

    ngOnInit() {

    }
}
