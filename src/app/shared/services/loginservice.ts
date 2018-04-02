import { Injectable, ModuleWithProviders } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Login, LoginResult } from '../domain/login';

import { HttpClient, HttpHeaders, HttpParams, HttpRequest } from '@angular/common/http';


import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { catchError, map, tap } from 'rxjs/operators';

import { GlobalConstants, GlobalHelper } from './../app.globals';

const httpOptionsa = {
    headers: new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded' })
    //headers: new HttpHeaders({ 'Content-Type': 'application/json;charset=UTF-8' })
};
@Injectable()
export class LoginService {
    constructor(private http: HttpClient) { }
    public getTocket<LoginResult>(login: Login): Observable<LoginResult> {
        return this.http.post<LoginResult>(GlobalConstants.API_BASE_URL + '/oauth/token', GlobalHelper.toHttpParams(login), httpOptionsa);
    }
    public getRefreshToken<LoginResult>(refresh_token: string): Observable<LoginResult> {
        let params = new HttpParams();
        params = params.append("grant_type", "refresh_token");
        params = params.append("refresh_token", refresh_token);

        let loginResult: any;
        this.http.post<LoginResult>(GlobalConstants.API_BASE_URL + '/oauth/token', params, httpOptionsa).subscribe((data: any) => loginResult = data,
            (error: any) => {
                console.log(error);
            },
            () => {
                console.log(loginResult)
                if (loginResult.access_token != undefined) {
                    sessionStorage.setItem("token", loginResult.access_token);
                    sessionStorage.setItem("refreshtoken", loginResult.refresh_token);
                }
            });
        return loginResult;
    }
}

