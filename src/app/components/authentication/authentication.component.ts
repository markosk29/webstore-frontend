import { Component, Injectable, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/authservice/authservice.service';
import { Account } from '../../models/Account';
import { HttpRequestsService } from '../../services/httpservice/httpservice.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-authentication',
  templateUrl: './authentication.component.html',
  styleUrls: ['./authentication.component.css']
})

export class AuthenticationComponent implements OnInit{

  isLoggedIn: boolean = false;
  noAccountFlag: boolean = false;
  invalidAccount: boolean = false;

  message: String = "";

  account: Account = {
    token: "",
    id: 0,
    username: "",
    password: ""
  };

  constructor(private http: HttpRequestsService,
    private auth: AuthService,
    private router: Router) {}

  ngOnInit(): void {
    this.auth.authStatus.subscribe(authStatus => {
      this.isLoggedIn = authStatus;
    })
  }

  register(): void {
    if(this.account.username !== '' &&
       this.account.password !== '') {

          this.http.registerAccount(this.account)
            .subscribe(resp => {
              this.auth.storeToken(resp.token);
              this.auth.setUser(resp);
            });
      }

      setTimeout(() => {
        if (this.auth.getAuthStatus()) {
          this.router.navigateByUrl("/home");
          this.invalidAccount = false;
        } else {
          this.invalidAccount = true;
        }
       }, 200)
  }
  
  login(): void {
    if(this.account.username !== '' &&
    this.account.password !== '') {

          this.http.loginAccount(this.account)
            .subscribe(resp => {
              this.auth.storeToken(resp.token);
              this.auth.setUser(resp);
            });
       }

       setTimeout(() => {
        if (this.auth.getAuthStatus()) {
          this.router.navigateByUrl("/home");
          this.invalidAccount = false;
        } else {
          this.invalidAccount = true;
        }
       }, 200)
  }

  changeRegisterFlag(): void {
    this.noAccountFlag = !this.noAccountFlag;
  }

}
