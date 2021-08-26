import { Component, Input } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { filter, map, shareReplay, switchMap } from 'rxjs/operators';
import { State, Store } from '@ngrx/store';
import { AuthState } from 'src/app/auth/+store/reducers';
import { MatDialog } from '@angular/material/dialog';
import { LoginComponent } from 'src/app/auth/login/login.component';
import { selectUser } from 'src/app/auth/+store/selectors';
import { ConfirmationDialogComponent } from 'src/app/shared/confirmation-dialog/confirmation-dialog.component';
import { authLogoutError, authLogoutSuccess } from 'src/app/auth/+store/actions';
import { AuthService } from 'src/app/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  color = 'primary';
  @Input() isLoading!: boolean;

  user$ = this.store.select(selectUser);

  constructor(
    private breakpointObserver: BreakpointObserver,
    private state: State<AuthState>,
    private dialog: MatDialog,
    private store: Store<AuthState>,
    private authService: AuthService,
    private router: Router,
  ) {}


  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  openAuthDialog() {
    this.dialog.open(LoginComponent,);
  };

  logout() {
    const data = { message: 'Are you sure you want to log out?', confirm: 'Logout', reject: 'Cancel' };
    const dialog = this.dialog.open(ConfirmationDialogComponent, { data });

    dialog.afterClosed().pipe(
      filter(result => result == data.confirm),
      switchMap(() => this.authService.logout()),
    ).subscribe(
      response => {
        this.store.dispatch(authLogoutSuccess());
        this.router.navigate(['/']);
      },
      error => this.store.dispatch(authLogoutError({ error }))
    );
  }
}
