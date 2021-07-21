import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import { Vehicle } from '../interface/vehicle';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class VehicleService {
  constructor(private http: HttpClient, private cookieService: CookieService) { }

  // url = `http://localhost:8080/vehicles`
  url: string = `http://ec2-54-67-83-160.us-west-1.compute.amazonaws.com:8080/Project%202/vehicles`;

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

  getAllVehicle(): Observable<Vehicle[]> {
    //Add in URL from server;
    return this.http.get<Vehicle[]>(this.url, this.httpOptions).pipe(
      catchError(this.handleError<Vehicle[]>(`getAllVehicle`, []))
    )
  }

  getVehicleByCustomerId(id: number): Observable<Vehicle[]> {
    return this.http.get<Vehicle[]>(this.url + `/customer/` + id, this.httpOptions).pipe(
      catchError(this.handleError<Vehicle[]>(`getByCustomerId`))
    )
  }

  getVehicleById(id: number): Observable<Vehicle> {
    return this.http.get<Vehicle>(this.url + '/' + id, this.httpOptions).pipe(
      catchError(this.handleError<Vehicle>(`getById`))
    )
  }

  //create function that add a new vehicle
  addVehicle(vehicle: Vehicle): Observable<Vehicle> {
    console.log(vehicle);
    return this.http.post<Vehicle>(this.url + '/add', vehicle, this.httpOptions).pipe(
      catchError(this.handleError<Vehicle>(`createVehicle`))
    )
  }

}
