import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route } from '@angular/router';
import { Subscription } from 'rxjs';
import { ProductService } from '../../core/services/product.service';
import { OwlOptions } from 'ngx-owl-carousel-o';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.css'
})
export class ProductDetailsComponent implements OnInit {
   subscription!:Subscription
   productDestails:any
  constructor(private _router:ActivatedRoute,private _productService:ProductService) {}
  ngOnInit(): void {
      this._router.params.subscribe(params=>{
        this.subscription=this._productService.getProductDetails(params['id']).subscribe(details=>{
          this.productDestails=details[0];
          console.log(this.productDestails)
        });
      })
      window.scrollTo({left:0,top:0,behavior:'smooth'})
  }



  
  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    dots: true,
    navSpeed: 700,
    navText: ['', ''],
    autoplay:true,
    autoplaySpeed:2000,
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 1
      },
      740: {
        items: 1
      },
      940: {
        items: 1
      }
    },
    nav: false
  }
}
