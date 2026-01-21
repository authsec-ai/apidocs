# Directory Synchronization

The API supports synchronizing users from Active Directory and Microsoft Entra ID (Azure AD) to populate your tenant with existing organizational users.

## Active Directory Sync

### Sync Users from Active Directory

Synchronizes users from Active Directory to the tenant database. Supports both stored config (via config_id) or direct config.

**POST** `/uflow/ad/sync`

**Request Body (with stored config):**
```json
{
  "config_id": "config-uuid",
  "tenant_id": "uuid",
  "client_id": "client-uuid",
  "project_id": "project-uuid",
  "dry_run": false
}
```

**Request Body (with direct config):**
```json
{
  "ad_config": {
    "server": "ldap://ad.example.com:389",
    "base_dn": "DC=example,DC=com",
    "username": "admin@example.com",
    "password": "ad-password",
    "use_ssl": true,
    "skip_verify": false,
    "filter": "(objectClass=user)"
  },
  "tenant_id": "uuid",
  "client_id": "client-uuid",
  "project_id": "project-uuid",
  "dry_run": false
}
```

**Response:** 200 OK
```json
{
  "users_found": 150,
  "users_created": 100,
  "users_updated": 50,
  "errors": [],
  "preview_users": [
    {
      "email": "john.doe@example.com",
      "username": "jdoe",
      "display_name": "John Doe",
      "department": "Engineering"
    }
  ]
}
```

**Error Responses:**
- `400`: Bad request
- `500`: Internal server error

---

### Test Active Directory Connection

Tests connection to Active Directory with provided configuration.

**POST** `/uflow/ad/test-connection`

**Request Body:**
```json
{
  "server": "ldap://ad.example.com:389",
  "base_dn": "DC=example,DC=com",
  "username": "admin@example.com",
  "password": "ad-password",
  "use_ssl": true,
  "skip_verify": false
}
```

**Response:** 200 OK
```json
{
  "success": true,
  "message": "Connection successful",
  "users_found": 150
}
```

**Error Responses:**
- `400`: Bad request
- `500`: Connection failed

---

### Test AD Network Connectivity

Tests network connectivity to Active Directory server.

**POST** `/uflow/ad/test-network`

**Request Body:**
```json
{
  "server": "ldap://ad.example.com:389"
}
```

**Response:** 200 OK
```json
{
  "success": true,
  "message": "Network connectivity OK",
  "latency_ms": 45
}
```

---

### Sync Admin Users from Active Directory

Synchronizes admin users from Active Directory to the main database and creates tenant records.

**POST** `/uflow/admin/admin-users/ad/sync`

**Authorization:** Bearer Token required

**Request Body:**
```json
{
  "tenant_id": "uuid",
  "client_id": "client-uuid",
  "project_id": "project-uuid",
  "sync_type": "ad",
  "config_id": "config-uuid",
  "dry_run": false,
  "ad_config": {
    "server": "ldap://ad.example.com:389",
    "base_dn": "DC=example,DC=com",
    "username": "admin@example.com",
    "password": "ad-password",
    "use_ssl": true,
    "skip_verify": false,
    "filter": "(memberOf=CN=Admins,OU=Groups,DC=example,DC=com)"
  }
}
```

**Required Fields:**
- `tenant_id` (string)
- `sync_type` (string): "ad" or "entra_id"

**Optional Fields:**
- `config_id` (string): ID of stored config to use
- `client_id` (string)
- `project_id` (string)
- `dry_run` (boolean): Preview mode without creating users
- `ad_config` (object): Direct AD configuration

**Response:** 200 OK
```json
{
  "users_found": 25,
  "users_created": 20,
  "users_updated": 5,
  "errors": [],
  "preview_users": [...]
}
```

---

## Microsoft Entra ID (Azure AD) Sync

### Sync Users from Entra ID

Synchronizes users from Entra ID to the tenant database using Microsoft Graph API.

**POST** `/uflow/entra/sync`

**Request Body (with stored config):**
```json
{
  "tenant_id": "uuid",
  "client_id": "client-uuid",
  "project_id": "project-uuid",
  "config_id": "entra-config-uuid",
  "dry_run": false
}
```

**Request Body (with direct config):**
```json
{
  "tenant_id": "uuid",
  "client_id": "client-uuid",
  "project_id": "project-uuid",
  "config": {
    "tenant_id": "azure-tenant-id",
    "client_id": "azure-client-id",
    "client_secret": "azure-client-secret",
    "scopes": ["https://graph.microsoft.com/.default"],
    "skip_verify": false
  },
  "dry_run": false
}
```

**Response:** 200 OK
```json
{
  "users_found": 200,
  "users_created": 150,
  "users_updated": 50,
  "errors": [],
  "preview_users": [
    {
      "email": "jane.smith@example.com",
      "username": "jsmith",
      "display_name": "Jane Smith",
      "department": "Sales"
    }
  ]
}
```

---

### Test Entra ID Connection

Tests connection to Entra ID with provided configuration.

**POST** `/uflow/entra/test-connection`

