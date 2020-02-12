import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BaseApiService } from './base-api.service';


@Injectable()
export class TreeApiService extends BaseApiService {

    constructor(
        private _http: HttpClient) {
        super(_http);
    }

   
}

