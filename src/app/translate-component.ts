import { Component } from '@angular/core';
import { GlobalHelper } from './shared/app.globals'

declare var google: any;
declare var jquery: any;
declare var $: any;

@Component({
    selector: 'translate-component',
    template: `
            <div id="google_translate_element1"></div>   
            <div id="google_translate_element"></div>
            <button id="loadTranslatElement" onclick="googleTranslateElementInit()" style="display:none;"></button>
            `,
})

export class TranslateComponent {

    loadAPI: Promise<any>;

    constructor() {
        this.loadAPI = new Promise((resolve) => {
            GlobalHelper.loadScript("element.js","http://translate.google.com/translate_a/element.js");
            resolve(true);
        });

        var waitingForgoogleLoad = setInterval(function () {
            if (typeof (google) != 'undefined' && typeof (google.translate.TranslateElement) != 'undefined' && typeof (google.translate.TranslateElement.InlineLayout) != 'undefined') {
                clearInterval(waitingForgoogleLoad);

                new google.translate.TranslateElement({ pageLanguage: 'en', layout: google.translate.TranslateElement.InlineLayout.SIMPLE, multilanguagePage: true }, 'google_translate_element');
                $("#google_translate_element1").html(google.translate.TranslateElement().ia)

                if (document.getElementsByClassName("goog-te-menu-value")[0] !== undefined && document.getElementsByClassName("goog-te-menu-value")[0].innerHTML.indexOf('<i class="topbar-icon material-icons">language</i>') <= 0) {
                    document.getElementsByClassName("goog-te-menu-value")[0].innerHTML = document.getElementsByClassName("goog-te-menu-value")[0].innerHTML + '<i class="topbar-icon material-icons">language</i>';
                }
            }
        }, 100);
    }    
}
