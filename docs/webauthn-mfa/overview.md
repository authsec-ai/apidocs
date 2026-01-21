# WebAuthn & MFA Overview

The WebAuthn Service API provides comprehensive multi-factor authentication (MFA) capabilities supporting WebAuthn (passwordless authentication), TOTP (Time-based One-Time Password), and SMS verification.

## Base URL

```
https://dev.api.authsec.dev/webauthn
```

## Key Features

- **WebAuthn Support**: Passwordless authentication using FIDO2/WebAuthn standards
- **TOTP Authenticator**: Time-based OTP support for authenticator apps (Google Authenticator, Authy, etc.)
- **SMS Authentication**: SMS-based verification codes
- **Dual User Types**: Separate flows for admin users (global database) and end users (tenant-specific)
- **Registration & Authentication**: Complete flows for both credential setup and login
- **Backup Codes**: TOTP backup codes for account recovery
- **Multi-Tenant Support**: Tenant-specific credential storage for end users

## API Sections

### WebAuthn Authentication
Passwordless authentication using FIDO2/WebAuthn for both admin and end users.

### TOTP Authentication
Time-based One-Time Password support with QR code generation and backup codes.

### SMS Authentication
SMS-based verification with code generation, validation, and rate limiting.

## Authentication Flows

### Admin Users (Global Database)
- **Begin Registration**: `POST /webauthn/admin/beginRegistration`
- **Finish Registration**: `POST /webauthn/admin/finishRegistration`
- **Begin Authentication**: `POST /webauthn/admin/beginAuthentication`
- **Finish Authentication**: `POST /webauthn/admin/finishAuthentication`

### End Users (Tenant-Specific)
- **Begin Registration**: `POST /webauthn/enduser/beginRegistration`
- **Finish Registration**: `POST /webauthn/enduser/finishRegistration`
- **Begin Authentication**: `POST /webauthn/enduser/beginAuthentication`
- **Finish Authentication**: `POST /webauthn/enduser/finishAuthentication`

## MFA Methods Comparison

| Method | Setup Complexity | Security Level | User Experience | Recovery Options |
|--------|-----------------|----------------|-----------------|------------------|
| **WebAuthn** | Medium | Highest | Excellent (biometric/key) | Device-specific |
| **TOTP** | Low | High | Good (6-digit code) | Backup codes |
| **SMS** | Very Low | Medium | Fair (wait for SMS) | Phone number change |

## Multi-Tenant Architecture

- **Admin Users**: Credentials stored in global database
- **End Users**: Credentials stored in tenant-specific databases
- **Tenant Isolation**: Complete data separation between tenants
- **Tenant ID Required**: All end user operations require `tenant_id` parameter

## Security Features

- **Challenge-Response**: Cryptographic challenges prevent replay attacks
- **Credential Storage**: Secure storage of public keys and TOTP secrets
- **Rate Limiting**: Built-in protection against brute force attacks
- **Expiration**: Time-limited codes and challenges
- **Verification**: Multi-step verification processes

## Integration Guidelines

### WebAuthn Implementation
1. Call begin endpoint to get credential creation/assertion options
2. Use browser WebAuthn API to process options
3. Submit response to finish endpoint for validation

### TOTP Implementation
1. Begin setup to receive secret and QR code
2. User scans QR code in authenticator app
3. Verify setup with generated code
4. Store backup codes securely

### SMS Implementation
1. Request code with user email and phone
2. User receives SMS with verification code
3. Verify code to complete authentication
