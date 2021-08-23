import { createAction, props } from '@ngrx/store';
import { User } from 'src/app/shared/models/User';

const namespace = '[AUTH]';

export const authSuccess = createAction(
    `${namespace} auth success`,
    props<User>()
);

export const authError = createAction(
    `${namespace} auth error`
);

export const logout = createAction(
    `${namespace} logout`
)