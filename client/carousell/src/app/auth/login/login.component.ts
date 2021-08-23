import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { authError, authSuccess } from '../+store/actions';
import { AuthState } from '../+store/reducers';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  form!: FormGroup;

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router, private store: Store<AuthState>) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      email: [],
      password: [],
    });
  }

  loginHandler() {
    let data = {
      email: this.form.get('email')?.value,
      password: this.form.get('password')?.value,
    };

    this.authService.login(data).subscribe(
      res => {
        this.store.dispatch(authSuccess(res));
        this.router.navigate(['/']);
      },
      error => {
        this.store.dispatch(authError());
      }
    );
  }
}
