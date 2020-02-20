import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import {environment} from '../../environments/environment';
import { User } from '../models/User';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  public myAppUrl: string;
  public myApiUrl: string;
  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;

  constructor(private http: HttpClient) {

    this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
        this.currentUser = this.currentUserSubject.asObservable();
        
        this.myAppUrl = environment.myAppUrl;
        this.myApiUrl = 'api/user/authenticate';
   }
   public get currentUserValue(): User {
    return this.currentUserSubject.value;
}
login(username: string, password: string) {

        
  return this.http.post<any>(this.myAppUrl + this.myApiUrl, { username, password })
      .pipe(map(user => {
          
          if (user && user.token) {
              
              localStorage.setItem('currentUser', JSON.stringify(user));
              this.currentUserSubject.next(user);
          }

          return user;
      }));
}
logout() {
        
  localStorage.removeItem('currentUser');
  this.currentUserSubject.next(null);
}
}
