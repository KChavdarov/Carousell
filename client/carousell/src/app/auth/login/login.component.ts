import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { authLogin, } from '../../+store/actions';
import { AuthState } from '../../+store/reducers';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  form!: FormGroup;

  get f() {
    return this.form.controls;
  }

  constructor(
    private fb: FormBuilder,
    private store: Store<AuthState>,
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required, Validators.minLength(3)]],
    });
  }

  loginHandler() {
    let data = {
      email: this.form.get('email')?.value,
      password: this.form.get('password')?.value,
    };

    this.store.dispatch(authLogin(data));
  }
}
