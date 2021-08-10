import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  isOpen: boolean = true;
  arrows: string = '<<';

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  switchMenuStatus(): void {
    this.isOpen = !this.isOpen;

    if(this.isOpen) {
      this.arrows = '<<';
    } else {
      this.arrows = '>>';
    }
  }

  navigate(route: string): void {
    this.router.navigateByUrl('/' +route);
  }

}
