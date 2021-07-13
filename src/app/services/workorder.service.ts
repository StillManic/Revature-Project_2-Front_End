import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import { PartLookUp} from '../interface/part-lookup';
import { WorkOrder } from '../interface/work-order';

@Injectable({
  providedIn: 'root'
})
export class WorkorderService {

  constructor(private http: HttpClient) { }

  url = `http://localhost:8080/workorders`

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

  addWorkOrder(workorder: WorkOrder): Observable<WorkOrder> {
    let url = this.url + "/add"
    console.log(workorder)
    return this.http.post<WorkOrder>(url, workorder, this.httpOptions).pipe(
      catchError(this.handleError<WorkOrder>(`addWorkOrder`))
    )
  }

  

  getAllWorkOrder(): Observable<WorkOrder[]> {
    return this.http.get<WorkOrder[]>(this.url).pipe(
      catchError(this.handleError<WorkOrder[]>(`getAllWorkOrder`))
    )
  }

}
