# User Profile

Access authenticated user profile information from JWT token claims.

## Get Admin Profile

Returns the authenticated admin user's profile information from JWT token claims.

**Endpoint:** `GET /auth/admin/profile`

**Authorization:** Bearer Token

### Response

**Success (200):**
```json
{
  "client_id": "string",
  "email_id": "string",
  "groups": null,
  "project_id": "string",
  "resources": null,
  "roles": null,
  "scopes": null,
  "tenant_id": "string",
  "token_type": null
}
```

### Response Fields

| Field | Type | Description |
|-------|------|-------------|
| `client_id` | string | Client identifier |
| `email_id` | string | User email address |
| `groups` | array | User groups |
| `project_id` | string | Project identifier |
| `resources` | array | Accessible resources |
| `roles` | array | User roles |
| `scopes` | array | Permission scopes |
| `tenant_id` | string | Tenant identifier |
| `token_type` | string | Type of token |

**Error Responses:**
- `401` - Unauthorized - invalid or missing token

---

## Get User Profile

Returns the authenticated user's profile information from JWT token claims.

**Endpoint:** `GET /auth/user/profile`

**Authorization:** Bearer Token

### Response

**Success (200):**
```json
{
  "client_id": "string",
  "email_id": "string",
  "groups": null,
  "project_id": "string",
  "resources": null,
  "roles": null,
  "scopes": null,
  "tenant_id": "string",
  "token_type": null
}
```

### Response Fields

Same as admin profile response.

**Error Responses:**
- `401` - Unauthorized - invalid or missing token

## Usage Example

To retrieve your profile information, make a GET request with your JWT token:

```http
GET /auth/user/profile
Authorization: Bearer YOUR_JWT_TOKEN
```

The response will contain all the claims embedded in your JWT token, including your permissions, roles, and group memberships.
