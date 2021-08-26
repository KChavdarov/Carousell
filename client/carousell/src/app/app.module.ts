import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppInterceptorProvider } from './app-interceptor';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CoreModule } from './core/core.module';
import { MaterialModule } from './material/material.module';
import { EffectsModule } from '@ngrx/effects';
import { AuthService } from './auth/auth.service';
import { HttpClientModule } from '@angular/common/http';
import { AuthEffects } from './+store/effects';
import { reducers } from './+store';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    CoreModule,
    AppRoutingModule,
    HttpClientModule,
    EffectsModule.forRoot([AuthEffects]),
    StoreModule.forRoot(reducers),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: environment.production }),
    BrowserAnimationsModule,
    MaterialModule,
  ],
  providers: [
    AppInterceptorProvider,
    AuthService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
