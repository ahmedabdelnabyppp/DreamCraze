import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { ProductService } from '../../core/services/product.service';
import { Subscription } from 'rxjs';
import { ProductStatusService } from '../../core/services/productStatus.service';

@Component({
  selector: 'app-product-carousel',
  templateUrl: './product-carousel.component.html',
  styleUrl: './product-carousel.component.css'
})
export class ProductCarouselComponent implements OnInit, OnDestroy {
  @Input('Category') Category!: string;
  @Input('titleSection') titleSection!: string;
  LaptopProduct!: any[];
  loading: boolean[] = [];
  statusMessage!: string;
  subscription!: Subscription
  constructor(private _productService: ProductService, private _productStatusService: ProductStatusService) { }
  ngOnInit(): void {
    this.subscription = this._productService.getProductsWithCategory(this.Category).subscribe(laptop => {
      this.LaptopProduct = laptop;
      console.log(this.LaptopProduct)
    })
  }


  AddToCart(product: any, index: number) {
    this.loading[index] = true;
    setTimeout(() => {
      this.loading[index] = false;
      this.statusMessage = this._productService.AddProductToCart(product);
      this._productStatusService.MassageStutas = this.statusMessage;
      this._productStatusService.DisplayProductStatus(product);
    }, 3000);
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: false,
    navSpeed: 700,
    navText: ['<i class="bx bxs-chevron-left text-slate-700 text-2xl"></i>', '<i class="bx bxs-chevron-right text-slate-700 text-2xl"></i>'], // Example assumes FontAwesome icons

    responsive: {
      0: {
        items: 1.6
      },
      400: {
        items: 2.4
      },
      740: {
        items: 3.5
      },
      940: {
        items: 6
      }
    },
    nav: true
  }
}
