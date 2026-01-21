# Multi-Factor Authentication (MFA)

The API supports multiple MFA methods including TOTP (Time-based One-Time Password), WebAuthn, and CIBA (Client-Initiated Backchannel Authentication).

## TOTP Authentication

### Register TOTP Device

Registers a new TOTP authenticator device and returns QR code for setup.

**POST** `/uflow/auth/totp/register`

**Authorization:** Bearer Token required

**Request Body:**
```json
{
  "device_name": "My iPhone",
  "device_type": "google_auth"
}
```

**Required Fields:**
- `device_name` (string): e.g., "My iPhone", "Personal iPad"

**Optional Fields:**
- `device_type` (string): generic, google_auth, microsoft_auth, authy

**Response:** 200 OK
```json
{
  "success": true,
  "device_id": "uuid",
  "secret": "JBSWY3DPEHPK3PXP",
  "qr_code_url": "data:image/png;base64,...",
  "backup_codes": [
    "12345678",
    "87654321"
  ],
  "message": "TOTP device registered. Scan QR code with your authenticator app"
}
```

---

### Confirm TOTP Device Registration

Confirms TOTP device registration by validating the first TOTP code.

**POST** `/uflow/auth/totp/confirm`
**POST** `/uflow/auth/tenant/totp/confirm` (Tenant users)

**Authorization:** Bearer Token required

**Request Body:**
```json
{
  "device_id": "uuid",
  "totp_code": "123456"
}
```

**Required Fields:**
- `device_id` (string)
- `totp_code` (string): 6-digit code to verify setup

**Response:** 200 OK
```json
{
  "success": true,
  "device_id": "uuid",
  "device_name": "My iPhone",
  "message": "Device confirmed successfully"
}
```

---

### Get TOTP Devices

Returns list of registered TOTP devices for the authenticated user.

**GET** `/uflow/auth/totp/devices`
**GET** `/uflow/auth/tenant/totp/devices` (Tenant users)

**Authorization:** Bearer Token required

**Response:** 200 OK
```json
{
  "success": true,
  "devices": [
    {
      "device_id": "uuid",
      "device_name": "My iPhone",
      "device_type": "google_auth",
      "is_primary": true,
      "created_at": "2026-01-20T10:00:00Z",
      "last_used": "2026-01-20T15:30:00Z"
    }
  ],
  "message": "Devices retrieved successfully"
}
```

---

### TOTP-Only Login

Login using TOTP code only (no password required). Returns JWT token if valid.

**POST** `/uflow/auth/totp/login`
**POST** `/uflow/auth/tenant/totp/login` (Tenant users)

**Request Body:**
```json
{
  "email": "user@example.com",
  "totp_code": "123456"
}
```

**Tenant Request (additional field):**
```json
{
  "client_id": "client-uuid",
  "email": "user@example.com",
  "tenant_domain": "example",
  "totp_code": "123456"
}
```

**Response:** 200 OK
```json
{
  "success": true,
  "token": "jwt-token",
  "message": "Login successful"
}
```

**Error Responses:**
- `400`: Bad request or invalid TOTP
- `404`: User not found
- `500`: Internal server error

---

### Verify TOTP Code

Validates TOTP code for authentication. Returns JWT token if valid.

**POST** `/uflow/auth/totp/verify`

**Authorization:** Bearer Token required

**Request Body:**
```json
{
  "totp_code": "123456"
}
```

**Response:** 200 OK
```json
{
  "success": true,
  "token": "jwt-token",
  "require_otp": false,
  "message": "Verification successful"
}
```

---

### Delete TOTP Device

Deletes a registered TOTP device.

**POST** `/uflow/auth/totp/device/delete`
**POST** `/uflow/auth/tenant/totp/devices/delete` (Tenant users)

**Authorization:** Bearer Token required

**Request Body:**
```json
{
  "device_id": "uuid"
}
```

**Response:** 200 OK
```json
{
  "success": true,
  "message": "Device deleted successfully"
}
```

---

### Set Primary TOTP Device

Sets a TOTP device as the primary device.

**POST** `/uflow/auth/totp/device/primary`
**POST** `/uflow/auth/tenant/totp/devices/primary` (Tenant users)

**Authorization:** Bearer Token required

**Request Body:**
```json
{
  "device_id": "uuid"
}
```

**Response:** 200 OK
```json
{
  "success": true,
  "message": "Primary device updated"
}
```

---

### Regenerate Backup Codes

Generates new backup codes. Old codes will be invalidated.

**POST** `/uflow/auth/totp/backup/regenerate`

**Authorization:** Bearer Token required

**Response:** 200 OK
```json
{
  "success": true,
  "backup_codes": [
    "12345678",
    "87654321",
    "11223344"
  ],
  "message": "Backup codes regenerated"
}
```

---

## WebAuthn Authentication

### Register WebAuthn Credentials

Stores WebAuthn credentials in tenant database and generates JWT token for automatic login.

**POST** `/uflow/webauthn/register`

**Request Body:**
```json
{
  "credential_id": "credential-id",
  "public_key": "public-key-data",
  "user_id": "uuid",
  "tenant_id": "uuid"
}
```

**Response:** 200 OK

**Error Responses:**
- `400`: Bad request
- `401`: Unauthorized
- `500`: Internal server error

