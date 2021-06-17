import { Injectable } from '@angular/core';
import {HttpClient,HttpHeaders,HttpErrorResponse } from '@angular/common/http';
import {environment} from '../../environments/environment.dev';
import { throwError } from 'rxjs';
import { catchError,map } from 'rxjs/operators';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private httpClient:HttpClient, public router: Router) { }
  signIn(data:any) {
    let url = environment.USER_LOGIN_URL;
  
    return this.httpClient.post(url, data)
      .subscribe((res: any) => {
        console.log(res)
        localStorage.setItem('access_token', res.token);
          this.router.navigate(['user-list']);
      })
  }

  sigunpUser(data:any){
    var formData: any = new FormData();
    formData.append("fname", data.fname);
    formData.append("lname", data.lname);
    formData.append("email", data.email);
    formData.append("password", data.password);
    formData.append("file",data.file);
    let url = environment.USER_REGISTER_URL;
    return this.httpClient.post(url,formData).pipe(
      catchError(this.handleError)
    )
    
  }
  
  getToken() {
    return localStorage.getItem('access_token');
  }
  get isLoggedIn(): boolean {
    let authToken = localStorage.getItem('access_token');
    return (authToken !== null) ? true : false;
  }

  doLogout() {
    let removeToken = localStorage.removeItem('access_token');
    if (removeToken == null) {
      this.router.navigate(['login']);
    }
  }
  getUserProfile(id:any){
    let url = environment.USER_PROFILE_URL+id;
    return this.httpClient.get(url).pipe(
      map((res: any) => {
        return res || {}
      }),
      catchError(this.handleError)
    )
  }

  getAllUsers(){
    let url = environment.USER_LIST_URL;
    return this.httpClient.get(url).pipe(
      catchError(this.handleError)
    )
  }


  handleError(error: HttpErrorResponse) {
    let msg = '';
    if (error.error instanceof ErrorEvent) {
      // client-side error
      msg = error.error.message;
    } else {
      // server-side error
      msg = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(msg);
  }


}
