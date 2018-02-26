import { Component, Input, OnChanges, SimpleChanges, Attribute } from '@angular/core';
import { VJSConfig } from './demo/service/vjsconfig.service';

declare var visualize: any;

@Component({
    selector: 'vjs-component',
    template: '<div id="{{resourceId}}"></div>',
})

export class VJSComponent implements OnChanges {

    loadAPI: Promise<any>;

    @Input() params: {};
    resourceIndex: number;

    constructor( @Attribute('id') id: string, public vjsConfig: VJSConfig) {

        this.loadAPI = new Promise((resolve) => {
            this.loadScript();
            resolve(true);
        });

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
        var waitingForVjsLoad = setInterval(function () {            
            if (typeof (visualize) != 'undefined') {
                clearInterval(waitingForVjsLoad);

                visualize({
                    auth: vjsConfig.userAuth
                },
                function (v) {
                    switch (vjsConfig.resourceDetails[resourceIndex].type) {
                        case "report": {
                            v("#" + vjsConfig.resourceDetails[resourceIndex].id).report({
                                resource: vjsConfig.resourceDetails[resourceIndex].uri,
                                //scale:'width',
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
            }            
        },100);
        
    };

    private getObjectIndex(object: any, id: any): number {
        return object.map(function (x) { return x.id; }).indexOf(id);
    };

    public loadScript() {
        var isFound = false;
        var scripts = document.getElementsByTagName("script")
        for (var i = 0; i < scripts.length; ++i) {
            if (scripts[i].getAttribute('src') != null && scripts[i].getAttribute('src').includes("visualize.js")) {
                isFound = true;
            }
        }

        if (!isFound) {
            var dynamicScripts = ["http://62.151.179.246:8080/jasperserver-pro/client/visualize.js?_opt=false&logLevel=debug"];

            for (var i = 0; i < dynamicScripts.length; i++) {
                let node = document.createElement('script');
                node.src = dynamicScripts[i];
                node.type = 'text/javascript';
                node.async = false;
                node.charset = 'utf-8';
                document.getElementsByTagName('head')[0].appendChild(node);
            }

        }
    }
}