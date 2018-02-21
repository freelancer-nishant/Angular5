import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';


@Injectable()
export class AuthService {
    
    public isAuthenticated(): boolean {
        
        let jwtHelper = new JwtHelperService({
            tokenGetter: () => {
                return localStorage.getItem('token');
            }
        });
        
        return jwtHelper.tokenGetter() != null && !jwtHelper.isTokenExpired();
    }

    public decodeToken(): any {

        let jwtHelper = new JwtHelperService({
            tokenGetter: () => {
                return localStorage.getItem('token');
            }
        });

        return jwtHelper.decodeToken();
    }
}
