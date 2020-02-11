import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


import { ContentComponent } from './content/content.component';
import { AuthGuard } from '../code/guards';
import { LoginComponent } from './content/login';
import { AuthorizeTokenComponent } from './content/login/authorize-token.component';


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
