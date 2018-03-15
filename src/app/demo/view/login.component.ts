import { Component, OnInit, Input } from '@angular/core';
import { AppComponent } from '../../app.component';

import { LoginService } from '../service/loginservice';
import { Login, LoginResult } from '../domain/login';


@Component({
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
    @Input() login: Login = {
        username: 'user@cf.com',
        password: 'user@123',
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
            //error => () => { this.msgError = "Invalid credentials"; this.loginProcessing = false; },
            (error: any) => { this.msgError = "Invalid credentials"; this.loginProcessing = false; },
            () => {
                //console.log(this.loginResult);

                if (this.loginResult.access_token != undefined) {
                    this.app.doLogin(this.loginResult,false);
                } else { this.msgError = "Invalid credentials"; }

                this.loginProcessing = false;
            });
    }    
}
