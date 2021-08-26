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



@NgModule({
  declarations: [
    CreateComponent,
    SearchComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    CarsRoutingModule,
    StoreModule.forFeature('cars', carsReducer),
    MaterialModule,
  ],
  providers: [
    CarsService,
  ]
})
export class CarsModule {}
