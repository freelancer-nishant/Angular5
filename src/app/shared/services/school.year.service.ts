import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { catchError, map, tap } from 'rxjs/operators';
import { GlobalConstants, GlobalHelper } from './../app.globals';
import { SchoolSchoolYear } from './../domain/school.schoolyear';

const httpOptionsa = {
    headers: new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded' })
};

@Injectable()
export class SchoolYearService {

    constructor(private http: HttpClient) { }

    get(clientId: any, schoolId: any, test_type_ids?: string): Observable<any> {
        let url: string = GlobalConstants.API_BASE_URL + '/api/schoolschoolyear?clientId=' + clientId + '&schoolId=' + schoolId;
        if (test_type_ids != null && test_type_ids != 'undefined') {
            url = url + "&test_type_ids=" + test_type_ids;
        }
        return this.http.get(url);
    }
    update(schoolSchoolYear: SchoolSchoolYear): Observable<any> {
        let url: string = GlobalConstants.API_BASE_URL + '/api/schoolschoolyear';
        return this.http.put(url, GlobalHelper.toHttpParams(schoolSchoolYear), httpOptionsa);
    }
}

