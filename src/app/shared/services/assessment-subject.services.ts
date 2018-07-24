import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { GlobalConstants, GlobalHelper } from './../app.globals';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { AssessmentSubject } from '../domain/assessment';

const httpOptionsa = {
    headers: new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded' })
};
@Injectable()
export class AssessmentSubjectService {

    constructor(private http: HttpClient) { }

    get(assessment_type_id: number, id: number): Observable<any> {
        return this.http.get(GlobalConstants.API_BASE_URL + '/api/assessmentsubject/id?assessment_type_id=' + assessment_type_id + '&id=' + id, httpOptionsa);
    }
    post(assessmentSubject: AssessmentSubject): Observable<any> {
        if (assessmentSubject.id == 0)
            return this.http.post(GlobalConstants.API_BASE_URL + '/api/assessmentsubject', GlobalHelper.toHttpParams(assessmentSubject), httpOptionsa);
        else
            return this.http.put(GlobalConstants.API_BASE_URL + '/api/assessmentsubject', GlobalHelper.toHttpParams(assessmentSubject), httpOptionsa);
    }
}
