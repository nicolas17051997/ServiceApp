import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';
import {environment} from '../../environments/environment';
import { AuthenticationService } from '../services/authentication.service';


@Injectable()
export class JwtInterceptor implements HttpInterceptor {
    public myAppUrl: string;
    public myApiUrl: string;
    constructor(private authenticationService: AuthenticationService) {

        this.myAppUrl = environment.myAppUrl;
        this.myApiUrl = 'api/user/authenticate';
     }

     intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        
        const currentUser = JSON.parse(localStorage.getItem('currentUser'));
        if (currentUser && currentUser.authvalue) {
            request = request.clone({
                setHeaders: { 
                    Authorization: `Bearer ${currentUser.authvalue}`
                }
            });
        }
        return next.handle(request);
    }
}   