import { Injectable } from '@angular/core';
import { LocalstoragerefService } from '../localstorageref/localstorageref.service';
import { Product } from 'src/app/models/Product';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private _localStorage: Storage;


  constructor(private localStorageRefService: LocalstoragerefService) { 
      this._localStorage = localStorageRefService.localStorage;
   }

  saveProduct(product: Product): boolean {
    if (product != null) {
      const json = JSON.stringify(product);
      this._localStorage.setItem(String(product.product_id), json);

      return true;
    }

    return false;
  }

  getProduct(key: string): Product {
    const product = JSON.parse(this._localStorage.getItem(key) || "");

    return product;
  }

  removeProduct(key: string): void {
    this._localStorage.removeItem(key);
  }

  clearLocalStorage(): void {
    this._localStorage.clear();
  }
}
