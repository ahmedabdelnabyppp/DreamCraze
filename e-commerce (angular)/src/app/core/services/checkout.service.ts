import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ProductService } from './product.service';

@Injectable({
    providedIn: 'root'
})
export class CheckoutService {
    constructor(private _http: HttpClient, private productService: ProductService) { }

    createOrder(orderData: any): Observable<any> {
        if (orderData) {
            this.removeAllPoductInCart();
        }
        return this._http.post("http://localhost:8090/api/order/create", orderData);
    }
    
    private removeAllPoductInCart(): void {
        this.productService.clearProductsFromCart();
    }
}
