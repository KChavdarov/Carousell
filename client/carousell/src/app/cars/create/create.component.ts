import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { CarsService } from '../cars.service';
import { locations } from 'src/app/shared/locations';
import { colors } from 'src/app/shared/colors';
import { Store } from '@ngrx/store';
import { authSuccess } from 'src/app/+store/actions';
import { Router } from '@angular/router';


@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss'],
})
export class CreateComponent implements OnInit {
  makes$!: Observable<string[]>;
  models$!: Observable<{ _id: string, bodyStyles: string[]; }[]>;
  bodyStyles$!: Observable<string[] | undefined>;
  locations = locations;
  colors = colors;


  @ViewChild('form') form!: NgForm;
  files: {} = {};

  constructor(private carsService: CarsService, private store: Store, private router: Router) {}

  ngOnInit(): void {
    this.makes$ = this.carsService.getMakes();

  };

  makeSelectionHandler(make: string) {
    this.models$ = this.carsService.getModels(make).pipe(shareReplay(1));
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
      if (k != 'images') {
        formData.append(k, JSON.stringify(v));
      }
    }

    for (let [k, v] of Object.entries(this.files)) {
      formData.append(k, v as string);
    }

    console.log(this.form.value);

    this.carsService.createCar(formData).subscribe(({ car, user }) => {
      this.store.dispatch(authSuccess(user));
      this.router.navigate(['/cars', car._id]);
    });

  }
}
