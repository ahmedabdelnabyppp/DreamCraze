import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { validEmail } from '../../core/validator/Validator';
import { AuthService } from '../../core/services/authentication.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  loginForm!: FormGroup;
  Token: string | undefined;
  authenticationError: string | undefined
  constructor( private _builderForm: FormBuilder, private _AuthService: AuthService, private router: Router) {
    this.loginForm = this._builderForm.group({
      email: ['', [Validators.required, Validators.email, validEmail]],
      password: ['', [Validators.required, Validators.minLength(5)]]
    });
  }


  Login() {
    if (this.loginForm.valid) {
      this._AuthService.authentication(this.loginForm.value).subscribe(
        response => {
          this._AuthService.setToken(response.token);
          this.createSessionForUser();
        },
        error => {
          this.authenticationError = error.error.message;
        }
      );
    }
  }

  createSessionForUser(): void {
    const token = '' + this._AuthService.getTokenFromCookie();
    if (this.checkTokenInCookies(token)) {
      this._AuthService.setUserInfoInSessionStorage(token);
      this.router.navigate(['/']);
    }
  }

  private checkTokenInCookies(token: string | null): boolean {
    return !!token;
  }
}
