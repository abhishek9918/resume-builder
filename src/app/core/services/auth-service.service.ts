import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpStatusCode } from '@angular/common/http';
import { Observable, catchError, map, of, throwError } from 'rxjs';
import { environment } from '../../../environments/environment';
// import { environment } from '../../../environments/environment';
// import { environment } from '../../../environments/environment';
// import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  OauthUrl = environment.apiUrl + '/users/google_login';
  baseUrl = environment.apiUrl + '/users/login_user';
  signUpUrl = environment.apiUrl + '/users/register_user';
  constructor(private _http: HttpClient, private _router: Router) {
    console.log(this.baseUrl, '<=== baseUrl');
    console.log(this.signUpUrl, '<=== signUpUrl');
  }
  login(requestPayload: Login): Observable<logResponse> {
    return this._http.post<logResponse>(this.baseUrl, requestPayload).pipe(
      map((response: logResponse) => {
        if (response && response.token && response.data) {
          this.setLoggedInUserDetails({
            token: response.token,
            user: response.data,
          });
        }
        return response;
      }),
      catchError((error) => {
        console.error('Login error:', error);
        return throwError(error);
      })
    );
  }
  googleLogin(requestPayload: Login): Observable<logResponse> {
    return this._http.post<logResponse>(this.OauthUrl, requestPayload).pipe(
      map((response: logResponse) => {
        if (response && response.token && response.data) {
          this.setLoggedInUserDetails({
            token: response.token,
            user: response.data,
          });
        }
        return response;
      }),
      catchError((error) => {
        console.error('Login error:', error);
        return throwError(error);
      })
    );
  }

  createUser(requestPayload: singUp): Observable<signUpResponse> {
    return this._http.post<signUpResponse>(this.signUpUrl, requestPayload).pipe(
      map((response: signUpResponse) => {
        if (response.success) {
        }
        return response;
      }),
      catchError((error) => {
        console.error('Signup error:', error);
        return throwError(error);
      })
    );
  }
  downloadResume(format: string, name: string) {
    const url = `/api/download?format=${format}&name=${name}`;
    window.open(url, '_blank');
  }
  setLoggedInUserDetails(defaultUser: any) {
    localStorage.setItem('LoggedInUser', JSON.stringify(defaultUser));
  }
  getAuthToken() {
    const data = localStorage.getItem('LoggedInUser');
    if (data) {
      const parsedData = JSON.parse(data);
      return parsedData.token;
    }
    return null;
  }
  getUserInfo() {
    const data = localStorage.getItem('LoggedInUser');
    if (data) {
      const parsedData = JSON.parse(data);
      return parsedData;
    }
    return null;
  }
}
export interface LoggedInUser {
  access_token: string;
  user_info: UserInfo;
}
export interface singUp {
  password?: string;
  email?: string;
  name?: string;
  grant_type?: string;
  scope?: string;
  client_id?: string;
  client_secret?: string;
}
export interface Login {
  password?: string;
  email?: string;
  username?: string;
  grant_type?: string;
  scope?: string;
  client_id?: string;
  client_secret?: string;
  idToken?: string;
}
export interface logResponse {
  success: boolean;
  message: string;
  data: {
    name: string;
    email: string;
    password: string;
    reg_time: string;
  };
  token: string;
}
export interface signUpResponse {
  success: boolean;
  message: string;
  data: {
    name: string;
    email: string;
    password: string;
    reg_time: string;
  };
  token: string;
}
export interface LoginResponse {
  statusCode: number;
  message: string;
  payload: LoginPayload;
  content: LoginPayload;
  token: string;
}
export interface UserInfo {
  id: number;
  name: string;
  email: string;
  role?: string;
  role_name?: string;
  company_id?: string;
}
export interface LoginPayload {
  access_token: string;
  user: UserInfo;
}
