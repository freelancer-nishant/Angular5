import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';


import { AppComponent } from './../app.component';
import { LoginService } from './../shared/services/loginservice';
import { Login, LoginResult } from './../shared/domain/login';
import { GlobalConstants } from './../shared/app.globals';


@Component({
    template: `<div>{{msgError}}</div>`,
})

export class EmbeddedLoginComponent implements OnInit {
    loginResult: LoginResult;
    msgError: string;

    constructor(public app: AppComponent,
        private route: ActivatedRoute,
        private loginService: LoginService) {
        this.app.issinglepage = true;
        this.msgError = "";

    }

    autoLogin(login: Login) {
        this.loginService.getTocket<LoginResult>(login)
            .subscribe((data: any) => this.loginResult = data,
            //error => () => { this.msgError = "Invalid credentials"; this.loginProcessing = false; },
            (error: any) => {
            this.msgError = "Invalid credentials";
                console.log(error);
            },
            () => {
                //console.log(this.loginResult);
                if (this.loginResult.access_token != undefined) {
                    this.app.doLogin(this.loginResult,true);
                    if (this.app.isLoggedIn) {
                        this.app.isClientPage = true;
                        sessionStorage.setItem("isClientPage", "true");

                        sessionStorage.setItem(window.btoa("usr"), window.btoa(login.username));
                        sessionStorage.setItem(window.btoa("pwd"), window.btoa(login.password));
                    }
                } else { this.msgError = "Invalid credentials"; }
            });
    }

    ngOnInit() {
        localStorage.removeItem('token');
        localStorage.removeItem('isClientPage');
        this.app.access_token = "";
        this.app.isLoggedIn = false;
        this.app.issinglepage = true;
        this.msgError = "";

        this.route.params.subscribe(params => this.autoLogin({ username: params['user'], password: params['pwd'], grant_type: 'password' }));
    }
}
