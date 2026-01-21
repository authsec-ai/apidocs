# Debug Endpoints

Debug tools for checking authentication status and configurations.

## Get Admin Auth Status

Returns the user's authentication configuration including MFA/WebAuthn status.

**Endpoint:** `GET /auth/admin/debug/auth-status`

**Authorization:** Bearer Token

### Query Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `tenant_id` | string | Yes | Tenant identifier |
| `email` | string | Yes | User email address |

### Response

**Success (200):**
```json
{}
```

### Description

This endpoint provides detailed information about a user's authentication configuration, including:
- Multi-factor authentication (MFA) status
- WebAuthn device registration status
- Other authentication-related configurations

---

## Get User Auth Status

Returns the user's authentication configuration including MFA/WebAuthn status.

**Endpoint:** `GET /auth/user/debug/auth-status`

**Authorization:** Bearer Token

### Query Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `tenant_id` | string | Yes | Tenant identifier |
| `email` | string | Yes | User email address |

### Response

**Success (200):**
```json
{}
```

### Description

Same as admin auth status but for end users. Provides authentication configuration details.

## Usage Examples

### Check Admin Authentication Status

```http
GET /auth/admin/debug/auth-status?tenant_id=tenant123&email=admin@example.com
Authorization: Bearer YOUR_JWT_TOKEN
```

### Check User Authentication Status

```http
GET /auth/user/debug/auth-status?tenant_id=tenant123&email=user@example.com
Authorization: Bearer YOUR_JWT_TOKEN
```

## Use Cases

- **Troubleshooting**: Verify user authentication setup
- **MFA Status**: Check if MFA is enabled for a user
- **WebAuthn Devices**: See registered WebAuthn devices
- **Configuration Audit**: Review authentication settings
