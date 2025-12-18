import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { AuthService } from '../services/auth';
import { ILoginResponse } from '../models/IAuth';
import { PLATFORM_ID } from '@angular/core';

@Component({
  selector: 'app-login',
  imports: [RouterLink, ReactiveFormsModule, CommonModule],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class Login {
  errorMessage: string = '';
  successMessage: string = '';
  showPassword: boolean = false;

  private _router = inject(Router);
  private _toastr = inject(ToastrService);
  private _AuthService = inject(AuthService);
  private platformId = inject(PLATFORM_ID);


  SinginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)]),
  });

  togglePassword() {
    this.showPassword = !this.showPassword;
  }


  onSubmit(data: FormGroup) {
    console.log(data.value);
    if (this.SinginForm.invalid) {
      this._toastr.error('Please fill in all required fields correctly', 'Validation Error');
      return;
    }
    this.signIn(data.value);
  }

  signIn(form: any) {
    console.log(form);
    this._AuthService.onLoginIn(form).subscribe({
      next: (response: ILoginResponse) => {
        console.log(response);
        if (isPlatformBrowser(this.platformId)) {
        localStorage.setItem('accessToken', response.data.accessToken);
        localStorage.setItem('refreshToken', response.data.refreshToken);
        localStorage.setItem('userId', response.data.profile._id);
        localStorage.setItem('userEmail', response.data.profile.email);
        localStorage.setItem('firstName', response.data.profile.first_name);
        localStorage.setItem('lastName', response.data.profile.last_name);
        localStorage.setItem('fullName',`${response.data.profile.first_name} ${response.data.profile.last_name}`);
        localStorage.setItem('userRole', response.data.profile.role);
        localStorage.setItem('userStatus', response.data.profile.status);
        }
        this.successMessage = response.message;
        this._toastr.success(response.message, 'Success');
        setTimeout(() => {
          this._router.navigate(['/dashboard']);
        }, 2000);
      },
      error: (error: any) => {
      console.log('Error:', error);

      let errorMsg = 'Invalid email or password';

      if (error.error?.message) {
        errorMsg = Array.isArray(error.error.message)
          ? error.error.message[0]
          : error.error.message;
      }

      this._toastr.error(errorMsg, 'Login Failed', {
        timeOut: 5000,
        closeButton: true,
        progressBar: true,
      });
    },
    });
  }
}
