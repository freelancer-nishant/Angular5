import { Component, OnInit } from '@angular/core';
import { AppComponent } from '../../app.component';
import { GlobalHelper, MenuType } from './../../shared/app.globals';

@Component({
    templateUrl: './assessments-upload.component.html'
})
export class AssessmentUploadsComponent implements OnInit {

    constructor(public app: AppComponent) {
        app.displayLeftMenu(true);
        app.activeCategoryDropdown = true;        
        app.pageProfile = GlobalHelper.getSideMenuTitle(MenuType.AssessmentUploads);
        app.LeftMenuItems = GlobalHelper.getMenuItems(MenuType.AssessmentUploads);

    }

    ngOnInit() {
    }
}
