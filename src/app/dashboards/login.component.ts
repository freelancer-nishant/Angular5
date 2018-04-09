import { Component, OnInit, Input } from '@angular/core';
import { AppComponent } from './../app.component';

import { LoginService } from './../shared/services/loginservice';
import { Login, LoginResult } from './../shared/domain/login';


@Component({
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
    @Input() login: Login = {
        username: '',
        password: '',
        grant_type: 'password'
    };
    loginResult: LoginResult;
    msgError: string;
    loginProcessing: boolean;
    constructor(public app: AppComponent, public loginService: LoginService) {
        this.app.issinglepage = true;
        this.msgError = "";
        this.loginProcessing = false;
    }

    ngOnInit() {
        this.app.doLogout();
    }

    ngOnLogin() {
        this.loginProcessing = true;
        this.msgError = "";
        this.loginService.getTocket<LoginResult>(this.login).subscribe((data: any) => this.loginResult = data,
            (error: any) => { this.msgError = "Invalid credentials"; this.loginProcessing = false; },
            () => {
                if (this.loginResult.access_token != undefined) {
                    this.app.doLogin(this.loginResult,false);
                } else { this.msgError = "Invalid credentials"; }

                this.loginProcessing = false;
            });
    }    
}
