import { Injectable } from '@angular/core';
import { JwtHelperService,JwtModule } from '@auth0/angular-jwt';
import { LoginService } from './loginservice';
import { Login, LoginResult } from './../domain/login';

@Injectable()
export class AuthService {
    constructor(private loginService: LoginService) { }

    public isAuthenticated(): boolean {
        let jwtHelper = this.getJwtHelper();

        if (sessionStorage.getItem('isClientPage') == "true" && jwtHelper.isTokenExpired(sessionStorage.getItem('token'), 200)) {
            console.log('call isAuthenticated');
            this.refreshLogin();
        }

        return jwtHelper.tokenGetter() != null && !jwtHelper.isTokenExpired();
    }

    public decodeToken(): any {

        let jwtHelper = this.getJwtHelper();

        if (sessionStorage.getItem('isClientPage') == "true" && jwtHelper.isTokenExpired(sessionStorage.getItem('token'),200)) {
            console.log('call decodeToken');
            this.refreshLogin();
        }

        return jwtHelper.decodeToken();
    }

    private getJwtHelper(): JwtHelperService {
        return new JwtHelperService({
            tokenGetter: () => {
                if (sessionStorage.getItem('isClientPage') == "true")
                    return sessionStorage.getItem('token');
                else
                    return localStorage.getItem('token');
            }
        });
    }
    private refreshLogin() {
        let loginResult: LoginResult;
        let username = window.atob(sessionStorage.getItem(window.btoa("usr")));
        let password = window.atob(sessionStorage.getItem(window.btoa("pwd")));

        this.loginService.getTocket<LoginResult>({ username: username, password: password, grant_type: 'password' }).subscribe((data: any) => loginResult = data,
            (error: any) => {
                console.log(error);
            },
            () => {
                sessionStorage.setItem("token", loginResult.access_token);
                sessionStorage.setItem("refreshtoken", loginResult.refresh_token);
            });
    }
}
