import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError, BehaviorSubject } from 'rxjs';
import { catchError, delay, finalize } from 'rxjs/operators';
import { AuthService } from './authentication.service';

@Injectable({
    providedIn: 'root'
})
export class OrderService {
    private loadingActiveSubject = new BehaviorSubject<boolean>(false);
    public loadingActiveAdddress$ = this.loadingActiveSubject.asObservable();
    constructor(private _httpClient: HttpClient, private _sessionSerivce: AuthService) { }

    getOrderByUserId(): Observable<any> {
        return this._httpClient.get(`http://localhost:8090/api/order/productsInOrder?userId=${this._sessionSerivce.getUserInfoFromSessionStorage()?.userId}`);
    }
    canselOrder(orderId:any): Observable<any> {
        return this._httpClient.delete(`http://localhost:8090/api/order/productsInOrder?userId=${orderId}`);
    }
}
