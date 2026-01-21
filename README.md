# AuthSec API Documentation

This Docusaurus site contains comprehensive API documentation for AuthSec's authentication and user management services.

## Documentation Sources

This documentation is generated from the following API sources:

### User Management API
- **Source URL**: `https://dev.api.authsec.dev/uflow/redoc`
- **API Name**: User Flow Multi-Tenant RBAC API
- **Version**: 4.0.0
- **Base URL**: `https://dev.api.authsec.dev`
- **Documentation Section**: `/docs/user-management/`

#### Files Generated from User Management API:
| File Path | Source Section | Description |
|-----------|----------------|-------------|
| `/docs/user-management/_category_.json` | N/A | Category configuration |
| `/docs/user-management/overview.md` | General API info | Overview and key features |
| `/docs/user-management/admin-users.md` | `/admin/users/*` endpoints | Admin user CRUD operations |
| `/docs/user-management/end-users.md` | `/users/*` endpoints | End user management |
| `/docs/user-management/authentication.md` | `/admin/auth/*`, `/auth/*` | Authentication flows |
| `/docs/user-management/mfa-authentication.md` | `/admin/totp/*`, `/admin/webauthn/*`, `/admin/ciba/*` | MFA methods |
| `/docs/user-management/directory-sync.md` | `/admin/activedirectory/*`, `/admin/entra-id/*` | Directory synchronization |

### Auth Manager API
- **Source URL**: `https://dev.api.authsec.dev/authmgr/swagger`
- **API Name**: Auth Manager Server API
- **Version**: 1.1.0
- **Base URL**: `https://dev.api.authsec.dev/authmgr`
- **Documentation Section**: `/docs/auth-manager/`

#### Files Generated from Auth Manager API:
| File Path | Source Section | Description |
|-----------|----------------|-------------|
| `/docs/auth-manager/_category_.json` | N/A | Category configuration |
| `/docs/auth-manager/overview.md` | General API info | Overview and key features |
| `/docs/auth-manager/token-management.md` | `/auth/admin/generateToken`, `/auth/user/generateToken`, `/auth/*/oidcToken` | JWT token generation |
| `/docs/auth-manager/groups.md` | `/auth/admin/group/*` | Group management endpoints |
| `/docs/auth-manager/validation.md` | `/authmgr/validate/*` | Token validation endpoints |
| `/docs/auth-manager/profile.md` | `/auth/*/profile` | User profile endpoints |
| `/docs/auth-manager/debug.md` | `/auth/*/debug/*` | Debug endpoints |
| `/docs/auth-manager/system.md` | `/auth/*/health` | Health check endpoints |

### Client Management API
- **Source URL**: `https://dev.api.authsec.dev/clientms/swagger`
- **API Name**: Clients Microservice API
- **Version**: 0.4.0
- **Base URL**: `https://dev.api.authsec.dev/clientms`
- **Documentation Section**: `/docs/client-management/`

#### Files Generated from Client Management API:
| File Path | Source Section | Description |
|-----------|----------------|-------------|
| `/docs/client-management/_category_.json` | N/A | Category configuration |
| `/docs/client-management/overview.md` | General API info | Overview and key features |
| `/docs/client-management/clients.md` | `/clients/v1/*`, `/clientms/tenants/*/clients/*` | Client CRUD operations |
| `/docs/client-management/client-status.md` | `/clients/v1/*/activate`, `/clients/v1/*/deactivate` | Client activation/deactivation |

### WebAuthn & MFA API
- **Source URL**: `https://dev.api.authsec.dev/webauthn/swagger`
- **API Name**: WebAuthn Service API
- **Version**: 2.0
- **Base URL**: `https://dev.api.authsec.dev/webauthn`
- **Documentation Section**: `/docs/webauthn-mfa/`

#### Files Generated from WebAuthn & MFA API:
| File Path | Source Section | Description |
|-----------|----------------|-------------|
| `/docs/webauthn-mfa/_category_.json` | N/A | Category configuration |
| `/docs/webauthn-mfa/overview.md` | General API info | Overview and key features |
| `/docs/webauthn-mfa/webauthn.md` | `/webauthn/admin/*`, `/webauthn/enduser/*` | WebAuthn registration/authentication |
| `/docs/webauthn-mfa/totp.md` | `/webauthn/totp/*` | TOTP setup and verification |
| `/docs/webauthn-mfa/sms.md` | `/webauthn/sms/*` | SMS code request and verification |

## Update Instructions for AI Agents

