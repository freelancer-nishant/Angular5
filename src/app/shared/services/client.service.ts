import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';


import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';

import { catchError, map, tap } from 'rxjs/operators';

import { GlobalConstants, GlobalHelper } from './../app.globals';


const httpOptionsa = {
    headers: new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded' })
};
@Injectable()
export class ClientService {
    constructor(private http: HttpClient) { }

    get(): Observable<any> {
        let url: string = GlobalConstants.API_BASE_URL + '/api/client';
        return this.http.get(url);
    }
}