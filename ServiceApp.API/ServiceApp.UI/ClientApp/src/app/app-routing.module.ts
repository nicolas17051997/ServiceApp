import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


import { ContentComponent } from './content/content.component';
import { AuthGuard } from '../code/guards';
import { LoginComponent } from './content/login';
import { AuthorizeTokenComponent } from './content/login/authorize-token.component';
import {Cabinet} from './content/cabinet/cabinet.component';
import { from } from 'rxjs';


const routes: Routes = [
  {
    path: '',
    component: ContentComponent,
    children: [
      {
        path: 'calc',
        loadChildren: './content/fertilizer-calculator/fertilizer-calculator.module#FertilizerCalculatorModule',
        data: {
          title: 'Fertilizer-List',
          secondTitle: '',
          icon: 'file-text',
          state: 'fertilizer-calculator'
        },
        canActivate: [AuthGuard]
      },
      {
        path: 'home',
        loadChildren: './content/home/home.module#HomeModule',
        data: {
          title: 'Home',
          secondTitle: '',
          icon: 'file-text',
          state: 'home'
        },
        canActivate: [AuthGuard]
      },
      {
        path: 'cabinet',
        loadChildren: './content/cabinet/cabinet.module#CabinetModule',
        data: {
          title: 'Home',
          secondTitle: '',
          icon: 'file-text',
          state: 'home'
        },
        canActivate: [AuthGuard]
      }
      

    ]
  },
  { path: 'login', component: LoginComponent },
  { path: 'auth', component: AuthorizeTokenComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
