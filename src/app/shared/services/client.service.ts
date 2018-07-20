import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';


import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';

import { catchError, map, tap } from 'rxjs/operators';

import { GlobalConstants, GlobalHelper } from './../app.globals';
import { Client } from './../domain/client';

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

    insert(client: Client): Observable<any> {
        let url: string = GlobalConstants.API_BASE_URL + '/api/client';
        return this.http.post(url, GlobalHelper.toHttpParams(client), httpOptionsa);
    }

    update(client: Client): Observable<any> {
        let url: string = GlobalConstants.API_BASE_URL + '/api/client';
        return this.http.put(url, GlobalHelper.toHttpParams(client), httpOptionsa);
    }

    delete(id: any): Observable<any> {
        let url: string = GlobalConstants.API_BASE_URL + '/api/client?id=' + id;
        return this.http.delete(url);
    }
}