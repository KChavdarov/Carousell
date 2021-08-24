import { Component } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { State } from '@ngrx/store';
import { AuthState } from 'src/app/auth/+store/reducers';
import { MatDialog } from '@angular/material/dialog';
import { LoginComponent } from 'src/app/auth/login/login.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  color = 'primary';

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  openAuthDialog() {
    this.dialog.open(LoginComponent,)
  };

  constructor(private breakpointObserver: BreakpointObserver, private state: State<AuthState>, private dialog: MatDialog) {}

}
