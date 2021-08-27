import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { CarsService } from '../cars.service';
import { locations } from 'src/app/shared/locations';
import { colors } from 'src/app/shared/colors';
import { bodyStyles } from 'src/app/shared/bodyStyles';
import { Store } from '@ngrx/store';
import { carsQueryUpdate } from '../+store/actions';


@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit, OnDestroy {
  panelOpenState = false;

  locations = locations;
  colors = colors;
  bodyStylesList = bodyStyles;

  makes!: string[];
  models!: { _id: string, bodyStyles: string[]; }[];
  bodyStyles = this.bodyStylesList;

  makeSubscription!: Subscription;
  modelsSubscription!: Subscription;

  @ViewChild('form') form!: NgForm;
  files: {} = {};

  constructor(private carsService: CarsService, private store: Store) {}

  ngOnInit(): void {
    this.makeSubscription = this.carsService.getMakes().subscribe(makes => this.makes = makes);
  };

  ngOnDestroy() {
    this.makeSubscription?.unsubscribe();
    this.modelsSubscription?.unsubscribe();
  }

  makeSelectionHandler(make: string) {
    this.modelsSubscription = this.carsService.getModels(make).subscribe(models => this.models = models);
  }

  modelSelectionHandler(model: string) {
    this.bodyStyles = this.models.find(m => m._id == model)?.bodyStyles || this.bodyStylesList;
  }

  submitHandler() {
    const data = Object.assign({}, this.form.value);
    data.page = 1;
    data.perPage = 12;
    this.store.dispatch(carsQueryUpdate(data));
  }

  onReset() {
    this.bodyStyles = this.bodyStylesList;
  }
}
