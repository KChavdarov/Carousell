import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../shared/guards/auth.guard';
import { ResultsAvailableGuard } from '../shared/guards/results-available.guard';
import { CreateComponent } from './create/create.component';
import { ResultsComponent } from './results/results.component';
import { SearchComponent } from './search/search.component';


const routes: Routes = [
    {
        path: 'create',
        component: CreateComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'search',
        component: SearchComponent
    },
    {
        path: 'results',
        component: ResultsComponent,
        canActivate: [ResultsAvailableGuard]
    },
];

export const CarsRoutingModule = RouterModule.forChild(routes);