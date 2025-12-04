import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { RouterLink, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { UsersService } from '../services/user';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-register',
  imports: [RouterLink, ReactiveFormsModule, CommonModule],
  templateUrl: './register.html',
  styleUrl: './register.scss',
})
export class Register {
  private _UsersService = inject(UsersService);
  private _router = inject(Router);
  private _toastr = inject(ToastrService);

  RegisterForm = new FormGroup({
    first_name: new FormControl('', [Validators.required, Validators.minLength(2)]),
    last_name: new FormControl('', [Validators.required, Validators.minLength(2)]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)]),
    role: new FormControl('Admin', [Validators.required]),
  });

  onSubmit(data: FormGroup) {
    if (this.RegisterForm.invalid) {
    this._toastr.error('Please fill in all required fields correctly', 'Validation Error',)
    }

    this.addUser(data);
  }

  addUser(form: FormGroup) {
    this._UsersService.createUser(form.value).subscribe({
      next: (response) => {
        console.log(response);
        this.RegisterForm.reset();
        setTimeout(() => {
          this._router.navigate(['/login']);
        }, 5000);
      },
      error: (error) => {
        console.error('Error Details:', error.error);
        const errorMessage = error.error?.message || 'Registration failed. Please try again.';
        this._toastr.error(errorMessage, 'Registration Failed', {
          timeOut: 5000,
          progressBar: true,
          closeButton: true
        });
      },
      complete:()=>{
        this._toastr.success('User Created successfully!', 'Success',{
          timeOut: 3000,
          progressBar: true,
          closeButton: true
        });
      }
    });
  }
}
