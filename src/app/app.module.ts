import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { ApiService } from './services/api.service';
import { BaseService } from './services/base.service';

import { LayoutModule } from './layout/layout.module';
import { SharedModule } from './shared/shared.module';
import { ApiInterceptor } from './shared';
// import { UIAvatar, UICard } from '../assets/disk/web-ui.min.js';


@NgModule({
  declarations: [
    AppComponent,
   ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    LayoutModule,
    SharedModule,
  ],
  // entryComponents: [UIAvatar, UICard],
  // schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ApiInterceptor,
      multi: true,
    },
    ApiService,
    BaseService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
