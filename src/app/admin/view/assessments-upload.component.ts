import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { AppComponent } from '../../app.component';
import { GlobalHelper, MenuType } from './../../shared/app.globals';


@Component({
    templateUrl: './assessments-upload.component.temp.html',
})
export class AssessmentUploadsComponent implements OnInit {

    constructor(public app: AppComponent) {
        this.app.displayLeftMenu(true);
        this.app.activeCategoryDropdown = true;
        this.app.pageProfile = GlobalHelper.getSideMenuTitle(MenuType.AssessmentUploads);
        this.app.LeftMenuItems = GlobalHelper.getMenuItems(MenuType.AssessmentUploads);
    }
    ngOnInit() {
    }
}
