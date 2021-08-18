import { Injectable } from '@angular/core';
import { LocalstoragerefService } from '../localstorageref/localstorageref.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private _localStorage: Storage;

  constructor(private localStorageRefService: LocalstoragerefService) {
    this._localStorage = localStorageRefService.localStorage;
   }

  storeToken(token: string): void {
    this._localStorage.setItem("token", token);
  }

  getAuthStatus(): boolean {
    if (this._localStorage.getItem("token")) {
      return true;
    } else {
      return false;
    }
  }

  removeToken(): void {
    this._localStorage.removeItem("token");
  }
}
