import { Component, OnInit } from '@angular/core';
import { AppComponent } from '../../app.component';
import { GlobalHelper, MenuType } from './../../shared/app.globals';

@Component({
    templateUrl: './voice.schoolsurvey.report.component.html'
})
export class VoiceOfTheSchoolSurveyReportComponent implements OnInit {

    constructor(public app: AppComponent) {
        app.displayLeftMenu(true);
        app.activeCategoryDropdown = true;
        app.pageProfile = GlobalHelper.getSideMenuTitle(MenuType.VoiceOfTheSchoolSurveys);
        app.LeftMenuItems = GlobalHelper.getMenuItems(MenuType.VoiceOfTheSchoolSurveys);

    }

    ngOnInit() {
    }
}
