import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppInterceptorProvider } from './app-interceptor';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthModule } from './auth/auth.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AuthModule,
    AppRoutingModule
  ],
  providers: [
    AppInterceptorProvider,
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
