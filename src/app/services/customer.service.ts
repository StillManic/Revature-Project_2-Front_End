import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import { Customer } from '../interface/customer';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  constructor(private http: HttpClient) { }

  getCustomer(customer: Customer): Observable<Customer> {
    //Add in URL from server;
    const customerUrl = ""
    return this.http.get<Customer>(customerUrl).pipe(
      catchError(this.handleError<Customer>(`getResident id=${customer}`))
    )
  }




    /**
 * Handle Http operation that failed.
 * Let the app continue.
 * @param operation - name of the operation that failed
 * @param result - optional value to return as the observable result
 */
     private handleError<T>(operation = 'operation', result?: T) {
      return (error: any): Observable<T> => {
  
        // TODO: send the error to remote logging infrastructure
        console.error(error); // log to console instead
  
  
        // Let the app keep running by returning an empty result.
        return of(result as T);
      };
    }
  
}

