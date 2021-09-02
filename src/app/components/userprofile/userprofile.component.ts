import { Component, OnInit } from '@angular/core';
import { Account } from 'src/app/models/Account';
import { AuthService } from 'src/app/services/authservice/authservice.service';

@Component({
  selector: 'app-userprofile',
  templateUrl: './userprofile.component.html',
  styleUrls: ['./userprofile.component.css']
})
export class UserprofileComponent implements OnInit {

  user: Account;

  constructor(private auth: AuthService) {
    this.user = this.auth.getUser();
   }

  ngOnInit(): void {
  }

}
