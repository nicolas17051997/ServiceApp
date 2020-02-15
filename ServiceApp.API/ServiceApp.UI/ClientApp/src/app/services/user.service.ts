import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {BaseService} from './base.service';


import { User } from '../models';
import { Observable } from 'rxjs';
import {environment} from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class UserService {
    myAppUrl: string;
    myApiUrl: string;
    constructor(private http: HttpClient) {
        this.myAppUrl = environment.AppUrl;
        this.myApiUrl = 'api/user';
        //super(http);
     }

    getAll() {
        //return this.http.get<User[]>(`${config.apiUrl}/users`);
       //return this.get<User[]>('api/users');
       return this.http.get<User[]>(this.myAppUrl + this.myApiUrl);
    }
    

    getById(id: number) {
        return this.http.get(`${this.myAppUrl + this.myApiUrl}/${id}`);
    }

    register(user: User) {
        return this.http.post(`${this.myAppUrl + this.myApiUrl}/register`, user);
    }

    update(user: User) {
        return this.http.put(`${this.myAppUrl + this.myApiUrl}/users/${user.id}`, user);
    }

    delete(id: number) {
        return this.http.delete(`${this.myAppUrl + this.myApiUrl}/users/${id}`);
    }
}