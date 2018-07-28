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
export class TaxonomyConfigurationService {

    constructor(private http: HttpClient) { }

    getType(context_id: number, id: number): Observable<any> {
        let url: string = GlobalConstants.API_BASE_URL + '/api/taxonomyconfiguration/type?id=' + id + '&context_id=' + context_id;
        return this.http.get(url);
    }
    deleteType(id: number): Observable<any> {
        let url: string = GlobalConstants.API_BASE_URL + '/api/taxonomyconfiguration/type?id=' + id;
        return this.http.delete(url);
    }
    saveType<ResponseResult>(type: any): Observable<any> {
        if (type.id == undefined || type.id == 0) {
            return this.http.post<ResponseResult>(GlobalConstants.API_BASE_URL + '/api/taxonomyconfiguration/type', GlobalHelper.toHttpParams(type), httpOptionsa);
        } else {
            return this.http.put<ResponseResult>(GlobalConstants.API_BASE_URL + '/api/taxonomyconfiguration/type', GlobalHelper.toHttpParams(type), httpOptionsa);
        }
    }

    getTypeOfClient(type_id: number): Observable<any> {
        let url: string = GlobalConstants.API_BASE_URL + '/api/taxonomyconfiguration/typeofclient?type_id=' + type_id;
        return this.http.get(url);
    }
    deleteTypeOfClient(type_id: number, client_id: number): Observable<any> {
        let url: string = GlobalConstants.API_BASE_URL + '/api/taxonomyconfiguration/typeofclient?type_id=' + type_id + '&client_id=' + client_id;
        return this.http.delete(url);
    }
    saveTypeOfClient<ResponseResult>(typeofclient: any): Observable<any> {
        if (typeofclient.type_id == undefined || typeofclient.type_id == 0) {
            return this.http.post<ResponseResult>(GlobalConstants.API_BASE_URL + '/api/taxonomyconfiguration/typeofclient', GlobalHelper.toHttpParams(typeofclient), httpOptionsa);
        } else {
            return this.http.put<ResponseResult>(GlobalConstants.API_BASE_URL + '/api/taxonomyconfiguration/typeofclient', GlobalHelper.toHttpParams(typeofclient), httpOptionsa);
        }
    }

    getTypeInRole(type_id: number): Observable<any> {
        let url: string = GlobalConstants.API_BASE_URL + '/api/taxonomyconfiguration/typeinrole?type_id=' + type_id;
        return this.http.get(url);
    }
    deleteTypeInRole(type_id: number, role_id: string): Observable<any> {
        let url: string = GlobalConstants.API_BASE_URL + '/api/taxonomyconfiguration/typeinrole?type_id=' + type_id + '&role_id=' + role_id;
        return this.http.delete(url);
    }
    saveTypeInRole<ResponseResult>(typeinrole: any): Observable<any> {
        if (typeinrole.type_id == undefined || typeinrole.type_id == 0) {
            return this.http.post<ResponseResult>(GlobalConstants.API_BASE_URL + '/api/taxonomyconfiguration/typeinrole', GlobalHelper.toHttpParams(typeinrole), httpOptionsa);
        } else {
            return this.http.put<ResponseResult>(GlobalConstants.API_BASE_URL + '/api/taxonomyconfiguration/typeinrole', GlobalHelper.toHttpParams(typeinrole), httpOptionsa);
        }
    }

    getCategory(type_id: number, id: number): Observable<any> {
        let url: string = GlobalConstants.API_BASE_URL + '/api/taxonomyconfiguration/category?type_id=' + type_id + '&id=' + id;
        return this.http.get(url);
    }
    deleteCategory(id: number): Observable<any> {
        let url: string = GlobalConstants.API_BASE_URL + '/api/taxonomyconfiguration/category?id=' + id;
        return this.http.delete(url);
    }
    saveCategory<ResponseResult>(category: any): Observable<any> {
        if (category.id == undefined || category.id == 0) {
            return this.http.post<ResponseResult>(GlobalConstants.API_BASE_URL + '/api/taxonomyconfiguration/category', GlobalHelper.toHttpParams(category), httpOptionsa);
        } else {
            return this.http.put<ResponseResult>(GlobalConstants.API_BASE_URL + '/api/taxonomyconfiguration/category', GlobalHelper.toHttpParams(category), httpOptionsa);
        }
    }

