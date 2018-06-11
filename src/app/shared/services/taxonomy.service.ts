import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';


import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';

import { catchError, map, tap } from 'rxjs/operators';

import { GlobalConstants, GlobalHelper } from './../app.globals';


const httpOptionsa = {
    headers: new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded' })
};
@Injectable()
export class TaxonomyService {

    constructor(private http: HttpClient) { }

    getType(context_id: number): Observable<any> {
        let url: string = GlobalConstants.API_BASE_URL + '/api/taxonomy/type?context_id=' + context_id;
        return this.http.get(url);
    }
    deleteType(id: number, context_id: number): Observable<any> {
        let url: string = GlobalConstants.API_BASE_URL + '/api/taxonomy/type?id=' + id + '&context_id=' + context_id;
        return this.http.get(url);
    }
    addType<ResponseResult>(type: any): Observable<any> {
        return this.http.post<ResponseResult>(GlobalConstants.API_BASE_URL + '/api/taxonomy/type', GlobalHelper.toHttpParams(type), httpOptionsa);
    }
    updateType<ResponseResult>(type: any): Observable<any> {
        return this.http.put<ResponseResult>(GlobalConstants.API_BASE_URL + '/api/taxonomy/type', GlobalHelper.toHttpParams(type), httpOptionsa);
    }

    getCategory(type_id: number, client_id: number): Observable<any> {
        let url: string = GlobalConstants.API_BASE_URL + '/api/taxonomy/category?type_id=' + type_id + '&client_id=' + client_id;
        return this.http.get(url);
    }
    deleteCategory(id: number, type_id: number, client_id: number, user_id:number): Observable<any> {
        let url: string = GlobalConstants.API_BASE_URL + '/api/taxonomy/category?id=' + id + '&type_id=' + type_id + '&client_id=' + client_id + '&user_id=' + user_id;
        return this.http.get(url);
    }
    addCategory<ResponseResult>(type: any): Observable<any> {
        return this.http.post<ResponseResult>(GlobalConstants.API_BASE_URL + '/api/taxonomy/category', GlobalHelper.toHttpParams(type), httpOptionsa);
    }
    updateCategory<ResponseResult>(type: any): Observable<any> {
        return this.http.put<ResponseResult>(GlobalConstants.API_BASE_URL + '/api/taxonomy/category', GlobalHelper.toHttpParams(type), httpOptionsa);
    }

    getSubCategory(category_id: number, client_id: number): Observable<any> {
        let url: string = GlobalConstants.API_BASE_URL + '/api/taxonomy/subcategory?category_id=' + category_id + '&client_id=' + client_id;
        return this.http.get(url);
    }
    getItem(subcategory_id: number, client_id: number): Observable<any> {
        let url: string = GlobalConstants.API_BASE_URL + '/api/taxonomy/item?subcategory_id=' + subcategory_id + '&client_id=' + client_id;
        return this.http.get(url);
    }
    getItemDetail(subcategory_id: number, item_id: number, client_id: number): Observable<any> {
        let url: string = GlobalConstants.API_BASE_URL + '/api/taxonomy/item/' + item_id + '?subcategory_id=' + subcategory_id + '&client_id=' + client_id;
        return this.http.get(url);
    }
}
