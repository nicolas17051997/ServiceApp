import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable,throwError } from 'rxjs';
import { map } from 'rxjs/operators';
import { retry, catchError } from 'rxjs/operators';

import { UserPost } from '../../models';
import {environment} from '../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class RegistrationService {   
    
    myAppUrl: string;
    myApiUrl: string;
    
    constructor( private http: HttpClient){
        this.myAppUrl = environment.AppUrl;
        this.myApiUrl = 'api/user/register';
    }

    registerNewUser( user: UserPost){
        // return this.http.post<any>(this.myAppUrl + this.myApiUrl, JSON.stringify(user))
        // .pipe(
        //     catchError(this.errorHandler)
        // );
        return this.http.post(this.myAppUrl + this.myApiUrl, (user));
    }
    errorHandler(error) {
        let errorMessage = '';
        if (error.error instanceof ErrorEvent) {
          // Get client-side error
          errorMessage = error.error.message;
        } else {
          // Get server-side error
          errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
        }
        console.log(errorMessage);
        return throwError(errorMessage);
      }
    // private currentUserSubject: BehaviorSubject<User>;

    // public currentUser: Observable<User>;

    // constructor(private http: HttpClient) {
    //     this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
    //     this.currentUser = this.currentUserSubject.asObservable();
    // }

    // public get currentUserValue(): User {
    //     return this.currentUserSubject.value;
    // }

    
}