import { Component, OnDestroy, OnInit } from '@angular/core';
import { routingAnimation } from '../../shared/animations/opacityAnimation';
import { ProductService } from '../../core/services/product.service';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
  animations: [routingAnimation]
})
export class ProductsComponent implements OnInit, OnDestroy {
  Allaptop: any[] = [];
  laptopToCurrentShow: any[] = [];
  subscription: Subscription | undefined;
  subcripRoute: Subscription | undefined;
  firstProductNumber: number = 0;
  endProductNumber: number = 9;
  numberOfProductToShow: number = 9;
  productCategory: string | undefined;
  show: boolean = true;
  uniqueBrands: any[] = [];

  constructor(
    private _productService: ProductService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.subscribeToRouteParams();
    this.subscribeToRouterEvents();
    window.scrollTo({left:0,top:0,behavior:'smooth'})
  }

  subscribeToRouteParams(): void {
    this.subcripRoute = this.route.params.subscribe(params => {
      this.productCategory = params['productCatogary'];
      this.getProductWithCategory(this.productCategory, this.firstProductNumber, this.endProductNumber);
    });
  }

  subscribeToRouterEvents(): void {
    this.subscription = this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      this.show = false;
      setTimeout(() => this.show = true, 0);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  getProductWithCategory(productCategory: string | undefined, firstProductNumber: number, endProductNumber: number): void {
    if (productCategory) {
      this.subscription = this._productService.getProductsWithCategory(productCategory).subscribe(data => {
        this.Allaptop = data;
        this.laptopToCurrentShow = this.Allaptop.slice(firstProductNumber, endProductNumber);
        this.getAllBrand();
      });
    }
  }

  showMoreProduct(): void {
    if (this.Allaptop.length > this.endProductNumber) {
      this.endProductNumber += this.numberOfProductToShow;
      this.firstProductNumber += this.numberOfProductToShow;
      const newProductToShow: any[] = this.Allaptop.slice(this.firstProductNumber, this.endProductNumber);
      this.laptopToCurrentShow.push(...newProductToShow);
    }
  }

  changeGrid(moodChange: boolean): void {
    this.show = moodChange;
  }

  getAllBrand(): void {
    this.uniqueBrands = [];
    if (Array.isArray(this.Allaptop)) {
      const brandSet = new Set();
      this.Allaptop.forEach(item => {
        if (item.brand !== null) {
          brandSet.add(item.brand);
        }
      });
      this.uniqueBrands = Array.from(brandSet);
    } else {
      console.log("Allaptop is undefined or not an array.");
    }
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
    if (this.subcripRoute) {
      this.subcripRoute.unsubscribe();
    }
  }
}
