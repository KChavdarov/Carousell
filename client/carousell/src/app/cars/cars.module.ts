import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateComponent } from './create/create.component';
import { FormsModule } from '@angular/forms';
import { CarsService } from './cars.service';
import { CarsRoutingModule } from './cars-routing.module';



@NgModule({
  declarations: [
    CreateComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    CarsRoutingModule
  ],
  providers: [
    CarsService
  ]
})
export class CarsModule {}
