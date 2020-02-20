import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import {Product} from '../models/product';

@Injectable({
  providedIn: 'root'
})
export class ProductPostService {
  myAppUrl: string;
  myApiUrl: string;
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json; charset=utf-8'
    })
  };

  constructor(private http: HttpClient)
   {
    this.myAppUrl = environment.myAppUrl;
    this.myApiUrl = 'api/Products/';
    }
    getProductPosts(): Observable<Product[]> {
      return this.http.get<Product[]>(this.myAppUrl + this.myApiUrl)
        .pipe(
          retry(1),
          catchError(this.errorHandler)
        );
    }
  
    getProductPost(postId: number): Observable<Product> {
      return this.http.get<Product>(this.myAppUrl + this.myApiUrl + postId)
        .pipe(
          retry(1),
          catchError(this.errorHandler)
        );
    }
  
    saveProductPost(blogPost): Observable<Product> {
      return this.http.post<Product>(this.myAppUrl + this.myApiUrl, JSON.stringify(blogPost), this.httpOptions)
        .pipe(
          retry(1),
          catchError(this.errorHandler)
        );
    }
  
    updateProductPost(postId: number, blogPost): Observable<Product> {
      return this.http.put<Product>(this.myAppUrl + this.myApiUrl + postId, JSON.stringify(blogPost), this.httpOptions)
        .pipe(
          retry(1),
          catchError(this.errorHandler)
        );
    }
  
    deleteProductPost(postId: number): Observable<Product> {
      return this.http.delete<Product>(this.myAppUrl + this.myApiUrl + postId)
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
