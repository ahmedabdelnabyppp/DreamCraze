import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError, BehaviorSubject } from 'rxjs';
import { catchError, delay, finalize } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AddressService {
  private loadingSubject = new BehaviorSubject<boolean>(false);
  public loading$ = this.loadingSubject.asObservable();

  private loadingActiveSubject = new BehaviorSubject<boolean>(false);
  public loadingActiveAdddress$ = this.loadingActiveSubject.asObservable();
  constructor(private _httpClient: HttpClient) { }

  createAddress(addressRequest: any): Observable<any> {
    this.loadingSubject.next(true); // Show loading component
    return this._httpClient.post("http://localhost:8090/api/address/create", addressRequest)
      .pipe(
        delay(2000),
        catchError(error => {
          return throwError(error);
        }),
        finalize(() => this.loadingSubject.next(false))
      );
  }

  getUserAddresses(userId: any): Observable<any> {
    this.loadingSubject.next(true);
    return this._httpClient.get(`http://localhost:8090/api/address/users/${userId}/addresses`)
      .pipe(
        catchError(error => {
          return throwError(error);
        }),
        finalize(() => this.loadingSubject.next(false))
      );
  }

  deleteAddress(addressId: number): Observable<any> {
    this.loadingSubject.next(true);
    return this._httpClient.post("http://localhost:8090/api/address/delete", addressId)
      .pipe(
        delay(2000),
        catchError(error => {
          return throwError(error);
        }),
        finalize(() => this.loadingSubject.next(false))
      );
  }
  useAddress(ActiveData: any): Observable<any> {
    this.loadingActiveSubject.next(true);
    return this._httpClient.post("http://localhost:8090/api/address/active", ActiveData)
      .pipe(
        delay(2000),
        catchError(error => {
          return throwError(error);
        }),
        finalize(() => this.loadingActiveSubject.next(false))
      );
  }
  getOrderAddress(userId: any): Observable<any> {
    return this._httpClient.get(`http://localhost:8090/api/address/OrderAddress/${userId}`)
  }
}
