import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
//import { of } from 'rxjs/observable/of';
//import 'rxjs/add/operator/map';
//import 'rxjs/add/operator/catch';

import { catchError, map, tap } from 'rxjs/operators';

import { GlobalConstants } from './../app.globals';


const httpOptionsa = {
    headers: new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded' })
};
@Injectable()
export class ComparativeListService {

    constructor(private http: HttpClient) { }

    get(client_id: number): Observable<any> {
        let url: string = GlobalConstants.API_BASE_URL + '/api/comparativelist?clientId=' + client_id;
        return this.http.get(url);
        //.map((response: Response) => <any>response.json())
        // .do(data => console.log("All: " + JSON.stringify(data)))
        //.catch();            
    }
    getById(id: number, client_id: number): Observable<any> {
        let url: string = GlobalConstants.API_BASE_URL + '/api/comparativelist/' + id + '?clientId=' + client_id;
        return this.http.get(url);
    }
}