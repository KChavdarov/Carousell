import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { authError, authSuccess } from 'src/app/+store/actions';
import { AuthService } from 'src/app/auth/auth.service';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, private store: Store, private router: Router) {};

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    return this.authService.verifyAuth().pipe(
      catchError((error) => {
        this.store.dispatch(authError(error));
        return of(null);
      }),
      map(user => {
        if (user) {
          this.store.dispatch(authSuccess(user));
          return true;
        } else {
          return this.router.createUrlTree(['/user/login']);
        }
      })
    );
  }
}
