# Angular 20 Migration Guide - Control Flow Syntax

## Overview
Angular 17+ introduced new **control flow syntax** that replaces the old structural directives (`*ngIf`, `*ngFor`, `*ngSwitch`). In Angular 20, both syntaxes work, but the new `@` syntax is recommended.

---

## 1. Conditional Rendering: `*ngIf` → `@if`

### Old Syntax (Angular 16):
```html
<div *ngIf="isLoggedIn">
  <p>Welcome back!</p>
</div>

<div *ngIf="isLoggedIn; else notLoggedIn">
  <p>Welcome!</p>
</div>
<ng-template #notLoggedIn>
  <p>Please log in</p>
</ng-template>
```

### New Syntax (Angular 20):
```html
@if (isLoggedIn) {
  <p>Welcome back!</p>
}

@if (isLoggedIn) {
  <p>Welcome!</p>
} @else {
  <p>Please log in</p>
}
```

### Multiple Conditions:
```html
@if (user.role === 'admin') {
  <admin-dashboard />
} @else if (user.role === 'vendor') {
  <vendor-dashboard />
} @else {
  <customer-dashboard />
}
```

---

## 2. Loops: `*ngFor` → `@for`

### Old Syntax (Angular 16):
```html
<ul>
  <li *ngFor="let item of items; let i = index; trackBy: trackById">
    {{ i }}: {{ item.name }}
  </li>
</ul>
```

### New Syntax (Angular 20):
```html
<ul>
  @for (item of items; track item.id) {
    <li>{{ $index }}: {{ item.name }}</li>
  }
</ul>
```

### With Empty State:
```html
@for (item of items; track item.id) {
  <div>{{ item.name }}</div>
} @empty {
  <p>No items found</p>
}
```

### Track Function:
```html
@for (user of users; track user.id) {
  <user-card [user]="user" />
}
```

**Note:** `$index`, `$first`, `$last`, `$even`, `$odd` are available as implicit variables.

---

## 3. Switch Statements: `*ngSwitch` → `@switch`

### Old Syntax (Angular 16):
```html
<div [ngSwitch]="status">
  <p *ngSwitchCase="'loading'">Loading...</p>
  <p *ngSwitchCase="'success'">Success!</p>
  <p *ngSwitchDefault>Unknown status</p>
</div>
```

### New Syntax (Angular 20):
```html
@switch (status) {
  @case ('loading') {
    <p>Loading...</p>
  }
  @case ('success') {
    <p>Success!</p>
  }
  @default {
    <p>Unknown status</p>
  }
}
```

---

## 4. Standalone Components (You're Already Using This!)

Your components are already using standalone syntax:
```typescript
@Component({
  selector: 'app-login',
  imports: [RouterLink],  // ✅ Standalone - no NgModule needed
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class Login {}
```

---

## 5. Forms & Validation (Still Works the Same!)

### Reactive Forms:
```typescript
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule],
  templateUrl: './login.html'
})
export class Login {
  loginForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      // Handle login
    }
  }
}
```

### Template:
```html
<form [formGroup]="loginForm" (ngSubmit)="onSubmit()">
  <input formControlName="email" />
  @if (loginForm.get('email')?.hasError('required') && loginForm.get('email')?.touched) {
    <span class="error">Email is required</span>
  }
  
  <button type="submit" [disabled]="loginForm.invalid">Login</button>
</form>
```

---

## 6. HTTP Interceptors (Still Works the Same!)

```typescript
import { HttpInterceptorFn } from '@angular/common/http';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const token = localStorage.getItem('token');
  
  if (token) {
    req = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
  }
  
  return next(req);
};
```

### Register in `app.config.ts`:
```typescript
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { authInterceptor } from './interceptors/auth.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(withInterceptors([authInterceptor])),
    // ... other providers
  ]
};
```

---

## 7. Common Patterns

### Loading States:
```html
@if (isLoading) {
  <div class="spinner">Loading...</div>
} @else if (error) {
  <div class="error">{{ error }}</div>
} @else {
  <div class="content">{{ data }}</div>
}
```

### Lists with Empty States:
```html
@for (product of products; track product.id) {
  <product-card [product]="product" />
} @empty {
  <div class="empty-state">
    <p>No products found</p>
  </div>
}
```

### Conditional Classes:
```html
<div [class.active]="isActive">
  <!-- Old way still works -->
</div>

<!-- Or with new syntax -->
@if (isActive) {
  <div class="active">Content</div>
} @else {
  <div>Content</div>
}
```

---

## 8. Key Differences Summary

| Old (Angular 16) | New (Angular 20) | Notes |
|-----------------|------------------|-------|
| `*ngIf` | `@if` | More readable, better performance |
| `*ngFor` | `@for` | Built-in `@empty` block, better tracking |
| `*ngSwitch` | `@switch` | Cleaner syntax |
| `NgIf`, `NgFor` imports | No imports needed | Built into Angular |
| `ng-template` | `@else`, `@empty` blocks | More intuitive |

---

## 9. Migration Tips

1. **Both syntaxes work** - You can gradually migrate
2. **New syntax is recommended** - Better performance and readability
3. **No imports needed** - `@if`, `@for`, `@switch` are built-in
4. **Track is required** - `@for` requires a `track` expression for performance

---

## 10. Example: Login Component with New Syntax

```typescript
// login.ts
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, RouterLink, CommonModule],
  templateUrl: './login.html',
  styleUrl: './login.scss'
})
export class Login {
  loginForm: FormGroup;
  isLoading = false;
  error: string | null = null;

  constructor(private fb: FormBuilder) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      this.isLoading = true;
      // API call...
    }
  }
}
```

```html
<!-- login.html -->
@if (isLoading) {
  <div class="loading">Loading...</div>
} @else {
  <form [formGroup]="loginForm" (ngSubmit)="onSubmit()">
    <div>
      <label>Email</label>
      <input formControlName="email" />
      @if (loginForm.get('email')?.hasError('required') && loginForm.get('email')?.touched) {
        <span class="error">Email is required</span>
      }
    </div>
    
    <button type="submit" [disabled]="loginForm.invalid">Login</button>
  </form>
  
  @if (error) {
    <div class="error-message">{{ error }}</div>
  }
}
```

---

## Need Help?

- **Angular Docs**: https://angular.dev/guide/control-flow
- **Migration Guide**: https://angular.dev/guide/control-flow-migration
- Both old and new syntax work, so migrate gradually!









