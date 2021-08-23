import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit {
  @ViewChild('form') form!: NgForm;
  files: {} = {};

  constructor() {}

  ngOnInit(): void {
  }

  fileSelectHandler(event: any) {
    this.files = event.target.files;
  }


  submitHandler() {
    const formData = new FormData();

    for (let [k, v] of Object.entries(this.form.value)) {
      if (v != 'images') {
        formData.append(k, v as string);
      }
    }

    for (let [k, v] of Object.entries(this.files)) {
      formData.append(k, v as string);
    }

  }

}
