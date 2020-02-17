import { NgModule, Injectable } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


import {HomeComponent} from './home';
import {ViewproductsComponent} from './viewproducts/viewproducts.component';
import {AdminCabinetComponent} from './admin-cabinet';
import {LoginComponent} from './login';
import {RegisterComponent} from './register/register.component';
import {AuthGuard} from './guards';


const routes: Routes = [  
  // {path: '', component: HomeComponent, canActivate:[AuthGuard]}, 
  // {path: 'viewproducts', component: ViewproductsComponent, canActivate:[AuthGuard]},
   
  // {path: 'admin-cabinet', component: AdminCabinetComponent, canActivate: [AuthGuard]},
  {path:'login', component: LoginComponent},
  // {path: 'register', component: RegisterComponent},
  {path: '**', redirectTo:''}
];
@Injectable()
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
//export const routing = RouterModule.forRoot(routes);
