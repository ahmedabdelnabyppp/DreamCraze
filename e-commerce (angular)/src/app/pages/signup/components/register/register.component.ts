
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { passwordValidator, validEmail, validName, validNumber } from '../../../../core/validator/Validator';
import { AuthService } from '../../../../core/services/authentication.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  name!: FormControl;
  email!: FormControl;
  password!: FormControl;
  phone!: FormControl;
  registrationForm!: FormGroup;
  ShowStrongPasswordMessage: boolean = false;
  errorResponse!: HttpErrorResponse;
  errorMessage: string = ''
  constructor(private _router: Router, private _formBuilder: FormBuilder, private _authService: AuthService) { }
  ngOnInit(): void {
    this.initialControls();
    this.createRegistrationFrom();

  }
  initialControls(): void {
    this.name = new FormControl('', [Validators.required, validName()]);
    this.email = new FormControl('', [Validators.required, validEmail]);
    this.password = new FormControl('', [Validators.required, passwordValidator()]);
    this.phone = new FormControl('');
  }
  createRegistrationFrom() {
    this.registrationForm = this._formBuilder.group({
      name: this.name,
      email: this.email,
      password: this.password,
      phone: this.phone,
    })
  }
  createAccount(): void {
    this._authService.register(this.registrationForm.value).subscribe(
      (data) => {
        this._router.navigate(['/signup/verification']);
      },
      (error) => {
        this.errorResponse = error;
        this.errorMessage = this.errorResponse.error.message;
        console.log(this.errorMessage)
      }
    );
  }

  set_True_StrongPasswordMessage(): void {
    this.ShowStrongPasswordMessage = true;
  }
  set_False_StrongPasswordMessage(): void {
    this.ShowStrongPasswordMessage = false;
  }
}
