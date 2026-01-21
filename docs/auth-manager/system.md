# System Endpoints

System health check and status endpoints.

## Admin Health Check

Returns the health status of the auth-manager service.

**Endpoint:** `GET /auth/admin/health`

### Response

**Success (200):**
```json
{
  "service": "string",
  "status": "string",
  "version": "string"
}
```

### Response Fields

| Field | Type | Description |
|-------|------|-------------|
| `service` | string | Service name (auth-manager) |
| `status` | string | Service status (healthy, degraded, down) |
| `version` | string | API version |

---

## User Health Check

Returns the health status of the auth-manager service.

**Endpoint:** `GET /auth/user/health`

### Response

**Success (200):**
```json
{
  "service": "string",
  "status": "string",
  "version": "string"
}
```

### Response Fields

Same as admin health check.

## Usage Examples

### Admin Health Check

```http
GET /auth/admin/health
```

### User Health Check

```http
GET /auth/user/health
```

## Monitoring

These endpoints are designed for:
- **Service Monitoring**: Integration with monitoring tools (Datadog, New Relic, etc.)
- **Load Balancer Health Checks**: Verify service availability
- **Status Dashboards**: Display service health in dashboards
- **Automated Alerts**: Trigger alerts when service is unhealthy

## Response Status Codes

- `200` - Service is healthy and operational
- Other status codes indicate service issues
