import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
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
  @Output() likeToggle = new EventEmitter<any>();
  subscription!: Subscription;
  isOwner = false;
  isAuth = false;
  isUnlikeable = false;

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.subscription = this.store.select(selectUser).subscribe(
      user => {
        if (user) {
          this.isAuth = true;
          this.isOwner = !!(this.car._id && user.cars?.includes(this.car._id));
          if (user.favorites?.includes(this.car._id || '')) {
            this.isUnlikeable = true;
          } else { this.isUnlikeable = false; }
        } else { this.isAuth = false; }
      }
    );
  }

  addToFavorites(carId: string = '') {
    this.store.dispatch(authBookmarkInit({ carId }));
    this.likeToggle.emit({ liked: this.car._id });
  }

  removeFromFavorites(carId: string = '') {
    this.store.dispatch(authBookmarkRemove({ carId }));
    this.likeToggle.emit({ unliked: this.car._id });
  }

  ngOnDestroy() {
    this.subscription?.unsubscribe();
  }

}
