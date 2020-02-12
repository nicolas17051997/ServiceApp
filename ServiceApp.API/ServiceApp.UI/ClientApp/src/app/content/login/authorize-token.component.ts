import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { AuthenticationService } from 'code/services';

@Component({ templateUrl: 'authorize-token.component.html' })

export class AuthorizeTokenComponent implements OnInit {
  

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private authenticationService: AuthenticationService) { }

    ngOnInit() {
        this.route.queryParams.subscribe(
            data => {
                if (data.token) {
                    this.authenticationService.loginByToken(data.token).subscribe(u => { this.router.navigate(['/task']); });
                }
            });
    }

 



}
