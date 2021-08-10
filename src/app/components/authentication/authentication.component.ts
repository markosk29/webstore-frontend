import { Component, Injectable } from '@angular/core';
import { Account } from '../../models/Account';
import { HttpRequestsService } from '../../services/httpservice/httpservice.service';

@Component({
  selector: 'app-authentication',
  templateUrl: './authentication.component.html',
  styleUrls: ['./authentication.component.css']
})

export class AuthenticationComponent {
  response: any = {
    message: ''
  };

  account: Account = {
    username: "",
    password: ""
  };

  constructor(private http: HttpRequestsService) {}

  register(): void {
    if(this.account.username !== '' &&
       this.account.password !== '') {

          this.http.registerAccount(this.account)
            .subscribe(resp => this.response = resp);
       }
  }
  
  login(): void {
    if(this.account.username !== '' &&
       this.account.password !== '') {

          this.http.loginAccount(this.account)
            .subscribe(resp => this.response = resp);
       }
  }

}
