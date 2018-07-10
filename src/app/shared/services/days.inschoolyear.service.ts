import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { catchError, map, tap } from 'rxjs/operators';
import { GlobalConstants, GlobalHelper } from './../app.globals';
import { DaysInSchoolYear } from './../domain/days.inschoolyear';


const httpOptionsa = {
    headers: new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded' })
};

@Injectable()
export class DaysInSchoolYearService {

    constructor(private http: HttpClient) { }

    insert(daysInSchoolYear: DaysInSchoolYear): Observable<any> {
        let url: string = GlobalConstants.API_BASE_URL + '/api/attendancedate';
        return this.http.post(url, GlobalHelper.toHttpParams(daysInSchoolYear), httpOptionsa);
    }
    attendance(daysInSchoolYear: DaysInSchoolYear): Observable<any> {
        let url: string = GlobalConstants.API_BASE_URL + '/api/attendance';
        return this.http.post(url, GlobalHelper.toHttpParams(daysInSchoolYear), httpOptionsa);
    }
}

