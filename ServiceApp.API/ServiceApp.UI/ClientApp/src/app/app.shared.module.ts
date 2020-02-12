import { BrowserModule } from '@angular/platform-browser';
import { APP_INITIALIZER, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { RouterModule } from '@angular/router';
import {
  MAT_DATE_LOCALE,
  MatButtonModule,
  MatFormFieldModule,
  MatGridListModule,
  MatIconModule,
  MatInputModule,
  MatPaginatorIntl,
  MatRippleModule,
  MatTooltipModule,
} from '@angular/material';
import { MatDialogModule } from '@angular/material/dialog';

import { AppComponent } from './app.component';
import { ContentComponent } from './content/content.component';
import { BaseComponentModule } from './content/base-component';
import { ConfigurationService } from '../code/services';
import { BaseHttpInterceptor, BasicAuthInterceptor, ErrorInterceptor } from '../code/api/interceptor';
import { LoginComponent } from './content/login';
import { AuthorizeTokenComponent } from './content/login/authorize-token.component';

export function loadConfig(configService: ConfigurationService) {
  return () => configService.loadConfig();
}

@NgModule({
  declarations: [
    AppComponent,
    ContentComponent,
    LoginComponent,
    AuthorizeTokenComponent,,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    BaseComponentModule,
    RouterModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatGridListModule,
    MatRippleModule,
    FormsModule,
    MatDialogModule,

    ReactiveFormsModule,
    MatTooltipModule,
  ],
  providers: [
    ConfigurationService,
    {
      provide: APP_INITIALIZER,
      useFactory: loadConfig,
      deps: [ConfigurationService],
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: BaseHttpInterceptor,
      deps: [ConfigurationService],
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: BasicAuthInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorInterceptor,
      multi: true
    },
    
  ],
  bootstrap: [AppComponent],

})
export class AppSharedModule {

}
