# Client Operations

Manage clients with full CRUD operations and ownership validation.

## List Clients

Get a paginated list of clients with optional filtering by status, name, and tags.

**Endpoint:** `GET /clients/v1/tenants/{tenantId}/clients`

**Authorization:** Bearer Token

### Path Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `tenantId` | string | Yes | Tenant identifier |

### Query Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `status` | string | No | Filter by status |
| `active` | boolean | No | Filter by active flag (true/false) |
| `active_only` | boolean | No | Legacy alias to filter only active clients |
| `name` | string | No | Filter by name (partial match) |
| `tags` | string | No | Filter by tags (CSV: tag1,tag2,tag3) |
| `page` | integer | No | Page number (default: 1) |
| `limit` | integer | No | Items per page (default: 10, max: 100) |

### Response

**Success (200):**
```json
{
  "clients": [
    {
      "active": true,
      "client_id": "string",
      "created_at": "string",
      "email": "string",
      "hydra_client_id": "string",
      "id": "string",
      "last_login": "string",
      "mfa_default_method": "string",
      "mfa_enabled": true,
      "mfa_enrolled_at": "string",
      "mfa_method": ["string"],
      "mfa_verified": true,
      "name": "string",
      "oidc_enabled": true,
      "org_id": "string",
      "owner_id": "string",
      "project_id": "string",
      "roles": [{}],
      "status": "string",
      "tags": ["string"],
      "tenant_db": "string",
      "tenant_id": "string",
      "updated_at": "string"
    }
  ],
  "pagination": {
    "limit": 10,
    "page": 1,
    "total": 0,
    "total_pages": 0
  }
}
```

**Error Responses:**
- `400` - Bad Request
- `401` - Unauthorized
- `403` - Forbidden
- `500` - Internal Server Error

### Usage Examples

**List all active clients:**
```http
GET /clients/v1/tenants/tenant123/clients?active=true&page=1&limit=20
Authorization: Bearer YOUR_JWT_TOKEN
```

**Filter by tags:**
```http
GET /clients/v1/tenants/tenant123/clients?tags=production,api&page=1
Authorization: Bearer YOUR_JWT_TOKEN
```

**Search by name:**
```http
GET /clients/v1/tenants/tenant123/clients?name=analytics
Authorization: Bearer YOUR_JWT_TOKEN
```

---

## Get Client by ID

Get a specific client by its ID within tenant and organization scope.

**Endpoint:** `GET /clients/v1/tenants/{tenantId}/clients/{id}`

**Authorization:** Bearer Token

### Path Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `tenantId` | string | Yes | Tenant identifier |
| `id` | integer | Yes | Client ID |

### Response

**Success (200):**
```json
{
  "active": true,
  "client_id": "string",
  "created_at": "string",
  "email": "string",
  "hydra_client_id": "string",
  "id": "string",
  "last_login": "string",
  "mfa_default_method": "string",
  "mfa_enabled": true,
  "mfa_enrolled_at": "string",
  "mfa_method": ["string"],
  "mfa_verified": true,
  "name": "string",
  "oidc_enabled": true,
  "org_id": "string",
  "owner_id": "string",
  "project_id": "string",
  "roles": [{}],
  "status": "string",
  "tags": ["string"],
  "tenant_db": "string",
  "tenant_id": "string",
  "updated_at": "string"
}
```

**Error Responses:**
- `400` - Bad Request
- `401` - Unauthorized
- `403` - Forbidden
- `404` - Not Found
- `500` - Internal Server Error

---

## Update Client (Full)

Fully update an existing client with ownership validation.

**Endpoint:** `PUT /clientms/tenants/{tenantId}/clients/{id}`

**Authorization:** Bearer Token

### Path Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `tenantId` | string | Yes | Tenant identifier |
| `id` | string | Yes | Client ID |

### Request Body

```json
{
  "active": true,
  "email": "string",
  "hydraClientID": "string",
  "name": "string",
  "oidcenabled": true,
  "status": "string",
  "tags": ["string"]
}
```

### Request Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `active` | boolean | No | Active status |
| `email` | string | No | Client email |
| `hydraClientID` | string | No | Hydra OAuth2 client ID |
| `name` | string | No | Client name |
| `oidcenabled` | boolean | No | Enable OIDC |
| `status` | string | No | Client status |
| `tags` | array[string] | No | Client tags |

### Response

**Success (200):**
```json
{
  "active": true,
  "client_id": "string",
  "created_at": "string",
  "email": "string",
  "hydra_client_id": "string",
  "id": "string",
  "last_login": "string",
  "mfa_default_method": "string",
  "mfa_enabled": true,
  "mfa_enrolled_at": "string",
  "mfa_method": ["string"],
  "mfa_verified": true,
  "name": "string",
  "oidc_enabled": true,
  "org_id": "string",
  "owner_id": "string",
  "project_id": "string",
  "roles": [{}],
  "status": "string",
  "tags": ["string"],
  "tenant_db": "string",
  "tenant_id": "string",
  "updated_at": "string"
}
```

**Error Responses:**
- `400` - Bad Request
- `401` - Unauthorized
- `403` - Forbidden
- `404` - Not Found
- `500` - Internal Server Error

---

## Update Client (Partial)

Partially update an existing client with ownership validation.

**Endpoint:** `PATCH /clientms/tenants/{tenantId}/clients/{id}`

**Authorization:** Bearer Token

### Path Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `tenantId` | string | Yes | Tenant identifier |
| `id` | string | Yes | Client ID |

### Request Body

Same as PUT request - only include fields you want to update.

```json
{
  "name": "Updated Client Name",
  "tags": ["new-tag"]
}
```

### Response

Same as PUT response.

**Error Responses:**
- `400` - Bad Request
- `401` - Unauthorized
- `403` - Forbidden
- `404` - Not Found
- `500` - Internal Server Error

## Update Best Practices

- **PUT vs PATCH**: Use PUT for full updates (all fields), PATCH for partial updates (specific fields)
- **Ownership**: Ensure the authenticated user has ownership rights to the client
- **Validation**: All updates are validated against tenant and organization scope
- **Tags**: Tags are useful for organizing and filtering clients
- **Status**: Use the dedicated activate/deactivate endpoints for status changes
