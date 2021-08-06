import { Component, OnInit } from '@angular/core';
import { HttpRequestsService } from '../httpservice/httpservice.service';
import { Product } from '../model/Product';

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

  findProductById(id: string): Product {
    let product: any;
    
    this.http.getProductById(id)
      .subscribe(resp => product = resp);

    return product;
  }
}
