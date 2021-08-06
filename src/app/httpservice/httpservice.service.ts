import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';

import { Account } from '../model/Account';
import { Product } from '../model/Product';

@Injectable({
  providedIn: 'root'
})
export class HttpRequestsService {

  registerUrl: string = "http://localhost:8080/auth/register";
  loginUrl: string = "http://localhost:8080/auth/login";
  productUrl: string = "http//localhost:8080/products/"

  constructor(private http: HttpClient) { }

  registerAccount(account: Account): Observable<Account> {
    return this.http.post<Account>(this.registerUrl, account);
  }

  loginAccount(account: Account): Observable<Account> {
    return this.http.post<Account>(this.loginUrl, account);
  }

  getAllProducts(): Observable<Product> {
    return this.http.get<Product>(this.productUrl + "all");
  }

  getProductById(id: string): Observable<Product> {
    return this.http.get<Product>(this.productUrl + id);
  }
}
