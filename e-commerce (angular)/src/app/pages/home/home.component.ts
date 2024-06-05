import { Component, OnInit } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { ProductService } from '../../core/services/product.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  constructor(private _productService: ProductService, private router: Router) { }
  ngOnInit(): void {

  }

  imagelist: string[] = [
    '../assets/N53398634A-1.jpg',
    '../assets/wide_banner_1.jpg',
    '../assets/pi4g9oh5vfgodeis-0_0_desktop_0_1X.webp',
    '../assets/AUSU1.webp',
    '../assets/Banner_241222123531_570447.jpg',
    '../assets/fwebp (1).webp',
    '../assets/fwebp (2).webp',
    '../assets/fwebp (3).webp',
    '../assets/fwebp (4).webp',
  ]

  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    dots: true,
    navSpeed: 700,
    navText: ['', ''],
    autoplay: true,
    autoplaySpeed: 2000,
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
  navigateToRoute() {
    this.router.navigate(['/product/gamingmonitor']); // Replace '/your-route' with your actual route
  }
}
