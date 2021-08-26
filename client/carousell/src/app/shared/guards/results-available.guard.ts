import { Injectable, OnDestroy } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { selectResults } from 'src/app/cars/+store/selectors';

@Injectable()
export class ResultsAvailableGuard implements CanActivate {

  constructor(private store: Store, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    return this.store.select(selectResults).pipe(
      map(results => {
        if (results) { return true; } else {
          return this.router.createUrlTree(['/cars/search']);
        }
      })
    );
  }
}
