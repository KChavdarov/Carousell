import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { CarsService } from '../cars.service';
import { locations } from 'src/app/shared/locations';
import { colors } from 'src/app/shared/colors';
import { bodyStyles } from 'src/app/shared/bodyStyles';
import { Store } from '@ngrx/store';
import { carsQueryUpdate } from '../+store/actions';
import { CarQuery } from 'src/app/shared/models/CarQuery';


@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  panelOpenState = false;
  makes$!: Observable<string[]>;
  models$!: Observable<{ _id: string, bodyStyles: string[]; }[]>;
  bodyStyles$!: Observable<string[] | undefined>;
  locations = locations;
  colors = colors;
  bodyStyles = bodyStyles;


  @ViewChild('form') form!: NgForm;
  files: {} = {};

  constructor(private carsService: CarsService, private store: Store) {}

  ngOnInit(): void {
    this.makes$ = this.carsService.getMakes();

  };

  makeSelectionHandler(make: string) {
    this.models$ = this.carsService.getModels(make);
  }

  modelSelectionHandler(model: string) {
    this.bodyStyles$ = this.models$.pipe(
      map(models$ => models$.find(m => m._id == model)),
      map(m => m ? m.bodyStyles : m)
    );
  }

  submitHandler() {
    const data = Object.assign({}, this.form.value);
    data.page = 1;
    data.perPage = 25;
    this.store.dispatch(carsQueryUpdate(data));
  }
}
