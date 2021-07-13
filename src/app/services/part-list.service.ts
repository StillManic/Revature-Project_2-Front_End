import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import { PartList } from '../interface/part-list';


@Injectable({
  providedIn: 'root'
})
export class PartListService {

  constructor(private http: HttpClient) { }
  url = `http://localhost:8080/partlists`

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
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

  getPartLists(): Observable<PartList[]> {
    return this.http.get<PartList[]>(this.url, this.httpOptions)
      .pipe(
        map((response: PartList[]) => response),
        catchError(this.handleError('getPartLists', []))
      );
  }

  //add partList
  addPartList(partList: PartList): Observable<PartList> {
    return this.http.post<PartList>(this.url + "/add", partList, this.httpOptions).pipe(
      map((response: PartList) => response),
    )
  }
}