import { Component, OnInit } from '@angular/core';
import { AppComponent } from './../app.component';
import { TaxonomyService } from './../shared/services/taxonomy.service';

@Component({
    templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit {

    sessionInfo: any = {}
    taxonomytypes: any[] = [];
    constructor(public app: AppComponent, public taxonomyService: TaxonomyService) {
        this.app.displayLeftMenu(false);
    }

    ngOnInit() {
        try {
            this.sessionInfo = this.app.getSession();
            let taxonomytypes: any[] = [];
            this.taxonomyService.getType(2).subscribe((result: any) => taxonomytypes = result.data,
                (error: any) => { },
                () => {
                    this.taxonomytypes = [];
                    taxonomytypes.map(o => {
                        this.taxonomytypes.push({
                            id: o.id,
                            name: o.name,
                            icon: "//"+o.icon,
                            label: o.label
                        });
                    });
                });
        }
        catch (e) {
        }
    }
}
