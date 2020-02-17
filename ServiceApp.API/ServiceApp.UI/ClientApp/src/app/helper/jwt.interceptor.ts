import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';
import {environment} from '../../environments/environment';
import { AuthenticationService } from '../services';


@Injectable()
export class JwtInterceptor implements HttpInterceptor {
    public myAppUrl: string;
    public myApiUrl: string;
    constructor(private authenticationService: AuthenticationService) {

        this.myAppUrl = environment.AppUrl;
        this.myApiUrl = 'api/user/authenticate';
     }

     intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // add authorization header with jwt token if available
        let currentUser = this.authenticationService.currentUserValue;
        if (currentUser && currentUser.token) {
            request = request.clone({
                setHeaders: { 
                    Authorization: `Bearer ${currentUser.token}`
                }
            });
        }

        return next.handle(request);
    }
}   