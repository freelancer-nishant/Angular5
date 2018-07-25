import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';


import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';

import { catchError, map, tap } from 'rxjs/operators';
import { Assessment, AssessmentRequest, AssessmentOfClientRequest, AssessmentLevel, AssessmentSubject, AssessmentVersion } from './../../shared/domain/assessment'
import { GlobalConstants, GlobalHelper } from './../app.globals';

const httpOptionsa = {
    headers: new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded' })
};
@Injectable()
export class AssessmentService {
    constructor(private http: HttpClient) { }

    get(): Observable<any> {
        let url: string = GlobalConstants.API_BASE_URL + '/api/assessment';
        return this.http.get(url);
    }

    insert(assessment: AssessmentRequest): Observable<any> {
        let url: string = GlobalConstants.API_BASE_URL + '/api/assessment';
        return this.http.post(url, GlobalHelper.toHttpParams(assessment), httpOptionsa);
    }

    update(assessment: AssessmentRequest): Observable<any> {
        let url: string = GlobalConstants.API_BASE_URL + '/api/assessment';
        return this.http.put(url, GlobalHelper.toHttpParams(assessment), httpOptionsa);
    }

    delete(id: any): Observable<any> {
        let url: string = GlobalConstants.API_BASE_URL + '/api/assessment?id=' + id;
        return this.http.delete(url);
    }

    getAssessmentOfClient(assessment_id: any, client_id: any): Observable<any> {
        let url: string = GlobalConstants.API_BASE_URL + '/api/assessment/assessmentsofclient?assessment_id=' + assessment_id + '&client_id=' + client_id;
        return this.http.get(url);
    }

    insertAssessmentOfClient(assessment: AssessmentOfClientRequest): Observable<any> {
        let url: string = GlobalConstants.API_BASE_URL + '/api/assessment/assessmentsofclient';
        return this.http.post(url, GlobalHelper.toHttpParams(assessment), httpOptionsa);
    }

    deleteAssessmentOfClient(id: any): Observable<any> {
        let url: string = GlobalConstants.API_BASE_URL + '/api/assessment/assessmentsofclient?id=' + id;
        return this.http.delete(url);
    }

    /*Start Assesment Version*/
    getAssessmentVersion(client_id: any, p_school_id: any, p_school_year_id: any, p_assessment_id: any): Observable<any> {
        let url: string = GlobalConstants.API_BASE_URL + '/api/assessmentversion?client_id=' + client_id + '&p_school_id=' + p_school_id +'&p_school_year_id=' + p_school_year_id + '&p_assessment_id=' + p_assessment_id;
        return this.http.get(url);
    }

    saveAssessmentVersion(assessmentVersion: AssessmentVersion): Observable<any> {
        if (assessmentVersion.id == 0)
            return this.http.post(GlobalConstants.API_BASE_URL + '/api/assessmentversion', GlobalHelper.toHttpParams(assessmentVersion), httpOptionsa);
        else
            return this.http.put(GlobalConstants.API_BASE_URL + '/api/assessmentversion', GlobalHelper.toHttpParams(assessmentVersion), httpOptionsa);
    }
    /*End Assesment Version*/

    /*Start Assesment Subject*/
    getAssesmentSubject(assessment_type_id: number, id: number): Observable<any> {
        return this.http.get(GlobalConstants.API_BASE_URL + '/api/assessmentsubject/id?assessment_type_id=' + assessment_type_id + '&id=' + id, httpOptionsa);
    }
    saveAssesmentSubject(assessmentSubject: AssessmentSubject): Observable<any> {
        if (assessmentSubject.id == 0)
            return this.http.post(GlobalConstants.API_BASE_URL + '/api/assessmentsubject', GlobalHelper.toHttpParams(assessmentSubject), httpOptionsa);
        else
            return this.http.put(GlobalConstants.API_BASE_URL + '/api/assessmentsubject', GlobalHelper.toHttpParams(assessmentSubject), httpOptionsa);
    }
    /*End Assesment Subject*/

    /*Start Assesment Level*/
    getAssessmentLevel(assessment_type_id: number): Observable<any> {
        return this.http.get(GlobalConstants.API_BASE_URL + '/api/assessmentlevel?assessment_type_id=' + assessment_type_id, httpOptionsa);
    }

    saveAssessmentLevel(assessmentLevel: AssessmentLevel): Observable<any> {
        if (assessmentLevel.id == 0)
            return this.http.post(GlobalConstants.API_BASE_URL + '/api/assessmentlevel', GlobalHelper.toHttpParams(assessmentLevel), httpOptionsa);
        else
            return this.http.put(GlobalConstants.API_BASE_URL + '/api/assessmentlevel', GlobalHelper.toHttpParams(assessmentLevel), httpOptionsa);
    }
    /*End Assesment Level*/

}
