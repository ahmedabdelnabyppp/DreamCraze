import { AfterViewInit, ChangeDetectorRef, Component, ViewChild } from '@angular/core';
import { routingAnimation } from '../../shared/animations/opacityAnimation';
import { Router, RouterOutlet } from '@angular/router';
import { AuthService } from '../../core/services/authentication.service';


@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrl: './account.component.css',
  animations: [routingAnimation]
})
export class AccountComponent implements AfterViewInit {
  @ViewChild(RouterOutlet, { static: true }) outletRef!: RouterOutlet;

  constructor(private route: Router, private cdr: ChangeDetectorRef, private authService: AuthService) { }

  ngAfterViewInit() {
    this.cdr.detectChanges(); // Manually trigger change detection after view initialization
  }
  logout(): void {
    this.authService.logout();
    this.route.navigateByUrl('/');
  }

}
