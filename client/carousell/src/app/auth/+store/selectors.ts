import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AuthState } from './reducers';

const selectFeature = createFeatureSelector<AuthState>('auth');

export const selectUser = createSelector(
    selectFeature,
    (state: AuthState) => state.user
);