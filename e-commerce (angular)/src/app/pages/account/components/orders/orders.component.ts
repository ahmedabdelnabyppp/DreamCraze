import { Component, OnInit } from '@angular/core';
import { OrderService } from '../../../../core/services/order.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.css'
})
export class OrdersComponent implements OnInit {

  constructor(private orderService: OrderService) { }
  allOrders: any[] = [];
  totalOrderPrice!: number;
  ngOnInit(): void {
    this.getAllorders();

  }
  getAllorders(): void {
    this.orderService.getOrderByUserId().subscribe(orders => {
      this.allOrders = orders;
      this.calculateTotalOrderPrice();
      console.log(this.allOrders)
    })
  }
  calculateTotalOrderPrice(): void {
    this.totalOrderPrice = this.allOrders.reduce((total, order) => total + order.totalPrice, 0);

  }
  canselOrder(orderId: any) {
    this.orderService.canselOrder(orderId).subscribe(response => {
      console.log(response);
    })
  }
}
