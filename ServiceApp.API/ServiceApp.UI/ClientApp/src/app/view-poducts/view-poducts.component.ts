import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ProductPostService } from '../services/product-post.service';
import { Product } from '../models/product';

@Component({
  selector: 'app-view-poducts',
  templateUrl: './view-poducts.component.html',
  styleUrls: ['./view-poducts.component.scss']
})
export class ViewPoductsComponent implements OnInit {

  products$: Observable<Product[]>;
  constructor( private productPostService: ProductPostService) { }

  ngOnInit() {
    this.loadBlogPosts();
  }
  loadBlogPosts() {
    this.products$ = this.productPostService.getProductPosts();
  }

  delete(productId) {
    const ans = confirm('Do you want to delete product with id: ' + productId);
    if (ans) {
      this.productPostService.deleteProductPost(productId).subscribe((data) => {
        this.loadBlogPosts();
      });
    }
  }

}
