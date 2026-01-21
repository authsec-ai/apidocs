# Client Management Overview

The Client Management API is a secure, multi-tenant microservice that handles client lifecycle management with JWT authentication and role-based access control (RBAC).

## Base URL

```
https://dev.api.authsec.dev/clientms
```

## Key Features

- **Multi-Tenant Architecture**: Complete tenant isolation for client data
- **Client Lifecycle Management**: Create, read, update, and delete clients
- **Status Management**: Activate and deactivate clients
- **Advanced Filtering**: Filter clients by status, name, tags, and active state
- **Pagination Support**: Efficient data retrieval with configurable page sizes
- **OIDC Integration**: Support for OIDC-enabled clients via Hydra
- **Tag-Based Organization**: Categorize clients with custom tags
- **Ownership Validation**: Ensure proper authorization for client operations

## API Sections

### Client Operations
Comprehensive CRUD operations for managing clients within a tenant context.

### Client Status
Activate and deactivate clients with admin-level controls.

### Client Search & Filtering
List and filter clients with pagination and multiple filter criteria.

## Authentication

All endpoints require Bearer token authentication. Include the JWT token in the Authorization header:

```http
Authorization: Bearer YOUR_JWT_TOKEN
```

## Tenant Isolation

All operations are scoped to a specific tenant. The `tenantId` path parameter ensures proper multi-tenant data isolation.

## Client Object

A client object contains the following key properties:

| Property | Type | Description |
|----------|------|-------------|
| `id` | string | Unique client identifier |
| `client_id` | string | Client identifier for authentication |
| `name` | string | Client name |
| `email` | string | Client email address |
| `status` | string | Client status (Active, Inactive, etc.) |
| `active` | boolean | Whether the client is active |
| `oidc_enabled` | boolean | OIDC integration status |
| `hydra_client_id` | string | Hydra OAuth2 client ID |
| `tags` | array[string] | Custom tags for organization |
| `roles` | array[object] | Assigned roles and permissions |
| `tenant_id` | string | Associated tenant identifier |
| `org_id` | string | Organization identifier |
| `project_id` | string | Project identifier |
| `owner_id` | string | Owner user identifier |
| `created_at` | string | Creation timestamp |
| `updated_at` | string | Last update timestamp |

## Multi-Factor Authentication (MFA) Support

Client objects include MFA-related fields:

- `mfa_enabled`: Whether MFA is enabled
- `mfa_verified`: MFA verification status
- `mfa_method`: Available MFA methods
- `mfa_default_method`: Default MFA method
- `mfa_enrolled_at`: MFA enrollment timestamp
- `last_login`: Last login timestamp
