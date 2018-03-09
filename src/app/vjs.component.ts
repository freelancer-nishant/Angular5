import { Component, Input, OnChanges, SimpleChanges, Attribute } from '@angular/core';
import { VJSConfig } from './demo/service/vjsconfig.service';
import { SelectItem } from 'primeng/primeng';

declare var visualize: any;
declare var jquery: any;
declare var $: any;

@Component({
    selector: 'vjs-component',
    template: `
            <div id="export-report">
                <div class="ui-g">
                    <div class="ui-g-6">
                        <p-dropdown id="drpExportFormat" [options]="exportFormats" [(ngModel)]="selectedFormat" [autoWidth]="false"></p-dropdown>
                    </div>  
                    <div class="ui-g-2">                        
                        <button id="btnExport" pButton type="button" icon="fa-download"></button>
                    </div>
                    <div class="ui-g-2" [ngClass]="{'hide':!paging}">
                        <button id="btnNext" pButton type="button" icon="fa-caret-left" iconPos="left"></button>
                    </div>
                    <div class="ui-g-2" [ngClass]="{'hide':!paging}">                        
                        <button id="btnPrevious" pButton type="button" icon="fa-caret-right" iconPos="left"></button>
                    </div>
                </div>                      
            </div>
            <div id="{{resourceId}}" class="vjs-container"></div>
            `,
})

export class VJSComponent implements OnChanges {

    loadAPI: Promise<any>;

    @Input() params: {};

    @Input() paging: boolean = false;
    
    resourceIndex: number;
    exportFormats: SelectItem[];
    selectedFormat: any;

    constructor( @Attribute('id') id: string, public vjsConfig: VJSConfig) {

        this.loadAPI = new Promise((resolve) => {
            this.loadScript();
            resolve(true);
        });

        this.exportFormats = [];
        this.exportFormats.push({ label: 'pdf', value: 'pdf' });
        this.exportFormats.push({ label: 'xlsx', value: 'xlsx' });
        this.exportFormats.push({ label: 'xls', value: 'xls' });
        this.exportFormats.push({ label: 'docx', value: 'docx' });
        this.exportFormats.push({ label: 'png', value: 'png' });

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
        
        if (document.getElementById('export-report') != undefined)
            document.getElementById('export-report').style.display = 'none';

        var waitingForVjsLoad = setInterval(function () {
            if (typeof (visualize) != 'undefined') {
                clearInterval(waitingForVjsLoad);

                if (params != undefined) {
                    let spinerDiv: HTMLElement = document.createElement("div");
                    spinerDiv.id = 'report-spinner';
                    spinerDiv.innerHTML = `
                                     <div _ngcontent-c4="" class="sk-cube-grid colored">
                                        <div _ngcontent-c4="" class="sk-cube sk-cube1"></div>
                                        <div _ngcontent-c4="" class="sk-cube sk-cube2"></div>
                                        <div _ngcontent-c4="" class="sk-cube sk-cube3"></div>
                                        <div _ngcontent-c4="" class="sk-cube sk-cube4"></div>
                                        <div _ngcontent-c4="" class="sk-cube sk-cube5"></div>
                                        <div _ngcontent-c4="" class="sk-cube sk-cube6"></div>
                                        <div _ngcontent-c4="" class="sk-cube sk-cube7"></div>
                                        <div _ngcontent-c4="" class="sk-cube sk-cube8"></div>
                                        <div _ngcontent-c4="" class="sk-cube sk-cube9"></div>
                                    </div>`
                    let element = document.getElementById(vjsConfig.resourceDetails[resourceIndex].id);                    
                    element.getElementsByClassName('vjs-container')[0].innerHTML = '';
                    element.getElementsByClassName('vjs-container')[0].appendChild(spinerDiv);
                }

                visualize({
                    auth: vjsConfig.userAuth
                },
                    function (v) {
                        switch (vjsConfig.resourceDetails[resourceIndex].type) {
                            case "report": {
                                var report = v.report({
                                    resource: vjsConfig.resourceDetails[resourceIndex].uri,
                                    scale: 1.25,
                                    container: "#" + vjsConfig.resourceDetails[resourceIndex].id + ' > .vjs-container',
                                    params: JSON.parse(params),
                                    success: function () { console.log("success") },
                                    error: function (err) {
                                        document.getElementById('report-spinner').remove(); alert("Report draw failed: " + err)
                                    },
                                    events: {
                                        reportCompleted: function (status) {
                                            document.getElementById('export-report').style.display = 'block';
                                            if (status == 'ready') {
                                                if (document.getElementById('report-spinner'))
                                                    document.getElementById('report-spinner').remove();
                                            }
                                        }
                                    }
                                });

                                $("#btnExport").click(function () {
                                    report.export({
                                        outputFormat: $("#drpExportFormat").attr("ng-reflect-model"),
                                    }, function (link) {
                                        var url = link.href ? link.href : link;
                                        window.location.href = url;
                                    }, function (error) {
                                        console.log(error)
                                    });
                                });

                                $("#btnPrevious").click(function () {
                                    var currentPage = report.pages() || 1;
                                    report
                                        .pages(--currentPage)
                                        .run()
                                        .fail(function (err) { alert(err); });
                                });

                                $("#btnNext").click(function () {
                                    var currentPage = report.pages() || 1;

                                    report
                                        .pages(++currentPage)
                                        .run()
                                        .fail(function (err) { alert(err); });
                                }); 

                                break;
                            }

                            case "dashboard": {
                                v("#" + vjsConfig.resourceDetails[resourceIndex].id + ' > .vjs-container').dashboard({
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
        }, 100);

    };

    //public exportReport() {
    //    this.report.export({
    //        outputFormat: this.selectedFormat,
    //    }, function (link) {
    //        var url = link.href ? link.href : link;
    //        window.location.href = url;
    //    }, function (error) {
    //        console.log(error)
    //    });
    //}

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