### To Update User Management Documentation:

1. **Fetch Latest API Spec**:
   ```
   URL: https://dev.api.authsec.dev/uflow/redoc
   Method: GET
   ```

2. **Parse the API specification** and extract:
   - Endpoint paths and methods
   - Request/response schemas
   - Authentication requirements
   - Parameter descriptions

3. **Update the following files** based on endpoint patterns:
   - Admin user endpoints (`/admin/users/*`) → `docs/user-management/admin-users.md`
   - End user endpoints (`/users/*`) → `docs/user-management/end-users.md`
   - Auth endpoints (`/admin/auth/*`, `/auth/*`) → `docs/user-management/authentication.md`
   - MFA endpoints (`/admin/totp/*`, `/admin/webauthn/*`, `/admin/ciba/*`) → `docs/user-management/mfa-authentication.md`
   - Directory sync (`/admin/activedirectory/*`, `/admin/entra-id/*`) → `docs/user-management/directory-sync.md`

4. **Preserve the structure**: Each file follows this format:
   - H1: Section title
   - H2: Individual endpoint names
   - Endpoint details: method, path, description
   - Request body/parameters tables
   - Response samples with status codes
   - Code examples in JSON format

### To Update Auth Manager Documentation:

1. **Fetch Latest API Spec**:
   ```
   URL: https://dev.api.authsec.dev/authmgr/swagger
   Method: GET
   Format: Swagger/OpenAPI JSON or HTML
   Alternative: https://dev.api.authsec.dev/authmgr/swagger.json
   ```

2. **Parse the API specification** and extract:
   - Endpoint tags and groupings
   - Request/response schemas
   - Authorization requirements
   - Parameter types and descriptions

3. **Update the following files** based on endpoint tags:
   - Token tag endpoints → `docs/auth-manager/token-management.md`
   - Group tag endpoints → `docs/auth-manager/groups.md`
   - Validation tag endpoints → `docs/auth-manager/validation.md`
   - Profile tag endpoints → `docs/auth-manager/profile.md`
   - Debug tag endpoints → `docs/auth-manager/debug.md`
   - System tag endpoints → `docs/auth-manager/system.md`

4. **Preserve the structure**: Each file follows this format:
   - H1: Section title
   - H2: Individual endpoint names
   - Endpoint details with method and path
   - Authorization requirements
   - Parameter tables (path, query, body)
   - Response samples organized by status code
   - Usage examples section

### To Update Client Management Documentation:

1. **Fetch Latest API Spec**:
   ```
   URL: https://dev.api.authsec.dev/clientms/swagger
   Method: GET
   Format: Swagger/OpenAPI JSON or HTML
   Alternative: https://dev.api.authsec.dev/clientms/swagger/doc.json
   ```

2. **Parse the API specification** and extract:
   - Client CRUD endpoints
   - Filtering and pagination parameters
   - Status management operations
   - Request/response schemas with client object structure

3. **Update the following files** based on endpoint patterns:
   - List/Get/Update endpoints → `docs/client-management/clients.md`
   - Activate/Deactivate endpoints → `docs/client-management/client-status.md`

4. **Preserve the structure**: Each file follows this format:
   - H1: Section title
   - H2: Individual endpoint names
   - Endpoint details with method and path
   - Authorization requirements (Bearer token, admin-only when applicable)
   - Parameter tables (path, query, body)
   - Response samples with client object structure
   - Usage examples and best practices sections

### To Update WebAuthn & MFA Documentation:

1. **Fetch Latest API Spec**:
   ```
   URL: https://dev.api.authsec.dev/webauthn/swagger
   Method: GET
   Format: Swagger/OpenAPI JSON or HTML
   ```

2. **Parse the API specification** and extract:
   - WebAuthn registration/authentication flows
   - TOTP setup and verification endpoints
   - SMS authentication endpoints
   - Separate admin and end-user flows
   - Request/response schemas

3. **Update the following files** based on endpoint patterns:
   - Admin WebAuthn (`/webauthn/admin/*`) → `docs/webauthn-mfa/webauthn.md`
   - End User WebAuthn (`/webauthn/enduser/*`) → `docs/webauthn-mfa/webauthn.md`
   - TOTP endpoints (`/webauthn/totp/*`) → `docs/webauthn-mfa/totp.md`
   - SMS endpoints (`/webauthn/sms/*`) → `docs/webauthn-mfa/sms.md`

