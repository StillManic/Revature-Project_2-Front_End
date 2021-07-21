import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { WorkOrder } from '../interface/work-order';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class WorkOrderService {
  constructor(private http: HttpClient, private cookieService: CookieService) { }

  // url = 'http://localhost:8080/workorders';
  url: string = `http://ec2-54-67-83-160.us-west-1.compute.amazonaws.com:8080/Project%202/workorders`;

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
  
  updateWorkOrder(workorder: WorkOrder): Observable<WorkOrder> {
    return this.http.put<WorkOrder>(this.url + '/update', workorder, this.httpOptions).pipe(
      catchError(this.handleError<WorkOrder>(`updateWorkOrder`))
    );
  }

  addWorkOrder(workorder: WorkOrder): Observable<WorkOrder> {
    console.log(workorder)
    return this.http.post<WorkOrder>(this.url + '/add', workorder, this.httpOptions).pipe(
      catchError(this.handleError<WorkOrder>(`addWorkOrder`))
    )
  }

  
  getWorkOrderByCustomerId(customerId: number): Observable<WorkOrder[]> {
    return this.http.get<WorkOrder[]>(this.url + '/vehicle/customer/' + customerId, this.httpOptions).pipe(
      catchError(this.handleError<WorkOrder[]>(`getWorkOrderByCustomerId`, []))
    );
  }
  
  getWorkOrderByVin(vin: number): Observable<WorkOrder[]> {
    return this.http.get<WorkOrder[]>(this.url + '/vehicle/vin/' + vin, this.httpOptions).pipe(
      catchError(this.handleError<WorkOrder[]>(`getWorkOrder`, ))
    );
  }
  
  getWorkOrderByPhone(phone: number): Observable<WorkOrder[]> {
    console.log('getting work orders by phone: ' + phone)
    return this.http.get<WorkOrder[]>(this.url + '/vehicle/customer/phone/' + phone, this.httpOptions).pipe(
      catchError(this.handleError<WorkOrder[]>(`getWorkOrder`, ))
    );
  }

  getCompletedWorkOrder(): Observable<WorkOrder[]> {
    return this.http.get<WorkOrder[]>(this.url + '/complete', this.httpOptions).pipe(
      catchError(this.handleError<WorkOrder[]>(`getCompletedWorkOrder`, []))
    );
  }

  getOpenWorkOrders(): Observable<WorkOrder[]> {
    return this.http.get<WorkOrder[]>(this.url + '/pending', this.httpOptions);
  }


  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      return of(result as T);
    }
  }
}
