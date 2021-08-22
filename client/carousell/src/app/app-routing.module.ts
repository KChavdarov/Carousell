import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './auth/register/register.component';

const routes: Routes = [
  {
    path: 'register',
    component: RegisterComponent
  }
];

export const AppRoutingModule = RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules });