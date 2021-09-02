import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthenticationComponent } from './components/authentication/authentication.component';
import { ProductsComponent } from './components/products/products.component';
import { HomeComponent } from './components/home/home.component';
import { ProductpageComponent } from './components/productpage/productpage.component';
import { ShoppingcartComponent } from './components/shoppingcart/shoppingcart.component';
import { UserprofileComponent } from './components/userprofile/userprofile.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full'},
  { path: 'auth', component: AuthenticationComponent },
  { path: 'products', component: ProductsComponent},
  { path: 'home', component: HomeComponent },
  { path: 'products/:id', component: ProductpageComponent},
  { path: 'checkout', component: ShoppingcartComponent},
  { path: 'profile', component: UserprofileComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
