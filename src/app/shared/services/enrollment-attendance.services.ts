import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { GlobalConstants, GlobalHelper } from './../app.globals';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { PeriodTeacher } from './../domain/1stperiodteacher';
import { Student } from './../domain/student';
import { DailyAttendance } from './../domain/dailyattendance';

const httpOptionsa = {
    headers: new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded' })
};
@Injectable()
export class EnrollmentAndAttendanceService {

    constructor(private http: HttpClient) { }

    saveTeacher(Teacher: PeriodTeacher): Observable<any> {
        return this.http.post(GlobalConstants.API_BASE_URL + '/api/period1studentteacher', GlobalHelper.toHttpParams(Teacher), httpOptionsa);
    }
    saveStudent(student: Student): Observable<any> {
        return this.http.post(GlobalConstants.API_BASE_URL + '/api/student', GlobalHelper.toHttpParams(student), httpOptionsa);
    }
    saveAttendance(attendance: DailyAttendance  ): Observable<any> {
        return this.http.post(GlobalConstants.API_BASE_URL + '/api/attendance', GlobalHelper.toHttpParams(attendance), httpOptionsa);
    }
    /*getStudent(student: Student): Observable<any> {
        return this.http.post(GlobalConstants.API_BASE_URL + '/api/student', GlobalHelper.toHttpParams(student), httpOptionsa);
    }*/
}
