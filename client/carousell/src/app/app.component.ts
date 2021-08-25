import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { authError, authSuccess, authVerify } from './auth/+store/actions';
import { AuthService } from './auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'Carousell';
  isLoading = true;

  constructor(private store: Store<AuthService>, private authService: AuthService) {};

  ngOnInit() {
    // this.store.dispatch(authVerify())

    this.authService.verifyAuth().subscribe(
      user => {
        this.isLoading = false;
        this.store.dispatch(authSuccess(user));
      },
      error => {
        this.isLoading = false;
        this.store.dispatch(authError({ error }));
      }
    );
  }

}
