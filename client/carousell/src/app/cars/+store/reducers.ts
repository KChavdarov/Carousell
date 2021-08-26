import { createReducer, on } from '@ngrx/store';
import { CarQuery } from 'src/app/shared/models/CarQuery';
import { carsQueryClear, carsQueryInitiate } from './actions';


export interface CarsState {
    readonly query: CarQuery | null;
}

const initialState: CarsState = {
    query: null
};

export const carsReducer = createReducer(
    initialState,
    on(carsQueryInitiate, (state, query) => ({ ...state, query })),
    on(carsQueryClear, (state) => initialState)
);

