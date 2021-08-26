import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { HomeComponent } from './core/home/home.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: HomeComponent,
  },
  // {
  //   path: 'register',
  //   component: RegisterComponent,
  // },
  // {
  //   path: 'login',
  //   component: LoginComponent,
  // },
  {
    path: 'cars',
    loadChildren: () => import('./cars/cars.module').then(m => m.CarsModule),
  },
  {
    path: 'user',
    loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule),
  },
];

export const AppRoutingModule = RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules });