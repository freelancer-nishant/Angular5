import { Component } from '@angular/core';
import { VJSConfig } from './shared/services/vjsconfig.service';
import { MenuItem } from 'primeng/primeng';

@Component({
    selector: 'export-component',
    template: `
                <span id="pagination-control" class="ui-panel-titlebar-icon" style="display:none;">
                    <button id="btnPrevious" pButton type="button" icon="fa-caret-left" iconPos="left" disabled title="Previous Page" class="ui-button-icon-only" title="Previous"></button>                    
                    <button id="btnNext" pButton type="button" icon="fa-caret-right" iconPos="left" disabled title="Next Page" class="ui-button-icon-only" title="Next"></button>
                </span>

                <span id="export-report" class="ui-panel-titlebar-icon">
                    <p-menu #menu popup="popup" [model]="exportFormats" id="btnExport"></p-menu>
                    <button type="button" pButton icon="fa fa-download" (click)="menu.toggle($event)" disabled id="btnDownload" class="ui-button-icon-only" title="Export"></button>
                </span>

                <span id="zoom-control" class="ui-panel-titlebar-icon">
                    <button id="btnZoomIn" pButton type="button" icon="fa fa-search-plus" disabled title="Zoom In" class="ui-button-icon-only" title="Zoom In"></button>                    
                    <button id="btnZoomOut" pButton type="button" icon="fa fa-search-minus" disabled title="Zoom Out" class="ui-button-icon-only" title="Zoom Out"></button>
                </span>               
            `,
})
export class ExportComponent {
    exportFormats: MenuItem[];
    constructor(private vjs: VJSConfig) {
        this.exportFormats = vjs.exportFormats;
    }

}