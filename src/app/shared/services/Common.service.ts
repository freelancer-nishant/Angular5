import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
//import 'rxjs/add/operator/map';
//import 'rxjs/add/operator/catch';

import { catchError, map, tap } from 'rxjs/operators';

import { GlobalConstants } from './../app.globals';


const httpOptionsa = {
    headers: new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded' })    
};
@Injectable()
export class CommonService {

    constructor(private http: HttpClient) { }    
    
    getSchoolYear(isForReport?: boolean): Observable<any> {
        let url: string = GlobalConstants.API_BASE_URL + '/api/schoolyear?isForReport=' + (isForReport == null ? false : isForReport);
        return this.http.get(url);
    }
    getState(): Observable<any> {
        let url: string = GlobalConstants.API_BASE_URL + '/api/state';
        return this.http.get(url);
    }
    getCounty(state_id:number): Observable<any> {
        let url: string = GlobalConstants.API_BASE_URL + '/api/county?state_id=' + state_id;
        return this.http.get(url);
    }
    getDistrict(county_id: number): Observable<any> {
        let url: string = GlobalConstants.API_BASE_URL + '/api/schooldistrict?county_id=' + county_id;
        return this.http.get(url);
    }
    getCity(district_id: number): Observable<any> {
        let url: string = GlobalConstants.API_BASE_URL + '/api/city?district_id=' + district_id;
        return this.http.get(url);
    }
    getSchoolType(): Observable<any> {
        let url: string = GlobalConstants.API_BASE_URL + '/api/school/schooltypes';
        return this.http.get(url);
    }
    getSchool(school_type_id: number, district_id: number,city:string): Observable<any> {
        let url: string = GlobalConstants.API_BASE_URL + '/api/school/GetSchoolbyType/' + school_type_id + '?district_id=' + district_id + '&city=' + city;
        return this.http.get(url);
    }
    
}

