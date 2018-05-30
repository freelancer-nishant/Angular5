import { Component, Input, OnChanges, SimpleChanges, Attribute } from '@angular/core';
import { SpinnerVisibilityService } from 'ng-http-loader/services/spinner-visibility.service';
import { VJSConfig } from './../app/shared/services/vjsconfig.service';
import { GlobalHelper } from './../app/shared/app.globals'

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

    @Input() params: {};
    @Input() reportUrl: {};
    @Input() reportType: {};
    @Input() isPaging: {};

    resourceIndex: string;
    selectedFormat: any;

    constructor( @Attribute('id') id: string, public vjsConfig: VJSConfig, private spinner: SpinnerVisibilityService) {

        GlobalHelper.loadScript("visualize.js", "http://62.151.179.246:8080/jasperserver-pro/client/visualize.js?_opt=true");

        this.resourceIndex = id;
        //var resourceId: string = vjsConfig.resourceDetails[resourceIndex].id;
        this.drawResource(vjsConfig, spinner, this.resourceIndex, this.params, this.isPaging, this.reportUrl, this.reportType);
    };



    ngOnChanges(changes: SimpleChanges) {
        var p: {};
        if (changes.params) {
            p = changes.params.currentValue;
        }
        this.drawResource(this.vjsConfig, this.spinner, this.resourceIndex, p, this.isPaging, this.reportUrl, this.reportType);
    }

    public drawResource(vjsConfig, spinner, resourceIndex, params, isPaging, reportUrl, reportType) {
        if (reportType == undefined)
            reportType = "report";

        var waitingForVjsLoad = setInterval(function () {
            if (typeof (visualize) != 'undefined') {
                clearInterval(waitingForVjsLoad);

                if (isPaging) {
                    $('#pagination-control').css('display', '');
                }
                else {
                    $('#pagination-control').css('display', 'none');
                }

                spinner.show();

                visualize({
                    auth: vjsConfig.userAuth
                },
                    function (v) {
                        switch (reportType) {
                            case "report": {
                                if (params == undefined) {
                                    $("#" + resourceIndex + ' > .vjs-container').html('');
                                    spinner.hide();
                                    break;
                                }

                                var currentPage = 1,
                                    totalPages,
                                    zoom = 0,
                                    plus = document.getElementById("btnZoomIn"),
                                    minus = document.getElementById("btnZoomOut"),
                                    report = v.report({
                                        resource: reportUrl,
                                        scale: 'width',
                                        container: "#" + resourceIndex + ' > .vjs-container',
                                        params: JSON.parse(params),
                                        success: function () { console.log("success") },
                                        error: function (err) {
                                            spinner.hide(); alert("Report draw failed: " + err)
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

                                                    spinner.hide();

                                                    var reportHeight = $(".vjs-container .jrPage")[0].getBoundingClientRect().height;
                                                    $('#' + resourceIndex).parent().height(reportHeight);

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
                                        .render()
                                        .done(function () {
                                            var reportHeight = $(".vjs-container .jrPage")[0].getBoundingClientRect().height;
                                            $('#' + resourceIndex).parent().height(reportHeight);
                                        });
                                }

                                minus.onclick = function () {
                                    report
                                        .scale((zoom -= 0.1) > 0 ? zoom : zoom = 0.1)
                                        .render()
                                        .done(function () {
                                            var reportHeight = $(".vjs-container .jrPage")[0].getBoundingClientRect().height;
                                            $('#' + resourceIndex).parent().height(reportHeight);
                                        });
                                }

                                var exportTo = v.report({
                                    resource: reportUrl,
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

                                    // loader
                                    spinner.show();

                                    exportTo.params(convertJSON)

                                        .run()
                                        .done(function (link) {
                                            exportTo.export({
                                                outputFormat: format,
                                            }, function (link) {
                                                spinner.hide();
                                                var url = link.href ? link.href : link;
                                                window.location.href = url;
                                            }, function (error) {
                                                spinner.hide();
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
                                            $('#' + resourceIndex).parent().height(reportHeight);
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
                                            $('#' + resourceIndex).parent().height(reportHeight);
                                        })
                                        .fail(function (err) { });
                                });



                                break;
                            }

                            case "dashboard": {
                                v("#" + resourceIndex + ' > .vjs-container').dashboard({
                                    resource: reportUrl,
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
                        spinner.hide();
                        alert("Visualize.js could not authenticate user/password.");
                    });
            }
        }, 100);


    };

    private getObjectIndex(object: any, id: any): number {
        return object.map(function (x) { return x.id; }).indexOf(id);
    };
}