import { createFeatureSelector, createSelector } from '@ngrx/store';
import { CarsState } from './reducers';


const selectFeature = createFeatureSelector<CarsState>('cars');

export const selectQuery = createSelector(
    selectFeature,
    (state: CarsState) => state?.query
);

export const selectResults = createSelector(
    selectFeature,
    (state: CarsState) => state?.results
);