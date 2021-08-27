import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateComponent } from './create/create.component';
import { FormsModule } from '@angular/forms';
import { CarsService } from './cars.service';
import { CarsRoutingModule } from './cars-routing.module';
import { MaterialModule } from '../material/material.module';
import { SearchComponent } from './search/search.component';
import { carsReducer } from './+store/reducers';
import { StoreModule } from '@ngrx/store';
import { ResultsComponent } from './results/results.component';
import { CarsEffects } from './+store/effects';
import { EffectsModule } from '@ngrx/effects';
import { AuthGuard } from '../shared/guards/auth.guard';
import { ResultsAvailableGuard } from '../shared/guards/results-available.guard';
import { SharedModule } from '../shared/shared.module';
import { FavoritesComponent } from './favorites/favorites.component';
import { DetailsComponent } from './details/details.component';



@NgModule({
  declarations: [
    CreateComponent,
    SearchComponent,
    ResultsComponent,
    FavoritesComponent,
    DetailsComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    CarsRoutingModule,
    EffectsModule.forFeature([CarsEffects]),
    StoreModule.forFeature('cars', carsReducer),
    MaterialModule,
  ],
  providers: [
    CarsService,
    AuthGuard,
    ResultsAvailableGuard,
  ]
})
export class CarsModule {}
