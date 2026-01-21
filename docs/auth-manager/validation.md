# Token Validation

Validate JWT tokens with various permission checks including scopes, resources, and combined requirements.

## Basic Token Validation

Validate a token and return its claims if valid.

**Endpoint:** `GET /authmgr/validate`

**Authorization:** Bearer Token

### Response

**Success (200):**
```json
{
  "client_id": "string",
  "message": "string",
  "project_id": "string",
  "purpose": "string",
  "resources": null,
  "roles": null,
  "scopes": null,
  "service": "string",
  "tenant_id": "string"
}
```

**Error Responses:**
- `401` - Unauthorized - invalid or missing token

---

## Validate Scope

Validate that the token has a specific scope requirement (e.g., 'read' scope).

**Endpoint:** `GET /authmgr/validate/scope`

**Authorization:** Bearer Token

### Description

This endpoint demonstrates scope validation. For example, it may require 'read' scope to access the endpoint.

### Response

**Success (200):**
```json
{
  "message": "string",
  "required_scope": "string",
  "user_scopes": null
}
```

**Error Responses:**
- `401` - Unauthorized - invalid or missing token
- `403` - Forbidden - insufficient scope

---

## Validate Resource

Validate that the token has access to a specific resource (e.g., 'api' resource).

**Endpoint:** `GET /authmgr/validate/resource`

**Authorization:** Bearer Token

### Description

This endpoint demonstrates resource validation. For example, it may require 'api' resource access.

### Response

**Success (200):**
```json
{
  "message": "string",
  "required_resource": "string",
  "user_resources": null
}
```

**Error Responses:**
- `401` - Unauthorized - invalid or missing token
- `403` - Forbidden - insufficient resource access

---

## Validate Combined Permissions

Validate token with combined scope and resource requirements.

**Endpoint:** `POST /authmgr/validate/permissions`

**Authorization:** Bearer Token

### Description

This endpoint demonstrates combined validation. For example, it may require both 'write' scope AND 'api' resource.

### Response

**Success (200):**
```json
{
  "message": "string",
  "required_resource": "string",
  "required_scope": "string",
  "user_resources": null,
  "user_scopes": null
}
```

**Error Responses:**
- `401` - Unauthorized - invalid or missing token
- `403` - Forbidden - insufficient permissions

## Permission Validation Examples

### Scope-Only Check
Use the `/validate/scope` endpoint when you only need to verify that a user has a specific scope permission.

```http
GET /authmgr/validate/scope
Authorization: Bearer YOUR_JWT_TOKEN
```

### Resource-Only Check
Use the `/validate/resource` endpoint when you only need to verify that a user has access to a specific resource.

```http
GET /authmgr/validate/resource
Authorization: Bearer YOUR_JWT_TOKEN
```

### Combined Check
Use the `/validate/permissions` endpoint when you need to verify both scope AND resource access.

```http
POST /authmgr/validate/permissions
Authorization: Bearer YOUR_JWT_TOKEN
```
