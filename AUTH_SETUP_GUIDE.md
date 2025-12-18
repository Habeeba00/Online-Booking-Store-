# Authentication Setup Guide

## ✅ What's Been Set Up

### 1. **Auth Service** (`src/app/services/auth.service.ts`)
- Login/logout functionality
- Token management (localStorage/sessionStorage)
- Token refresh support
- User authentication checking
- Remember me functionality

### 2. **Auth Interceptor** (`src/app/interceptors/auth.interceptor.ts`)
- Automatically adds `Authorization: Bearer <token>` header to all requests
- Handles token refresh on 401 errors
- Skips auth for login/register endpoints

### 3. **Auth Guards** (`src/app/guards/auth.guard.ts`)
- `authGuard`: Protects routes (requires login)
- `loginGuard`: Redirects to dashboard if already logged in

### 4. **Updated Login Component**
- Reactive forms with validation
- Error handling and display
- Loading states
- Form validation messages

---

## 🔧 Configuration

### Update API URL

In `src/app/services/auth.service.ts`, update the API URL:

```typescript
private apiUrl = 'http://localhost:3000/api'; // Change to your API URL
```

### Expected API Response Format

Your login API should return:

```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "refreshToken": "optional_refresh_token",
  "user": {
    "id": "123",
    "email": "user@example.com",
    "name": "John Doe",
    "role": "customer"
  }
}
```

---

## 📝 How to Use

### 1. Login

The login form is already set up. Users can:
- Enter email and password
- Check "Remember me" to store token in localStorage
- See validation errors
- See API error messages

### 2. Protect Routes

Routes are already protected in `app.routes.ts`:
- `/dashboard` - requires authentication
- `/change-password` - requires authentication
- `/login` - redirects to dashboard if already logged in

### 3. Use Auth Service in Components

```typescript
import { AuthService } from '../services/auth.service';

export class MyComponent {
  private authService = inject(AuthService);

  logout() {
    this.authService.logout();
  }

  checkAuth() {
    if (this.authService.isAuthenticated()) {
      // User is logged in
    }
  }

  getCurrentUser() {
    return this.authService.getCurrentUser();
  }
}
```

### 4. Make Authenticated API Calls

The interceptor automatically adds the token, so just use HttpClient normally:

```typescript
import { HttpClient } from '@angular/common/http';

export class MyComponent {
  private http = inject(HttpClient);

  getData() {
    // Token is automatically added by interceptor
    return this.http.get('http://localhost:3000/api/products');
  }
}
```

---

## 🎨 Features

### ✅ Form Validation
- Email format validation
- Password minimum length (6 characters)
- Required field validation
- Real-time error messages

### ✅ Error Handling
- Network errors
- 401 Unauthorized (invalid credentials)
- Server errors
- User-friendly error messages

### ✅ Token Management
- Automatic token storage
- Remember me functionality
- Token expiration checking
- Token refresh support

### ✅ Route Protection
- Protected routes require login
- Automatic redirect to login
- Return URL support

---

## 🔄 Next Steps

1. **Update API URL** in `auth.service.ts`
2. **Test login** with your backend API
3. **Add logout button** in your dashboard/header component
4. **Update register component** to use similar form validation
5. **Add user profile display** using `getCurrentUser()`

---

## 📚 Example: Adding Logout Button

```typescript
// dashboard.ts or header component
import { AuthService } from '../services/auth.service';

export class Dashboard {
  private authService = inject(AuthService);

  logout() {
    this.authService.logout();
  }
}
```

```html
<!-- dashboard.html -->
<button (click)="logout()">Logout</button>
```

---

## 🐛 Troubleshooting

### Token not being sent?
- Check that interceptor is registered in `app.config.ts`
- Verify token exists: `localStorage.getItem('auth_token')`

### 401 errors?
- Check token expiration
- Verify API endpoint format
- Check interceptor logic

### Form validation not working?
- Ensure `ReactiveFormsModule` is imported in component
- Check form control names match HTML

---

## 📖 API Endpoints Expected

Your backend should have:

- `POST /api/auth/login` - Login endpoint
- `POST /api/auth/refresh` - Refresh token endpoint (optional)

---

## 🔐 Security Notes

- Tokens stored in localStorage (if "Remember me") or sessionStorage
- Tokens automatically added to requests
- 401 errors trigger logout
- Token expiration is checked





























