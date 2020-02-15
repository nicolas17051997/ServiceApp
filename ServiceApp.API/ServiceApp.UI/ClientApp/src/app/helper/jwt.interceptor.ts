import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';

import { AuthenticationService } from '../services';
import {environment} from '../../environments/environment';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
    public myAppUrl: string;
    public myApiUrl: string;
    constructor(private authenticationService: AuthenticationService) {

        this.myAppUrl = environment.AppUrl;
        this.myApiUrl = 'api/user/authenticate';
     }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // add auth header with jwt if user is logged in and request is to api url
        const currentUser = this.authenticationService.currentUserValue;
        const isLoggedIn = currentUser && currentUser.token;
        // const isApiUrl = request.url.startsWith(config.apiUrl);
        const isApiUrl = request.url.startsWith(this.myAppUrl);
        if (isLoggedIn && isApiUrl) {
            request = request.clone({
                setHeaders: {
                    Authorization: `Bearer ${currentUser.token}`
                }
            });
        }

        return next.handle(request);
    }
}