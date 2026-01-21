# SMS Authentication

SMS-based authentication using verification codes sent to user's mobile phone.

## Confirm SMS Setup

Confirm SMS setup with verification code sent to user's phone.

**Endpoint:** `POST /webauthn/sms/confirmSetup`

### Request Body

```json
{
  "client_id": "string",
  "code": "string",
  "email": "string",
  "phone_number": "string",
  "tenant_id": "string"
}
```

### Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `client_id` | string | Yes | Client identifier |
| `code` | string | Yes | Verification code from SMS |
| `email` | string | Yes | User email address |
| `phone_number` | string | Yes | User's phone number |
| `tenant_id` | string | Yes | Tenant identifier |

### Response

**Success (200):**
```json
{
  "message": "string",
  "phone_display": "string",
  "success": true
}
```

### Response Fields

| Field | Type | Description |
|-------|------|-------------|
| `message` | string | Success message |
| `phone_display` | string | Masked phone number (e.g., "***-***-1234") |
| `success` | boolean | Setup success status |

**Error Responses:**
- `400` - Bad Request (invalid code or phone)
- `500` - Internal Server Error

---

## Request SMS Code

Request SMS code for authentication.

**Endpoint:** `POST /webauthn/sms/requestCode`

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
| `client_id` | string | Yes | Client identifier |
| `email` | string | Yes | User email address |
| `tenant_id` | string | Yes | Tenant identifier |

### Response

**Success (200):**
```json
{
  "attempts_remaining": 0,
  "expires_in_minutes": 0,
  "message": "string",
  "phone_display": "string",
  "success": true
}
```

### Response Fields

| Field | Type | Description |
|-------|------|-------------|
| `attempts_remaining` | integer | Number of verification attempts left |
| `expires_in_minutes` | integer | Code expiration time in minutes |
| `message` | string | Status message |
| `phone_display` | string | Masked phone number |
| `success` | boolean | Request success status |

**Error Responses:**
- `400` - Bad Request
- `500` - Internal Server Error

---

## Verify SMS Code

Verify SMS code for authentication.

**Endpoint:** `POST /webauthn/sms/verify`

### Request Body

```json
{
  "client_id": "string",
  "code": "string",
  "email": "string",
  "tenant_id": "string"
}
```

### Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `client_id` | string | Yes | Client identifier |
| `code` | string | Yes | Verification code from SMS |
| `email` | string | Yes | User email address |
| `tenant_id` | string | Yes | Tenant identifier |

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

### Response Fields

| Field | Type | Description |
|-------|------|-------------|
| `email` | string | User email address |
| `message` | string | Verification message |
| `method` | string | Authentication method ("sms") |
| `success` | boolean | Verification success status |
| `tenant_id` | string | Tenant identifier |

**Error Responses:**
- `400` - Bad Request (invalid code)
- `401` - Unauthorized (code expired or incorrect)
- `500` - Internal Server Error

---

## SMS Authentication Flow

### Setup Flow

```javascript
// 1. User provides phone number during setup
const phoneNumber = "+1234567890";

// 2. Request verification code
const requestResponse = await fetch('/webauthn/sms/requestCode', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    email: 'user@example.com',
    tenant_id: 'tenant123',
    client_id: 'client456'
  })
});
const { expires_in_minutes, phone_display } = await requestResponse.json();

// 3. User receives SMS and enters code
const code = getUserInput(); // Code from SMS

// 4. Confirm setup with code
const confirmResponse = await fetch('/webauthn/sms/confirmSetup', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    email: 'user@example.com',
    tenant_id: 'tenant123',
    client_id: 'client456',
    phone_number: phoneNumber,
    code: code
  })
});
const { success } = await confirmResponse.json();
```

### Login Flow

```javascript
// 1. Request SMS code during login
await fetch('/webauthn/sms/requestCode', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    email: 'user@example.com',
    tenant_id: 'tenant123',
    client_id: 'client456'
  })
});

// 2. User receives SMS and enters code
const code = getUserInput();

// 3. Verify code
const verifyResponse = await fetch('/webauthn/sms/verify', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    email: 'user@example.com',
    tenant_id: 'tenant123',
    client_id: 'client456',
    code: code
  })
});

const { success } = await verifyResponse.json();
if (success) {
  // Proceed with login
}
```

## Best Practices

### Phone Number Management
- **Validation**: Validate phone numbers before setup
- **Format**: Use international format (E.164: +1234567890)
- **Verification**: Require verification before activating SMS MFA
- **Updates**: Provide easy process for updating phone number

### Code Management
- **Expiration**: Codes should expire (typically 5-10 minutes)
- **Length**: Use 6-digit codes for good security/usability balance
- **Uniqueness**: Generate cryptographically random codes
- **Rate Limiting**: Limit code requests to prevent abuse

### Security Considerations
- **SIM Swapping**: Be aware of SIM swap attack risks
- **Fallback Methods**: Provide alternative MFA methods
- **Attempt Limiting**: Lock after multiple failed verifications
- **Delivery Confirmation**: Track SMS delivery status when possible

### User Experience
- **Clear Instructions**: "Enter the 6-digit code sent to ***-***-1234"
- **Resend Option**: Allow code resend with rate limiting
- **Expiration Notice**: Show countdown timer for code expiration
- **Alternative Methods**: Offer other MFA options if SMS fails
- **Error Messages**: Provide helpful error messages

### Cost Optimization
- **Rate Limiting**: Prevent abuse to control SMS costs
- **Verification**: Require phone verification before setup
- **Expiration**: Use appropriate expiration times
- **Monitoring**: Track SMS delivery rates and costs

## Phone Number Format

### Recommended Format
Use E.164 international format:
- **Format**: `+[country code][number]`
- **Example**: `+12345678900` (US), `+442012345678` (UK)
- **No Formatting**: No spaces, dashes, or parentheses

### Display Format
Mask phone numbers for privacy:
- **Full**: `+12345678900` → `+1 (***) ***-8900`
- **Partial**: Show last 4 digits → `***-***-8900`

## Error Handling

### Common Errors

**Code Expired:**
```json
{
  "error": "Unauthorized",
  "message": "Verification code has expired"
}
```
Action: Request new code

**Invalid Code:**
```json
{
  "error": "Bad Request",
  "message": "Invalid verification code"
}
```
Action: Re-enter code or request new one

**Too Many Attempts:**
```json
{
  "error": "Bad Request",
  "message": "Maximum verification attempts exceeded"
}
```
Action: Wait before requesting new code

**Phone Number Already Used:**
```json
{
  "error": "Bad Request",
  "message": "Phone number already registered"
}
```
Action: Use different phone number or contact support
