import { Component, Input, OnInit } from '@angular/core';
import { render } from 'creditcardpayments/creditCardPayments';
import { Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-paypalpayment',
  templateUrl: './paypalpayment.component.html',
  styleUrls: ['./paypalpayment.component.css']
})
export class PaypalpaymentComponent implements OnInit {

  @Input() paymentAmount = '';
  @Output() paymentConfirmation = new EventEmitter<boolean>();

  constructor() {
  }

  ngOnInit(): void {
    render(
      {
        id: "#paypalButtons",
        currency: "EUR",
        value: this.paymentAmount,

        onApprove: (details) => {
            this.paymentConfirmation.emit(true);
        }
      }
    )
  }

}
