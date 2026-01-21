# Token Management

Manage JWT tokens for authentication and authorization.

## Generate JWT Token (Admin)

Generate a new JWT token by validating tenant, project, client, and optional secret from Vault.

**Endpoint:** `POST /auth/admin/generateToken`

### Request Body

```json
{
  "client_id": "string",
  "email_id": "string",
  "project_id": "string",
  "secret_id": "string",
  "tenant_id": "string"
}
```

### Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `client_id` | string | Yes | Client identifier |
| `email_id` | string | Yes | User email address |
| `project_id` | string | Yes | Project identifier |
| `secret_id` | string | No | Secret identifier from Vault |
| `tenant_id` | string | Yes | Tenant identifier |

### Response

**Success (200):**
```json
{
  "access_token": "string",
  "expires_in": 0,
  "token_type": "string"
}
```

**Error Responses:**
- `400` - Invalid request payload
- `401` - Unauthorized
- `404` - Client not found
- `500` - Failed to generate token

---

## Generate JWT Token (User)

Generate a new JWT token with tenant-specific permissions. Queries tenant database for user authorization data (roles, scopes, resources, groups).

**Endpoint:** `POST /auth/user/generateToken`

### Request Body

```json
{
  "client_id": "string",
  "email_id": "string",
  "project_id": "string",
  "secret_id": "string",
  "tenant_id": "string"
}
```

### Parameters

Same as admin token generation.

### Response

**Success (200):**
```json
{
  "access_token": "string",
  "expires_in": 0,
  "token_type": "string"
}
```

**Error Responses:**
- `400` - Invalid request payload
- `401` - Unauthorized
- `404` - Client not found
- `500` - Failed to generate token

---

## OIDC Token Exchange (Admin)

Process OIDC token requests for client authentication in OIDC flows.

**Endpoint:** `POST /auth/admin/oidcToken`

**Authorization:** Bearer Token

### Request Body

```json
{
  "oidc_token": "string"
}
```

### Response

**Success (200):**
```json
{
  "access_token": "string",
  "expires_in": 0,
  "token_type": "string"
}
```

**Error Responses:**
- `400` - Invalid request payload
- `401` - Unauthorized

---

## OIDC Token Exchange (User)

Exchange OIDC token for application JWT with tenant-specific permissions.

**Endpoint:** `POST /auth/user/oidcToken`

**Authorization:** Bearer Token

### Request Body

```json
{
  "oidc_token": "string"
}
```

### Response

**Success (200):**
```json
{
  "access_token": "string",
  "expires_in": 0,
  "token_type": "string"
}
```

**Error Responses:**
- `400` - Invalid request payload
- `401` - Unauthorized