---

### WebAuthn Authentication Callback

Processes WebAuthn authentication responses for passwordless login.

**POST** `/uflow/auth/enduser/webauthn-callback`

**Request Body:**
```json
{
  "email": "user@example.com",
  "tenant_id": "uuid",
  "mfa_verified": true
}
```

**Required Fields:**
- `email` (string)
- `tenant_id` (string)
- `mfa_verified` (boolean)

**Response:** 200 OK
```json
{
  "token": "jwt-token",
  "email": "user@example.com",
  "client_id": "client-uuid"
}
```

**Error Responses:**
- `400`: Bad request - invalid input
- `401`: Unauthorized - authentication failed
- `500`: Internal server error

---

## CIBA (Push Notification) Authentication

CIBA allows users to authenticate using push notifications to their registered mobile devices.

### Register Device for Push Notifications

Mobile app registers device token (FCM/APNS) for push notifications.

**POST** `/uflow/auth/ciba/register-device`
**POST** `/uflow/auth/tenant/ciba/register-device` (Tenant users)

**Authorization:** Bearer Token required

**Request Body:**
```json
{
  "device_token": "fcm-or-apns-token",
  "platform": "ios",
  "device_name": "iPhone 13",
  "device_model": "iPhone14,5",
  "os_version": "16.0",
  "app_version": "1.0.0"
}
```

**Required Fields:**
- `device_token` (string): FCM/APNS token
- `platform` (string): ios or android

**Optional Fields:**
- `device_name` (string)
- `device_model` (string)
- `os_version` (string)
- `app_version` (string)

**Response:** 200 OK
```json
{
  "success": true,
  "device_id": "uuid",
  "message": "Device registered for push notifications"
}
```

---

### Get Registered CIBA Devices

Retrieves all active push notification devices registered by the authenticated user.

**GET** `/uflow/auth/ciba/devices`
**GET** `/uflow/auth/tenant/ciba/devices` (Tenant users)

**Authorization:** Bearer Token required

**Response:** 200 OK
```json
{
  "success": true,
  "devices": [
    {
      "device_id": "uuid",
      "device_name": "iPhone 13",
      "platform": "ios",
      "registered_at": "2026-01-20T10:00:00Z",
      "last_used": "2026-01-20T15:30:00Z",
      "is_active": true
    }
  ],
  "message": "Devices retrieved successfully"
}
```

---

### Initiate CIBA Authentication

Initiates CIBA flow by looking up user by email and sending push notification to their registered device.

**POST** `/uflow/auth/ciba/initiate`
**POST** `/uflow/auth/tenant/ciba/initiate` (Tenant users)

**Request Body:**
```json
{
  "login_hint": "user@example.com",
  "scopes": ["openid", "profile"],
  "client_id": "client-uuid",
  "binding_message": "Login from Chrome on Windows"
}
```

**Tenant Request:**
```json
{
  "client_id": "client-uuid",
  "email": "user@example.com",
  "scopes": ["openid", "profile"],
  "binding_message": "Login from Chrome on Windows",
  "tenant_domain": "example"
}
```

**Required Fields:**
- `login_hint` or `email` (string): User email
- `client_id` (string, tenant only)

**Optional Fields:**
- `scopes` (array of strings): OAuth scopes
- `binding_message` (string): Message shown to user

**Response:** 200 OK
```json
{
  "auth_req_id": "uuid",
  "expires_in": 300,
  "interval": 5
}
```

**Error Responses:**
- `400`: Bad request
- `500`: Internal server error

---

### Respond to CIBA Request

User approves or denies the CIBA authentication request from mobile app.

**POST** `/uflow/auth/ciba/respond`
**POST** `/uflow/auth/tenant/ciba/respond` (Tenant users)

**Authorization:** Bearer Token required

**Request Body:**
```json
{
  "auth_req_id": "uuid",
  "approved": true,
  "biometric_verified": true
}
```

**Required Fields:**
- `auth_req_id` (string)

**Optional Fields:**
- `approved` (boolean)
- `biometric_verified` (boolean)

**Response:** 200 OK
```json
{
  "success": true,
  "message": "Authentication request approved"
}
```

---

### Poll for CIBA Token

Voice agent or client polls this endpoint to check if user has approved. Returns token when approved.

**POST** `/uflow/auth/ciba/token`
**POST** `/uflow/auth/tenant/ciba/token` (Tenant users)

**Request Body:**
```json
{
  "auth_req_id": "uuid",
  "client_id": "client-uuid"
}
```

**Response:** 200 OK
```json
{
  "access_token": "jwt-token",
  "token_type": "Bearer",
  "expires_in": 3600,
  "refresh_token": "refresh-token",
  "scope": "openid profile"
}
```

**Error Response (Pending):**
```json
{
  "error": "authorization_pending",
  "error_description": "User has not approved the request yet"
}
```

---

### Delete CIBA Device

Removes a registered CIBA push device.

**DELETE** `/uflow/auth/ciba/devices/{device_id}`
**DELETE** `/uflow/auth/tenant/ciba/devices/{device_id}` (Tenant users)

**Authorization:** Bearer Token required

**Path Parameters:**
- `device_id` (required): Device ID

**Response:** 200 OK
