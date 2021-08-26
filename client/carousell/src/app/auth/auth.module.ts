import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthService } from './auth.service';
import { MaterialModule } from '../material/material.module';
import { RouterModule } from '@angular/router';
import { ResultsAvailableGuard } from '../shared/guards/results-available.guard';
import { AuthRoutingModule } from './auth-routing.module';
import { GuestGuard } from '../shared/guards/guest.guard';



@NgModule({
  declarations: [
    RegisterComponent,
    LoginComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    AuthRoutingModule,
    MaterialModule,
    RouterModule,
  ],
  providers: [
    AuthService,
    ResultsAvailableGuard,
    GuestGuard,
  ]
})
export class AuthModule {}
