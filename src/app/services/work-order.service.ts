import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { PartLookUp } from '../interface/part-lookup';
import { PartList } from '../interface/part-list';
import { WorkOrder } from '../interface/work-order';

@Injectable({
  providedIn: 'root'
})
export class WorkOrderService {

  constructor(private http: HttpClient) { }

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  getAllWorkOrders(): Observable<WorkOrder[]> {
    const workorderUrl = `http://localhost:8080/workorders`
    return this.http.get<WorkOrder[]>(workorderUrl).pipe(
      catchError(this.handleError<WorkOrder[]>(`getAllWorkOrders`, []))
    );
  }

  getWorkOrder(id: number): Observable<WorkOrder> {
    const url = `http://localhost:8080/workorders/` + id;
    return this.http.get<WorkOrder>(url).pipe(
      catchError(this.handleError<WorkOrder>(`getWorkOrder`, ))
    );
  }

  getParts(id: number): Observable<PartList[]> {
    const url = `http://localhost:8080/partlists/order/` + id;
    return this.http.get<PartList[]>(url).pipe(
      catchError(this.handleError<PartList[]>(`getParts`, []))
    );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      return of(result as T);
    }
  }
}
