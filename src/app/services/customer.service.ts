import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import { Customer } from '../interface/customer';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})

export class CustomerService {
  constructor(private http: HttpClient, private cookieService: CookieService) { }

  url: string = `http://localhost:8080/customers`;

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': this.cookieService.get('auth') })
  };

  getAllCustomer(): Observable<Customer[]> {
    return this.http.get<Customer[]>(this.url, this.httpOptions).pipe(
      catchError(this.handleError<Customer[]>(`getResident`, []))
    )
  }


  addCustomer(customer: Customer): Observable<Customer> {
    return this.http.post<Customer>(this.url + '/add', customer, this.httpOptions).pipe(
        catchError(this.handleError<Customer>('addCustomer'))
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

