import { RouterModule, Routes } from '@angular/router';
import { CreateComponent } from './create/create.component';


const routes: Routes = [
    {
        path: 'create',
        component: CreateComponent
    }
];

export const CarsRoutingModule = RouterModule.forChild(routes);