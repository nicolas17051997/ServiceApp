import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ProductPostService } from '../services/product-post.service';
import { Product } from '../models/product';

@Component({
  selector: 'app-product-add-edit',
  templateUrl: './product-add-edit.component.html',
  styleUrls: ['./product-add-edit.component.scss']
})
export class ProductAddEditComponent implements OnInit {
  formEditCreate: FormGroup;
  actionType: string;
  formTitle: string;
  formBody: string;
  postId: number;
  errorMessage: any;
  existingProductPost: Product;
  pName: string;
  pPrice: number;
  pAmount: number;
  pStatus: boolean;
  t1 : number;
  t2: number;

  constructor(private productPostService: ProductPostService,
     private formBuilder: FormBuilder,
     private avRoute: ActivatedRoute,
     private router: Router)
      {
        const idParam = 'id';
        this.actionType = 'Add';
       
        this.pName = 'pName';
        // this.pPrice = 'pPrice';
        // this.pAmount = 'pAmount';
        this.t1 = 25;
        this.t2 = 5;
        if (this.avRoute.snapshot.params[idParam]) {
            this.postId = this.avRoute.snapshot.params[idParam];
        }
        this.formEditCreate = this.formBuilder.group(
          {
            postId: 0,
            pName: ['', [Validators.required, Validators.maxLength(15)]],
            pPrice: ['', [Validators.required]],
            pAmount:['', [Validators.required]],
          }
        )
      }
  ngOnInit() {

    if (this.postId > 0) {
      this.actionType = 'Edit';
      this.productPostService.getProductPost(this.postId)
        .subscribe(data => (
          this.existingProductPost = data,
          this.formEditCreate.controls[this.pName].setValue(data.name),
          this.formEditCreate.controls[this.pPrice].setValue(data.price),
          this.formEditCreate.contains[this.pAmount].setValue(data.amount),
         // this.formEditCreate.contains[this.pStatus].setValue(data.status)
          console.log(data.name)
        ));
    }

  }
  
  save() {
    if (!this.formEditCreate.valid) {
      return;
    }
    if (this.actionType === 'Add') {
      let productPost: Product = {
        name: this.formEditCreate.get(this.pName).value,
       // price: this.formEditCreate.get(this.pPrice).value,
       price: this.t1,
        amount: this.t2,
        status: true
      };

      this.productPostService.saveProductPost(productPost)
        .subscribe((data) => {
          this.router.navigate(['/Products', data.id]);
        });
    }

    if (this.actionType === 'Edit') {
      let productPost: Product = {
        id: this.existingProductPost.id,
        name: this.formEditCreate.get(this.pName).value,
        price: this.existingProductPost.price,
        amount: this.existingProductPost.amount,
        status: true
      };
      this.productPostService.updateProductPost(productPost.id, productPost)
        .subscribe((data) => {
          this.router.navigate([this.router.url]);
        });
    }
  }
  cancel() {
    this.router.navigate(['/']);
  }

  get title() { return this.formEditCreate.get(this.pName); }
  get body() { return this.formEditCreate.get(this.pPrice.toString()); }

}
