# User Authentication

The API supports multiple authentication methods for both admin and end users including password-based, MFA, WebAuthn, TOTP, CIBA, and social login (OIDC).

## Admin Authentication

Admin users authenticate against the master database with global access.

### Admin Login

Authenticates an admin user and returns a JWT token for admin operations.

**POST** `/uflow/auth/admin/login`

**Request Body:**
```json
{
  "email": "admin@example.com",
  "password": "securepassword123",
  "tenant_domain": "example-tenant",
  "challenge": "challenge-token",
  "nonce": "random-nonce",
  "timestamp": 1737382800,
  "signature": "hmac-signature"
}
```

**Required Fields:**
- `email` (string)
- `password` (string, min: 10 characters)

**Optional Fields (Anti-replay Protection):**
- `tenant_domain` (string)
- `challenge` (string): Challenge token if using challenge-response
- `nonce` (string): Anti-replay attack protection
- `timestamp` (integer): Unix timestamp of request
- `signature` (string): HMAC signature of request

**Response:** 200 OK
```json
{
  "token": "jwt-token",
  "email": "admin@example.com",
  "tenant_id": "uuid",
  "tenant_domain": "example-tenant",
  "mfa_required": false,
  "otp_required": false,
  "webauthn_required": false,
  "first_login": false,
  "mfa_method": "totp",
  "methods": ["password", "totp"]
}
```

**Error Responses:**
- `400`: Bad request - invalid input
- `401`: Unauthorized - invalid credentials or account disabled
- `500`: Internal server error

---

### Admin Registration

Initiates admin user registration by creating a pending registration with OTP.

**POST** `/uflow/auth/admin/register`

**Request Body:**
```json
{
  "email": "newadmin@example.com",
  "password": "securepass",
  "name": "Admin Name",
  "tenant_domain": "new-tenant"
}
```

**Required Fields:**
- `email` (string)
- `password` (string, min: 6 characters)
- `name` (string)
- `tenant_domain` (string)

**Response:** 201 Created
```json
{
  "message": "Registration initiated. Please check your email for OTP.",
  "email": "newadmin@example.com"
}
```

**Error Responses:**
- `400`: Bad request
- `409`: User or tenant already exists
- `500`: Internal server error

---

### Complete Admin Registration

Completes admin registration by verifying OTP and creating admin user and tenant.

**POST** `/uflow/auth/admin/complete-registration`

**Request Body:**
```json
{
  "email": "newadmin@example.com",
  "otp": "123456"
}
```

**Response:** 200 OK

**Error Responses:**
- `400`: Bad request - invalid input
- `401`: Unauthorized - invalid OTP
- `500`: Internal server error

---

### Admin Login Precheck

Validates if admin user exists and returns tenant context for login flow.

**POST** `/uflow/auth/admin/login/precheck`

**Request Body:**
```json
{
  "email": "admin@example.com"
}
```

**Response:** 200 OK
```json
{
  "exists": true,
  "tenant_id": "uuid",
  "tenant_domain": "example-tenant",
  "requires_password": true,
  "available_providers": ["local", "google"],
  "display_name": "Admin User",
  "next_step": "password"
}
```

---

### Get Authentication Challenge

Generates a server-issued challenge for use in login requests to prevent replay attacks.

**GET** `/uflow/auth/admin/challenge`

**Response:** 200 OK
```json
{
  "challenge": "random-challenge-string",
  "created_at": "2026-01-20T10:00:00Z",
  "expires_at": "2026-01-20T10:05:00Z"
}
```

---

## End User Authentication

End users authenticate against tenant-specific databases.

### End User Login

Authenticates end-users and returns JWT tokens for tenant-specific operations.

**POST** `/uflow/auth/enduser/login`

**Request Body:**
```json
{
  "client_id": "client-uuid",
  "email": "user@example.com",
  "password": "userpassword"
}
```

**Required Fields:**
- `client_id` (string): Maps to tenant
- `email` (string)
- `password` (string)

**Response:** 200 OK
```json
{
  "token": "jwt-token",
  "email": "user@example.com",
  "client_id": "client-uuid",
  "mfa_required": false,
  "otp_required": false,
  "webauthn_required": false,
  "first_login": false,
  "tenant_id": "uuid",
  "tenant_domain": "example",
  "mfa_method": "totp",
  "methods": ["password"]
}
```

