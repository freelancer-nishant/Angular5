import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';


import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';

import { catchError, map, tap } from 'rxjs/operators';

import { GlobalConstants } from './../app.globals';


const httpOptionsa = {
    headers: new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded' })
};
@Injectable()
export class TaxonomyService {

    constructor(private http: HttpClient) { }

    getType(context_id: number): Observable<any> {
        let url: string = GlobalConstants.API_BASE_URL + '/api/taxonomy/type?context_id=' + context_id ;
        return this.http.get(url);
    }
    getCategory(type_id: number,  client_id: number): Observable<any> {
        let url: string = GlobalConstants.API_BASE_URL + '/api/taxonomy/category?type_id=' + type_id + '&client_id=' + client_id;
        return this.http.get(url);
    }
    getSubCategory(category_id: number, client_id: number): Observable<any> {
        let url: string = GlobalConstants.API_BASE_URL + '/api/taxonomy/subcategory?category_id=' + category_id + '&client_id=' + client_id;
        return this.http.get(url);
    }
    getItem(subcategory_id: number, client_id: number): Observable<any> {
        let url: string = GlobalConstants.API_BASE_URL + '/api/taxonomy/item?subcategory_id=' + subcategory_id +  '&client_id=' + client_id;
        return this.http.get(url);
    }
    getItemDetail(subcategory_id: number, item_id: number, client_id: number): Observable<any> {
        let url: string = GlobalConstants.API_BASE_URL + '/api/taxonomy/item/' + item_id +'?subcategory_id=' + subcategory_id + '&client_id=' + client_id;
        return this.http.get(url);
    }
}
