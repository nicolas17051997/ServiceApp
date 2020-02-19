import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {LoginComponent} from './login/login.component';
import {RegisterComponent} from './register/register.component';
import { ProductAddEditComponent } from './product-add-edit/product-add-edit.component';
import { ViewPoductsComponent } from './view-poducts/view-poducts.component';

const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'view-products', component: ViewPoductsComponent},
  {path: 'product-add-edit', component: ProductAddEditComponent},
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