**Error Responses:**
- `400`: Bad request - invalid input
- `401`: Unauthorized - invalid credentials
- `500`: Internal server error

---

### Initiate End User Registration

Starts the registration process for end-users by sending an OTP to the provided email.

**POST** `/uflow/auth/enduser/initiate-registration`

**Request Body:**
```json
{
  "client_id": "client-uuid",
  "email": "newuser@example.com",
  "password": "securepassword"
}
```

**Required Fields:**
- `client_id` (string)
- `email` (string)
- `password` (string)

**Response:** 200 OK
```json
{
  "email": "newuser@example.com",
  "message": "OTP sent successfully. Please check your email."
}
```

**Error Responses:**
- `400`: Bad request - invalid input
- `409`: Conflict - user already exists
- `500`: Internal server error

---

### Verify OTP and Complete Registration

Verifies the OTP sent during registration and creates the user account.

**POST** `/uflow/auth/enduser/verify-otp`

**Request Body:**
```json
{
  "email": "newuser@example.com",
  "otp": "123456"
}
```

**Response:** 200 OK
```json
{
  "email_id": "user@example.com",
  "tenant_id": "uuid",
  "client_id": "client-uuid",
  "tenant_domain": "example",
  "project_id": "project-uuid"
}
```

**Error Responses:**
- `400`: Bad request - invalid input
- `401`: Unauthorized - invalid OTP
- `500`: Internal server error

---

### Verify Login OTP

Verifies OTP for multi-factor authentication during login.

**POST** `/uflow/auth/enduser/verify-login-otp`

**Request Body:**
```json
{
  "email": "user@example.com",
  "otp": "123456",
  "tenant_id": "uuid"
}
```

**Response:** 200 OK
```json
{
  "token": "jwt-token",
  "message": "Login successful"
}
```

**Error Responses:**
- `400`: Bad request - invalid input
- `401`: Unauthorized - invalid OTP
- `500`: Internal server error

---

### Resend OTP

Resends OTP for registration or login verification.

**POST** `/uflow/auth/enduser/resend-otp`

**Request Body:**
```json
{
  "email": "user@example.com"
}
```

**Response:** 200 OK

---

## Password Reset

### Admin Password Reset (Forgot Password)

Initiates a password reset process for admin users.

**POST** `/uflow/auth/admin/forgot-password`

**Request Body:**
```json
{
  "email": "admin@example.com"
}
```

**Response:** 200 OK
```json
{
  "message": "If the email exists, a reset code has been sent"
}
```

---

### Verify OTP for Admin Password Reset

**POST** `/uflow/auth/admin/forgot-password/verify-otp`

**Request Body:**
```json
{
  "email": "admin@example.com",
  "otp": "123456"
}
```

**Response:** 200 OK

**Error Responses:**
- `400`: Bad request - invalid input
- `401`: Unauthorized - invalid OTP

---

### Reset Admin Password

Completes the password reset process for admin users.

**POST** `/uflow/auth/admin/forgot-password/reset`

**Request Body:**
```json
{
  "email": "admin@example.com",
  "otp": "123456",
  "new_password": "newsecurepassword"
}
```

**Required Fields:**
- `email` (string)
- `otp` (string)
- `new_password` (string, min: 6 characters)

**Response:** 200 OK

**Error Responses:**
- `400`: Bad request - invalid input
- `401`: Unauthorized - invalid verification

---

### Admin Reset User Password

Allows admin to reset user password to a temporary password and optionally send it via email.

**POST** `/uflow/user/admin/reset-password`

**Response:** 200 OK

**Error Responses:**
- `400`: Bad request
- `404`: User not found
- `500`: Internal server error

---

## Token Management

### Refresh Access Token

**POST** `/auth/refresh`

Refreshes an access token using a valid refresh token.

---

### Logout (Revoke All Tokens)

**POST** `/auth/logout`

**Authorization:** Bearer Token required

Revokes all refresh tokens for the authenticated user.

**Response:** 200 OK

---

### Revoke Refresh Token

**POST** `/auth/revoke`

**Request Body:**
```json
{
  "refresh_token": "refresh-token-string"
}
```

**Response:** 200 OK

---

### Blacklist Access Token

**POST** `/auth/blacklist`

**Authorization:** Bearer Token required

Immediately blacklists an access token (for security incidents only).

**Response:** 200 OK
