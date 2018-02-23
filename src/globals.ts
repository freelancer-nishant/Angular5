import { Injectable } from "@angular/core";

@Injectable()
export class Globals {
    nolayout: boolean = false;
}

export class GlobalConstants {
    public static ROLE_ADMIN: string = 'Admin';
    public static ROLE_CLIENT_ADMIN: string = 'Client_Admin';
    public static ROLE_CLIENT_USER: string = 'ClientUser';
    public static ROLE_GUEST: string = 'Guest';

}