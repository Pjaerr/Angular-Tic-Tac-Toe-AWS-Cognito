import { Injectable } from '@angular/core';
import { AuthService, UserPoolDetails, AuthDetails } from './AuthService';
import { CognitoUserPool, CognitoUserAttribute, CognitoUser, AuthenticationDetails } from 'amazon-cognito-identity-js';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AWSCognitoAuthService implements AuthService {
  userPoolDetails: UserPoolDetails = environment.CognitoUserPoolDetails;

  signUp(authDetails: AuthDetails): Promise<boolean> {
    return new Promise<boolean>((resolve, reject) => {
      if (authDetails.password.length > 8) {

        const userPool = new CognitoUserPool(this.userPoolDetails);

        const attributeEmail = new CognitoUserAttribute({
          Name: 'email',
          Value: authDetails.email
        });

        userPool.signUp(authDetails.email, authDetails.password, [attributeEmail], null,
          (err, result) => {
            if (err) {
              reject(err.message);
              return;
            }

            resolve(true);
          });
      } else {
        reject("Password needs to be atleast 8 characters!");
      }
    });
  }

  authenticateUser(authDetails: AuthDetails): Promise<boolean> {
    return new Promise<boolean>((resolve, reject) => {

      const awsAuthDetails = new AuthenticationDetails({
        Username: authDetails.email,
        Password: authDetails.password
      });

      const userPool = new CognitoUserPool(this.userPoolDetails);

      const cognitoUser = new CognitoUser({
        Username: authDetails.email,
        Pool: userPool
      });

      cognitoUser.authenticateUser(awsAuthDetails, {
        onSuccess: (result) => {
          const accessToken = result.getIdToken().getJwtToken();
          window.localStorage.setItem('jwtToken', accessToken);

          resolve(true);
        },
        onFailure: (err) => {
          reject("Email or Password is incorrect");
        }
      });
    });
  }


  logOut(): void {
    window.localStorage.removeItem('jwtToken');
  }

  isAuthenticated(): boolean {
    return (this.getJwtToken() !== null);
  }

  getJwtToken(): (string | null) {
    return window.localStorage.getItem('jwtToken');
  }

  constructor() { }
}
