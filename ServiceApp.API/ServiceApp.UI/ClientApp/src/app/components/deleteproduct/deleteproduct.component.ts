import { Component, EventEmitter, Inject, OnInit } from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { environment } from '../../../environments/environment';
import { ProductsService } from '../../services/products.service';
import { Product } from '../../models/product';


@Component({
  selector: 'app-deleteproduct',
  templateUrl: './deleteproduct.component.html',
  styleUrls: ['./deleteproduct.component.css']
})
export class DeleteproductComponent implements OnInit {
  displayedColumns: string[] = ['id', 'name'];
  dataSource: MatTableDataSource<Product>;
  public product: Product;
  public prod: Product[]=[];
  public refreshEmiter: EventEmitter<Boolean>; 
  

  constructor(
    private dialogRef: MatDialogRef<DeleteproductComponent>,
    private productService: ProductsService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    
    this.product= data.data;
    this.refreshEmiter = data.refresh;
  }
  ngOnInit(){
    this.loadproduct();

  }
  loadproduct(){
    this.prod.push(this.data.data);
    this.dataSource = new MatTableDataSource(this.prod);
  }
  delete() {
    console.log(this.product);
    const deleteProduct: Product={
      id: this.product.id,
      name: this.product.name,
      status: this.product.status,
      amount: this.product.amount,
      price: this.product.price
    };
    console.log();
    this.productService.deleteCurrentProduct(deleteProduct).subscribe(()=>{
      this.refreshEmiter.emit(true);
    });

    this.dialogRef.close();
  }

  close() {
    this.dialogRef.close();
  }

}
