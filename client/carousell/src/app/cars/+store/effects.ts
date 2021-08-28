import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, switchMap, tap } from 'rxjs/operators';
import { CarsService } from '../cars.service';
import { carsQueryUpdate, queryResultsSuccess } from './actions';


@Injectable()
export class CarsEffects {
    getQueryResults = createEffect(() => this.actions$.pipe(
        ofType(carsQueryUpdate),
        switchMap((query) => this.carsService.searchCars(query).pipe(
            map(results => queryResultsSuccess(results)),
            tap(() => this.router.navigate(['/cars/results']))
        ))
    ));

    constructor(private actions$: Actions, private carsService: CarsService, private router: Router) {};
}