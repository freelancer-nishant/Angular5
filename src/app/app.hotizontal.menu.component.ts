import { Component, OnInit } from '@angular/core';
import { AppComponent } from './app.component';
import { TaxonomyService } from './shared/services/taxonomy.service';
import { TaxonomyType } from './shared/domain/taxonomy';


@Component({
    selector: 'app-top-horizontal-menu',
    templateUrl: './app.hotizontal.menu.component.html'
})
export class AppHotizontalMenuComponent implements OnInit {


    constructor(public app: AppComponent, public taxonomyService: TaxonomyService) { }

    sessionInfo: any = {}
    taxonomytypes: TaxonomyType[] = [];

    ngOnInit() {
        try {
            this.sessionInfo = this.app.getSession();

            let taxonomytypes: TaxonomyType[] = [];
            this.taxonomyService.getType(2).subscribe((result: any) => taxonomytypes = result.data,
                (error: any) => { },
                () => {
                    this.taxonomytypes = [];
                    taxonomytypes.map(o => {
                        this.taxonomytypes.push({
                            id: o.id,
                            name: o.name,
                            icon: o.icon,
                            label: o.label
                        });
                    });
                });
        }
        catch (e) {}
    }
}
