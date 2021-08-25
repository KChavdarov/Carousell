import { createAction, props } from '@ngrx/store';
import { User } from 'src/app/shared/models/User';

const namespace = '[AUTH]';

export const authVerify = createAction(
    `${namespace} auth verify`
);

export const authSuccess = createAction(
    `${namespace} auth success`,
    props<User>()
);

export const authError = createAction(
    `${namespace} auth error`,
    props<{ error: Error; }>()
);

export const authCancel = createAction(
    `${namespace} auth cancel`
);

export const authLogout = createAction(
    `${namespace} logout`
);

export const authLogoutSuccess = createAction(
    `${namespace} logout success`
);

export const authLogoutError = createAction(
    `${namespace} logout error`,
    props<{ error: Error; }>()
);

export const authLogoutCancel = createAction(
    `${namespace} logout cancel`
);