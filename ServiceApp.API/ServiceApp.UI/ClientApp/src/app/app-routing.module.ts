import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


import { AppComponent } from './app.component';
import { ViewProductComponent } from './components/view-product/view-product.component';
//import { ProductAddEditComponent } from './components/product-add-edit/product-add-edit.component';
import { LogInComponent } from './components/log-in/log-in.component';
import { RegisterComponent } from './components/register/register.component';
import { AuthGuard } from './guard/auth.guard';



const routes: Routes = [
 // { path: '', pathMatch: 'full', redirectTo: 'viewproduct' },
  
 { path: 'products', component: ViewProductComponent },
 // { path: 'products', component: ViewProductComponent, canActivate:[AuthGuard] },
  { path: 'login', component: LogInComponent },
  { path: 'register', component: RegisterComponent },
  { path: '**', redirectTo: '/products' }
 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],  
  exports: [RouterModule]
})
export class AppRoutingModule { }
