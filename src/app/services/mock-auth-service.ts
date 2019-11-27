import { AuthService, UserPoolDetails, AuthDetails } from "./AuthService";
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MockAuthService implements AuthService {
  userPoolDetails: UserPoolDetails = {
    UserPoolId: "123",
    ClientId: "abc"
  };

  signUp(authDetails: AuthDetails): Promise<boolean> {
    return new Promise<boolean>((resolve, reject) => {
      if (authDetails.password.length > 8) {
        resolve(true);
      }
      else {
        reject("Password needs to be atleast 8 characters!");
      }
    });
  }

  logOut(): void {
    window.localStorage.removeItem('jwtToken');
  }

  isAuthenticated(): boolean {
    return (this.getJwtToken() !== null);
  }

  authenticateUser(authDetails: AuthDetails): Promise<boolean> {
    return new Promise<boolean>((resolve, reject) => {
      if (authDetails.email === "josh" && authDetails.password === "password123") {
        window.localStorage.setItem('jwtToken', "12345abcdefg");
        resolve(true);
      }
      else {
        reject("Incorrect login credentials!");
      }
    });
  }

  getJwtToken(): (string | null) {
    return window.localStorage.getItem('jwtToken');
  }
}
