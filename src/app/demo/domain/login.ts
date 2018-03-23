export interface Login {
    username: string;
    password: string;
    grant_type: string;
}

export interface LoginResult {
    access_token;
    token_type;
    expires_in;
    refresh_token;
}