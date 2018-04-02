import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable()
export class AuthGuardService implements CanActivate {
    constructor(public auth: AuthService, public router: Router) { }

    canActivate(route: ActivatedRouteSnapshot): boolean {

        let expectedRole: string = route.data.expectedRole;
        let hasClientAccess: boolean = route.data.hasClientAccess;

        if (!this.auth.isAuthenticated()) {
            if (sessionStorage.getItem('isClientPage') == "true") {
                setInterval(function () {
                    location.href='/#/dashboard';
                }, 500);
            }
            else
                this.router.navigate(['/login']);
            return false;
        }

        let tokenPayload: any = this.auth.decodeToken();
        if (expectedRole != undefined) {
            if (tokenPayload.role !== expectedRole) {
                this.router.navigate(['/login']);
                return false;
            }
        }

        if (sessionStorage.getItem('isClientPage') == "true" && !hasClientAccess) {
            this.router.navigate(['/login']);
            return false;
        }

        return true;
    }
}