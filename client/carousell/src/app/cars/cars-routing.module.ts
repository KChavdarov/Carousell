import { RouterModule, Routes } from '@angular/router';
import { CreateComponent } from './create/create.component';
import { ResultsComponent } from './results/results.component';
import { SearchComponent } from './search/search.component';


const routes: Routes = [
    {
        path: 'create',
        component: CreateComponent
    },
    {
        path: 'search',
        component: SearchComponent
    },
    {
        path: 'results',
        component: ResultsComponent
    },
];

export const CarsRoutingModule = RouterModule.forChild(routes);