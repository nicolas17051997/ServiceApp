import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { Product, ProductResponse } from '../models/product';


@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  myAppUrl: string;
  myApiUrl: string;
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json; charset=utf-8'
    })
  };

  constructor(private http : HttpClient) { 
    this.myAppUrl = environment.myAppUrl;
    this.myApiUrl = 'api/Product';
  }
  
  getAllProducts(): Observable<ProductResponse> {
    
    return this.http.get<ProductResponse>(`${this.myAppUrl + this.myApiUrl}/products`)
    .pipe(
      retry(1),
      catchError(this.errorHandler)
    );
      
  }

  getProduct(postId: number): Observable<Product> {
    return this.http.get<Product>(this.myAppUrl + this.myApiUrl + postId)
      .pipe(
        retry(1),
        catchError(this.errorHandler)
      );
  }

  saveProduct(product: Product) {
    return this.http.post(`${this.myAppUrl + this.myApiUrl}/createproduct`, product)
      .pipe(
        retry(1),
        catchError(this.errorHandler)
      );
  }

  updateProduct(product: Product): Observable<Product> {
    return this.http.put<Product>(`${this.myAppUrl + this.myApiUrl}/update`, product)
      .pipe(
        retry(1),
        catchError(this.errorHandler)
      );
  }

  deleteCurrentProduct(product: Product): Observable<boolean> {
    return this.http.post<boolean>(`${this.myAppUrl + this.myApiUrl}/deleteproduct`, product)
      .pipe(
        retry(1),
        catchError(this.errorHandler)
      );
  }

  errorHandler(error) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      
      errorMessage = error.error.message;
    } else {
     
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  }
}
