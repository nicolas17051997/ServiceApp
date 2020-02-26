import { Component, OnInit } from '@angular/core';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

import {UserService} from '../../services/user.service';
import {AuthenticationService} from '../../services/authentication.service';
import {AlertService} from '../../services/alert.service';
import {User} from '../../models/user';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})

export class RegisterComponent implements OnInit {
  selected:any;
  registerForm: FormGroup;
  Roles: any = ['Admin', 'User'];
  selectedRole: any;
  error = '';
  

  constructor(public formBuilder: FormBuilder,
    public route: ActivatedRoute,
    public router: Router,
    public register : UserService,
    public authenticationService : AuthenticationService,
    public alertService: AlertService) {

      // if (this.authenticationService.currentUserValue) { 
      //   this.router.navigate(['/login']);
      // }
     }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      userName    : ['', [Validators.required, Validators.maxLength(15)]],
      userSurname : ['', [Validators.required, Validators.maxLength(15)]],
      userEmail   : ['', [Validators.required]],
      userPassword: ['', [Validators.required, Validators.minLength(3)]],
    });
  }
      

  save() {
    if (!this.registerForm.valid) 
      return;
    console.log("App Data");
    console.log(this.selectedRole);

    let newuser: User = {
      userName: this.registerForm.get('userName').value,
      userSurname: this.registerForm.get('userSurname').value,
      userEmail: this.registerForm.get('userEmail').value,
      userPassword: this.registerForm.get('userPassword').value,
      role : this.selectedRole
    };
      
    this.register.register(newuser)
        .pipe(first())
        .subscribe((data)=>{
        this.router.navigate(['/login']);
    },
    error => {
      this.error = error;
      console.log(error);
  }
    );
      console.log(newuser);  
  }

}