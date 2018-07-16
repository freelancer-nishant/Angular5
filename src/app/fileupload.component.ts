import { Component, Output, EventEmitter, Input } from '@angular/core';
import { GlobalHelper } from './../app/shared/app.globals';

declare var jquery: any;
declare var $: any;

@Component({
    selector: 'fileUpload',
    template: `
                <div class="ui-g form-group">
                <div class="ui-g-12 ui-sm-12 ui-md-6"><input id="input" type="text" pInputText [(ngModel)]="FileName" name="icon" tabindex="1" required disabled/></div>
                <div class="ui-g-12 ui-sm-12 ui-md-6"><p-fileUpload mode="basic" customUpload="true" (uploadHandler)="fnUploadFile($event)" auto="auto" multiple="multiple" chooseLabel="Choose File"></p-fileUpload></div>
                </div>
            `,
})
export class FileUploadComponent {
    @Input() fileData;
    @Output() change: EventEmitter<string> = new EventEmitter<string>();
    FileName: string = "";
    fnUploadFile(event) {
        for (let file of event.files) {
            var myReader: FileReader = new FileReader();
            myReader.onloadend = (e) => {
                this.change.emit(myReader.result.substr(myReader.result.indexOf(',') + 1, myReader.result.length));
            }
            this.FileName = file.name;
            myReader.readAsDataURL(file);
        }
    }
}