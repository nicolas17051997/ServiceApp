import { Component } from '@angular/core';
import { first } from 'rxjs/operators';

import { User } from 'code/models/user';
import { UserService, AuthenticationService } from 'code/services';
import { Product } from 'code/models/product';

@Component({ templateUrl: 'home.component.html' })
export class HomeComponent {
    users: User[] = [];

    constructor(private userService: UserService) { }

    ngOnInit() {
        this.userService.getAll().pipe(first()).subscribe(users => {
            this.users = users;
        });
    }
}
