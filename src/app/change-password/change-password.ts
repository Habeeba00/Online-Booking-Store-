import { Component, inject } from '@angular/core';
import { AuthService } from '../services/auth';
import { ToastrService } from 'ngx-toastr';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink, Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-change-password',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './change-password.html',
  styleUrl: './change-password.scss',
})
export class ChangePassword {
  showPassword: boolean = false;

  private _AuthService = inject(AuthService);
  private _router = inject(Router);
  private _toastr = inject(ToastrService);

  ChangePasswordForm = new FormGroup({
    password: new FormControl('', [Validators.required, Validators.minLength(6)]),
    password_new: new FormControl('', [Validators.required, Validators.minLength(6)]),
  });

  onSubmit(data: FormGroup) {
    if (this.ChangePasswordForm.invalid) {
      this._toastr.error('Please fill all fields correctly', 'Validation Error');
      return;
    }
    this.ChangePassword(data);
  }
  togglePassword() {
    this.showPassword = !this.showPassword;
  }

  ChangePassword(form: FormGroup) {
    this._AuthService.onChangePassword(form.value).subscribe({
      next: (response) => {
        console.log(response);
        this._toastr.success('Password changed successfully!', 'Success');
        setTimeout(() => {
          this._router.navigate(['../login']);
        }, 2000);
      },
      error: (error) => {
        console.log('Error:', error);
        console.log('Error message:', error.error.message);

        let errorMsg = 'Something went wrong';

        if (error.error?.message) {
          if (Array.isArray(error.error.message)) {
            errorMsg = error.error.message.join(', '); // ✅ Show all errors
          } else {
            errorMsg = error.error.message;
          }
        }

        this._toastr.error(errorMsg, 'Error', {
          timeOut: 8000,
          closeButton: true,
          progressBar: true,
        });
      },
    });
  }
}
