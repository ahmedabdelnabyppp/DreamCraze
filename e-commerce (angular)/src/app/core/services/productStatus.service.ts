import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";

@Injectable({ providedIn: 'root' })
export class ProductStatusService {
    constructor() { }
    MassageStutas!: string;
    private isProductAddedToCartSubject = new BehaviorSubject<boolean>(false);
    isProductAddedToCart$ = this.isProductAddedToCartSubject.asObservable();

    private productIsAdded!: any[];

    DisplayProductStatus(product: any) {
        this.productIsAdded = product;
        this.updateProductStatus(true);
    }
    hiddenProductStatus() {
        this.updateProductStatus(false);
    }

    getProductIsAdded(): any[] {
        return [this.productIsAdded, this.MassageStutas];
    }
    updateProductStatus(status: boolean) {
        this.isProductAddedToCartSubject.next(status);
    }



}