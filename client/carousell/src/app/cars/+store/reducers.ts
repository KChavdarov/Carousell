import { createReducer, on } from '@ngrx/store';
import { Car } from 'src/app/shared/models/Car';
import { CarQuery } from 'src/app/shared/models/CarQuery';
import { carsQueryClear, carsQueryUpdate, queryResultsSuccess } from './actions';


export interface CarsState {
    readonly query: CarQuery | null;
    readonly results: Car[] | null;
}

const initialState: CarsState = {
    query: null,
    results: null
};

export const carsReducer = createReducer(
    initialState,
    on(carsQueryUpdate, (state, query) => ({ ...state, query, results: null })),
    on(carsQueryClear, (state) => initialState),
    on(queryResultsSuccess, (state, results) => ({ ...state, results }))
);

