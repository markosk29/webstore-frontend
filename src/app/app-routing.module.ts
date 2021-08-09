import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthenticationComponent } from './authentication/authentication.component';
import { ProductsComponent } from './products/products.component';
import { HomeComponent } from './home/home.component';
import { ProductpageComponent } from './productpage/productpage.component';

const routes: Routes = [
  { path: 'login', component: AuthenticationComponent },
  { path: 'products/all', component: ProductsComponent },
  { path: 'home', component: HomeComponent },
  { path: 'products/:id', component: ProductpageComponent}
  //refactor, make all and :id children of products (See bookmark)
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
