import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, switchMap, takeUntil, tap } from 'rxjs/operators';
import { AuthService } from '../auth.service';
import { authCancel, authError, authLogout, authLogoutSuccess, authSuccess, authVerify } from './actions';
import { CookieService } from 'ngx-cookie-service';
import { environment } from 'src/environments/environment';
import { Injectable } from '@angular/core';

const cookieName = environment['COOKIE_NAME'];

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


    logoutUser = createEffect(() => this.actions$.pipe(
        ofType(authLogout),
        tap(() => this.cookieService.delete(cookieName)),
        map(() => authLogoutSuccess())
    )
    );


    constructor(private actions$: Actions, private authService: AuthService, private cookieService: CookieService) {}
}