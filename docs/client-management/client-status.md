# Client Status Management

Manage client activation and deactivation with admin-level controls.

## Activate Client

Activate a client by setting status to 'Active'. This operation requires admin privileges.

**Endpoint:** `PATCH /clients/v1/tenants/{tenantId}/clients/{id}/activate`

**Authorization:** Bearer Token (Admin only)

### Path Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `tenantId` | string | Yes | Tenant identifier |
| `id` | integer | Yes | Client ID |

### Response

**Success (200):**
```json
{}
```

**Error Responses:**
- `400` - Bad Request
- `401` - Unauthorized
- `403` - Forbidden (insufficient permissions)
- `404` - Not Found
- `500` - Internal Server Error

### Usage Example

```http
PATCH /clients/v1/tenants/tenant123/clients/456/activate
Authorization: Bearer YOUR_ADMIN_JWT_TOKEN
```

---

## Deactivate Client

Deactivate a client by setting status to 'Inactive'. This operation requires admin privileges.

**Endpoint:** `PATCH /clients/v1/tenants/{tenantId}/clients/{id}/deactivate`

**Authorization:** Bearer Token (Admin only)

### Path Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `tenantId` | string | Yes | Tenant identifier |
| `id` | integer | Yes | Client ID |

### Response

**Success (200):**
```json
{}
```

**Error Responses:**
- `400` - Bad Request
- `401` - Unauthorized
- `403` - Forbidden (insufficient permissions)
- `404` - Not Found
- `500` - Internal Server Error

### Usage Example

```http
PATCH /clients/v1/tenants/tenant123/clients/456/deactivate
Authorization: Bearer YOUR_ADMIN_JWT_TOKEN
```

---

## Status Management Best Practices

### When to Use Activate/Deactivate

- **Temporary Suspension**: Use deactivate instead of deleting when you need to temporarily disable a client
- **Access Control**: Deactivated clients cannot authenticate or access resources
- **Audit Trail**: Status changes maintain the client record for audit purposes
- **Reactivation**: Easily reactivate clients without recreating them

### Admin Permissions

Both activate and deactivate operations require admin-level permissions. Ensure the authenticated user has:
- Admin role in the tenant
- Proper authorization to modify client status
- Access to the organization and project scope

### Status vs Active Flag

- **Status Field**: String value (e.g., "Active", "Inactive", "Pending")
- **Active Flag**: Boolean value (true/false)
- **Relationship**: These endpoints set both the status string and active boolean

### Workflow Example

```http
# 1. Deactivate a client for maintenance
PATCH /clients/v1/tenants/tenant123/clients/456/deactivate
Authorization: Bearer YOUR_ADMIN_JWT_TOKEN

# 2. Verify the client is deactivated
GET /clients/v1/tenants/tenant123/clients/456
Authorization: Bearer YOUR_ADMIN_JWT_TOKEN
# Response will show: "active": false, "status": "Inactive"

# 3. Reactivate the client after maintenance
PATCH /clients/v1/tenants/tenant123/clients/456/activate
Authorization: Bearer YOUR_ADMIN_JWT_TOKEN
```

### Error Handling

**403 Forbidden**: Most common error when non-admin users attempt status changes
```json
{
  "error": "Forbidden",
  "message": "Admin privileges required to modify client status"
}
```

**404 Not Found**: Client doesn't exist in the specified tenant
```json
{
  "error": "Not Found",
  "message": "Client not found in tenant scope"
}
```
