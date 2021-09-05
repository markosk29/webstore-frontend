import { Component, OnInit } from '@angular/core';
import { Account } from 'src/app/models/Account';
import { AuthService } from 'src/app/services/authservice/authservice.service';
import { Router } from '@angular/router';
import { HttpRequestsService } from 'src/app/services/httpservice/httpservice.service';

@Component({
  selector: 'app-userprofile',
  templateUrl: './userprofile.component.html',
  styleUrls: ['./userprofile.component.css']
})
export class UserprofileComponent implements OnInit {

  user: Account = {
    token: "",
    id: 0,
    username: "",
    password: ""
  };

  orders: any;

  constructor(private auth: AuthService,
    private router: Router,
    private httpService: HttpRequestsService) {
   }

  ngOnInit(): void {
    console.log(this.auth.getAuthStatus())
    if (!this.auth.getAuthStatus()) {
      this.router.navigateByUrl("/auth");
    }

    let username = this.auth.getUser();

    let id: number = 0;
    
    this.httpService.getUserByUsername(username).subscribe(resp => {
      this.user = resp;
      this.httpService.getOrderByUserId(resp.id)
      .subscribe((resp: any) => this.orders = resp);
    })
  }

}
