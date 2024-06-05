import { Component } from '@angular/core';
import { AuthService } from '../../../core/services/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidbar',
  templateUrl: './sidbar.component.html',
  styleUrl: './sidbar.component.css'
})
export class SidbarComponent {
  constructor(private authService: AuthService, private route: Router) { }
  logout() {
    this.authService.logout();
    this.route.navigateByUrl('/');
  }

}
