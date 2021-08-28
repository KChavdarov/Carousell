import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';
import { map, shareReplay, switchMap, tap } from 'rxjs/operators';
import { CarsService } from '../cars.service';
import { locations } from 'src/app/shared/locations';
import { colors } from 'src/app/shared/colors';
import { Store } from '@ngrx/store';
import { authSuccess } from 'src/app/+store/actions';
import { ActivatedRoute, Router } from '@angular/router';
import { Car } from 'src/app/shared/models/Car';


@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {
  car!: Car;
  subscription!: Subscription;
  makes$!: Observable<string[]>;
  models$!: Observable<{ _id: string, bodyStyles: string[]; }[]>;
  bodyStyles$!: Observable<string[] | undefined>;
  locations = locations;
  colors = colors;


  @ViewChild('form') form!: NgForm;
  files: {} = {};

  constructor(private route: ActivatedRoute, private carsService: CarsService, private store: Store, private router: Router) {}

  ngOnInit(): void {
    this.subscription = this.carsService.getCar(this.route.snapshot.params.id).pipe(
      tap(car => {
        this.car = Object.assign({}, car);
        this.makeSelectionHandler(car.make);
        this.modelSelectionHandler(car.model);
      }),
    ).subscribe();

    this.makes$ = this.carsService.getMakes();
  };

  makeSelectionHandler(make: string) {
    this.models$ = this.carsService.getModels(make).pipe(shareReplay(1));
  }

  removeImage(target: string) {
    this.car.images = this.car.images.filter(image => image != target);
  }

  modelSelectionHandler(model: string) {
    this.bodyStyles$ = this.models$.pipe(
      map(models$ => models$.find(m => m._id == model)),
      map(m => m ? m.bodyStyles : m)
    );
  }

  fileSelectHandler(event: any) {
    this.files = event.target.files;
  }

  submitHandler() {
    const formData = new FormData();

    for (let [k, v] of Object.entries(this.form.value)) {
      formData.append(k, JSON.stringify(v));
    }

    for (let [k, v] of Object.entries(this.files)) {
      formData.append(k, v as string);
    }

    console.log(this.form.value);

    this.carsService.editCar(this.route.snapshot.params.id, formData).subscribe(car => {
      this.router.navigate(['/cars', car._id]);
    });

  }
}
