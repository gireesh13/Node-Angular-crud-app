import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpErrorResponse} from '@angular/common/http';
import {throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators'
import {environment} from '../../environments/environment.dev'

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  constructor(private httpClient:HttpClient ) { }
  getCustomers(name:any,page:number,limit:number){
   let url = environment.CUSTOMER_BASE_URL+environment.CUSTOMER.GET_ALL_CUSTOMERS+"?serach_by_name="+name+"&page="+page+"&limit="+limit;
    return this.httpClient.get(url)
  }

  createCustomer(data:any){
    let url = environment.CUSTOMER_BASE_URL+ environment.CUSTOMER.ADD_CUSTOMERS;
  
    console.log("url");
    console.log(url)
    const formdata= new FormData();
    formdata.append("file",data.image);
    formdata.append("name",data.name);
    formdata.append("email",data.email);
    formdata.append("mobile_number",data.mobile_number);
    formdata.append("designation",data.designation);
    formdata.append("term_condition",data.acceptTerms);
    formdata.append("gender",data.gender);
    formdata.append("description",data.description);
    return this.httpClient.post(url, formdata)
      .pipe(
        catchError(this.errorMgmt)
      )
  }

  // Get customer
  getCustomerDetail(id:any){
    let url = environment.CUSTOMER_BASE_URL+environment.CUSTOMER.VIEW_CUSTOMER+"/"+id;
    return this.httpClient.get(url).pipe(
      map((res:any) => {
        return res || {}
      }),
      catchError(this.errorMgmt)
    )
  }

  // Update customer
  updateCustomer(id:any, data:any){
    let url = environment.CUSTOMER_BASE_URL+environment.CUSTOMER.UPDATE_CUSTOMERS+"/"+id;
    const formdata= new FormData();
    formdata.append("file",data.image);
    formdata.append("name",data.name);
    formdata.append("email",data.email);
    formdata.append("mobile_number",data.mobile_number);
    formdata.append("designation",data.designation);
    formdata.append("term_condition",data.acceptTerms);
    formdata.append("gender",data.gender);
   
    return this.httpClient.put(url, formdata).pipe(
      catchError(this.errorMgmt)
    )
  }

  // Delete customer
  deleteCustomer(id:any){
    let url = environment.CUSTOMER_BASE_URL+environment.CUSTOMER.DELETE_CUSTOMERl+"/"+id;
    return this.httpClient.delete(url).pipe(
      catchError(this.errorMgmt)
    )
  }
  /**For update status */

  updateStatus(id:any){
    let url = environment.CUSTOMER_BASE_URL+environment.CUSTOMER.UPDATE_STATUS_CUSTOMER+"/"+id;
    return this.httpClient.get(url).pipe(
      catchError(this.errorMgmt)
    )
  }

  // Error handling 
  errorMgmt(error: HttpErrorResponse) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  }
}
