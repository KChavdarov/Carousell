import { createAction, props } from '@ngrx/store';
import { CarQuery } from 'src/app/shared/models/CarQuery';

const namespace = '[CARS]';

export const carsQueryUpdate = createAction(`${namespace} query update`, props<CarQuery>());
export const carsQuerySuccess = createAction(`${namespace} query success`,);
export const carsQueryCancel = createAction(`${namespace} query cancel`);
export const carsQueryError = createAction(`${namespace} query error`);
export const carsQueryClear = createAction(`${namespace} query clear`);

export const queryResultsSuccess = createAction(`${namespace} results success`, props<any>())
export const queryResultsClear = createAction(`${namespace} results clear`)
