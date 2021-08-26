import { RouterModule, Routes } from '@angular/router';
import { GuestGuard } from '../shared/guards/guest.guard';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';

const routes: Routes = [
    {
        path: 'login',
        component: LoginComponent,
        canActivate: [GuestGuard]
    },
    {
        path: 'register',
        component: RegisterComponent,
        canActivate: [GuestGuard]
    }
];

export const AuthRoutingModule = RouterModule.forChild(routes);