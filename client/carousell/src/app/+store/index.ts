import { ActionReducerMap } from '@ngrx/store';
import { carsReducer, CarsState } from '../cars/+store/reducers';
import { authReducer, AuthState } from './reducers';

export interface AppState {
    readonly auth: AuthState,
    readonly cars: CarsState,
}

export const reducers: ActionReducerMap<AppState> = {
    auth: authReducer,
    cars: carsReducer
};
