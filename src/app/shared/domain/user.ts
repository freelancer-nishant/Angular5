export interface User {
    user_id: any,
    client_id: any,
    client_name: any,
    email: any,
    role: any
}

export interface UserRequest {
    client_id: any,
    email: any,
    password: any,
    role: any
}

export class UserModel {
    user_id: string;
    client_id: number;
    email: string;
    role: string;
}