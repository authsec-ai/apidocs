# WebAuthn Authentication

WebAuthn provides passwordless authentication using FIDO2 standards, supporting biometric authentication, security keys, and platform authenticators.

## Admin WebAuthn Flow

### Begin Admin Registration

Initiate WebAuthn credential registration for admin users using global database.

**Endpoint:** `POST /webauthn/admin/beginRegistration`

#### Request Body

```json
{
  "email": "string"
}
```

#### Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `email` | string | Yes | Admin user email address |

#### Response

**Success (200):**
```json
{}
```

Returns WebAuthn credential creation options to be used with browser's WebAuthn API.

**Error Responses:**
- `400` - Bad Request
- `404` - Not Found
- `500` - Internal Server Error

---

### Finish Admin Registration

Complete WebAuthn credential registration for admin users and store in global database.

**Endpoint:** `POST /webauthn/admin/finishRegistration`

#### Request Body

```json
{
  "credential": "string",
  "email": "string"
}
```

#### Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `credential` | string | Yes | WebAuthn credential response |
| `email` | string | Yes | Admin user email address |

#### Response

**Success (200):**
```json
{
  "credential_id": "string",
  "message": "string",
  "success": true
}
```

**Error Responses:**
- `400` - Bad Request
- `404` - Not Found
- `500` - Internal Server Error

---

### Begin Admin Authentication

Initiate WebAuthn authentication (login) for admin users using global database.

**Endpoint:** `POST /webauthn/admin/beginAuthentication`

#### Request Body

```json
{
  "email": "string"
}
```

#### Response

**Success (200):**
```json
{}
```

Returns WebAuthn assertion options for authentication.

**Error Responses:**
- `400` - Bad Request
- `404` - Not Found
- `500` - Internal Server Error

---

### Finish Admin Authentication

Complete WebAuthn authentication (login) for admin users and validate credentials.

**Endpoint:** `POST /webauthn/admin/finishAuthentication`

#### Request Body

```json
{
  "email": "string",
  "response": {}
}
```

#### Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `email` | string | Yes | Admin user email address |
| `response` | object | Yes | WebAuthn assertion response |

#### Response

**Success (200):**
```json
{
  "success": true,
  "user_id": "string"
}
```

**Error Responses:**
- `400` - Bad Request
- `401` - Unauthorized
- `500` - Internal Server Error

---

## End User WebAuthn Flow

### Begin End User Registration

Initiate WebAuthn credential registration for end users using tenant-specific database.

**Endpoint:** `POST /webauthn/enduser/beginRegistration`

#### Request Body

```json
{
  "email": "string",
  "tenant_id": "string"
}
```

#### Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `email` | string | Yes | End user email address |
| `tenant_id` | string | Yes | Tenant identifier |

#### Response

**Success (200):**
```json
{}
```

Returns WebAuthn credential creation options.

**Error Responses:**
- `400` - Bad Request
- `404` - Not Found
- `500` - Internal Server Error

---

### Finish End User Registration

Complete WebAuthn credential registration for end users and store in tenant-specific database.

**Endpoint:** `POST /webauthn/enduser/finishRegistration`

#### Request Body

```json
{
  "credential": "string",
  "email": "string",
  "tenant_id": "string"
}
```

#### Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `credential` | string | Yes | WebAuthn credential response |
| `email` | string | Yes | End user email address |
| `tenant_id` | string | Yes | Tenant identifier |

#### Response

**Success (200):**
```json
{
  "credential_id": "string",
  "message": "string",
  "success": true
}
```

**Error Responses:**
- `400` - Bad Request
- `404` - Not Found
- `500` - Internal Server Error

---

### Begin End User Authentication

Initiate WebAuthn authentication (login) for end users using tenant-specific database.

**Endpoint:** `POST /webauthn/enduser/beginAuthentication`

#### Request Body

```json
{
  "email": "string",
  "tenant_id": "string"
}
```

#### Response

**Success (200):**
```json
{}
```

Returns WebAuthn assertion options.

**Error Responses:**
- `400` - Bad Request
- `404` - Not Found
- `500` - Internal Server Error

---

### Finish End User Authentication

Complete WebAuthn authentication (login) for end users and validate credentials.

**Endpoint:** `POST /webauthn/enduser/finishAuthentication`

#### Request Body

```json
{
  "email": "string",
  "response": {},
  "tenant_id": "string"
}
```

#### Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `email` | string | Yes | End user email address |
| `response` | object | Yes | WebAuthn assertion response |
| `tenant_id` | string | Yes | Tenant identifier |

#### Response

**Success (200):**
```json
{
  "success": true,
  "user_id": "string"
}
```

**Error Responses:**
- `400` - Bad Request
- `401` - Unauthorized
- `500` - Internal Server Error

---

## General WebAuthn Registration

### Finish Registration (With Tokens)

Complete WebAuthn credential registration with JWT token issuance.

**Endpoint:** `POST /webauthn/finishRegistration`

#### Request Body

```json
{
  "credential": {
    "id": "string",
    "rawId": "string",
    "response": {},
    "type": "string"
  },
  "email": "string",
  "tenant_id": "string"
}
```

#### Response

**Success (200):**
```json
{
  "access_token": "string",
  "credential_id": "string",
  "message": "string",
  "refresh_token": "string",
  "success": true
}
```

**Error Responses:**
- `400` - Bad Request
- `500` - Internal Server Error

## WebAuthn Implementation Guide

### Browser Integration

```javascript
// 1. Begin Registration
const beginResponse = await fetch('/webauthn/enduser/beginRegistration', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ email: 'user@example.com', tenant_id: 'tenant123' })
});
const options = await beginResponse.json();

// 2. Create Credential
const credential = await navigator.credentials.create({
  publicKey: options
});

// 3. Finish Registration
await fetch('/webauthn/enduser/finishRegistration', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    email: 'user@example.com',
    tenant_id: 'tenant123',
    credential: credential
  })
});
```

### Best Practices

- **User Verification**: Enable user verification for higher security
- **Attestation**: Use attestation to verify authenticator authenticity
- **Multiple Credentials**: Allow users to register multiple devices
- **Fallback Methods**: Provide alternative MFA methods for device loss
- **Error Handling**: Gracefully handle unsupported browsers or devices