    getCategoryOfClient(category_id: number): Observable<any> {
        let url: string = GlobalConstants.API_BASE_URL + '/api/taxonomyconfiguration/categoryofclient?category_id=' + category_id;
        return this.http.get(url);
    }
    deleteCategoryOfClient(category_id: number, client_id: number): Observable<any> {
        let url: string = GlobalConstants.API_BASE_URL + '/api/taxonomyconfiguration/categoryofclient?category_id=' + category_id + '&client_id=' + client_id;
        return this.http.delete(url);
    }
    saveCategoryOfClient<ResponseResult>(categoryofclient: any): Observable<any> {
        if (categoryofclient.category_id == undefined || categoryofclient.category_id == 0) {
            return this.http.post<ResponseResult>(GlobalConstants.API_BASE_URL + '/api/taxonomyconfiguration/categoryofclient', GlobalHelper.toHttpParams(categoryofclient), httpOptionsa);
        } else {
            return this.http.put<ResponseResult>(GlobalConstants.API_BASE_URL + '/api/taxonomyconfiguration/categoryofclient', GlobalHelper.toHttpParams(categoryofclient), httpOptionsa);
        }
    }

    getCategoryInRole(category_id: number): Observable<any> {
        let url: string = GlobalConstants.API_BASE_URL + '/api/taxonomyconfiguration/categoryinRole?category_id=' + category_id;
        return this.http.get(url);
    }
    deleteCategoryInRole(category_id: number, role_id: string): Observable<any> {
        let url: string = GlobalConstants.API_BASE_URL + '/api/taxonomyconfiguration/categoryinrole?category_id=' + category_id + '&role_id=' + role_id;
        return this.http.delete(url);
    }
    saveCategoryInRole<ResponseResult>(categoryinrole: any): Observable<any> {
        if (categoryinrole.category_id == undefined || categoryinrole.category_id == 0) {
            return this.http.post<ResponseResult>(GlobalConstants.API_BASE_URL + '/api/taxonomyconfiguration/categoryinRole', GlobalHelper.toHttpParams(categoryinrole), httpOptionsa);
        } else {
            return this.http.put<ResponseResult>(GlobalConstants.API_BASE_URL + '/api/taxonomyconfiguration/categoryinRole', GlobalHelper.toHttpParams(categoryinrole), httpOptionsa);
        }
    }

    getSubCategory(category_id: number, id: number): Observable<any> {
        let url: string = GlobalConstants.API_BASE_URL + '/api/taxonomyconfiguration/subcategory?category_id=' + category_id + '&id=' + id;
        return this.http.get(url);
    }
    deleteSubCategory(id: number): Observable<any> {
        let url: string = GlobalConstants.API_BASE_URL + '/api/taxonomyconfiguration/subcategory?id=' + id;
        return this.http.delete(url);
    }
    saveSubCategory<ResponseResult>(subcategory: any): Observable<any> {
        if (subcategory.id == undefined || subcategory.id == 0) {
            return this.http.post<ResponseResult>(GlobalConstants.API_BASE_URL + '/api/taxonomyconfiguration/subcategory', GlobalHelper.toHttpParams(subcategory), httpOptionsa);
        } else {
            return this.http.put<ResponseResult>(GlobalConstants.API_BASE_URL + '/api/taxonomyconfiguration/subcategory', GlobalHelper.toHttpParams(subcategory), httpOptionsa);
        }
    }

