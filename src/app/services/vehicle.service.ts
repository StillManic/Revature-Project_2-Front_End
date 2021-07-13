import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import { Vehicle } from '../interface/vehicle';

@Injectable({
  providedIn: 'root'
})
export class VehicleService {

  constructor(private http: HttpClient) { }

  url = `http://localhost:8080/vehicles`

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

  getAllVehicle(): Observable<Vehicle[]> {
    //Add in URL from server;
    return this.http.get<Vehicle[]>(this.url).pipe(
      catchError(this.handleError<Vehicle[]>(`getAllVehicle`, []))
    )
  }

  getVehicleByCustomerId(id: number): Observable<Vehicle[]> {
    return this.http.get<Vehicle[]>(this.url + `/customer/` + id).pipe(
      catchError(this.handleError<Vehicle[]>(`getByCustomerId`))
    )
  }

  getVehicleById(id: number): Observable<Vehicle> {
    return this.http.get<Vehicle>(this.url + '/' + id).pipe(
      catchError(this.handleError<Vehicle>(`getById`))
    )
  }
}
