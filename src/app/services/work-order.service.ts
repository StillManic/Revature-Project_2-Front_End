import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { PartLookUp } from '../interface/part-lookup';
import { PartList } from '../interface/part-list';
import { WorkOrder } from '../interface/work-order';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class WorkOrderService {
  constructor(private http: HttpClient, private cookieService: CookieService) { }

  url = 'http://localhost:8080/workorders';

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': this.cookieService.get('auth') })
  };

  getAllWorkOrders(): Observable<WorkOrder[]> {
    return this.http.get<WorkOrder[]>(this.url, this.httpOptions).pipe(
      catchError(this.handleError<WorkOrder[]>(`getAllWorkOrders`, []))
    );
  }

  getWorkOrder(id: number): Observable<WorkOrder> {
    return this.http.get<WorkOrder>(this.url + '/' + id, this.httpOptions).pipe(
      catchError(this.handleError<WorkOrder>(`getWorkOrder`, ))
    );
  }

  addWorkOrder(workorder: WorkOrder): Observable<WorkOrder> {
    console.log(workorder)
    return this.http.post<WorkOrder>(this.url + '/add', workorder, this.httpOptions).pipe(
      catchError(this.handleError<WorkOrder>(`addWorkOrder`))
    )
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      return of(result as T);
    }
  }
}
