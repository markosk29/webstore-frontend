import { Component, OnInit } from '@angular/core';
import { HttpRequestsService } from '../httpservice/httpservice.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  products: any;

  constructor(private http: HttpRequestsService) { }

  ngOnInit(): void {
    this.http.getAllProducts()
      .subscribe((resp: any) => this.products = resp);
  }

}
