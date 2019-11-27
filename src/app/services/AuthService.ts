import { Injectable } from '@angular/core';

export interface AuthDetails {
    email: string;
    password: string;
}

export interface UserPoolDetails {
    UserPoolId: string;
    ClientId: string;
}

@Injectable()
export abstract class AuthService {
    abstract userPoolDetails: UserPoolDetails;
    abstract signUp(authDetails: AuthDetails): Promise<boolean>;
    abstract logOut(): void;
    abstract isAuthenticated(): boolean;
    abstract authenticateUser(authDetails: AuthDetails): Promise<boolean>;
    abstract getJwtToken(): (string | null);
}

/**
 * autenticateUser() will take a email and password and then use that to "login"
 * and store the resulting JWTToken for use in authenticated API calls.
 *
 * The Authentication Service will authenticate a user and lead to a JWT token being stored
 * within a localstorage. This can then be retrieved when making API calls. (Make a note of
 * how storing it in local storage is insecure and if was approaching this properly
 * would probably use something like a http only cookie.)
 */