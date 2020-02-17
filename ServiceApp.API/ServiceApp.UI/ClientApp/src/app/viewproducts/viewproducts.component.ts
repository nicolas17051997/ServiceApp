import { Component, OnInit } from '@angular/core';
import {Product} from '../models/product';
import {ProductPostService} from '../services/productpost.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-viewproducts',
  templateUrl: './viewproducts.component.html',
  styleUrls: ['./viewproducts.component.css']
})
export class ViewproductsComponent implements OnInit {
  products$:Observable<Product[]>;

  constructor( private productService: ProductPostService ) { }

  ngOnInit() {
    this.loadProducts();
  }

  loadProducts(){
      this.products$ = this.productService.getProducts();
  }

}
