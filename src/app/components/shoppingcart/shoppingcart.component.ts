import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/services/cartservice/cartservice.service';
import { Order } from 'src/app/models/Order';
import { HttpRequestsService } from 'src/app/services/httpservice/httpservice.service';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-shoppingcart',
  templateUrl: './shoppingcart.component.html',
  styleUrls: ['./shoppingcart.component.css']
})
export class ShoppingcartComponent implements OnInit {

  productsArray: any = [];
  priceTotal: number = 0;
  isPaypal: boolean = false;
  isCash: boolean = false;
  paymentAmount = '';

  order: Order = {
    firstname: '',
    lastname: '',
    contact1: '',
    contact2: '',
    address1: '',
    address2: '',
    total: '',
    dateandtime: '',
    paymentMethod: '',
    orderStatus: 'CONFIRMED',
    ispaid: false,
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
  // ADD CONFIRM PAGE
  // ADD PAGE IF CART IS EMPTY
  //
  confirmInvoice(paypalConfirmation: boolean): void {  
    this.order.productsToOrder = this.productsArray;
    this.order.total = '€' + this.priceTotal;
    this.order.dateandtime = formatDate(Date.now(), 'long', 'en-US');

    if (paypalConfirmation) {
      this.order.ispaid = true;
    }

    this.http.pushOrder(this.order)
    .subscribe(resp => console.log(resp));

    this.priceTotal = 0;
    this.clearProducts();
  
    this.order = {
      firstname: '',
      lastname: '',
      contact1: '',
      contact2: '',
      address1: '',
      address2: '',
      total: '',
      dateandtime: '',
      paymentMethod: '',
      orderStatus: 'CONFIRMED',
      ispaid: false,
      productsToOrder: []
    }
  }

  showPaypalHideButton(): void {
    this.paymentAmount = this.priceTotal.toString();
    this.isPaypal = true;
    this.isCash = false;
  }

  hidePaypalShowButton(): void {
    this.isPaypal = false;
    this.isCash = true;
  }

  clearProducts(): void {
    this.productsArray.forEach((product: { product_id: any; }) => {
      this.cartService.removeProduct(product.product_id);
    });

    this.productsArray = [];
  }
}
