import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/services/cartservice/cartservice.service';

@Component({
  selector: 'app-shoppingcart',
  templateUrl: './shoppingcart.component.html',
  styleUrls: ['./shoppingcart.component.css']
})
export class ShoppingcartComponent implements OnInit {

  productsArray: any = [];
  priceTotal: number = 0;

  constructor(private cartService: CartService) { }

  ngOnInit(): void {
    this.productsArray = this.cartService.getAllProducts();
    this.countTotalPrice();
  }

  removeFromCart(id: string): void {
    this.productsArray.splice(this.productsArray.indexOf(id), 1);
    this.cartService.removeProduct(id);
  }

  countTotalPrice(): number {
    this.productsArray.forEach((product: { price: any; }) => {
      if(Number.parseInt(product.price)) {
        this.priceTotal += Number.parseInt(product.price);
      }
    });

    return this.priceTotal;
  }

}
