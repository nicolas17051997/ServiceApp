import { Component, ViewChild, OnInit } from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import {MatDialog} from '@angular/material/dialog';
import {HttpClient} from "@angular/common/http";
import {MatSort} from '@angular/material/sort';
import {merge, Observable, of as observableOf} from 'rxjs';
import {catchError, map, startWith, switchMap} from 'rxjs/operators';

import {Product} from '../../models/product';
import {ProductsService} from '../../services/products.service';
import { ProductAddEditComponent } from '../product-add-edit/product-add-edit.component';
import { environment } from '../../../environments/environment';
@Component({
  selector: 'app-view-product',
  templateUrl: './view-product.component.html',
  styleUrls: ['./view-product.component.css']
})
export class ViewProductComponent implements OnInit {

  products: Product[] = [];
  displayedColumns: string[] = ['id', 'name', 'price', 'amount'];
  dataSource: MatTableDataSource<Product>;
  isLoadingResults = true;
  isRateLimitReached = false;
  resultsLength = 0;

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort; 

  constructor( public dialog: MatDialog,
               private productservice: ProductsService
               ) {

                this.dataSource = new MatTableDataSource(this.products);
                }

  ngOnInit(): void {
    this.loadProducts();   
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  loadProducts() {
    this.productservice.getAllProducts()
      .subscribe((data) => {
        this.products = data.data;
        this.dataSource = new MatTableDataSource(this.products);
        console.log(this.products);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
    });
    
    if(this.products === null) {
      console.log('product is equal null')
    } else {
      this.products.forEach(function(task){
        console.log(task);
      });
    }
  
    
    
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

export interface Products{
  id: string;
  name: string;
  price: string;
  amount: string;
  status: string;
}


