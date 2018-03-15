import { Component } from '@angular/core';
import { VJSConfig } from './demo/service/vjsconfig.service';
import { MenuItem } from 'primeng/primeng';

@Component({
    selector: 'export-component',
    template: `
                <span id="export-report" class="ui-panel-titlebar-icon">
                    <p-menu #menu popup="popup" [model]="exportFormats" id="btnExport"></p-menu>
                    <button type="button" pButton icon="fa fa-download" (click)="menu.toggle($event)" disabled id="btnDownload"></button>
                </span>
            `,
})
export class ExportComponent {
    exportFormats: MenuItem[];
    constructor(private vjs: VJSConfig) {
        this.exportFormats = vjs.exportFormats;
    }

}