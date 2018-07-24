import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';


import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';

import { catchError, map, tap } from 'rxjs/operators';
import { Assessment, AssessmentRequest, AssessmentOfClientRequest } from './../../shared/domain/assessment'
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
}