import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormControl, FormGroupDirective, NgForm, Validators, FormGroup, FormBuilder} from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material/core';
import { first } from 'rxjs/operators';

import {UserService} from '../services/user.service';
import {AuthenticationService} from '../services/authentication.service';
import {  AlertService } from '../services/alert.service';
import { User } from '../models/User';
import { Role} from '../models/role';


 
@Component({ templateUrl: 'register.component.html' })
export class RegisterComponent implements OnInit {
    registerForm: FormGroup;
    loading = false;
    submitted = false;
    returnUrl: string;
    error = '';
    uname: string;
    usurname: string;
    uemail: string;
    upassword:string;
    urole: Role.User;

    constructor(
        public formBuilder: FormBuilder,
        public route: ActivatedRoute,
        public router: Router,
        public authenticationService: AuthenticationService,
        public register : UserService,
        public alertService: AlertService,
        
    ) { 
        if (this.authenticationService.currentUserValue) { 
            this.router.navigate(['/login']);
        }
        this.uname = "userName";
        this.usurname = "userSurname";
        this.uemail = "userEmail";
        this.upassword = "userPassword";
    }
    matcher = new MyErrorStateMatcher();
    ngOnInit() {
        this.registerForm = this.formBuilder.group({
            userName   : ['', Validators.required, Validators.maxLength(15)],
            userSurname: ['', Validators.required, Validators.maxLength(15)],
            userEmail  : ['', Validators.required],
            userPassword: ['', Validators.required, Validators.minLength(3)],
           // userPassword1: ['', Validators.required, Validators.minLength(6)],    
                
        });

        
    }
    save() {
        if (!this.registerForm.valid) {
          return;
        }
    
        let newuser: User = {
          
          userName: this.registerForm.get(this.uname).value,
          userSurname: this.registerForm.get(this.usurname).value,
          userEmail: this.registerForm.get(this.uemail).value,
          userPassword: this.registerForm.get(this.upassword).value,
          //role: this.urole
        };
          
    this.register.register(newuser)
    .pipe(first())
    .subscribe((data)=>{
        this.router.navigate(['/login']);
    });
          console.log(newuser);  
        }
    
    get f() { return this.registerForm.controls; }

    onSubmit() {
        this.submitted = true;
        
        
        if (this.registerForm.invalid) {
            return;
        }
        let newuser: User = {
          userName: this.registerForm.get(this.uname).value,
          userSurname: this.registerForm.get(this.usurname).value,
          userEmail: this.registerForm.get(this.uemail).value,
          userPassword: this.registerForm.get(this.upassword).value,
          //role: this.urole
        };
        console.log(newuser);
        this.loading = true;
        this.register.register(newuser)
        .pipe(first())
        .subscribe(
            data => {
                    this.alertService.success("Registration successful", true);
                    this.router.navigate(['/login']);
            },
            error => {
                this.alertService.error(error);
                this.loading = false;
            });
       
    }
}
export class MyErrorStateMatcher implements ErrorStateMatcher {
    isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
      const isSubmitted = form && form.submitted;
      return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
    }
  }
