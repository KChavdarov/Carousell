import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { authError, authSuccess } from '../+store/actions';
import { AuthState } from '../+store/reducers';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  form!: FormGroup;

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router, private store: Store<AuthState>) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      firstName: [],
      lastName: [],
      email: [],
      phone: [],
      passwords: this.fb.group({
        password: [],
        confirmPassword: [],
      })
    });
  }

  registerHandler() {
    let data = {
      firstName: this.form.get('firstName')?.value,
      lastName: this.form.get('lastName')?.value,
      email: this.form.get('email')?.value,
      phone: this.form.get('phone')?.value,
      password: this.form.get('passwords.password')?.value,
      confirmPassword: this.form.get('passwords.confirmPassword')?.value,
    };

    this.authService.register(data).subscribe(
      res => {
        console.log(res);
        this.store.dispatch(authSuccess(res));
        this.router.navigate(['/']);
      },
      error => {
        this.store.dispatch(authError());
      }
    );
  }

}
