import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { Car } from 'src/app/shared/models/Car';
import { CarsService } from '../cars.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit, OnDestroy {

  subscription!: Subscription;
  car!: Car;

  constructor(private carsService: CarsService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.subscription = this.route.params.pipe(
      switchMap(({ id }) => this.carsService.getCar(id)),
    ).subscribe(car => this.car = car);
  }

  ngOnDestroy() {
    this.subscription?.unsubscribe();
  }

}
