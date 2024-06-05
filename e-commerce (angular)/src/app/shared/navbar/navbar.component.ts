import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators'; // Import the 'operators' from 'rxjs'
import { AuthService } from '../../core/services/authentication.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'] // Corrected 'styleUrl' to 'styleUrls'
})
export class NavbarComponent implements OnInit {

  @ViewChild('link_container') linksContainer!: ElementRef;
  isleft: boolean = false;
  currentRoute!: string;
  scrollLefts = 0;
  hiddenNavbar: boolean = true;
  showIcon: boolean = false
  constructor(private router: Router, private _activeRoute: ActivatedRoute, private _Auth: AuthService) { }
  urlHidden: any[] = ['/signup', '/signin', '/dashboard', '/dashboard/product', '/signup/verification']

  ngOnInit(): void {
    this.showIcon=false
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      this.getCurrentRoute();
      if (this.urlHidden.includes(this.currentRoute) || this.urlHidden.includes(this.currentRoute.slice(0, 10))) {
        this.hiddenNavbar = false;
      } else {
        this.hiddenNavbar = true;
      }
    });
    this.getTokenFromCookies();
  }
  getTokenFromCookies() {
    this._Auth.getToken().subscribe(token => {
      if (token) {
        this.showIcon = false;
      }
      else {
        this.showIcon = true;
      }
    });
  }


  getCurrentRoute(): void {
    this.currentRoute = this.router.url;
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
