import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, switchMap, takeUntil, tap } from 'rxjs/operators';
import { AuthService } from '../auth/auth.service';
import { authBookmarkCancel, authBookmarkInit, authBookmarkRemove, authCancel, authError, authGuest, authLogin, authLogout, authLogoutCancel, authLogoutError, authLogoutSuccess, authRegister, authSuccess, authVerify } from './actions';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';


@Injectable()
export class AuthEffects {

    verifyUser = createEffect(() => this.actions$.pipe(
        ofType(authVerify),
        switchMap(() => this.authService.verifyAuth().pipe(
            takeUntil(this.actions$.pipe(ofType(authCancel))),
            map(user => { if (user) { return authSuccess(user); } else { return authGuest(); } }),
            catchError(error => [authError({ error })])
        )),
    ));

    loginUser = createEffect(() => this.actions$.pipe(
        ofType(authLogin),
        switchMap((data) => this.authService.login(data).pipe(
            takeUntil(this.actions$.pipe(ofType(authCancel))),
            map(user => authSuccess(user)),
            tap(() => this.router.navigate(['/'])),
            catchError(error => [authError({ error })])
        ))
    ));

    registerUser = createEffect(() => this.actions$.pipe(
        ofType(authRegister),
        switchMap((user) => this.authService.register(user).pipe(
            takeUntil(this.actions$.pipe(ofType(authCancel))),
            map(user => authSuccess(user)),
            tap(() => this.router.navigate(['/'])),
            catchError(error => [authError({ error })])
        ))
    ));

    logoutUser = createEffect(() => this.actions$.pipe(
        ofType(authLogout),
        switchMap(() => this.authService.logout().pipe(
            takeUntil(this.actions$.pipe(ofType(authLogoutCancel))),
            map(() => authLogoutSuccess()),
            tap(() => this.router.navigate(['/'])),
            catchError(error => [authLogoutError({ error })])
        ))
    ));

    addToBookmarks = createEffect(() => this.actions$.pipe(
        ofType(authBookmarkInit),
        switchMap(({ carId }) => this.authService.likeCar(carId).pipe(
            takeUntil(this.actions$.pipe(ofType(authBookmarkCancel))),
            map(user => { if (user) { return authSuccess(user); } else { return authGuest(); } }),
            catchError(error => [authError({ error })])
        ))
    ));

    removeFromBookmarks = createEffect(() => this.actions$.pipe(
        ofType(authBookmarkRemove),
        switchMap(({ carId }) => this.authService.unlikeCar(carId).pipe(
            takeUntil(this.actions$.pipe(ofType(authBookmarkCancel))),
            map(user => { if (user) { return authSuccess(user); } else { return authGuest(); } }),
            catchError(error => [authError({ error })])
        ))
    ));

    constructor(private actions$: Actions, private authService: AuthService, private router: Router) {}
}