import { Component, OnInit } from '@angular/core';
import { AppComponent } from '../../app.component';
import { GlobalHelper, MenuType } from './../../shared/app.globals';
@Component({
    templateUrl: './admin-assessmentsubjectsubstrands.component.html'
})
export class AdminAssessmentSubjectSubStrandsComponent  implements OnInit {
    constructor(public app: AppComponent) {
        this.app.displayLeftMenu(true);
        this.app.activeCategoryDropdown = true;
        this.app.pageProfile = GlobalHelper.getSideMenuTitle(MenuType.Assessments);
        this.app.LeftMenuItems = GlobalHelper.getMenuItems(MenuType.Assessments);

    }

    ngOnInit() {
    }
}
