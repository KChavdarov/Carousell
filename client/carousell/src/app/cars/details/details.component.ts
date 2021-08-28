import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { filter, switchMap } from 'rxjs/operators';
import { authBookmarkInit, authBookmarkRemove, authSuccess } from 'src/app/+store/actions';
import { selectUser } from 'src/app/+store/selectors';
import { ConfirmationDialogComponent } from 'src/app/shared/confirmation-dialog/confirmation-dialog.component';
import { Car } from 'src/app/shared/models/Car';
import { CarsService } from '../cars.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit, OnDestroy {

  panelOpenState = false;
  routeSubscription!: Subscription;
  userSubscription!: Subscription;
  car!: Car;
  isOwner = false;
  isAuth = false;
  isUnlikeable = false;


  constructor(private carsService: CarsService, private route: ActivatedRoute, private store: Store, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.routeSubscription = this.route.params.pipe(
      switchMap(({ id }) => this.carsService.getCar(id)),
    ).subscribe(car => this.car = car);

    this.userSubscription = this.store.select(selectUser).subscribe(
      user => {
        if (user) {
          this.isAuth = true;
          if (user.cars?.includes(this.route.snapshot.params.id)) { this.isOwner = true; }
          if (user.favorites?.includes(this.route.snapshot.params.id)) {
            this.isUnlikeable = true;
          } else { this.isUnlikeable = false; }
        } else { this.isAuth = false; }
      }
    );
  }

  deleteHandler(carId: string) {
    const data = { message: 'Are you sure you want to delete this listing?', confirm: 'Delete', reject: 'Cancel' };
    const dialog = this.dialog.open(ConfirmationDialogComponent, { data });

    dialog.afterClosed().pipe(
      filter(result => result == data.confirm),
      switchMap(result => this.carsService.deleteCar(carId)),
    ).subscribe(user => { this.store.dispatch(authSuccess(user)); });
  }

  addToFavorites(carId: string = '') {
    this.store.dispatch(authBookmarkInit({ carId }));
  }

  removeFromFavorites(carId: string = '') {
    this.store.dispatch(authBookmarkRemove({ carId }));
  }

  ngOnDestroy() {
    this.routeSubscription?.unsubscribe();
    this.userSubscription?.unsubscribe();
  }

}
