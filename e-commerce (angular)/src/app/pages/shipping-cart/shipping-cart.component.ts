import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../core/services/product.service';
import { CookieService } from 'ngx-cookie-service';
import { DeleteAnimation, routingAnimation } from '../../shared/animations/opacityAnimation';
import { CheckoutService } from '../../core/services/checkout.service';
import { Router } from '@angular/router';
import { AuthService } from '../../core/services/authentication.service';

@Component({
  selector: 'app-shipping-cart',
  templateUrl: './shipping-cart.component.html',
  styleUrls: ['./shipping-cart.component.css'],
  animations: [DeleteAnimation]
})
export class ShippingCartComponent implements OnInit {

  constructor(private route: Router, private authService: AuthService, private checkoutService: CheckoutService, private _productService: ProductService, private cookieService: CookieService) { }
  productsFromCart: any[] = [];
  ProductOrder: any[] = [];
  TotalPrice: number = 0;
  selectedQuantity: number = 1
  OrderAddress: any;
  messageToConfirmDiscount!:string;


  ngOnInit(): void {
    this.productsFromCart = this._productService.getProductsFromCart();
    this.defaultQuantityProduct();
    this.TotalPrice = this.getTotalPriceInCart();
    window.scrollTo({left:0,top:0,behavior:'smooth'})

  }

  updateQuantity(event: any, product: any): void {
    this.selectedQuantity = parseInt(event.target.value);
    const index = this.productsFromCart.findIndex(p => p.id === product.id);
    if (index !== -1) {
      this.ProductOrder.splice(index, 1);
      product.quantity = this.selectedQuantity;
      this.ProductOrder.push(product);
    }
  }
  defaultQuantityProduct() {
    this.productsFromCart.forEach(product => {
      product.quantity = 1;
    });
    this.ProductOrder = this.productsFromCart;
    console.log(this.ProductOrder)
  }


  deleteProductFromCart(productId: string): void {
    const index = this.productsFromCart.findIndex(product => product.id === productId);
    if (index !== -1) {
      this.productsFromCart.splice(index, 1);
      const updatedCookieValue = JSON.stringify(this.productsFromCart);
      this.cookieService.set('productInCart', updatedCookieValue, new Date().getTime() + (2 * 60 * 60 * 1000), '/'); // Reset expiration date to 1 minute from now
      this.TotalPrice = this.getTotalPriceInCart();
    }
  }

  getTotalPriceInCart(): number {
    let totalPrice = 0;
    this.messageToConfirmDiscount=''
    if(this.productsFromCart.length>=4){
       totalPrice-=2000;
       this.messageToConfirmDiscount="You got a 2000 EGP discount "
    }
    this.productsFromCart.forEach((product) => {
      const price = product.price;
      console.log(product)
      totalPrice += price;
    });
    return totalPrice;
  }

  placeOrder(): void {
    const order = {
      userId: this.authService.getUserInfoFromSessionStorage()?.userId,
      totalpriceorder: this.TotalPrice,
      order: this.ProductOrder
    };
    console.log(order);
    this.route.navigate(['./checkout'], { queryParams: { order: JSON.stringify(order) } });
  }
  getRangeArray(start: number, end: number): number[] {
    return Array.from({ length: end - start + 1 }, (_, index) => index + start);
  }


}


