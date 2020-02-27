import { Component, OnInit, EventEmitter, Inject } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Product } from '../../models/product';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ProductsService } from '../../services/products.service';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css']
})
export class EditProductComponent implements OnInit {
  
  form: FormGroup;
  model: Product;
  name: string;
  price: number;
  amount: number;
  status: boolean;
  private refreshEmiter: EventEmitter<Boolean>;
  
  statuses: Status[] = [
    { name:'coming', value: true},
    {name:'expenditure', value:false}];
  getStatus: boolean;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<Product>,
    private productservice: ProductsService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.model = data.data ? data.data : new Product;
    this.refreshEmiter = data.refresh;
   }

  ngOnInit(): void {
    
    this.form = this.fb.group({
      name: this.model.name,
      pPrice: this.model.price,
      pAmount: this.model.amount
    });

  }
  save() {
    this.model.id = this.model.id;
    this.model.name = this.form.get('name').value;
    this.model.price = this.form.get('pPrice').value;
    this.model.amount = this.form.get('pAmount').value;
    this.model.status = this.getStatus;
    console.log(this.model);

    this.productservice.updateProduct(this.model).subscribe(()=>{this.refreshEmiter.emit(true)});
      
    this.dialogRef.close(this.form.value);
  }

  close() {
    this.dialogRef.close();
  }

}
interface Status{
  name: string;
  value: boolean;
}
