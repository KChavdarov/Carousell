import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { Car } from 'src/app/shared/models/Car';
import { CarQuery } from 'src/app/shared/models/CarQuery';
import { carsQueryUpdate } from '../+store/actions';
import { selectQuery, selectResults } from '../+store/selectors';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.scss']
})
export class ResultsComponent implements OnInit, OnDestroy {

  results$ = this.store.select(selectResults);
  query$ = this.store.select(selectQuery);
  resultsSubscription!: Subscription;
  querySubscription!: Subscription;

  count!: number;
  page!: number;
  perPage!: number;
  cars!: Car[];
  query!: CarQuery;
  summary: any;

  pageSizeOptions: number[] = [12, 24, 48];

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.resultsSubscription = this.results$.subscribe(results => {
      if (results) {
        this.count = results.count;
        this.perPage = results.perPage;
        this.page = results.page;
        this.cars = results.cars;
      }
    });
    this.querySubscription = this.query$.subscribe(query => {
      if (query) {
        this.query = Object.assign({}, query);
        this.summary = this.flattenObject(query);
      }
    });
  }

  ngOnDestroy() {
    this.querySubscription?.unsubscribe();
    this.resultsSubscription?.unsubscribe();
  }

  onPageChange(event: any) {
    this.query.page = event.pageIndex + 1;
    this.query.perPage = event.pageSize;

    this.store.dispatch(carsQueryUpdate(this.query));
  }

  flattenObject = (obj: any) => {
    const flattened: Record<string, any> = {};

    Object.keys(obj).forEach((key) => {
      if (typeof obj[key] === 'object' && obj[key] !== null) {
        Object.assign(flattened, this.flattenObject(obj[key]));
      } else {
        flattened[key] = obj[key];
      }
    });

    return flattened;
  };

}
