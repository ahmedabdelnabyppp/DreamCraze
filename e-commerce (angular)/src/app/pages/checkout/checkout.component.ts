import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../core/services/authentication.service';
import { AddressService } from '../../core/services/addres.service';
import { CheckoutService } from '../../core/services/checkout.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.css'
})
export class CheckoutComponent implements OnInit {
  constructor(private adddressService: AddressService,
    private route: ActivatedRoute,
    private authService: AuthService,
    private checkoutService: CheckoutService,
    private router: Router
  ) { }
  orderData: any
  emailUser: string | undefined;
  addressUserIsActive: any[] = [];
  totalPrice!: number | string;
  numberOfItem!: number;

  ngOnInit(): void {
    this.getEmailUser();
    this.getOrderAddressByuserId();
    this.route.queryParams.subscribe(params => {
      this.orderData = JSON.parse(params['order'])
      console.log(this.orderData)
      this.totalPrice = this.orderData.totalpriceorder;
      this.numberOfItem = this.orderData.order.length;
    });
  }

  saveOrderInDatabase() {
    this.checkoutService.createOrder(this.orderData).subscribe(httpResponse => {
      console.log(httpResponse)
      if (httpResponse.message == "order added successfully") {
        this.router.navigateByUrl('/Account/order')
      }
    })
  }

  getEmailUser(): void {
    const userDataFromSession = this.authService.getUserInfoFromSessionStorage();
    this.emailUser = userDataFromSession?.email;
  }

  getOrderAddressByuserId() {
    this.adddressService.getOrderAddress(this.authService.getUserInfoFromSessionStorage()?.userId).subscribe(httpResponse => {
      this.addressUserIsActive = httpResponse;
    })
  }
  goToAccount(): void {
    this.router.navigateByUrl('/Account')
  }

}
