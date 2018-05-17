import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AppComponent } from './../app.component';
import { TaxonomyService } from './../shared/services/taxonomy.service';
import { TaxonomyType } from './../shared/domain/taxonomy';

@Component({
    templateUrl: './dashboard.component.html'
})
export class DashboardComponent implements OnInit {

    sessionInfo: any = {}
    taxonomycategory: TaxonomyType[] = [];
    typeName: string = ''
    constructor(public app: AppComponent, private route: ActivatedRoute, public taxonomyService: TaxonomyService) {
        this.app.displayLeftMenu(false);
    }

    ngOnInit() {
        try {
            this.route.params.subscribe(params => {
                this.typeName = params['name'];
                this.getCategory(params['id']);
            });
        }
        catch (e) { }
    }
    getCategory(typeId) {
        try {
            this.sessionInfo = this.app.getSession();
            let taxonomycategory: TaxonomyType[] = [];
            this.taxonomyService.getCategory(typeId, this.sessionInfo.role, this.sessionInfo.client_id).subscribe((result: any) => taxonomycategory = result.data,
                (error: any) => { },
                () => {
                    this.taxonomycategory = [];
                    taxonomycategory.map(o => {
                        this.taxonomycategory.push({
                            id: o.id,
                            name: o.name,
                            icon: o.icon,
                            label: o.label,
                            mini_icon: o.mini_icon,
                            small_icon: o.small_icon
                        });
                    });
                });
        }
        catch (e) {
            console.log(e)
        }
    }
}
