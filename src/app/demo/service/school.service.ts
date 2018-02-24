import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';


import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
//import 'rxjs/add/operator/map';
//import 'rxjs/add/operator/catch';

import { catchError, map, tap } from 'rxjs/operators';

import { GlobalConstants } from './../../shared/app.globals';


const httpOptionsa = {
    headers: new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded' })
    //headers: new HttpHeaders({ 'Content-Type': 'application/json;charset=UTF-8' })
};
@Injectable()
export class SchoolService {

    constructor(private http: HttpClient) { }    
    
    get(client_id: number): Observable<any> {
        return this.http.get(GlobalConstants.API_BASE_URL + '/api/school?client_id=' + client_id);
            //.map((response: Response) => <any>response.json())
            // .do(data => console.log("All: " + JSON.stringify(data)))
            //.catch();            
    }
}

