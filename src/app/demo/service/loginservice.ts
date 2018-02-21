import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Login, LoginResult } from '../domain/login';

import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';


import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { catchError, map, tap } from 'rxjs/operators';

const httpOptionsa = {
    headers: new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded' })
    //headers: new HttpHeaders({ 'Content-Type': 'application/json;charset=UTF-8' })
};
@Injectable()
export class LoginService {

    constructor(private http: HttpClient) { }    
    public getTocket<LoginResult>(login: Login): Observable<LoginResult> {        
        return this.http.post<LoginResult>('https://devapi.charterforesight.com/oauth/token', this.toHttpParams(login), httpOptionsa);
    }
    

    private toHttpParams(obj: any): HttpParams {
        let params = new HttpParams();
        for (const key in obj) {
            if (obj.hasOwnProperty(key)) {
                const val = obj[key];
                if (val !== null && val !== undefined) {
                    params = params.append(key, val.toString());
                }
            }
        }
        return params;
    }
}

