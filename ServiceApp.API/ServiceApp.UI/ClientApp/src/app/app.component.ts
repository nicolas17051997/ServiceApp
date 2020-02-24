import { Component } from '@angular/core';
import {Router} from '@angular/router';

import { AuthenticationService } from './services/authentication.service';
//import { User } from './models/user';
import {UserAuthorize} from './models/user-authorize';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  currentUser: UserAuthorize;
  title = 'ClientApp';

  constructor(private router: Router,
    private authenticationService: AuthenticationService){
      this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
    }
    logout() {
      this.authenticationService.logout();
      this.router.navigate(['/login']);
    }
}
