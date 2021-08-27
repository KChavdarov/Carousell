import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { authError, authGuest, authSuccess, authVerify } from './+store/actions';
import { AuthService } from './auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'Carousell';
  // isLoading = true;
  subscription!: Subscription;

  constructor(private store: Store<AuthService>, private authService: AuthService) {};

  ngOnInit() {
    this.store.dispatch(authVerify())

    // this.subscription = this.authService.verifyAuth().subscribe(
    //   user => {
    //     if (user) {
    //       this.store.dispatch(authSuccess(user));
    //     } else {
    //       this.store.dispatch(authGuest());
    //     }
    //     this.isLoading = false;
    //   },
    //   error => {
    //     this.isLoading = false;
    //     this.store.dispatch(authError({ error }));
    //   }
    // );
  }

  ngOnDestroy() {
    this.subscription?.unsubscribe();
  }

}
