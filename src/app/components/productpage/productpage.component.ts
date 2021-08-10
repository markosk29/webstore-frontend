import { Component, OnInit } from '@angular/core';
import { HttpRequestsService } from '../../services/httpservice/httpservice.service';
import { Router } from '@angular/router';
import { Product } from '../../models/Product';
import { CartService } from 'src/app/services/cartservice/cartservice.service';

@Component({
  selector: 'app-productpage',
  templateUrl: './productpage.component.html',
  styleUrls: ['./productpage.component.css']
})
export class ProductpageComponent implements OnInit {

  product: Product = {};

  constructor(private http: HttpRequestsService, 
    private router: Router,
    private cartService: CartService) { }

  ngOnInit(): void {
    this.findProductById(this.router.url);
  }

  findProductById(id: string): void {     
    this.http.getProductById(id)
      .subscribe((resp: any) => this.product = resp);
  }

  addToCart(): void {
    this.cartService.saveProduct(this.product);
  }

  test(): void {
    console.log(this.cartService.getProduct(String(this.product.product_id)));
  }
}
