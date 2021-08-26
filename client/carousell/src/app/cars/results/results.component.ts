import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { State, Store } from '@ngrx/store';
import { throwError } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { Car } from 'src/app/shared/models/Car';
import { CarQuery } from 'src/app/shared/models/CarQuery';
import { carsQueryUpdate } from '../+store/actions';
import { CarsState } from '../+store/reducers';
import { selectQuery, selectResults } from '../+store/selectors';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.scss']
})
export class ResultsComponent implements OnInit {
  results$ = this.store.select(selectResults);
  query$ = this.store.select(selectQuery);

  count!: number;
  page!: number;
  perPage!: number;
  cars!: Car[];
  query!: CarQuery;

  // pageSizeOptions: number[] = [5, 10, 25, 100];
  pageSizeOptions: number[] = [1, 2, 3, 4];

  constructor(private state: State<CarsState>, private store: Store, private router: Router) {}

  ngOnInit(): void {
    this.results$.subscribe(results => {
      if (results) {
        this.count = results.count;
        this.perPage = results.perPage;
        this.page = results.page;
        this.cars = results.cars;
      }
    });
    this.query$.subscribe(query => {
      if (query) {
        this.query = Object.assign({}, query);
      }
    });
  }

  onPageChange(event: any) {
    this.query.page = event.pageIndex + 1;
    this.query.perPage = event.pageSize;

    this.store.dispatch(carsQueryUpdate(this.query));
  }

}
