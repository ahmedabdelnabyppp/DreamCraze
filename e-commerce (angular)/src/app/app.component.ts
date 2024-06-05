import { AfterViewInit, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { routingAnimation } from './shared/animations/opacityAnimation';
import { AuthService } from './core/services/authentication.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  animations: [routingAnimation]
})

export class AppComponent implements OnInit, AfterViewInit {
  constructor(private cdr: ChangeDetectorRef, private authService: AuthService) { }
  ngOnInit(): void {
    const token = this.authService.getTokenFromCookie();
    if (token) {
      this.authService.setUserInfoInSessionStorage(token);
    }
  }
  
  ngAfterViewInit() {
    this.cdr.detectChanges();
  }
}
