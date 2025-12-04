import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { UsersService } from '../services/user';
import { ToastrService } from 'ngx-toastr';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Auth } from '../services/auth';
import { LoginResponse } from '../models/user';
@Component({
  selector: 'app-login',
  imports: [RouterLink, ReactiveFormsModule, CommonModule],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class Login {
  errorMessage: string = '';
  successMessage: string = '';
  private _UsersService = inject(UsersService);
  private _router = inject(Router);
  private _toastr = inject(ToastrService);
  private _AuthService = inject(Auth);

  SinginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)]),
    rememberMe: new FormControl(false)
  });

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
    this._AuthService.onSignIn(form).subscribe({
      next: (response: LoginResponse) => {
        console.log(response);
        localStorage.setItem('accessToken', response.data.accessToken);
        localStorage.setItem('refreshToken', response.data.refreshToken);
        localStorage.setItem('userId', response.data.profile._id);
        localStorage.setItem('userEmail', response.data.profile.email);
        localStorage.setItem('firstName', response.data.profile.first_name);
        localStorage.setItem('lastName', response.data.profile.last_name);
        localStorage.setItem('fullName', `${response.data.profile.first_name} ${response.data.profile.last_name}`);
        localStorage.setItem('userRole', response.data.profile.role);
        localStorage.setItem('userStatus', response.data.profile.status);

        this.successMessage = response.message;
        this._toastr.success(response.message, 'Success');
        setTimeout(() => {
          this._router.navigate(['/dashboard']);
        }, 5000);
      },
      error: (error: any) => {
        // console.error('Login Error:', error);
        if (error.status === 404) {
          this.errorMessage = 'Account not found. Please register first.';
          this._toastr.error('Account not found. Please register first.', 'User Not Found', {
            timeOut: 4000,
            closeButton: true,
            progressBar: true,
          });
        }
        else if (error.status === 401 || error.status === 403) {
          this.errorMessage = 'Invalid email or password. Please try again.';
          this._toastr.error('Invalid email or password', 'Authentication Failed');

        }
      },
    });
  }
}





// import { Component, inject } from '@angular/core';
// import { Router, RouterLink } from '@angular/router';
// import { UsersService } from '../services/user';
// import { ToastrService } from 'ngx-toastr';
// import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
// import { CommonModule } from '@angular/common';
// import { Auth } from '../services/auth';
// import { LoginResponse } from '../models/user';

// @Component({
//   selector: 'app-login',
//   imports: [RouterLink, ReactiveFormsModule, CommonModule],
//   templateUrl: './login.html',
//   styleUrl: './login.scss',
// })
// export class Login {
//   errorMessage: string = '';
//   successMessage: string = '';
//   private _UsersService = inject(UsersService);
//   private _router = inject(Router);
//   private _toastr = inject(ToastrService);
//   private _AuthService = inject(Auth);

//   SinginForm = new FormGroup({
//     email: new FormControl('', [Validators.required, Validators.email]),
//     password: new FormControl('', [Validators.required, Validators.minLength(6)]),
//     rememberMe: new FormControl(false)
//   });

//   onSubmit(data: FormGroup) {
//     console.log(data.value);
//     if (this.SinginForm.invalid) {
//       this._toastr.error('Please fill in all required fields correctly', 'Validation Error');
//       return;
//     }

//     // ✅ Extract rememberMe and pass it along
//     const { email, password, rememberMe } = data.value;
//     this.signIn({ email, password }, rememberMe);
//   }

//   signIn(credentials: any, rememberMe: boolean) {
//     console.log(credentials);
//     console.log('Remember Me:', rememberMe);

//     this._AuthService.onSignIn(credentials).subscribe({
//       next: (response: LoginResponse) => {
//         console.log(response);

//         const storage = rememberMe ? localStorage : sessionStorage;

//         storage.setItem('accessToken', response.data.accessToken);
//         storage.setItem('refreshToken', response.data.refreshToken);
//         storage.setItem('userId', response.data.profile._id);
//         storage.setItem('userEmail', response.data.profile.email);
//         storage.setItem('firstName', response.data.profile.first_name);
//         storage.setItem('lastName', response.data.profile.last_name);
//         storage.setItem('fullName', `${response.data.profile.first_name} ${response.data.profile.last_name}`);
//         storage.setItem('userRole', response.data.profile.role);
//         storage.setItem('userStatus', response.data.profile.status);

//         this.successMessage = response.message;
//         this._toastr.success(response.message, 'Success');
//         setTimeout(() => {
//           this._router.navigate(['/dashboard']);
//         }, 1000);
//       },
//       error: (error: any) => {
//         if (error.status === 404) {
//           this.errorMessage = 'Account not found. Please register first.';
//           this._toastr.error('Account not found. Please register first.', 'User Not Found', {
//             timeOut: 4000,
//             closeButton: true,
//             progressBar: true,
//           });
//         }
//         else if (error.status === 401 || error.status === 403) {
//           this.errorMessage = 'Invalid email or password. Please try again.';
//           this._toastr.error('Invalid email or password', 'Authentication Failed');
//         }
//       },
//     });
//   }
// }
