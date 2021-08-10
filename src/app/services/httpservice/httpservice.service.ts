import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';

import { Account } from '../../models/Account';
import { Product } from '../../models/Product';

@Injectable({
  providedIn: 'root'
})
export class HttpRequestsService {

  url: String = "http://localhost:8080";

  constructor(private http: HttpClient) { }

  registerAccount(account: Account): Observable<Account> {
    return this.http.post<Account>(this.url + "/auth/register", account);
  }

  loginAccount(account: Account): Observable<Account> {
    return this.http.post<Account>(this.url + "/auth/login" , account);
  }

  getAllProducts(): Observable<Product> {
    return this.http.get<Product>(this.url + "/products/all");
  }

  getProductById(route: string): Observable<Product> {
    return this.http.get<Product>(this.url + route);
  }
}
