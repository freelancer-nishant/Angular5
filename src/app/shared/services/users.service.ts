import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';


import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';

import { catchError, map, tap } from 'rxjs/operators';
import { User, UserModel, UserRequest } from './../../shared/domain/user'
import { GlobalConstants, GlobalHelper } from './../app.globals';

const httpOptionsa = {
    headers: new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded' })
};
@Injectable()
export class UserService {
    constructor(private http: HttpClient) { }

    get(client_Id : any): Observable<any> {
        let url: string = GlobalConstants.API_BASE_URL + '/api/user?client_id=' + client_Id;
        return this.http.get(url);
    }

    insert(user: UserRequest): Observable<any> {
        let url: string = GlobalConstants.API_BASE_URL + '/api/user';
        return this.http.post(url, GlobalHelper.toHttpParams(user), httpOptionsa);
    }

    update(user_id: any, email: any, role: any, client_id: any, password: any): Observable<any> {
        let url: string = GlobalConstants.API_BASE_URL + '/api/user?user_id=' + user_id + '&&email=' + email + '&&role=' + role + '&&client_id=' + client_id + '&&password=' + password;
        return this.http.post(url, GlobalHelper.toHttpParams(url), httpOptionsa);
    }

    delete(id: any): Observable<any> {
        let url: string = GlobalConstants.API_BASE_URL + '/api/user?user_id=' + id;
        return this.http.delete(url);
    }
}