    getSubCategoryOfClient(subcategory_id: number): Observable<any> {
        let url: string = GlobalConstants.API_BASE_URL + '/api/taxonomyconfiguration/subcategoryofclient?subcategory_id=' + subcategory_id;
        return this.http.get(url);
    }
    deleteSubCategoryOfClient(subcategory_id: number, client_id: number): Observable<any> {
        let url: string = GlobalConstants.API_BASE_URL + '/api/taxonomyconfiguration/subcategoryofclient?subcategory_id=' + subcategory_id + '&client_id=' + client_id;
        return this.http.delete(url);
    }
    saveSubCategoryOfClient<ResponseResult>(subcategoryofclient: any): Observable<any> {
        if (subcategoryofclient.subcategory_id == undefined || subcategoryofclient.subcategory_id == 0) {
            return this.http.post<ResponseResult>(GlobalConstants.API_BASE_URL + '/api/taxonomyconfiguration/subcategoryofclient', GlobalHelper.toHttpParams(subcategoryofclient), httpOptionsa);
        } else {
            return this.http.put<ResponseResult>(GlobalConstants.API_BASE_URL + '/api/taxonomyconfiguration/subcategoryofclient', GlobalHelper.toHttpParams(subcategoryofclient), httpOptionsa);
        }
    }

    getSubCategoryInRole(subcategory_id: number): Observable<any> {
        let url: string = GlobalConstants.API_BASE_URL + '/api/taxonomyconfiguration/subcategoryinRole?subcategory_id=' + subcategory_id;
        return this.http.get(url);
    }
    deleteSubCategoryInRole(subcategory_id: number, role_id: string): Observable<any> {
        let url: string = GlobalConstants.API_BASE_URL + '/api/taxonomyconfiguration/subcategoryinrole?subcategory_id=' + subcategory_id + '&role_id=' + role_id;
        return this.http.delete(url);
    }
    saveSubCategoryInRole<ResponseResult>(subcategoryinrole: any): Observable<any> {
        if (subcategoryinrole.subcategory_id == undefined || subcategoryinrole.subcategory_id == 0) {
            return this.http.post<ResponseResult>(GlobalConstants.API_BASE_URL + '/api/taxonomyconfiguration/subcategoryinRole', GlobalHelper.toHttpParams(subcategoryinrole), httpOptionsa);
        } else {
            return this.http.put<ResponseResult>(GlobalConstants.API_BASE_URL + '/api/taxonomyconfiguration/subcategoryinRole', GlobalHelper.toHttpParams(subcategoryinrole), httpOptionsa);
        }
    }

    getItem(id: number): Observable<any> {
        let url: string = GlobalConstants.API_BASE_URL + '/api/taxonomyconfiguration/item?id=' + id;
        return this.http.get(url);
    }
    deleteItem(id: number): Observable<any> {
        let url: string = GlobalConstants.API_BASE_URL + '/api/taxonomyconfiguration/item?id=' + id;
        return this.http.delete(url);
    }
    saveItem<ResponseResult>(item: any): Observable<any> {
        if (item.id == undefined || item.id == 0) {
            return this.http.post<ResponseResult>(GlobalConstants.API_BASE_URL + '/api/taxonomyconfiguration/item', GlobalHelper.toHttpParams(item), httpOptionsa);
        } else {
            return this.http.put<ResponseResult>(GlobalConstants.API_BASE_URL + '/api/taxonomyconfiguration/item', GlobalHelper.toHttpParams(item), httpOptionsa);
        }
    }

    getItemOfClient(item_id: number): Observable<any> {
        let url: string = GlobalConstants.API_BASE_URL + '/api/taxonomyconfiguration/itemofclient?item_id=' + item_id;
        return this.http.get(url);
    }
    deleteItemOfClient(item_id: number, client_id: number, school_id: number): Observable<any> {
        let url: string = GlobalConstants.API_BASE_URL + '/api/taxonomyconfiguration/itemofclient?item_id=' + item_id + '&client_id=' + client_id + '&school_id=' + school_id;
        return this.http.delete(url);
    }
    saveItemOfClient<ResponseResult>(itemofclient: any): Observable<any> {
        return this.http.post<ResponseResult>(GlobalConstants.API_BASE_URL + '/api/taxonomyconfiguration/itemofclient', GlobalHelper.toHttpParams(itemofclient), httpOptionsa);
    }

