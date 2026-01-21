# Admin User Management

Admin users have global access to manage tenants, configurations, and system-wide settings. All admin operations use the primary/master database.

## List Admin Users

Retrieves all users assigned to the admin role with optional provider filtering.

### GET `/uflow/admin/users/list`
### POST `/uflow/admin/users/list`

**Query Parameters:**
- `provider` (string, optional): Filter by authentication provider (e.g., local, google, azure, okta)

**Authorization:** Bearer Token required

**Response:** 200 OK
```json
{
  "users": [...],
  "total": 0
}
```

---

## Invite Admin User

Create a new admin user account with a temporary password that must be changed on first login.

### POST `/uflow/admin/invite`

**Request Body:**
```json
{
  "email": "admin@example.com",
  "username": "adminuser",
  "first_name": "John",
  "last_name": "Doe",
  "tenant_domain": "example-tenant",
  "tenant_id": "uuid",
  "client_id": "client-uuid",
  "project_id": "project-uuid"
}
```

**Required Fields:**
- `email` (string)
- `username` (string)

**Optional Fields:**
- `first_name` (string)
- `last_name` (string)
- `tenant_domain` (string)
- `tenant_id` (string)
- `client_id` (string)
- `project_id` (string)

**Response:** 201 Created
```json
{
  "user_id": "uuid",
  "username": "adminuser",
  "email": "admin@example.com",
  "temporary_password": "temp-password",
  "expires_at": "2026-01-27T10:00:00Z",
  "email_sent": true,
  "message": "Admin invitation sent successfully",
  "user": {
    "id": "uuid",
    "username": "adminuser",
    "email": "admin@example.com",
    "tenant_id": "uuid",
    "tenant_domain": "example-tenant",
    "client_id": "client-uuid",
    "project_id": "project-uuid"
  }
}
```

**Error Responses:**
- `400`: Bad request - invalid input
- `409`: Conflict - user already exists
- `500`: Internal server error

---

## Activate/Deactivate Admin User

Updates the active flag for an admin user in the master database.

### POST `/uflow/admin/users/active`

**Request Body:**
```json
{
  "user_id": "uuid",
  "tenant_id": "uuid",
  "active": true
}
```

**Required Fields:**
- `user_id` (string): User ID
- `tenant_id` (string): Tenant ID
- `active` (boolean): Active status

**Response:** 200 OK

**Error Responses:**
- `400`: Bad request
- `403`: Forbidden - cannot modify this user
- `404`: User not found
- `500`: Internal server error

---

## Soft Delete Admin User

Marks an admin user as inactive. Cannot delete the primary admin or the last remaining admin.

### DELETE `/uflow/admin/users/{user_id}`

**Path Parameters:**
- `user_id` (required): Admin user ID

**Response:** 200 OK

**Error Responses:**
- `400`: Bad request
- `403`: Forbidden - cannot delete primary admin or last admin
- `404`: User not found
- `500`: Internal server error

---

## Hard Delete Admin User

Permanently deletes an admin user and all associated data including role_bindings, totp_secrets, backup_codes, webauthn_credentials, sessions, etc. Cannot delete the primary admin or the last remaining admin.

### POST `/uflow/admin/users/delete_all`

**Request Body:**
```json
{
  "user_id": "uuid",
  "tenant_id": "uuid"
}
```

**Required Fields:**
- `user_id` (string): User ID to delete
- `tenant_id` (string): Tenant ID

**Response:** 200 OK
```json
{
  "message": "Admin user and all related data deleted successfully"
}
```

**Error Responses:**
- `400`: Invalid request
- `403`: Cannot delete primary admin or last admin
- `404`: Admin user not found
- `500`: Internal server error

---

## Admin Invitations Management

### List Pending Invitations

Get all pending admin invitations (users with temporary_password=true who haven't logged in).

### GET `/uflow/admin/invite/pending`

**Response:** 200 OK
```json
{
  "total": 5,
  "invites": [
    {
      "user_id": "uuid",
      "email": "user@example.com",
      "username": "username",
      "invited_at": "2026-01-20T10:00:00Z",
      "expires_at": "2026-01-27T10:00:00Z",
      "tenant_domain": "example"
    }
  ]
}
```

---

### Resend Invitation

Resend the invitation email to a pending admin with a new temporary password.

### POST `/uflow/admin/invite/resend`

**Request Body:**
```json
{
  "user_id": "uuid"
}
```

**Response:** 200 OK
```json
{
  "user_id": "uuid",
  "email": "user@example.com",
  "temporary_password": "new-temp-password",
  "expires_at": "2026-01-27T10:00:00Z",
  "email_sent": true,
  "message": "Invitation resent successfully"
}
```

**Error Responses:**
- `400`: Bad request
- `403`: Forbidden - user already logged in
- `404`: Invitation not found
- `500`: Internal server error

---

### Cancel Invitation

Cancel a pending admin invitation. Only works for users who have not yet logged in.

### POST `/uflow/admin/invite/cancel`

**Request Body:**
```json
{
  "user_id": "uuid"
}
```

**Response:** 200 OK
```json
{
  "user_id": "uuid",
  "email": "user@example.com",
  "message": "Invitation cancelled successfully"
}
```

**Error Responses:**
- `400`: Bad request
- `403`: Forbidden - user already logged in
- `404`: Invitation not found
- `500`: Internal server error
