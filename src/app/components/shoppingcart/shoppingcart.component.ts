import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/services/cartservice/cartservice.service';
import { Order } from 'src/app/models/Order';
import { HttpRequestsService } from 'src/app/services/httpservice/httpservice.service';

@Component({
  selector: 'app-shoppingcart',
  templateUrl: './shoppingcart.component.html',
  styleUrls: ['./shoppingcart.component.css']
})
export class ShoppingcartComponent implements OnInit {

  productsArray: any = [];
  priceTotal: number = 0;

  order: Order = {
    firstname: '',
    lastname: '',
    contact1: '',
    contact2: '',
    address1: '',
    address2: '',
    paymentMethod: '',
    orderStatus: 'CONFIRMED',
    isPaid: false,
    productsToOrder: []
  }

  constructor(private cartService: CartService,
    private http: HttpRequestsService) { }

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

  changeFocus(element: HTMLElement): void {
    element.scrollIntoView();
  }

  //TO-DO
  // CHECK IF THEY ARE NOT EMPTY AND IF THEY ARE VALID
  //
  confirmInvoice(): void {  
    this.order.productsToOrder = this.productsArray;

    this.http.pushOrder(this.order)
    .subscribe(resp => console.log(resp));

  
    this.order = {
      firstname: '',
      lastname: '',
      contact1: '',
      contact2: '',
      address1: '',
      address2: '',
      paymentMethod: '',
      orderStatus: 'CONFIRMED',
      isPaid: false,
      productsToOrder: []
    }
  }

}