    getItemInRole(item_id: number): Observable<any> {
        let url: string = GlobalConstants.API_BASE_URL + '/api/taxonomyconfiguration/iteminrole?item_id=' + item_id;
        return this.http.get(url);
    }
    deleteItemInRole(item_id: number, role_id: string): Observable<any> {
        let url: string = GlobalConstants.API_BASE_URL + '/api/taxonomyconfiguration/iteminrole?item_id=' + item_id + '&role_id=' + role_id;
        return this.http.delete(url);
    }
    saveItemInRole<ResponseResult>(iteminrole: any): Observable<any> {
        if (iteminrole.item_id == undefined || iteminrole.item_id == 0) {
            return this.http.post<ResponseResult>(GlobalConstants.API_BASE_URL + '/api/taxonomyconfiguration/iteminrole', GlobalHelper.toHttpParams(iteminrole), httpOptionsa);
        } else {
            return this.http.put<ResponseResult>(GlobalConstants.API_BASE_URL + '/api/taxonomyconfiguration/iteminrole', GlobalHelper.toHttpParams(iteminrole), httpOptionsa);
        }
    }

    getItemInSubCategory(item_id: number): Observable<any> {
        let url: string = GlobalConstants.API_BASE_URL + '/api/taxonomyconfiguration/iteminsubcategory?item_id=' + item_id;
        return this.http.get(url);
    }
    deleteItemInSubCategory(item_id: number, subcategory_id: number): Observable<any> {
        let url: string = GlobalConstants.API_BASE_URL + '/api/taxonomyconfiguration/iteminsubcategory?item_id=' + item_id + '&subcategory_id=' + subcategory_id;
        return this.http.delete(url);
    }
    saveItemInSubCategory<ResponseResult>(iteminrole: any): Observable<any> {
        if (iteminrole.item_id == undefined || iteminrole.item_id == 0) {
            return this.http.post<ResponseResult>(GlobalConstants.API_BASE_URL + '/api/taxonomyconfiguration/iteminsubcategory', GlobalHelper.toHttpParams(iteminrole), httpOptionsa);
        } else {
            return this.http.put<ResponseResult>(GlobalConstants.API_BASE_URL + '/api/taxonomyconfiguration/iteminsubcategory', GlobalHelper.toHttpParams(iteminrole), httpOptionsa);
        }
    }

    getItemVJSParam(id: number, item_id: number): Observable<any> {
        let url: string = GlobalConstants.API_BASE_URL + '/api/taxonomyconfiguration/itemvjsparam?id=' + id + '&item_id=' + item_id;
        return this.http.get(url);
    }
    deleteItemVJSParam(id: number): Observable<any> {
        let url: string = GlobalConstants.API_BASE_URL + '/api/taxonomyconfiguration/itemvjsparam?id=' + id;
        return this.http.delete(url);
    }
    saveItemVJSParam<ResponseResult>(itemvjsparam: any): Observable<any> {
        if (itemvjsparam.id == undefined || itemvjsparam.id == 0) {
            return this.http.post<ResponseResult>(GlobalConstants.API_BASE_URL + '/api/taxonomyconfiguration/itemvjsparam', GlobalHelper.toHttpParams(itemvjsparam), httpOptionsa);
        } else {
            return this.http.put<ResponseResult>(GlobalConstants.API_BASE_URL + '/api/taxonomyconfiguration/itemvjsparam', GlobalHelper.toHttpParams(itemvjsparam), httpOptionsa);
        }
    }

    getItemListBySubCategory(subcategory_id: number): Observable<any> {
        let url: string = GlobalConstants.API_BASE_URL + '/api/taxonomyconfiguration/itemlistbysubcategory?subcategory_id=' + subcategory_id;
        return this.http.get(url);
    }
}
