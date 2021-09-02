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

  currentImg: any = '';

  isProductAddedToCart: boolean = false;

  product: Product = {};

  message: string = '';

  constructor(private http: HttpRequestsService, 
    private router: Router,
    private cartService: CartService) { }

  ngOnInit(): void {
    this.findProductById(this.router.url);
  }

  findProductById(id: string): void {     
    this.http.getProductById(id)
      .subscribe((resp: any) => {
        this.product = resp
        this.currentImg = resp.imagepath1;
      });
  }

  addToCart(): void {
    let id = new Number(this.product.product_id);

    if (!this.cartService.checkProduct(id.toString())) {
      this.cartService.saveProduct(this.product);
      this.isProductAddedToCart = true;

      setTimeout(() =>{ 
        this.isProductAddedToCart = false;
      }, 480);

      this.message = 'Product added to cart!';
    } else {
      this.message = 'Product already in cart!';
    }
  }

  setMainImage(id: number) {
    switch(id) {
      case 1: {
        this.currentImg = this.product.imagepath1;
        break;
      }
      case 2: {
        this.currentImg = this.product.imagepath2;
        break;
      }
      case 3: {
        this.currentImg = this.product.imagepath3;
        break;
      }
    }
  }

  changeFocus(element: HTMLElement): void {
    element.scrollIntoView();
  }
}
