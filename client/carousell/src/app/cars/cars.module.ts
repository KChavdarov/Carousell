import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateComponent } from './create/create.component';
import { FormsModule } from '@angular/forms';
import { CarsService } from './cars.service';
import { CarsRoutingModule } from './cars-routing.module';
import { MaterialModule } from '../material/material.module';
import { SearchComponent } from './search/search.component';



@NgModule({
  declarations: [
    CreateComponent,
    SearchComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    CarsRoutingModule,
    MaterialModule,
  ],
  providers: [
    CarsService,
  ]
})
export class CarsModule {}
