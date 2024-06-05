import { NgModule } from '@angular/core';
import { RouterModule, Routes, UrlSerializer } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { ShippingCartComponent } from './pages/shipping-cart/shipping-cart.component';
import { ProductDetailsComponent } from './pages/product-details/product-details.component';
import { ProductsComponent } from './pages/products/products.component';
import { LoginComponent } from './pages/login/login.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { AccountComponent } from './pages/account/account.component';
import { OrdersComponent } from './pages/account/components/orders/orders.component';
import { AddressComponent } from './pages/account/components/address/address.component';
import { SignupComponent } from './pages/signup/signup.component';
import { RegisterComponent } from './pages/signup/components/register/register.component';
import { VerificationEmailComponent } from './pages/signup/components/verification-email/verification-email.component';
import { AuthGuard } from './core/guards/auth.guard';
import { AdminComponent } from './admin/admin.component';
import { DashboardComponent } from './admin/pages/dashboard/dashboard.component';
import { PostProductComponent } from './admin/pages/post-product/post-product.component';
import { PostcategoryComponent } from './admin/pages/postcategory/postcategory.component';
import { CheckoutComponent } from './pages/checkout/checkout.component';
import { AdminGuard } from './core/guards/admin.guard';
import { UserGuard } from './core/guards/user.guard';

const routes: Routes = [
  { path: '',canActivate: [UserGuard], component: HomeComponent },
  { path: 'shopping-cart',canActivate: [UserGuard], component: ShippingCartComponent },
  { path: 'checkout', canActivate: [AuthGuard,UserGuard], component: CheckoutComponent },
  { path: 'signin', component: LoginComponent, pathMatch: 'full', },
  { path: 'product/:productCatogary',canActivate: [UserGuard], component: ProductsComponent },
  { path: 'details/:id', component: ProductDetailsComponent },
  {
    path: 'dashboard', canActivate: [AuthGuard, AdminGuard], component: AdminComponent, children: [
      { path: '', component: DashboardComponent },
      { path: 'product', component: PostProductComponent },
      { path: 'category', component: PostcategoryComponent }

    ]
  },
  {
    path: "Account", canActivate: [AuthGuard,UserGuard], component: AccountComponent, children: [
      { path: '', component: AddressComponent },
      { path: 'order', component: OrdersComponent },
    ]
  },
  {
    path: 'signup', component: SignupComponent, children: [
      { path: '', component: RegisterComponent },
      { path: 'verification', component: VerificationEmailComponent }
    ]
  },
  { path: "**", component: NotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }