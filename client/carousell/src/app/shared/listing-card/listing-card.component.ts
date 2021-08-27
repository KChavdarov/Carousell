import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { authBookmarkInit, authBookmarkRemove } from 'src/app/+store/actions';
import { selectUser } from 'src/app/+store/selectors';
import { Car } from '../models/Car';

@Component({
  selector: 'app-listing-card',
  templateUrl: './listing-card.component.html',
  styleUrls: ['./listing-card.component.scss']
})
export class ListingCardComponent implements OnInit, OnDestroy {
  @Input() car!: Car;
  subscription!: Subscription;
  isAuth = false;
  isUnlikeable = false;

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.subscription = this.store.select(selectUser).subscribe(
      user => {
        if (user) {
          this.isAuth = true;
          if (user.favorites?.includes(this.car._id || '')) {
            this.isUnlikeable = true;
          } else { this.isUnlikeable = false; }
        } else { this.isAuth = false; }
      }
    );
  }

  addToFavorites(carId: string = '') {
    this.store.dispatch(authBookmarkInit({ carId }));
  }

  removeFromFavorites(carId: string = '') {
    this.store.dispatch(authBookmarkRemove({ carId }));
  }

  ngOnDestroy() {
    this.subscription?.unsubscribe();
  }

}
