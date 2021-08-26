import { RouterModule, Routes } from '@angular/router';
import { CreateComponent } from './create/create.component';
import { SearchComponent } from './search/search.component';


const routes: Routes = [
    {
        path: 'create',
        component: CreateComponent
    },
    {
        path: 'search',
        component: SearchComponent
    }
];

export const CarsRoutingModule = RouterModule.forChild(routes);