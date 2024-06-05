import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { CategoryService } from '../../core/services/category.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrl: './category.component.css'
})
export class CategoryComponent implements OnInit {
  subscription!: Subscription;
  allCategory!: any[];
  @ViewChild('link_container') linksContainer!: ElementRef;
  isleft: boolean = false;
  currentRoute!: string;
  scrollLefts = 0;
  constructor(private _CategoryService: CategoryService) { }
  ngOnInit(): void {
    this.subscription = this._CategoryService.getAllCategory().subscribe(respons => {
      this.allCategory = respons;
    })
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
  scrollLeft(): void {
    this.linksContainer.nativeElement.scrollBy({
      left: -300,
      behavior: 'smooth'
    });
    this.scrollLefts = this.linksContainer.nativeElement.scrollLeft;
    if (this.scrollLefts <= 300 || this.scrollLefts == 0) {
      this.isleft = false;
    }
  }

  scrollRight(): void {
    this.linksContainer.nativeElement.scrollBy({
      left: 300,
      behavior: 'smooth'
    });
    this.isleft = true;
    this.scrollLefts = this.linksContainer.nativeElement.scrollLeft;
  }
}
