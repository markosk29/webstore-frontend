import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/services/cartservice/cartservice.service';
import { Order } from 'src/app/models/Order';
import { HttpRequestsService } from 'src/app/services/httpservice/httpservice.service';
import { formatDate } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/authservice/authservice.service';

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
  isCartEmpty: boolean = true;
  isPaymentSuccessful: boolean = false;
  paymentAmount = '';

  order: Order = {
    order_id: 0,
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
    userId: 0,
    ispaid: false,
    productsToOrder: []
  }

  constructor(private cartService: CartService,
    private http: HttpRequestsService,
    private router: Router,
    private auth: AuthService) { }

  ngOnInit(): void {
    this.productsArray = this.cartService.getAllProducts();
    this.countTotalPrice();

    if(this.productsArray.length > 0) {
      this.isCartEmpty = false;
    }

    this.isPaymentSuccessful = false;

    window.scrollTo(0,0); 
  }

  removeFromCart(id: string): void {
    this.productsArray.splice(this.productsArray.indexOf(id), 1);
    this.cartService.removeProduct(id);

    if(this.productsArray.length == 0) {
      this.isCartEmpty = true;
    }
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

    if (this.auth.getAuthStatus()) {
      this.http.getUserByUsername(this.auth.getUser()).subscribe(resp => {
        this.order.userId = resp.id;
      })
    }

    setTimeout(() => {
      this.http.pushOrder(this.order)
    .subscribe(resp => console.log(resp));

    this.isPaymentSuccessful = true;

    this.priceTotal = 0;
    this.clearProducts();
  
    this.order = {
      order_id: 0,
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
      userId: 0,
      productsToOrder: []
    }
    }, 100);
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

  navigateToProducts(): void {
    this.router.navigateByUrl("/products");
  }
}
