import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { GlobalConstants, GlobalHelper } from './../app.globals';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { AssessmentLevel } from '../domain/assessment';

const httpOptionsa = {
    headers: new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded' })
};
@Injectable()
export class AssessmentLevelService {

    constructor(private http: HttpClient) { }

    get(assessment_type_id: number): Observable<any> {
        return this.http.get(GlobalConstants.API_BASE_URL + '/api/assessmentlevel?assessment_type_id=' + assessment_type_id , httpOptionsa);
    }
    post(assessmentLevel: AssessmentLevel): Observable<any> {
        if (assessmentLevel.id == 0)
            return this.http.post(GlobalConstants.API_BASE_URL + '/api/assessmentlevel', GlobalHelper.toHttpParams(assessmentLevel), httpOptionsa);
        else
            return this.http.put(GlobalConstants.API_BASE_URL + '/api/assessmentlevel', GlobalHelper.toHttpParams(assessmentLevel), httpOptionsa);
    }
}