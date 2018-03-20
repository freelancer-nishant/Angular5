import { Component, Input, OnChanges, SimpleChanges, Attribute } from '@angular/core';
import { VJSConfig } from './demo/service/vjsconfig.service';

declare var visualize: any;
declare var jquery: any;
declare var $: any;

@Component({
    selector: 'vjs-component',
    template: `
            <div id="{{resourceId}}" class="vjs-container"></div>
            <div style="display: none;" id="exportContainer"></div>          
            `,
})

export class VJSComponent implements OnChanges {

    loadAPI: Promise<any>;

    @Input() params: {};

    resourceIndex: number;
    selectedFormat: any;

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

                if (vjsConfig.resourceDetails[resourceIndex].paging) {
                    $('#pagination-control').css('display', '');
                }
                else {
                    $('#pagination-control').css('display', 'none');
                }

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
                                var currentPage = 1,
                                    totalPages,
                                    zoom = 0,
                                    plus = document.getElementById("btnZoomIn"),
                                    minus = document.getElementById("btnZoomOut"),
                                    report = v.report({
                                        resource: vjsConfig.resourceDetails[resourceIndex].uri,
                                        scale: 'width',
                                        container: "#" + vjsConfig.resourceDetails[resourceIndex].id + ' > .vjs-container',
                                        params: JSON.parse(params),
                                        success: function () { console.log("success") },
                                        error: function (err) {
                                            document.getElementById('report-spinner').remove(); alert("Report draw failed: " + err)
                                        },
                                        events: {
                                            reportCompleted: function (status) {
                                                if (document.getElementById('btnZoomIn') != undefined)
                                                    document.getElementById('btnZoomIn').removeAttribute("disabled");

                                                if (document.getElementById('btnZoomOut') != undefined)
                                                    document.getElementById('btnZoomOut').removeAttribute("disabled");

                                                if (document.getElementById('btnDownload') != undefined)
                                                    document.getElementById('btnDownload').removeAttribute("disabled");
                                                if (status == 'ready') {
                                                    if (document.getElementById('report-spinner'))
                                                        document.getElementById('report-spinner').remove();

                                                    var reportHeight = $(".vjs-container .jrPage")[0].getBoundingClientRect().height;
                                                    $('#' + vjsConfig.resourceDetails[resourceIndex].id).parent().height(reportHeight);

                                                    //Check current zoom level
                                                    var obj = $(".jrPage");
                                                    var transformMatrix = obj.css("-webkit-transform") ||
                                                        obj.css("-moz-transform") ||
                                                        obj.css("-ms-transform") ||
                                                        obj.css("-o-transform") ||
                                                        obj.css("transform");
                                                    var matrix = transformMatrix.replace(/[^0-9\-.,]/g, '').split(',');
                                                    zoom = parseFloat(matrix[0])  // scaleX;
                                                }
                                            },
                                            changePagesState: function (page) {
                                                currentPage = page;
                                                $("#btnPrevious").prop("disabled", currentPage === 1);
                                                $("#btnNext").prop("disabled", currentPage === totalPages);
                                            },
                                            changeTotalPages: function (pages) {
                                                totalPages = pages;
                                                $("#btnPrevious").prop("disabled", currentPage === 1);
                                                $("#btnNext").prop("disabled", currentPage === totalPages);
                                            }
                                        }
                                    });

                                plus.onclick = function () {
                                    report
                                        .scale(zoom += 0.1)
                                        .render();
                                }

                                minus.onclick = function () {
                                    report
                                        .scale((zoom -= 0.1) > 0 ? zoom : zoom = 0.1)
                                        .render();
                                }

                                var exportTo = v.report({
                                    resource: vjsConfig.resourceDetails[resourceIndex].uri,
                                    container: "#exportContainer",
                                    runImmediately: false,
                                    /* this is added because we do not want to add run this. */
                                    success: function () { console.log("success"); },
                                    error: function (err) { alert("Report draw failed: " + err); }
                                });

                                $("#btnExport li").click(function () {
                                    if ($(this).find("span").text() == 'pdfxlsxxlsdocx')
                                        return;
                                    var format = ($(this).find("span").text() == undefined ? 'pdf' : $(this).find("span").text());
                                    // add Stop_Transition function.     
                                    var convertJSON = JSON.parse(params);

                                    convertJSON.Stop_Transition = ["Yes"];

                                    exportTo.params(convertJSON)

                                        .run()
                                        .done(function (link) {
                                            exportTo.export({
                                                outputFormat: format,
                                            }, function (link) {
                                                var url = link.href ? link.href : link;
                                                window.location.href = url;
                                            }, function (error) {
                                                console.log(error)
                                            })
                                        });
                                });

                                $("#btnPrevious").click(function () {
                                    var currentPage = report.pages() || 1;
                                    report
                                        .pages(--currentPage)
                                        .run()
                                        .done(function () {
                                            $("#btnPrevious").prop("disabled", currentPage === 1);
                                            $("#btnNext").prop("disabled", currentPage === totalPages);

                                            var reportHeight = $(".vjs-container .jrPage")[0].getBoundingClientRect().height;
                                            $('#' + vjsConfig.resourceDetails[resourceIndex].id).parent().height(reportHeight);
                                        })
                                        .fail(function (err) { });
                                });

                                $("#btnNext").click(function () {
                                    var currentPage = report.pages() || 1;

                                    report
                                        .pages(++currentPage)
                                        .run()
                                        .done(function () {
                                            $("#btnPrevious").prop("disabled", currentPage === 1);
                                            $("#btnNext").prop("disabled", currentPage === totalPages);

                                            var reportHeight = $(".vjs-container .jrPage")[0].getBoundingClientRect().height;
                                            $('#' + vjsConfig.resourceDetails[resourceIndex].id).parent().height(reportHeight);
                                        })
                                        .fail(function (err) { });
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