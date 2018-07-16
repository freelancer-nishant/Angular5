import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { GlobalConstants, GlobalHelper } from './../app.globals';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { CELDT } from './../domain/celdt';
import { LGLDomaAlgebra } from './../domain/lgl.doma.algebra';
import { LGLDora } from './../domain/lgl.dora';
import { LGLAdam } from './../domain/lgl.adam';
import { NWEA } from './../domain/nwea';
import { PFT } from './../domain/pft';
import { SBACInterim } from './../domain/sbac.interim';
import { SBACSummative } from './../domain/sbac.summative';

const httpOptionsa = {
    headers: new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded' })
};
@Injectable()
export class AssessmentUploadService {

    constructor(private http: HttpClient) { }

    saveCELDT(celdt: CELDT): Observable<any> {
        return this.http.post(GlobalConstants.API_BASE_URL + '/api/celdt', GlobalHelper.toHttpParams(celdt), httpOptionsa);
    }
    saveADAM(adam: LGLAdam): Observable<any> {
        return this.http.post(GlobalConstants.API_BASE_URL + '/api/adam', GlobalHelper.toHttpParams(adam), httpOptionsa);
    }
    saveDORA(dora: LGLDora): Observable<any> {
        return this.http.post(GlobalConstants.API_BASE_URL + '/api/dora', GlobalHelper.toHttpParams(dora), httpOptionsa);
    }
    saveDOMAAlgebra(lgldomaalgebra: LGLDomaAlgebra): Observable<any> {
        return this.http.post(GlobalConstants.API_BASE_URL + '/api/domaalgebra', GlobalHelper.toHttpParams(lgldomaalgebra), httpOptionsa);
    }
    savePFT(pft: PFT): Observable<any> {
        return this.http.post(GlobalConstants.API_BASE_URL + '/api/pft', GlobalHelper.toHttpParams(pft), httpOptionsa);
    }
    // SBAC 2015-2016
    saveSBACSummative(sbacsummative: SBACSummative): Observable<any> {
        return this.http.post(GlobalConstants.API_BASE_URL + '/api/sbac201516', GlobalHelper.toHttpParams(sbacsummative), httpOptionsa);
    }
    // SBAC 2016-2017
    saveSBACInterim(sbacinterim: SBACInterim): Observable<any> {
        return this.http.post(GlobalConstants.API_BASE_URL + '/api/sbac201617', GlobalHelper.toHttpParams(sbacinterim), httpOptionsa);
    }
    saveNWEA(newa: NWEA): Observable<any> {
        return this.http.post(GlobalConstants.API_BASE_URL + '/api/nwea', GlobalHelper.toHttpParams(newa), httpOptionsa);
    }
}
