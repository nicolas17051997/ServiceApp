import { Component, EventEmitter, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { environment } from '../../../environments/environment';
import { ProductsService } from '../../services/products.service';
import { Product } from '../../models/product';


@Component({
  selector: 'app-deleteproduct',
  templateUrl: './deleteproduct.component.html',
  styleUrls: ['./deleteproduct.component.css']
})
export class DeleteproductComponent  {
  myApi: string;
  private deletedproduct: Product;
  private refreshEmiter: EventEmitter<Boolean>;  
  private deleted: boolean;
  private productService: ProductsService;

  constructor(
    private dialogRef: MatDialogRef<DeleteproductComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.myApi = environment.myAppUrl;
    this.deletedproduct= data.data;
    this.refreshEmiter = data.refresh;
    this.deleted = data.deleted;
  }

  delete() {
    this.productService.deleteCurrentProduct(this.deletedproduct).subscribe(()=>{
      this.refreshEmiter.emit(true);
    });

    this.dialogRef.close();
  }

  close() {
    this.dialogRef.close();
  }

}
