import { Component, EventEmitter, Inject, OnInit } from '@angular/core';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import {ProductsService} from '../../services/products.service';
import {Product} from '../../models/product';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-product-add-edit',
  templateUrl: './product-add-edit.component.html',
  styleUrls: ['./product-add-edit.component.css']
})
export class ProductAddEditComponent implements OnInit {
  productForm: FormGroup;
  Statuses: any = ['coming','expenditure'];
  getStatus: any;
  public product: Product;
  public statuses: boolean;
  error: '';
  private refreshEmiter: EventEmitter<Boolean>;
  
  

  constructor(
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<ProductAddEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,

    public dataService: ProductsService
  ) {   }

  ngOnInit(): void {
    this.productForm = this.formBuilder.group({
      pName:['', [Validators.required, Validators.maxLength(15)]],
      pPrice:[0,[Validators.required, Validators.min(0), Validators.max(10000)]],
      pAmount:[1, [Validators.required, Validators.min(1), Validators.max(100)]],
      pStatus:['', [Validators.required]]
    });
}

  onNoClick(): void {
    this.dialogRef.close();
  }

  onSubmit(): void {
    let p: boolean;
    if(this.getStatus === "coming"){
        p = true;   
    }
    else{
      p = false;
    }
    this.product={
      name: this.productForm.get('pName').value,
      price: this.productForm.get('pPrice').value,
      amount: this.productForm.get('pAmount').value,
      status: p
    }
    console.log(this.product);
    this.dataService.saveProduct(this.product)
    .pipe(first())
    .subscribe((data)=>{
        this.refreshEmiter.emit(true);
    },
    erorr => {
      this.error = erorr;
      console.log(erorr);
    });

    //this.event.emit({data: this.productPost});
    this.dialogRef.close(this.productForm.value);
  }

  

}
