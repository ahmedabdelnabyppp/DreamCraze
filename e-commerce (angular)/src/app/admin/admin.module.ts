import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminComponent } from './admin.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { SidbarComponent } from './components/sidbar/sidbar.component';
import { RouterModule } from '@angular/router';
import { UserComponent } from './components/user/user.component';
import { CardComponent } from './components/card/card.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { PostProductComponent } from './pages/post-product/post-product.component';
import { HeaderComponent } from './components/header/header.component';
import { MassageComponent } from './components/massage/massage.component';
import { PostcategoryComponent } from './pages/postcategory/postcategory.component';

@NgModule({
  declarations: [
    AdminComponent,
    SidbarComponent,
    UserComponent,
    CardComponent,
    DashboardComponent,
    PostProductComponent,
    HeaderComponent,
    MassageComponent,
    PostcategoryComponent
    
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    ReactiveFormsModule,
    HttpClientModule,
  ]
})
export class AdminModule { }
