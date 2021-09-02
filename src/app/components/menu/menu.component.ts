import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/authservice/authservice.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  constructor(private router: Router,
    private auth: AuthService) { }

  isLoggedIn: boolean = false;

  ngOnInit(): void {
    this.auth.authStatus.subscribe(
      authStatus => {
        this.isLoggedIn = authStatus;
      }
    );
  }

  navigate(route: string): void {
    this.router.navigateByUrl('/' +route);
  }

}
