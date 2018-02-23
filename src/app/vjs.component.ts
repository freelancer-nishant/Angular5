import { Component, Input, OnChanges, SimpleChanges, Attribute } from '@angular/core';
import { VJSConfig } from './demo/service/vjsconfig.service';

declare var visualize: any;

@Component({
    selector: 'vjs-component',
    template: '<div id="{{resourceId}}"></div>',
})

export class VJSComponent implements OnChanges {

    @Input() params: {};
    resourceIndex: number;
    constructor( @Attribute('id') id: string, public vjsConfig: VJSConfig) {

        this.resourceIndex = this.getObjectIndex(vjsConfig.resourceDetails, id);
        //var resourceId: string = vjsConfig.resourceDetails[resourceIndex].id;

       this.drawResource(vjsConfig, this.resourceIndex, this.params);

    };

    ngOnChanges(changes: SimpleChanges) {
        var p: {};
        if (changes.params) {
            p = changes.params.currentValue;
        }
        this.drawResource(this.vjsConfig, this.resourceIndex, p);
    }

    public drawResource(vjsConfig, resourceIndex, params) {

        visualize({
            auth: vjsConfig.userAuth
        }, function (v) {

            switch (vjsConfig.resourceDetails[resourceIndex].type) {

                case "report": {
                    v("#" + vjsConfig.resourceDetails[resourceIndex].id).report({
                        resource: vjsConfig.resourceDetails[resourceIndex].uri,
                        params: JSON.parse(params),
                        success: function () { console.log("success") },
                        error: function (err) { alert("Report draw failed: " + err) }
                    });
                    break;
                }

                case "dashboard": {
                    v("#" + vjsConfig.resourceDetails[resourceIndex].id).dashboard({
                        resource: vjsConfig.resourceDetails[resourceIndex].uri,
                        //params: vjsConfig.resourceDetails[resourceIndex].params,
                        success: function () { console.log("success") },
                        error: function (err) { alert("Dashboard draw failed: " + err) }
                    });
                    break;
                }

                default: {
                    alert("Visualize.js resource type not found.");
                }

            };
        },
            function (err) {
                alert("Visualize.js could not authenticate user/password.");
            });
    };

    private getObjectIndex(object: any, id: any): number {
        return object.map(function (x) { return x.id; }).indexOf(id);
    };

}