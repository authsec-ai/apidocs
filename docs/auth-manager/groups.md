# Group Management

Manage user groups for authorization and access control.

## List All Groups

Retrieve all groups for a specific tenant.

**Endpoint:** `GET /auth/admin/group`

### Query Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `tenant_id` | string | Yes | Tenant identifier |

### Response

**Success (200):**
```json
{}
```

**Error Responses:**
- `400` - Invalid tenant_id
- `500` - Failed to retrieve groups

---

## Create Group

Create a new group in the tenant database.

**Endpoint:** `POST /auth/admin/group`

### Request Body

```json
{
  "groups": [
    "string"
  ],
  "tenant_id": "string"
}
```

### Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `groups` | array[string] | Yes | Array of group names |
| `tenant_id` | string | Yes | Tenant identifier |

### Response

**Success (201):**
```json
{}
```

**Error Responses:**
- `400` - Invalid request payload
- `500` - Failed to create group

---

## Get Group by ID

Retrieve a specific group by ID.

**Endpoint:** `GET /auth/admin/group/{id}`

### Path Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `id` | integer | Yes | Group ID |

### Query Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `tenant_id` | string | Yes | Tenant identifier |

### Response

**Success (200):**
```json
{
  "created_at": "string",
  "description": "string",
  "id": 0,
  "name": "string",
  "tenant_id": "string",
  "updated_at": "string"
}
```

**Error Responses:**
- `400` - Invalid parameters
- `404` - Group not found
- `500` - Failed to retrieve group

---

## Update Group

Update a group's name and description.

**Endpoint:** `PUT /auth/admin/group/{id}`

### Path Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `id` | integer | Yes | Group ID |

### Request Body

```json
{
  "property1": "string",
  "property2": "string"
}
```

### Response

**Success (200):**
```json
{
  "created_at": "string",
  "description": "string",
  "id": 0,
  "name": "string",
  "tenant_id": "string",
  "updated_at": "string"
}
```

**Error Responses:**
- `400` - Invalid request
- `404` - Group not found
- `500` - Failed to update group

---

## Delete Group

Delete a group from the tenant database.

**Endpoint:** `DELETE /auth/admin/group/{id}`

### Path Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `id` | integer | Yes | Group ID |

### Query Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `tenant_id` | string | Yes | Tenant identifier |

### Response

**Success (200):**
```json
{
  "property1": "string",
  "property2": "string"
}
```

**Error Responses:**
- `400` - Invalid parameters
- `404` - Group not found
- `500` - Failed to delete group

---

## List Group Users

Retrieve all users that belong to a specific group.

**Endpoint:** `GET /auth/admin/group/{id}/users`

### Path Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `id` | integer | Yes | Group ID |

### Query Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `tenant_id` | string | Yes | Tenant identifier |

### Response

**Success (200):**
```json
{}
```

**Error Responses:**
- `400` - Invalid parameters
- `404` - Group not found
- `500` - Failed to retrieve users

---

## Add Users to Group

Add one or more users to a specified group.

**Endpoint:** `POST /auth/admin/group/{id}/users`

### Path Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `id` | integer | Yes | Group ID |

### Request Body

```json
{}
```

### Response

**Success (200):**
```json
{}
```

**Error Responses:**
- `400` - Invalid request
- `404` - Group or users not found
- `500` - Failed to add users to group

---

## Remove Users from Group

Remove one or more users from a specified group.

**Endpoint:** `DELETE /auth/admin/group/{id}/users`

### Path Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `id` | integer | Yes | Group ID |

### Request Body

```json
{}
```

### Response

**Success (200):**
```json
{}
```

**Error Responses:**
- `400` - Invalid request
- `404` - Group not found
- `500` - Failed to remove users from group
