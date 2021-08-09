import { Component, OnInit } from '@angular/core';
import { HttpRequestsService } from '../httpservice/httpservice.service';
import { Router } from '@angular/router';
import { Product } from '../model/Product';

@Component({
  selector: 'app-productpage',
  templateUrl: './productpage.component.html',
  styleUrls: ['./productpage.component.css']
})
export class ProductpageComponent implements OnInit {

  product: Product = {};

  constructor(private http: HttpRequestsService, 
    private router: Router) { }

  ngOnInit(): void {
    this.findProductById(this.router.url);
  }

  findProductById(id: string): void {     
    this.http.getProductById(id)
      .subscribe((resp: any) => this.product = resp);

      setTimeout(() => {
        console.log(this.product);
      }, 100)
  }

}
