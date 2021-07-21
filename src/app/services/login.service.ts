import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { Employee } from '../interface/employee';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  // url: string = 'http://localhost:8080/employees/log_in';
  url: string = `http://ec2-54-67-83-160.us-west-1.compute.amazonaws.com:8080/Project%202/employees`;
  
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': this.cookieService.get('auth') })
  };
  
  constructor(private http: HttpClient, private cookieService: CookieService) { }

  // POST
  getLogin(login: Employee): Observable<string> {
    return this.http.post<string>(this.url + '/log_in', login, this.httpOptions);
  }

  logout(): void {
    this.http.post(this.url + '/log_out', this.httpOptions);
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
