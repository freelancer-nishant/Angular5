import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { catchError, map, tap } from 'rxjs/operators';
import { GlobalConstants, GlobalHelper } from './../app.globals';
import { SchoolGrade } from './../domain/school.schoolgrade';


const httpOptionsa = {
    headers: new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded' })
};

@Injectable()
export class SchoolGradeService {

    constructor(private http: HttpClient) { }

    get(clientId: any, schoolId: any, test_type_ids?: string): Observable<any> {
        let url: string = GlobalConstants.API_BASE_URL + '/api/schoolgrade?clientId=' + clientId + '&school_id=' + schoolId;
        if (test_type_ids != null && test_type_ids != 'undefined') {
            url = url + "&test_type_ids=" + test_type_ids;
        }
        return this.http.get(url);
    }
    insert(schoolGrade: SchoolGrade): Observable<any> {
        let url: string = GlobalConstants.API_BASE_URL + '/api/schoolgrade';
        return this.http.post(url, GlobalHelper.toHttpParams(schoolGrade), httpOptionsa);
    }

    delete(id: any, clientId: any, schoolId: any): Observable<any> {
        let url: string = GlobalConstants.API_BASE_URL + '/api/schoolgrade?id=' + id + '&clientId=' + clientId + '&schoolId=' + schoolId;
        return this.http.delete(url);
    }
}

