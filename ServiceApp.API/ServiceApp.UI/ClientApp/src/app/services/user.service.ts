import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import {environment} from '../../environments/environment';
import { User } from '../models/User';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  myAppUrl: string;
  myApiUrl: string;
  constructor(private http: HttpClient) {
      this.myAppUrl = environment.myAppUrl;
      this.myApiUrl = 'api/User';
  }
  getAll() {
   return this.http.get<User[]>(this.myAppUrl + this.myApiUrl);
}


getById(id: number) {
    return this.http.get(`${this.myAppUrl + this.myApiUrl}/${id}`);
}

register(user: User) {
    return this.http.post(`${this.myAppUrl + this.myApiUrl}/register`, user);
}

}
