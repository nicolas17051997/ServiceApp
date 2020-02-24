import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import {environment} from '../../environments/environment';
//import { User } from '../models/User';
import { UserAuthorize } from '../models/user-authorize';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  public myAppUrl: string;
  public myApiUrl: string;
  private currentUserSubject: BehaviorSubject<UserAuthorize>;
  public currentUser: Observable<UserAuthorize>;

  constructor(private http: HttpClient) {

    this.currentUserSubject = new BehaviorSubject<UserAuthorize>(JSON.parse(localStorage.getItem('currentUser')));
        this.currentUser = this.currentUserSubject.asObservable();
        
        this.myAppUrl = environment.myAppUrl;
        this.myApiUrl = 'api/user/authenticate';
   }
   public get currentUserValue(): UserAuthorize {
    return this.currentUserSubject.value;
}
login(user : UserAuthorize) {

  return this.http.post<any>(this.myAppUrl + this.myApiUrl, user)
      .pipe(map(result => {
          
          if ( result.user) {
              let user = result.user;
              user.authvalue = result.token;
              //console.log(user.token);
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
