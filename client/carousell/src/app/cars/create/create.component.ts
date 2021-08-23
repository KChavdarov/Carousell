import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { CarsService } from '../cars.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit {
  @ViewChild('form') form!: NgForm;
  files: {} = {};

  constructor(private carsService: CarsService) {}

  ngOnInit(): void {}

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
