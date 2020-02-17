import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { fakeBackendProvider } from './helper/fake-backend';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { JwtInterceptor} from '../app/helper/jwt.interceptor';
import { ErrorInterceptor } from '../app/helper/error.interceptor';

import { LoginComponent } from './login';
import { RegisterComponent } from './register/register.component';
import { HomeComponent } from './home/home.component';
import { AdminCabinetComponent } from './admin-cabinet/admin-cabinet.component';
import { ViewproductsComponent } from './viewproducts/viewproducts.component';

@NgModule({
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule
  ],
  declarations: [
    AppComponent,
    LoginComponent,
    // RegisterComponent,
    // ViewproductsComponent,
    // HomeComponent,
    // AdminCabinetComponent   

  ],
  
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    fakeBackendProvider
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
