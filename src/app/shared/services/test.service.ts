import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';


import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
//import 'rxjs/add/operator/map';
//import 'rxjs/add/operator/catch';

import { catchError, map, tap } from 'rxjs/operators';

import { GlobalConstants } from './../app.globals';


const httpOptionsa = {
    headers: new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded' })
    //headers: new HttpHeaders({ 'Content-Type': 'application/json;charset=UTF-8' })
};
@Injectable()
export class TestService {

    constructor(private http: HttpClient) { }    
    
    get(test_type_ids?: string): Observable<any> {
        let url: string = GlobalConstants.API_BASE_URL + '/api/test';
        if (test_type_ids != null && test_type_ids != 'undefined') {
            url = url + "?test_type_id=" + test_type_ids;
        }
        return this.http.get(url);
            //.map((response: Response) => <any>response.json())
            // .do(data => console.log("All: " + JSON.stringify(data)))
            //.catch();            
    }
}

