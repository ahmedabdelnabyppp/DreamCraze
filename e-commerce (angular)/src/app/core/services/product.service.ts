import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { CookieService } from "ngx-cookie-service";
import { Observable } from "rxjs";

@Injectable({ providedIn: 'root' })
export class ProductService {
    private productInCart: any[] = [];
    private EXPIRATION_DATE: Date = new Date(new Date().getTime() + 2 * 60 * 60 * 1000);
    REQUEST_MAPPING: string = 'http://localhost:8090/api/products'
    constructor(private _http: HttpClient, private cookieService: CookieService) { }

    getProductsWithCategory(Category: string): Observable<any> {
        return this._http.get(`${this.REQUEST_MAPPING}/category/${Category}`);
    }

    AddProductToCart(product: any): string {
        const existingProducts = this.getProductsFromCart();
        const productExists = existingProducts.some((existingProduct: { id: any; }) => {
            return existingProduct.id === product.id;
        });
        if (productExists) {
            return "Exist";
        }
        existingProducts.push(product);
        this.cookieService.set('productInCart', JSON.stringify(existingProducts), this.EXPIRATION_DATE, '/');
        return "succuss";
    }
    clearProductsFromCart(): void {
        this.cookieService.delete('productInCart', '/');
    }

    saveProductInDatabase(productData: any): Observable<any> {
        return this._http.post(`${this.REQUEST_MAPPING}/create`, productData)
    }


    getProductsFromCart(): any {
        const productJson = this.cookieService.get('productInCart');
        if (productJson) {
            return JSON.parse(productJson);
        } else {
            return [];
        }
    }

    getProductDetails(identify:any): Observable<any> {
        return this._http.get(`${this.REQUEST_MAPPING}/productDetails/${identify}`);
    }

    getAllProduct(): Observable<any> {
        return this._http.get<any>(`${this.REQUEST_MAPPING}/all`);
    }

    deleteProduct(productId: string): Observable<any> {
        return this._http.delete(`${this.REQUEST_MAPPING}/product/${productId}`);
    }
    updateProduct(productDataUpdate: any): Observable<any> {
        return this._http.put(`${this.REQUEST_MAPPING}/update`, productDataUpdate);
    }
}
