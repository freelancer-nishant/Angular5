import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { catchError, map, tap } from 'rxjs/operators';
import { GlobalConstants } from './../../shared/app.globals';


const httpOptionsa = {
    headers: new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded' })    
};

@Injectable()
export class SchoolYearService {

    constructor(private http: HttpClient) { }    
    
    get(clientId: any, schoolId: any): Observable<any> {
        return this.http.get(GlobalConstants.API_BASE_URL + '/api/schoolschoolyear?clientId=' + clientId + '&schoolId=' + schoolId);                    
    }
}

