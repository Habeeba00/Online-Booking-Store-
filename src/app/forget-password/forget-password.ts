import { FormControl, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from './../services/auth';
import { Component, inject } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { CommonModule } from '@angular/common';
import { RouterLink,Router } from '@angular/router';

@Component({
  selector: 'app-forget-password',
  imports: [ ReactiveFormsModule, CommonModule],
  templateUrl: './forget-password.html',
  styleUrl: './forget-password.scss',
})
export class ForgetPassword {

  private _AuthService= inject(AuthService);
  private _router = inject(Router);
  private _toastr = inject(ToastrService);

  ForgetPasswordForm = new FormGroup({
    email: new FormControl('',[Validators.email,Validators.required])
  })
  onSubmit(data:FormGroup) {
    if (this.ForgetPasswordForm.invalid) {
      this._toastr.error('Please enter a valid email', 'Validation Error');
      return;
    }
    this.ForgetPassword(data);

  }
  ForgetPassword(form:FormGroup){
    this._AuthService.onForgitPassword(form.value).subscribe({
      next:(response)=>{
      console.log(response);
      this._toastr.success('Password reset link sent to your email!', 'Success');
      setTimeout(()=>{
        this._router.navigate(['/reset-password']);
      },3000);
    },
    error:(error)=>{
      console.log('Error Details:', error.error);
      this._toastr.error(error.error.message || 'Something went wrong', 'Error');
    }
  })
  }
}
