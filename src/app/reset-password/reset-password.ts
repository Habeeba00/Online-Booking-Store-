import { Component, inject } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../services/auth';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink,Router} from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-reset-password',
  imports: [RouterLink,ReactiveFormsModule,CommonModule],
  templateUrl: './reset-password.html',
  styleUrl: './reset-password.scss',
})
export class ResetPassword {
  showPassword: boolean = false;

  private _AuthService = inject(AuthService);
  private _router = inject(Router);
  private _toastr = inject(ToastrService);

  ResetPasswordForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    otp: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)])
  });

  togglePassword() {
    this.showPassword = !this.showPassword;
  }

  onSubmit(form:FormGroup) {
    if (this.ResetPasswordForm.invalid) {
      this._toastr.error('Please fill all fields correctly', 'Validation Error');
      return;
    }
    this.ResetPassword(form);
  }

  ResetPassword(data:FormGroup) {
    this._AuthService.onResetPassword(data.value).subscribe({
      next: (response) => {
        console.log(response);
        this._toastr.success('Password reset successfully!', 'Success',{
          timeOut: 7000
        });
        setTimeout(() => {
          this._router.navigate(['../login']);
        }, 2000);
      },
      error: (error) => {
        console.log('Error Details:', error.error);

        let errorMsg = 'Something went wrong';

        if (error.error.message) {
          if (Array.isArray(error.error.message)) {
            errorMsg = error.error.message.join(', ');
          } else {
            errorMsg = error.error.message;
          }
        }
        this._toastr.error(errorMsg, 'Error',{
          timeOut: 5000
        });
      }
    });
  }
}
