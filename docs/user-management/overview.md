# User Management Overview

The User Flow Multi-Tenant RBAC API provides comprehensive user management capabilities with support for both admin users and end users across multiple tenants.

## Key Features

- **Multi-Tenant Isolation**: Complete data segregation with tenant-specific databases
- **Dual Authentication**: Separate admin (global) and end-user (tenant-specific) authentication flows
- **RBAC (Role-Based Access Control)**: Granular permissions with tenant-wide and resource-scoped access
- **MFA Support**: Multi-factor authentication with TOTP, WebAuthn, and CIBA
- **User Lifecycle Management**: Complete CRUD operations for both admin and end users
- **Directory Sync**: Active Directory and Entra ID integration

## API Organization

The API is organized into two main categories:

### Admin User Management
- Global admin users who manage tenants and system-wide configurations
- Uses the primary/master database
- Endpoints: `/uflow/admin/*`

### End User Management  
- Tenant-specific users within individual tenants
- Uses tenant-specific databases
- Endpoints: `/uflow/user/*` and `/uflow/enduser/*`

## Authentication

All user management endpoints require Bearer token authentication:

```
Authorization: Bearer <your-jwt-token>
```

## Base URL

```
https://dev.api.authsec.dev
```
