ort { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { User } from 'code/models';
import { BaseApiService } from '.';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class UserService extends BaseApiService {
    constructor(
        private _http: HttpClient) {
        super(_http);
    }

    getAll(): Observable<User[]> {
        return this.get<User[]>('api/users');
    }
}
