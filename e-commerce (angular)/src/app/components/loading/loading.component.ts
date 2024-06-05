import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Observable } from 'rxjs';
import { AddressService } from '../../core/services/addres.service';
import { AuthService } from '../../core/services/authentication.service';

@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrl: './loading.component.css'
})
export class LoadingComponent implements OnInit, OnChanges {
  isLoadingAddress$!: Observable<boolean>;
  isLoadingReqester$!: Observable<boolean>;
  isLoadingActiveAddress$!: Observable<boolean>;
  @Input("message") message!: String;
  messageChange!: String;
  constructor(private addressService: AddressService, private authService: AuthService) {
    this.messageChange = this.message;
  }
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['message'] && !changes['message'].firstChange) {
      this.messageChange = this.message;
    }
  }
  ngOnInit(): void {
    this.isLoadingAddress$ = this.addressService.loading$;
    this.isLoadingReqester$ = this.authService.loadingRegsiter$;
    this.isLoadingActiveAddress$=this.addressService.loadingActiveAdddress$

  }
}