4. **Preserve the structure**: Each file follows this format:
   - H1: Section title
   - H2: Individual endpoint names (begin/finish flows)
   - Endpoint details with method and path
   - Clear separation between admin and end-user flows
   - Parameter tables with tenant_id requirements
   - Response samples with all fields documented
   - Implementation guides with code examples
   - Best practices sections

## File Structure

```
/Users/asif/apidocs/
├── README.md (this file)
├── docusaurus.config.js
├── package.json
├── sidebars.js
├── docs/
│   ├── intro.md
│   ├── user-management/
│   │   ├── _category_.json
│   │   ├── overview.md
│   │   ├── admin-users.md
│   │   ├── end-users.md
│   │   ├── authentication.md
│   │   ├── mfa-authentication.md
│   │   └── directory-sync.md
│   ├── auth-manager/
│   │   ├── _category_.json
│   │   ├── overview.md
│   │   ├── token-management.md
│   │   ├── groups.md
│   │   ├── validation.md
│   │   ├── profile.md
│   │   ├── debug.md
│   │   └── system.md
│   ├── client-management/
│   │   ├── _category_.json
│   │   ├── overview.md
│   │   ├── clients.md
│   │   └── client-status.md
│   └── webauthn-mfa/
│       ├── _category_.json
│       ├── overview.md
│       ├── webauthn.md
│       ├── totp.md
│       └── sms.md
├── src/
│   ├── components/
│   ├── css/
│   │   └── custom.css
│   └── pages/
│       ├── index.js
│       └── index.module.css
└── static/
    └── img/
```

## Styling Configuration

### Fonts
- **Body & Headings**: Open Sans (matches Swagger UI)
- **Code**: Fira Code
- **Import**: `@import url('https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;600;700&family=Fira+Code:wght@400;500&display=swap');`

