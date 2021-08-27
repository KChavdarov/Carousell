import { Component, Input } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay, } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { AuthState } from 'src/app/+store/reducers';
import { MatDialog } from '@angular/material/dialog';
import { selectUser } from 'src/app/+store/selectors';
import { ConfirmationDialogComponent } from 'src/app/shared/confirmation-dialog/confirmation-dialog.component';
import { authLogout } from 'src/app/+store/actions';

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
    private dialog: MatDialog,
    private store: Store<AuthState>,
  ) {}


  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  logout() {
    const data = { message: 'Are you sure you want to log out?', confirm: 'Logout', reject: 'Cancel' };
    const dialog = this.dialog.open(ConfirmationDialogComponent, { data });

    dialog.afterClosed().subscribe(
      result => {
        if (result == data.confirm) {
          this.store.dispatch(authLogout());
        }
      },
    );
  }
}
