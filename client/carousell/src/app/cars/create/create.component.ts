import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { CarsService } from '../cars.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit {
  makes$!: Observable<string[]>;
  models$!: Observable<{ _id: string, bodyTypes: string[]; }[]>;
  bodyTypes$!: Observable<string[] | undefined>;


  @ViewChild('form') form!: NgForm;
  files: {} = {};

  constructor(private carsService: CarsService) {}

  ngOnInit(): void {
    this.makes$ = this.carsService.getMakes();

  };

  makeSelectionHandler(make: string) {
    this.models$ = this.carsService.getModels(make);
  }

  modelSelectionHandler(model: string) {
    this.bodyTypes$ = this.models$.pipe(
      map(models$ => models$.find(m => m._id == model)),
      map(m => m ? m.bodyTypes : m)
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
    this.carsService.createCar(formData).subscribe(res => console.log(res)
    );

  }
}
