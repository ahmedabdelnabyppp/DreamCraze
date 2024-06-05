import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { validName, validNumber } from '../../../../core/validator/Validator';
import { AddressService } from '../../../../core/services/addres.service';
import { Subscription } from 'rxjs';
import { translateAnimation } from '../../../../shared/animations/translateAnimation';
import { response } from 'express';
import { AuthService } from '../../../../core/services/authentication.service';
@Component({
  selector: 'app-address',
  templateUrl: './address.component.html',
  styleUrl: './address.component.css',
  animations: [translateAnimation]
})
export class AddressComponent implements OnInit, OnDestroy {
  addresForm!: FormGroup
  street!: FormControl
  city!: FormControl
  landmark!: FormControl
  country!: FormControl
  deliveryInstruction!: FormControl
  Subscription!: Subscription;
  massage: string = '';
  userId:number | undefined;

  User_Address: any[] = []
  constructor(private _FromBuilder: FormBuilder, private authService: AuthService, private AddressService: AddressService) {
    this.initialControl();
    this.createForm();
    this.userId=this.authService.getUserInfoFromSessionStorage()?.userId;
  }

  ngOnInit(): void {
    
    this.getUserAddress();
  }

  initialControl() {
    this.street = new FormControl('', { validators: [Validators.required], updateOn: 'blur' })
    this.city = new FormControl('', [Validators.required, validName()])
    this.landmark = new FormControl('', [Validators.required, validName()])
    this.country = new FormControl('', [Validators.required, validName()])
    this.deliveryInstruction = new FormControl('Home (7am-9pm , all days)')
  }

  createForm() {
    this.addresForm = this._FromBuilder.group({
      street: this.street,
      city: this.city,
      country: this.country,
      landmark: this.landmark,
      deliveryInstruction: this.deliveryInstruction

    })
  }

  createAddress(): void {
    if (this.addresForm.valid) {
      this.Subscription = this.AddressService.createAddress(
        { ...this.addresForm.value, userId: this.userId }
      ).subscribe(data => {
        this.massage = data.message;
        setTimeout(() => {
          if (this.Subscription) {
            this.Subscription.unsubscribe();
          }
        }, 2000)
        this.getUserAddress();
      })
    }
  }

  getUserAddress(): void {
    this.Subscription = this.AddressService.getUserAddresses(this.userId).subscribe(addressRespons => {
      this.User_Address = addressRespons;
      console.log(addressRespons)
    })
  }

  deleteAddress(addressId: number): void {
    this.Subscription = this.AddressService.deleteAddress(addressId).subscribe(
      response => {
        this.massage = response?.message;
        this.getUserAddress();
      }
    )

  }

  activeAddress(addressId: number) {
    const activeAddress = {
      addresId: addressId,
      userId: this.authService.getUserInfoFromSessionStorage()?.userId
    }
    this.AddressService.useAddress(activeAddress).subscribe(httpResponse => {
      this.massage = httpResponse.message;
      console.log(this.massage)
    })
  }
  ngOnDestroy(): void {
    if (this.Subscription) {
      this.Subscription.unsubscribe();
    }
  }

}
