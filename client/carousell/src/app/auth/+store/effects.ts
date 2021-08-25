import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, switchMap, takeUntil, tap } from 'rxjs/operators';
import { AuthService } from '../auth.service';
import { authCancel, authError, authSuccess, authVerify } from './actions';
import { Injectable } from '@angular/core';


@Injectable()
export class AuthEffects {

    verifyUser = createEffect(() => this.actions$.pipe(
        ofType(authVerify),
        switchMap(() => this.authService.verifyAuth().pipe(
            takeUntil(this.actions$.pipe(ofType(authCancel))),
            map(user => authSuccess(user)),
            catchError(error => [authError({ error })])
        )),
    ));

    constructor(private actions$: Actions, private authService: AuthService) {}
}