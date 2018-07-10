import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
//import 'rxjs/add/operator/map';
//import 'rxjs/add/operator/catch';

import { catchError, map, tap } from 'rxjs/operators';
import { GlobalConstants, GlobalHelper } from './../app.globals';
import { School } from './../../shared/domain/school'

const httpOptionsa = {
    headers: new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded' })
    //headers: new HttpHeaders({ 'Content-Type': 'application/json;charset=UTF-8' })
};
@Injectable()
export class SchoolService {

    constructor(private http: HttpClient) { }    
    
    get(client_id: number, test_type_ids?: string): Observable<any> {
        let url: string = GlobalConstants.API_BASE_URL + '/api/school?client_id=' + client_id;
        if (test_type_ids != null && test_type_ids != 'undefined') {
            url = url + "&test_type_ids=" + test_type_ids;
        }
        return this.http.get(url);                     
    }

    insert(schoolDetail: School): Observable<any> {
        let url: string = GlobalConstants.API_BASE_URL + '/api/school';
        return this.http.post(url, GlobalHelper.toHttpParams(schoolDetail), httpOptionsa);
    }

    update(schoolDetail: School): Observable<any> {
        debugger
        let url: string = GlobalConstants.API_BASE_URL + '/api/school';
        return this.http.put(url, GlobalHelper.toHttpParams(schoolDetail), httpOptionsa);
    }

    delete(id: any): Observable<any> {
        let url: string = GlobalConstants.API_BASE_URL + '/api/school?id=' + id;
        return this.http.delete(url);
    }
}

