import { Component, ViewChild, OnInit } from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import {MatDialog} from '@angular/material/dialog';
import { Observable } from 'rxjs';

import {Product} from '../../models/product';
import {ProductsService} from '../../services/products.service';
import { ProductAddEditComponent } from '../product-add-edit/product-add-edit.component';
@Component({
  selector: 'app-view-product',
  templateUrl: './view-product.component.html',
  styleUrls: ['./view-product.component.css']
})
export class ViewProductComponent implements OnInit {
  blogPosts$: Observable<Product[]>
  products: Product[]; 
  displayedColumns: string[] = ['name', 'price', 'amount', 'status'];
  dataSource = new MatTableDataSource<Product>(this.products);

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  constructor( public dialog: MatDialog,
               private productservice: ProductsService
               ) { }

  ngOnInit(): void {
    this.loadProducts();
    this.dataSource.paginator = this.paginator;
  }
  loadProducts() {
    this.productservice.getAllProducts()
        .subscribe((data: Product[]) => this.products = data);
}
  openDialog(): void {
    const dialogRef = this.dialog.open(ProductAddEditComponent, {
      width: '700px',
      data: 'Add Product'
      
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      console.log('data was aded');
    });
    
  }
  

}

export interface PeriodicElement {
  name: string;
  position: number;
  price: number;
  amount: number;
  status: string;
}
const ELEMENT_DATA: PeriodicElement[] = [
  {position: 1, name: 'Hydrogen',    price: 1.0079,   amount: 256, status: " arrival"},
  {position: 2, name: 'Helium',      price: 4.0026,   amount: 256, status: " arrival"},
  {position: 3, name: 'Lithium',     price: 6.941,    amount: 256, status: " consumption"},
  {position: 4, name: 'Beryllium',   price: 9.0122,   amount: 256, status: " consumption"},
  {position: 5, name: 'Boron',       price: 10.811,   amount: 256, status: " consumption"},
  {position: 6, name: 'Carbon',      price: 12.0107,  amount: 256, status: " consumption"},
  {position: 7, name: 'Nitrogen',    price: 14.0067,  amount: 256, status: " consumption"},
  {position: 8, name: 'Oxygen',      price: 15.9994,  amount: 256, status: " consumption"},
  {position: 9, name: 'Fluorine',    price: 18.9984,  amount: 256, status: " consumption"},
  {position: 10, name: 'Neon',       price: 20.1797,  amount: 256, status: " consumption"},
  {position: 11, name: 'Sodium',     price: 22.9897,  amount: 256, status: " consumption"},
  {position: 12, name: 'Magnesium',  price: 24.305,   amount: 256, status: " consumption"},
  {position: 13, name: 'Aluminum',   price: 26.9815,  amount: 256, status: " arrival"},
  {position: 14, name: 'Silicon',    price: 28.0855,  amount: 256, status: " arrival"},
  {position: 15, name: 'Phosphorus', price: 30.9738,  amount: 256, status: " arrival"},
  {position: 16, name: 'Sulfur',     price: 32.065,   amount: 256, status: " arrival"},
  {position: 17, name: 'Chlorine',   price: 35.453,   amount: 256, status: " arrival"},
  {position: 18, name: 'Argon',      price: 39.948,   amount: 256, status: " arrival"},
  {position: 19, name: 'Potassium',  price: 39.0983,  amount: 256, status: " arrival"},
  {position: 20, name: 'Calcium',    price: 40.078,   amount: 256, status: " arrival"},
];
