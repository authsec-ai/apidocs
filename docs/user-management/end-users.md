# End User Management

End users are tenant-specific users who operate within individual tenant contexts. All end user operations use tenant-specific databases.

## List End Users

Retrieves all end users for a specific tenant with pagination and filtering. Supports both GET (query parameters) and POST (JSON body) methods.

### GET `/uflow/user/enduser/list`
### POST `/uflow/user/enduser/list`

**Query Parameters (GET method):**
- `tenant_id` (required): Tenant ID
- `page` (integer, optional): Page number (default: 1)
- `limit` (integer, optional): Items per page (default: 10, max: 100)
- `active` (boolean, optional): Filter by active status
- `client_id` (string, optional): Filter by client ID
- `email` (string, optional): Filter by email
- `name` (string, optional): Filter by name
- `provider` (string, optional): Filter by authentication provider

**Request Body (POST method):**
```json
{
  "tenant_id": "uuid",
  "page": 1,
  "limit": 10,
  "active": true,
  "client_id": "client-uuid",
  "email": "user@example.com",
  "name": "John",
  "provider": "local"
}
```

**Response:** 200 OK
```json
{
  "page": 1,
  "limit": 10,
  "total": 50,
  "total_pages": 5,
  "users": [
    {
      "id": "uuid",
      "email": "user@example.com",
      "name": "John Doe",
      "active": true,
      "provider": "local",
      "client_id": "client-uuid",
      "created_at": "2026-01-20T10:00:00Z",
      "last_login": "2026-01-20T15:30:00Z"
    }
  ]
}
```

**Error Responses:**
- `400`: Bad request
- `404`: Tenant not found
- `500`: Internal server error

---

## List Tenant End Users (Admin)

Admin endpoint to list end users within a tenant with optional provider filtering.

### POST `/uflow/admin/enduser/list`

**Request Body:**
```json
{
  "tenant_id": "uuid",
  "client_id": "client-uuid",
  "project_id": "project-uuid",
  "provider": "local",
  "page": 1,
  "limit": 10
}
```

**Required Fields:**
- `tenant_id` (string)

**Optional Fields:**
- `client_id` (string)
- `project_id` (string)
- `provider` (string): Filter by authentication provider
- `page` (integer)
- `limit` (integer)

**Response:** 200 OK

**Error Responses:**
- `400`: Bad request
- `404`: Tenant not found
- `500`: Internal server error

---

## Register End User

Registers a new end user in the specified tenant database with all default associations.

### POST `/uflow/user/clients/register`

**Request Body:**
```json
{
  "tenant_id": "uuid",
  "client_id": "client-uuid",
  "email": "newuser@example.com",
  "password": "securepassword",
  "name": "Jane Doe",
  "provider": "local"
}
```

**Response:** 201 Created
```json
{
  "user_id": "uuid",
  "email": "newuser@example.com",
  "tenant_id": "uuid",
  "client_id": "client-uuid",
  "message": "User registered successfully"
}
```

**Error Responses:**
- `400`: Bad request - invalid input
- `404`: Tenant or client not found
- `409`: Conflict - user already exists
- `500`: Internal server error

---

## Update End User Profile

Updates user profile information in tenant database.

### PUT `/uflow/user/enduser/{tenant_id}/{user_id}`

**Path Parameters:**
- `tenant_id` (required): Tenant ID
- `user_id` (required): User ID

**Request Body:**
```json
{
  "name": "Updated Name",
  "email": "newemail@example.com",
  "metadata": {
    "phone": "+1234567890",
    "department": "Engineering"
  }
}
```

**Response:** 200 OK
```json
{
  "user_id": "uuid",
  "email": "newemail@example.com",
  "name": "Updated Name",
  "updated_at": "2026-01-20T16:00:00Z",
  "message": "Profile updated successfully"
}
```

**Error Responses:**
- `400`: Bad request
- `404`: User not found
- `500`: Internal server error

---

## Update End User Status

Updates the active status of an end user.

### PUT `/uflow/user/enduser/{tenant_id}/{user_id}/status`

**Path Parameters:**
- `tenant_id` (required): Tenant ID
- `user_id` (required): User ID

**Request Body:**
```json
{
  "active": false
}
```

**Response:** 200 OK

**Error Responses:**
- `400`: Bad request
- `404`: User not found
- `500`: Internal server error

---

## Activate/Deactivate End User (Admin)

Admin endpoint to update the active flag for an end user in the tenant database.

### POST `/uflow/admin/enduser/active`

**Request Body:**
```json
{
  "tenant_id": "uuid",
  "user_id": "uuid",
  "active": true
}
```

**Required Fields:**
- `tenant_id` (string)
- `user_id` (string)
- `active` (boolean)

**Response:** 200 OK

**Error Responses:**
- `400`: Bad request
- `403`: Forbidden
- `404`: User not found
- `500`: Internal server error

---

## Soft Delete End User

Marks an end user as inactive in the tenant database.

### POST `/uflow/user/enduser/delete`
### DELETE `/uflow/user/enduser/{tenant_id}/{user_id}`

**Response:** 200 OK

**Error Responses:**
- `400`: Bad request
- `404`: User not found
- `500`: Internal server error

---

## Hard Delete End User

Permanently deletes an end user and all associated data from the tenant database including role_bindings, totp_secrets, backup_codes, webauthn_credentials, ciba_push_devices, ciba_auth_requests, etc. Cannot delete the last active user.

### POST `/uflow/user/enduser/delete_all`

**Request Body:**
```json
{
  "tenant_id": "uuid",
  "user_id": "uuid"
}
```

**Required Fields:**
- `tenant_id` (string)
- `user_id` (string)

**Response:** 200 OK
```json
{
  "message": "User and all related data deleted successfully"
}
```

**Error Responses:**
- `400`: Invalid request or cannot delete last user
- `403`: Cross-tenant operation not allowed
- `404`: User not found
- `500`: Internal server error

---

## Get Tenant Database Metadata

Returns the tenant database mapping for the supplied tenant identifier.

### GET `/uflow/user/enduser/databases`

**Query Parameters:**
- `tenant_id` (required): Tenant ID

**Response:** 200 OK
```json
{
  "tenant_id": "uuid",
  "database_host": "tenant-db.example.com",
  "database_name": "tenant_uuid_db",
  "status": "active"
}
```

**Error Responses:**
- `400`: Bad request
- `404`: Tenant not found
- `500`: Internal server error
