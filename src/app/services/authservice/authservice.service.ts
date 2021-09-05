import { Injectable, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Account } from 'src/app/models/Account';
import { LocalstoragerefService } from '../localstorageref/localstorageref.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService implements OnInit {

  private _localStorage: Storage;

  isLoggedIn: boolean = false;

  authStatus: BehaviorSubject<boolean>

  user: Account;

  constructor(private localStorageRefService: LocalstoragerefService) {
    this._localStorage = localStorageRefService.localStorage;
    this.authStatus = new BehaviorSubject(this.isLoggedIn);

    this.user = {
      token: "",
      id: 0,
      username: "",
      password: ""
    };
   }

  ngOnInit(): void {
    this.getAuthStatus();
  }

  storeToken(token: string): void {
    this._localStorage.setItem("token", token);

    this.getAuthStatus();
  }

  getAuthStatus(): boolean {
    if (this._localStorage.getItem("token")) {
      this.authStatus.next(true);

      this.authStatus.subscribe(authStatus => {
        this.isLoggedIn = authStatus;
      })

      return true;
    } else {
      this.authStatus.next(false);

      this.authStatus.subscribe(authStatus => {
        this.isLoggedIn = authStatus;
      })

      return false;
    }
  }

  removeToken(): void {
    this._localStorage.removeItem("token");

    this.getAuthStatus();
  }

  setUser(user: Account): void {
    this.user = user;

    this._localStorage.setItem("user", user.username);
  }

  getUser(): string | null {
    return this._localStorage.getItem("user");
  }

  removeUser(): void {
    this._localStorage.removeItem("user");

    this.user = {
      token: "",
      id: 0,
      username: "",
      password: ""
    };
  }
}
