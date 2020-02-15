import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {LoginComponent} from './login/login.component';
import {RegisterComponent} from './register/register.component';
import {HomeComponent} from './home';
import {AdminCabinetComponent} from './admin-cabinet';
import {AuthGuard} from './guards';

const routes: Routes = [
  {path:'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: '', component: HomeComponent, canActivate:[AuthGuard]},
  {path: 'admin-cabinet', component: AdminCabinetComponent},

  {path: '**', redirectTo:''}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
