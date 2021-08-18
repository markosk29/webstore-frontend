import { Component, OnInit } from '@angular/core';
import { HttpRequestsService } from '../../services/httpservice/httpservice.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  products: any;

  constructor(private http: HttpRequestsService,
    private router: Router) { }

  ngOnInit(): void {
    this.http.getAllProducts()
      .subscribe((resp: any) => this.products = resp);
  }

  navigateToProduct(id: string): void {
    this.router.navigateByUrl('products/' +id);
  }
}
