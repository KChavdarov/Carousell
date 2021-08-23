import { createReducer, on } from '@ngrx/store';
import { User } from 'src/app/shared/models/User';
import { authError, authSuccess, logout } from './actions';


export interface AuthState {
    readonly user: User | null;
}

const initialState: AuthState = {
    user: null
};

export const authReducer = createReducer(
    initialState,
    on(authSuccess, (state, user) => ({ ...state, user })),
    on(authError, (state) => initialState),
    on(logout, (state) => initialState),
);