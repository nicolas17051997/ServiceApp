import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {ViewproductsComponent} from './viewproducts/viewproducts.component';
import {LoginComponent} from './login/login.component';
import {RegisterComponent} from './register/register.component';
import {HomeComponent} from './home';
import {AdminCabinetComponent} from './admin-cabinet';
import {AuthGuard} from './guards';


const routes: Routes = [
  
  {path:'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'viewproducts', component: ViewproductsComponent, canActivate:[AuthGuard]},
  {path: '', component: HomeComponent, canActivate:[AuthGuard]},
  
  {path: 'admin-cabinet', component: AdminCabinetComponent, canActivate: [AuthGuard]},

  {path: '**', redirectTo:''}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
//export const routing = RouterModule.forRoot(routes);