### Typography
- **H1 Size**: 2.19rem (~35px)
- **Primary Color**: Black (#000000)
- **Font Family Base**: 'Open Sans', sans-serif
- **Heading Font Family**: 'Open Sans', sans-serif

### Styling Files
- Primary styles: `/src/css/custom.css`
- Homepage styles: `/src/pages/index.module.css`
- Component styles: `/src/components/HomepageFeatures/styles.module.css`

## Branding

- **Site Title**: AuthSec API Documentation
- **Tagline**: Multi-tenant RBAC authentication and user management API
- **Base URL**: https://api.authsec.dev
- **Default Theme**: Dark mode

## Development Commands

```bash
# Install dependencies
npm install

# Start development server
npm start

# Build for production
npm run build

# Clear cache (if encountering issues)
rm -rf .docusaurus node_modules/.cache && npm start
```

## AI Agent Update Protocol

### Step-by-Step Update Process:

1. **Fetch Source Data**
   - Use `fetch_webpage` tool with the source URLs listed above
   - Extract API endpoint information, parameters, and responses

2. **Identify Changed Endpoints**
   - Compare fetched data with existing documentation
   - Note new endpoints, deprecated endpoints, and modified schemas

3. **Update Documentation Files**
   - Use `replace_string_in_file` for existing endpoint updates
   - Use `create_file` only for new documentation sections
   - Maintain consistent markdown formatting

4. **Preserve Structure**
   - Keep existing file organization
   - Maintain heading hierarchy (H1 → H2 → H3)
   - Use consistent table formatting for parameters
   - Include code blocks with proper JSON formatting

5. **Validate Changes**
   - Ensure all internal links still work
   - Verify code samples are valid JSON
   - Check that category positions remain consistent

6. **Clear Cache & Rebuild**
   - After updates: `rm -rf .docusaurus node_modules/.cache`
   - Restart server: `npm start`

## Endpoint Mapping Reference

### User Management Endpoints → Documentation Files

| Endpoint Pattern | Documentation File |
|------------------|-------------------|
| `/admin/users` | `admin-users.md` |
| `/admin/users/invite` | `admin-users.md` |
| `/admin/users/{userId}/activate` | `admin-users.md` |
| `/users` | `end-users.md` |
| `/users/register` | `end-users.md` |
| `/admin/auth/login` | `authentication.md` |
| `/auth/login` | `authentication.md` |
| `/admin/totp/*` | `mfa-authentication.md` |
| `/admin/webauthn/*` | `mfa-authentication.md` |
| `/admin/activedirectory/*` | `directory-sync.md` |

### Auth Manager Endpoints → Documentation Files

| Endpoint Pattern | Documentation File |
|------------------|-------------------|
| `/auth/*/generateToken` | `token-management.md` |
| `/auth/*/oidcToken` | `token-management.md` |
| `/auth/admin/group` | `groups.md` |
| `/auth/admin/group/{id}` | `groups.md` |
| `/authmgr/validate` | `validation.md` |
| `/authmgr/validate/scope` | `validation.md` |
| `/authmgr/validate/resource` | `validation.md` |
| `/auth/*/profile` | `profile.md` |
| `/auth/*/debug/*` | `debug.md` |
| `/auth/*/health` | `system.md` |

### Client Management Endpoints → Documentation Files

| Endpoint Pattern | Documentation File |
|------------------|-------------------|
| `/clients/v1/tenants/{tenantId}/clients` | `clients.md` |
| `/clients/v1/tenants/{tenantId}/clients/{id}` | `clients.md` |
| `/clientms/tenants/{tenantId}/clients/{id}` | `clients.md` |
| `/clients/v1/*/clients/*/activate` | `client-status.md` |
| `/clients/v1/*/clients/*/deactivate` | `client-status.md` |

### WebAuthn & MFA Endpoints → Documentation Files

| Endpoint Pattern | Documentation File |
|------------------|-------------------|
| `/webauthn/admin/beginRegistration` | `webauthn.md` |
| `/webauthn/admin/finishRegistration` | `webauthn.md` |
| `/webauthn/admin/beginAuthentication` | `webauthn.md` |
| `/webauthn/admin/finishAuthentication` | `webauthn.md` |
| `/webauthn/enduser/beginRegistration` | `webauthn.md` |
| `/webauthn/enduser/finishRegistration` | `webauthn.md` |
| `/webauthn/enduser/beginAuthentication` | `webauthn.md` |
| `/webauthn/enduser/finishAuthentication` | `webauthn.md` |
| `/webauthn/totp/beginSetup` | `totp.md` |
| `/webauthn/totp/confirmSetup` | `totp.md` |
| `/webauthn/totp/verify` | `totp.md` |
| `/webauthn/totp/verifyLogin` | `totp.md` |
| `/webauthn/sms/confirmSetup` | `sms.md` |
| `/webauthn/sms/requestCode` | `sms.md` |
| `/webauthn/sms/verify` | `sms.md` |

## Notes for AI Agents

- **Consistency**: Maintain the existing documentation style and structure
- **Code Samples**: Always use triple backticks with language identifier (```json, ```http, etc.)
- **Tables**: Use markdown tables for parameters with columns: Parameter, Type, Required, Description
- **Responses**: Show multiple response codes with collapsible sections
- **Base URLs**: Always include base URL in overview files
- **Authorization**: Clearly indicate which endpoints require Bearer token
- **Multi-tenancy**: Emphasize tenant_id requirements where applicable

## Version History

- **2026-01-20**: Initial documentation created
  - User Management API (v4.0.0) documented from ReDoc
  - Auth Manager API (v1.1.0) documented from Swagger
  - Client Management API (v0.4.0) documented from Swagger
  - WebAuthn & MFA API (v2.0) documented from Swagger
  - Styling updated to match Swagger UI (Open Sans font)
  - Primary color set to black
  - H1 font size: 2.19rem

## Contact & Support

- **API Base**: https://dev.api.authsec.dev
- **User Management ReDoc**: https://dev.api.authsec.dev/uflow/redoc
- **Auth Manager Swagger**: https://dev.api.authsec.dev/authmgr/swagger
- **Auth Manager Swagger JSON**: https://dev.api.authsec.dev/authmgr/swagger.json
- **Client Management Swagger**: https://dev.api.authsec.dev/clientms/swagger
- **Client Management Swagger JSON**: https://dev.api.authsec.dev/clientms/swagger/doc.json
- **WebAuthn & MFA Swagger**: https://dev.api.authsec.dev/webauthn/swagger

---

## Docusaurus Information

This website is built using [Docusaurus](https://docusaurus.io/), a modern static website generator.

### Installation

```bash
npm install
```

### Local Development

```bash
npm start
```

This command starts a local development server and opens up a browser window. Most changes are reflected live without having to restart the server.

### Build

```bash
npm run build
```

This command generates static content into the `build` directory and can be served using any static contents hosting service.

### Deployment

Using SSH:

```bash
USE_SSH=true npm run deploy
```

Not using SSH:

```bash
GIT_USER=<Your GitHub username> npm run deploy
```

If you are using GitHub pages for hosting, this command is a convenient way to build the website and push to the `gh-pages` branch.
