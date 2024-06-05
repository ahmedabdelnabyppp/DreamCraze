import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../../core/services/authentication.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-verification-email',
  templateUrl: './verification-email.component.html',
  styleUrl: './verification-email.component.css'
})
export class VerificationEmailComponent implements OnInit {

  verificationNumber: string[] = ['', '', '', '', '', ''];
  constructor(private _authService: AuthService, private _router: Router, private route: ActivatedRoute) {
  }
  userData!: any[];

  ngOnInit(): void {
 
  }

  getOtpForUser(): string {
    return this.verificationNumber.join('');
  }

  verifyEmail(): void {
    const OTP = this.getOtpForUser();
    this._authService.verifycationEmail(OTP).subscribe(response => {
      this._authService.setToken(response.token);
      const token = this._authService.getTokenFromCookie();
      if (token) {
        this._authService.setUserInfoInSessionStorage(token);
        this._router.navigate(['/']);
      }
    });
  }
}
