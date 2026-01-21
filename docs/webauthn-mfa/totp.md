# TOTP Authentication

Time-based One-Time Password (TOTP) authentication using authenticator apps like Google Authenticator, Authy, or Microsoft Authenticator.

## Begin TOTP Setup

Start TOTP authenticator app setup process.

**Endpoint:** `POST /webauthn/totp/beginSetup`

### Request Body

```json
{
  "client_id": "string",
  "email": "string",
  "tenant_id": "string"
}
```

### Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `client_id` | string | No | Client identifier |
| `email` | string | Yes | User email address |
| `tenant_id` | string | Yes | Tenant identifier |

### Response

**Success (200):**
```json
{
  "account": "string",
  "issuer": "string",
  "manual_entry": "string",
  "otp_auth_url": "string",
  "qr_code": "string",
  "secret": "string"
}
```

### Response Fields

| Field | Type | Description |
|-------|------|-------------|
| `account` | string | Account name for authenticator app |
| `issuer` | string | Issuer name (e.g., "AuthSec") |
| `manual_entry` | string | Secret for manual entry |
| `otp_auth_url` | string | otpauth:// URL for app linking |
| `qr_code` | string | Base64-encoded QR code image |
| `secret` | string | TOTP secret key |

**Error Responses:**
- `400` - Bad Request
- `404` - Not Found
- `500` - Internal Server Error

---

## Confirm TOTP Setup

Confirm TOTP setup with verification code from authenticator app.

**Endpoint:** `POST /webauthn/totp/confirmSetup`

### Request Body

```json
{
  "client_id": "string",
  "code": "string",
  "email": "string",
  "secret": "string",
  "tenant_id": "string"
}
```

### Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `client_id` | string | No | Client identifier |
| `code` | string | Yes | 6-digit TOTP code from app |
| `email` | string | Yes | User email address |
| `secret` | string | Yes | TOTP secret from beginSetup |
| `tenant_id` | string | Yes | Tenant identifier |

### Response

**Success (200):**
```json
{
  "backup_codes": [
    "string"
  ],
  "message": "string",
  "success": true
}
```

### Response Fields

| Field | Type | Description |
|-------|------|-------------|
| `backup_codes` | array[string] | Recovery codes (store securely!) |
| `message` | string | Success message |
| `success` | boolean | Setup success status |

**Error Responses:**
- `400` - Bad Request (invalid code)
- `404` - Not Found
- `500` - Internal Server Error

---

## Verify TOTP Code

Verify TOTP code for authentication.

**Endpoint:** `POST /webauthn/totp/verify`

### Request Body

```json
{
  "backup_code": "string",
  "client_id": "string",
  "code": "string",
  "email": "string",
  "tenant_id": "string"
}
```

### Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `backup_code` | string | No* | Backup recovery code |
| `client_id` | string | No | Client identifier |
| `code` | string | No* | 6-digit TOTP code |
| `email` | string | Yes | User email address |
| `tenant_id` | string | Yes | Tenant identifier |

*Either `code` or `backup_code` must be provided.

### Response

**Success (200):**
```json
{
  "email": "string",
  "message": "string",
  "method": "string",
  "success": true,
  "tenant_id": "string"
}
```

**Error Responses:**
- `400` - Bad Request (invalid code)
- `404` - Not Found
- `500` - Internal Server Error

---

## Verify TOTP for Login

Verify TOTP code during login process.

**Endpoint:** `POST /webauthn/totp/verifyLogin`

### Request Body

```json
{
  "backup_code": "string",
  "code": "string",
  "email": "string",
  "tenant_id": "string"
}
```

### Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `backup_code` | string | No* | Backup recovery code |
| `code` | string | No* | 6-digit TOTP code |
| `email` | string | Yes | User email address |
| `tenant_id` | string | Yes | Tenant identifier |

*Either `code` or `backup_code` must be provided.

### Response

**Success (200):**
```json
{
  "email": "string",
  "message": "string",
  "method": "string",
  "success": true,
  "tenant_id": "string"
}
```

**Error Responses:**
- `400` - Bad Request
- `404` - Not Found
- `500` - Internal Server Error

---

## TOTP Implementation Guide

### Setup Flow

```javascript
// 1. Begin TOTP Setup
const setupResponse = await fetch('/webauthn/totp/beginSetup', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    email: 'user@example.com',
    tenant_id: 'tenant123'
  })
});
const { qr_code, secret } = await setupResponse.json();

// 2. Display QR code to user
// User scans with authenticator app

// 3. User enters code from app
const code = getUserInput(); // 6-digit code

// 4. Confirm setup
const confirmResponse = await fetch('/webauthn/totp/confirmSetup', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    email: 'user@example.com',
    tenant_id: 'tenant123',
    secret: secret,
    code: code
  })
});
const { backup_codes } = await confirmResponse.json();

// 5. Display backup codes to user (IMPORTANT!)
displayBackupCodes(backup_codes);
```

### Verification Flow

```javascript
// Verify TOTP during login
const code = getUserInput(); // 6-digit code

const verifyResponse = await fetch('/webauthn/totp/verifyLogin', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    email: 'user@example.com',
    tenant_id: 'tenant123',
    code: code
  })
});

const { success } = await verifyResponse.json();
if (success) {
  // Proceed with login
}
```

### Using Backup Codes

```javascript
// If user lost access to authenticator app
const backupCode = getUserInput(); // One of the backup codes

const verifyResponse = await fetch('/webauthn/totp/verify', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    email: 'user@example.com',
    tenant_id: 'tenant123',
    backup_code: backupCode
  })
});
```

## Best Practices

### Setup
- **QR Code Display**: Always show QR code prominently for easy scanning
- **Manual Entry**: Provide manual entry option for users who can't scan
- **Backup Codes**: Force users to save backup codes before completing setup
- **Testing**: Require one successful verification before confirming setup

### Verification
- **Code Expiration**: TOTP codes expire every 30 seconds
- **Time Sync**: Ensure server time is properly synchronized
- **Rate Limiting**: Implement rate limiting to prevent brute force
- **Backup Code Security**: Treat backup codes as passwords (one-time use recommended)

### User Experience
- **Clear Instructions**: Provide step-by-step setup instructions
- **App Recommendations**: Suggest popular authenticator apps
- **Troubleshooting**: Offer help for common issues (time sync, wrong code)
- **Recovery Process**: Clear process for using backup codes

### Security
- **Secret Storage**: Store TOTP secrets encrypted
- **Backup Code Hashing**: Hash backup codes before storage
- **Code Reuse Prevention**: Prevent same code from being used twice
- **Attempt Limiting**: Lock account after multiple failed attempts
