import { Injectable } from '@angular/core';
import { JwtHelperService,JwtModule } from '@auth0/angular-jwt';
import { LoginService } from './loginservice';


@Injectable()
export class AuthService {
    constructor(private loginService: LoginService) { }

    public isAuthenticated(): boolean {

        let jwtHelper = this.getJwtHelper();

        if (sessionStorage.getItem('isClientPage') == "true" && jwtHelper.isTokenExpired()) {
            console.log('call isAuthenticated');
            this.loginService.getRefreshToken(sessionStorage.getItem('refreshtoken'))
            jwtHelper = this.getJwtHelper();
        }

        return jwtHelper.tokenGetter() != null && !jwtHelper.isTokenExpired();
    }

    public decodeToken(): any {

        let jwtHelper = this.getJwtHelper();

        if (sessionStorage.getItem('isClientPage') == "true" && jwtHelper.isTokenExpired()) {
            console.log('call decodeToken');
            this.loginService.getRefreshToken(sessionStorage.getItem('refreshtoken'))
            jwtHelper = this.getJwtHelper();
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
}
