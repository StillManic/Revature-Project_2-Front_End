import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import { PartLookUp} from '../interface/part-lookup';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class PartlookupService {
  constructor(private http: HttpClient, private cookieService: CookieService) { }

  // url = `http://localhost:8080/parts`
  url: string = `http://ec2-54-67-83-160.us-west-1.compute.amazonaws.com:8080/Project%202/parts`;

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': this.cookieService.get('auth') })
  };


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

  getAllParts(): Observable<PartLookUp[]> {
    return this.http.get<PartLookUp[]>(this.url, this.httpOptions).pipe(
      catchError(this.handleError<PartLookUp[]>('getAllParts'))
    )
  }

  getPartById(partId: number): Observable<PartLookUp> {
    return this.http.get<PartLookUp>(this.url + '/' + partId, this.httpOptions).pipe(
      catchError(this.handleError<PartLookUp>('getPartById'))
    )
  }

  
}
