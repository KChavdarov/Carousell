import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { environment } from 'src/environments/environment';
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

  minPassChars = environment.PASSWORD_CHARACTERS;

  get f() {
    return this.form.controls;
  }

  get passwords() {
    return this.form.controls.passwords;
  }

  get password() {
    return this.form.get('passwords.password');
  }

  get confirmPassword() {
    return this.form.get('passwords.confirmPassword');
  }

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router, private store: Store<AuthState>) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.pattern(/^0\d{9}$/)]],
      terms: ['', [Validators.requiredTrue]],
      passwords: this.fb.group({
        password: ['', [Validators.required, Validators.minLength(this.minPassChars)]],
        confirmPassword: ['', []],
      }, {
        validators: [this.passwordMismatch],
        asyncValidators: null,
        updateOn: 'change'
      })
    });
  }

  onPasswordInput(trigger?: AbstractControl | null) {
    if (trigger && trigger.value.length > Math.max(this.minPassChars / 2, 3)) { trigger?.markAsTouched({ onlySelf: true }); }
    if (this.passwords.hasError('passwordMismatch') && this.password?.touched && this.confirmPassword?.touched) {
      if (this.password.valid) {
        this.password.setErrors({ passwordMismatch: true });
      } else if (!this.password.hasError('passwordMismatch')) {
        const errors = this.password.errors;
        errors!.passwordMismatch = true;
        this.password.setErrors(errors);
      }
      this.confirmPassword?.setErrors({ passwordMismatch: true });
    } else {
      if (this.password?.errors) {
        const errors = this.password.errors;
        delete errors?.passwordMismatch;
        if (Object.keys(errors || {}).length == 0) {
          this.password.setErrors(null);
        } else {
          this.password.setErrors(errors);
        }
      } else {
        this.password?.setErrors(null);
      }
      this.confirmPassword?.setErrors(null);
    }
  }

  passwordMismatch(passwords: FormGroup): ValidationErrors | null {
    let password = passwords.get('password');
    let confirmPassword = passwords.get('confirmPassword');
    let filled = password?.value && confirmPassword?.value;

    if (filled && password?.value != confirmPassword?.value) {
      return { passwordMismatch: true };
    }
    return null;
  }

  registerHandler() {
    let data = {
      firstName: this.form.get('firstName')?.value,
      lastName: this.form.get('lastName')?.value,
      email: this.form.get('email')?.value,
      phone: '+359' + this.form.get('phone')?.value.slice(-9),
      password: this.form.get('passwords.password')?.value,
    };

    this.authService.register(data).subscribe(
      res => {
        console.log(res);
        this.store.dispatch(authSuccess(res));
        this.router.navigate(['/']);
      },
      error => {
        this.store.dispatch(authError({error}));
      }
    );
  }

}