**Request Body:**
```json
{
  "tenant_id": "azure-tenant-id",
  "client_id": "azure-client-id",
  "client_secret": "azure-client-secret",
  "scopes": ["https://graph.microsoft.com/.default"],
  "skip_verify": false
}
```

**Response:** 200 OK
```json
{
  "success": true,
  "message": "Connection successful",
  "users_found": 200
}
```

---

### Check Entra ID App Permissions

Checks if the configured app has required permissions for user sync.

**POST** `/uflow/entra/check-permissions`

**Request Body:**
```json
{
  "tenant_id": "azure-tenant-id",
  "client_id": "azure-client-id",
  "client_secret": "azure-client-secret",
  "scopes": ["https://graph.microsoft.com/.default"],
  "skip_verify": false
}
```

**Response:** 200 OK
```json
{
  "has_permissions": true,
  "required_permissions": [
    "User.Read.All",
    "Directory.Read.All"
  ],
  "missing_permissions": []
}
```

---

### Sync Admin Users from Entra ID

Synchronizes admin users from Entra ID to the main database and creates tenant records.

**POST** `/uflow/admin/admin-users/entra/sync`

**Authorization:** Bearer Token required

**Request Body:**
```json
{
  "tenant_id": "uuid",
  "client_id": "client-uuid",
  "project_id": "project-uuid",
  "sync_type": "entra_id",
  "config_id": "config-uuid",
  "dry_run": false,
  "entra_config": {
    "tenant_id": "azure-tenant-id",
    "client_id": "azure-client-id",
    "client_secret": "azure-client-secret",
    "scopes": ["https://graph.microsoft.com/.default"],
    "skip_verify": false
  }
}
```

**Response:** 200 OK
```json
{
  "users_found": 30,
  "users_created": 25,
  "users_updated": 5,
  "errors": [],
  "preview_users": [...]
}
```

---

## Sync Configuration Management

### Create Sync Configuration

Creates a new Active Directory or Entra ID sync configuration with encrypted credentials.

**POST** `/uflow/admin/sync-configs/create`

**Request Body (Active Directory):**
```json
{
  "tenant_id": "uuid",
  "client_id": "client-uuid",
  "project_id": "project-uuid",
  "sync_type": "active_directory",
  "config_name": "Main AD Sync",
  "description": "Primary Active Directory synchronization",
  "ad_config": {
    "server": "ldap://ad.example.com:389",
    "base_dn": "DC=example,DC=com",
    "username": "admin@example.com",
    "password": "ad-password",
    "use_ssl": true,
    "skip_verify": false,
    "filter": "(objectClass=user)"
  }
}
```

**Request Body (Entra ID):**
```json
{
  "tenant_id": "uuid",
  "client_id": "client-uuid",
  "project_id": "project-uuid",
  "sync_type": "entra_id",
  "config_name": "Azure AD Sync",
  "description": "Microsoft Entra ID synchronization",
  "entra_config": {
    "tenant_id": "azure-tenant-id",
    "client_id": "azure-client-id",
    "client_secret": "azure-client-secret",
    "scopes": ["https://graph.microsoft.com/.default"],
    "skip_verify": false
  }
}
```

**Response:** 200 OK
```json
{
  "success": true,
  "message": "Sync configuration created successfully",
  "data": {
    "id": "config-uuid",
    "config_name": "Main AD Sync",
    "sync_type": "active_directory",
    "created_at": "2026-01-20T10:00:00Z",
    "is_active": true
  }
}
```

---

### List Sync Configurations

Lists all sync configurations for a tenant, optionally filtered by sync type.

**POST** `/uflow/admin/sync-configs/list`

**Request Body:**
```json
{
  "tenant_id": "uuid",
  "client_id": "client-uuid",
  "sync_type": "active_directory"
}
```

**Optional Fields:**
- `sync_type` (string): Filter by 'active_directory' or 'entra_id'

**Response:** 200 OK
```json
{
  "success": true,
  "configs": [
    {
      "id": "config-uuid",
      "config_name": "Main AD Sync",
      "sync_type": "active_directory",
      "description": "Primary Active Directory synchronization",
      "is_active": true,
      "last_sync_at": "2026-01-20T08:00:00Z",
      "last_sync_status": "success",
      "last_sync_users_count": 150,
      "created_at": "2026-01-15T10:00:00Z"
    }
  ]
}
```

---

### Update Sync Configuration

Updates an existing sync configuration.

**POST** `/uflow/admin/sync-configs/update`

**Request Body:**
```json
{
  "id": "config-uuid",
  "tenant_id": "uuid",
  "client_id": "client-uuid",
  "config_name": "Updated AD Sync",
  "description": "Updated description",
  "is_active": true,
  "ad_config": {
    "server": "ldap://newad.example.com:389",
    "filter": "(objectClass=user)"
  }
}
```

**Response:** 200 OK

---

### Delete Sync Configuration

Deletes an existing sync configuration.

**POST** `/uflow/admin/sync-configs/delete`

**Request Body:**
```json
{
  "id": "config-uuid",
  "tenant_id": "uuid",
  "client_id": "client-uuid"
}
```

**Response:** 200 OK
