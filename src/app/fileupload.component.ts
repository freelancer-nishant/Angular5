import { Component, Output, EventEmitter, Input } from '@angular/core';
import { GlobalHelper } from './../app/shared/app.globals'

declare var jquery: any;
declare var $: any;

@Component({
    selector: 'fileUpload',
    template: `
            <p-fileUpload mode="basic" customUpload="true" (uploadHandler)="fnUploadFile($event)" auto="auto" multiple="multiple" (onSelect)="fnOnSelect()" (onError)="fnOnError()"></p-fileUpload>
            <label *ngIf="UploadStarted">Upload Started</label><br/>
            <label *ngIf="UploadCompletd">Completd Successfully</label>
            <label *ngIf="UploadError">An Error accure while uploading file.</label>
            `,
})
export class FileUploadComponent {
    @Input() fileData;
    @Output() change: EventEmitter<string> = new EventEmitter<string>();
    UploadStarted: boolean = false;
    UploadCompletd: boolean = false;
    UploadError: boolean = false;

    fnUploadFile(event) {
        this.UploadCompletd = true;

        for (let file of event.files) {
            var myReader: FileReader = new FileReader();

            myReader.onloadend = (e) => {
                this.change.emit(myReader.result.split(',')[1]);
            }
            myReader.readAsDataURL(file);
        }
    }
    fnOnSelect() {
        this.UploadStarted = true;
    }
    fnOnError() {
        this.UploadError = true;
    }
}