import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Car } from 'src/app/shared/models/Car';
import { CarsService } from '../cars.service';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.scss']
})
export class FavoritesComponent implements OnInit {

  subscription!: Subscription;
  cars!: Car[];
  current!: Car[];
  page = 1;
  count: number = 0;
  perPage: number = 12;
  pageSizeOptions: number[] = [12, 24, 48];

  constructor(private carsService: CarsService) {}

  ngOnInit(): void {
    this.subscription = this.carsService.getFavorites().subscribe(
      cars => {
        this.cars = cars;
        this.count = this.cars.length;
        this.current = cars.slice(this.perPage * (this.page - 1), this.page * this.perPage);
      },
    );
  }

  unlike(event: any) {
    console.log(event);
    const unliked = event.unliked;
    if (unliked) {
      this.cars = this.cars.filter(c => c._id !== unliked);
    }
  }

  onPageChange(event: any) {
    this.page = event.pageIndex + 1;
    this.perPage = event.pageSize;
    this.current = this.cars.slice(this.perPage * (this.page - 1), this.page * this.perPage);
  }

}
