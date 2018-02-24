import { Injectable } from "@angular/core";
import { HttpParams } from '@angular/common/http';

@Injectable()

export class GlobalConstants {

    public static API_BASE_URL: string = 'https://devapi.charterforesight.com';

    public static ROLE_ADMIN: string = 'Admin';
    public static ROLE_CLIENT_ADMIN: string = 'Client_Admin';
    public static ROLE_CLIENT_USER: string = 'ClientUser';
    public static ROLE_GUEST: string = 'Guest';

}

export class GlobalHelper {
    public static toHttpParams(obj: any): HttpParams {
        let params = new HttpParams();
        for (const key in obj) {
            if (obj.hasOwnProperty(key)) {
                const val = obj[key];
                if (val !== null && val !== undefined) {
                    params = params.append(key, val.toString());
                }
            }
        }
        return params;
    }
}