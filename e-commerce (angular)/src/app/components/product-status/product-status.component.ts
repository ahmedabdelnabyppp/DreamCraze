import { Component, OnDestroy, OnInit } from '@angular/core';
import { ProductStatusService } from '../../core/services/productStatus.service';
import { Subscription } from 'rxjs';
import { translateAnimation } from '../../shared/animations/translateAnimation';

@Component({
  selector: 'app-product-status',
  templateUrl: './product-status.component.html',
  styleUrl: './product-status.component.css',
  animations:[translateAnimation]
})
export class ProductStatusComponent implements OnInit , OnDestroy {
  constructor(private _productStutesService: ProductStatusService) { }
  ShowProductStutes: boolean = false;
  ProductIsAdded!:any;
  subscribtion!:Subscription
  ngOnInit(): void {
    this.subscribtion=this._productStutesService.isProductAddedToCart$.subscribe(Stutes => {
      this.ShowProductStutes = Stutes;
      this.ProductIsAdded=this._productStutesService.getProductIsAdded();
      if(this.ShowProductStutes!=false){
        setTimeout(()=>{
          this._productStutesService.updateProductStatus(false);
        },4000)
      }
    })
  }
  ngOnDestroy(): void {
      if(this.subscribtion){
        this.subscribtion.unsubscribe();
      }
  }
}
