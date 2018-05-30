import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { catchError, map, tap } from 'rxjs/operators';
import { GlobalConstants, GlobalHelper } from './../app.globals';
import { SemesterInSchoolYear } from './../domain/semester.inschoolyear';

const httpOptionsa = {
    headers: new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded' })
};

@Injectable()
export class SemesterInSchoolYearService {

    constructor(private http: HttpClient) { }

    get(clientId: any, schoolYearId?: any): Observable<any> {
        let url: string = GlobalConstants.API_BASE_URL + '/api/semesterinschoolyear/schoolyearId?clientId=' + clientId + '&schoolYearId=' + schoolYearId;
        //if (test_type_ids != null && test_type_ids != 'undefined') {
        //    url = url + "&test_type_ids=" + test_type_ids;
        //}
        return this.http.get(url);
    }

    insert(semesterInSchoolYear: SemesterInSchoolYear): Observable<any> {
        let url: string = GlobalConstants.API_BASE_URL + '/api/semesterinschoolyear';
        return this.http.post(url, GlobalHelper.toHttpParams(semesterInSchoolYear), httpOptionsa);
    }

    update(semesterInSchoolYear: SemesterInSchoolYear): Observable<any> {
        let url: string = GlobalConstants.API_BASE_URL + '/api/semesterinschoolyear';
        return this.http.put(url, GlobalHelper.toHttpParams(semesterInSchoolYear), httpOptionsa);
    }

    delete(id: any, clientId?: any): Observable<any> {
        let url: string = GlobalConstants.API_BASE_URL + '/api/semesterinschoolyear?id =' + id + '&clientId=' + clientId;
        return this.http.delete(url);
    }
}
