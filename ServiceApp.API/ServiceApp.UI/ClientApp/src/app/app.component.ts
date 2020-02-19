import { Component } from '@angular/core';
import { Router } from '@angular/router';



import { AuthenticationService } from './services/authentication.service';
import { User } from './models/User';
import {  Role } from './models/role';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  currentUser: User;
  title = 'ClientApp';

  constructor(
    private router: Router,
    private authenticationService: AuthenticationService
)   {
    this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
  }
    // get isAdmin() {
    // return this.currentUser && this.currentUser.role === Role.Admin;
    // }

logout() {
  this.authenticationService.logout();
  this.router.navigate(['/login']);
  }
}
