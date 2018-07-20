import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';


import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';

import { catchError, map, tap } from 'rxjs/operators';

import { GlobalConstants, GlobalHelper } from './../app.globals';
import { Role, RoleName } from './../domain/role';


const httpOptionsa = {
    headers: new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded' })
};
@Injectable()
export class RoleService {
    constructor(private http: HttpClient) { }

    get(): Observable<any> {
        let url: string = GlobalConstants.API_BASE_URL + '/api/role';
        return this.http.get(url);
    }

    insert(role: RoleName): Observable<any> {
        let url: string = GlobalConstants.API_BASE_URL + '/api/role';
        return this.http.post(url, GlobalHelper.toHttpParams(role), httpOptionsa);
    }

    update(role: Role): Observable<any> {
        let url: string = GlobalConstants.API_BASE_URL + '/api/role';
        return this.http.put(url, GlobalHelper.toHttpParams(role), httpOptionsa);
    }
    
    delete(id: any): Observable<any> {
        let url: string = GlobalConstants.API_BASE_URL + '/api/role/delete?roleId=' + id;
        return this.http.delete(url);
    }
}