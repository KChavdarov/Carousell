import { createAction, props } from '@ngrx/store';
import { User } from 'src/app/shared/models/User';

const namespace = '[AUTH]';

export const authVerify = createAction(`${namespace} verify`);
export const authGuest = createAction(`${namespace} guest`);
export const authLogin = createAction(`${namespace} auth login`, props<{ email: string, password: string; }>());
export const authRegister = createAction(`${namespace} auth register`, props<User>());
export const authSuccess = createAction(`${namespace} success`, props<User>());
export const authError = createAction(`${namespace} error`, props<{ error: Error; }>());
export const authCancel = createAction(`${namespace} cancel`);
export const authLogout = createAction(`${namespace} logout`);
export const authLogoutSuccess = createAction(`${namespace} logout success`);
export const authLogoutError = createAction(`${namespace} logout error`, props<{ error: Error; }>());
export const authLogoutCancel = createAction(`${namespace} logout cancel`);
export const authBookmarkInit = createAction(`${namespace} bookmark init`, props<{ carId: string; }>());
export const authBookmarkRemove = createAction(`${namespace} bookmark remove`, props<{ carId: string; }>());
export const authBookmarkSuccess = createAction(`${namespace} bookmark success`, props<User>());
export const authBookmarkCancel = createAction(`${namespace} bookmark cancel`);
export const authBookmarkError = createAction(`${namespace} bookmark error`);
