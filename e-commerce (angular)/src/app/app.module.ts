import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomeComponent } from './pages/home/home.component';
import { ProductsComponent } from './pages/products/products.component';
import { ShippingCartComponent } from './pages/shipping-cart/shipping-cart.component';
import { ProductDetailsComponent } from './pages/product-details/product-details.component';
import { SharedModule } from './shared/shared.module';
import { HttpClientModule } from '@angular/common/http';
import { ProductCarouselComponent } from './components/product-carousel/product-carousel.component';
import { ProductStatusComponent } from './components/product-status/product-status.component';
import { FilterComponent } from './components/filter/filter.component';
import { LoginComponent } from './pages/login/login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { httpInterceptorProvider } from './core/services/http/httpInterceptorProvider';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { AccountComponent } from './pages/account/account.component';
import { OrdersComponent } from './pages/account/components/orders/orders.component';
import { AddressComponent } from './pages/account/components/address/address.component';
import { CategoryComponent } from './components/category/category.component';
import { LoadingComponent } from './components/loading/loading.component';
import { SignupComponent } from './pages/signup/signup.component';
import { RegisterComponent } from './pages/signup/components/register/register.component';
import { VerificationEmailComponent } from './pages/signup/components/verification-email/verification-email.component';
import { FormsModule } from '@angular/forms';
import { AdminModule } from './admin/admin.module';
import { CheckoutComponent } from './pages/checkout/checkout.component';
import { FooterComponent } from './components/footer/footer.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ProductsComponent,
    ShippingCartComponent,
    ProductDetailsComponent,
    ProductCarouselComponent,
    ProductStatusComponent,
    FilterComponent,
    LoginComponent,
    NotFoundComponent,
    AccountComponent,
    OrdersComponent,
    AddressComponent,
    CategoryComponent,
    LoadingComponent,
    SignupComponent,
    RegisterComponent,
    VerificationEmailComponent,

    CheckoutComponent,
      FooterComponent,

  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    AdminModule,
    SharedModule,
    AppRoutingModule,
    CarouselModule,
    FormsModule,
    BrowserAnimationsModule,

  ],
  providers: [
    provideClientHydration(),
    httpInterceptorProvider
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
