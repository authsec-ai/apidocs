# Auth Manager Overview

The Auth Manager API provides comprehensive authentication and authorization services for your multi-tenant applications. This service handles JWT token generation, validation, and authorization checks but does not manage users directly.

## Base URL

```
https://dev.api.authsec.dev/authmgr
```

## Key Features

- **JWT Token Generation**: Create secure tokens with custom claims
- **OIDC Support**: Handle OIDC token exchange flows
- **Scope & Resource Validation**: Fine-grained permission checking
- **Group Management**: Organize users into groups for easier permission management
- **Profile Management**: Access user profile data from token claims
- **Health Monitoring**: Service health check endpoints

## API Sections

### Token Management
Generate and manage JWT tokens for both admin and user authentication flows.

### Group Management
Create, update, and manage user groups for authorization purposes.

### Validation
Validate tokens with scope, resource, and permission requirements.

### Profile
Access authenticated user profile information from JWT claims.

### Debug
Tools for debugging authentication status and configurations.

### System
Health check and system status endpoints.

## Authentication

Most endpoints require Bearer token authentication. Include the JWT token in the Authorization header:

```http
Authorization: Bearer YOUR_JWT_TOKEN
```

## Tenant Isolation

All operations are tenant-specific. Most requests require a `tenant_id` parameter to ensure proper multi-tenant data isolation.
