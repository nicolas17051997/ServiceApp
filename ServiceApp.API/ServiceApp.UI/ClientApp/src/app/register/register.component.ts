import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';

import { AuthenticationService, AlertService } from '../services';
import {RegistrationService} from '../services/register/registration.service';

@Component({ templateUrl: 'register.component.html' })
export class RegisterComponent implements OnInit {
    registerForm: FormGroup;
    loading = false;
    submitted = false;
    returnUrl: string;
    error = '';

    constructor(
        public formBuilder: FormBuilder,
        public route: ActivatedRoute,
        public router: Router,
        //public authenticationService: AuthenticationService,
        public register : RegistrationService,
        public alertService: AlertService
    ) { 
        // if (this.authenticationService.currentUserValue) { 
        //     this.router.navigate(['/']);
        // }
    }
    ngOnInit() {
        this.registerForm = this.formBuilder.group({
            userName: ['', Validators.required, Validators.maxLength(15)],
            lastName: ['', Validators.required, Validators.maxLength(15)],
            userEmail: ['', Validators.required],
            password: ['', Validators.required, Validators.minLength(6)],
            password1: ['', Validators.required, Validators.minLength(6)],        
        });

        
    }

    get f() { return this.registerForm.controls; }

    onSubmit() {
        this.submitted = true;

        // stop here if form is invalid = tru
        if (this.registerForm.invalid) {
            return;
        }

        this.loading = true;
        this.register.registerNewUser(this.registerForm.value)
        .pipe(first())
        .subscribe(
            data => {
                    this.alertService.success("Registration successful", true);
                    //this.router.navigate(['/login']);
            },
            error => {
                this.alertService.error(error);
                this.loading = false;
            });
       
    }
}