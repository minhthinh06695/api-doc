---
sidebar_position: 1
slug: /
---

# Fast HSM - Technical Integration

Welcome to **Fast HSM** - Fast's secure digital signature and data encryption solution.

## Introduction

Fast HSM provides powerful APIs for partners to integrate features:

- 🔐 **Digital Signature** - Sign documents and important data
- 🛡️ **Data Encryption** - Encrypt/decrypt according to JWE standard (AES)
- 📋 **Certificate Management** - Get information and manage certificates
- 🔑 **Secure Authentication** - Token-based authentication system

## Fast HSM Integration Process

```mermaid
sequenceDiagram
    autonumber
    participant Partner
    participant Application as HSM Service

    %% Step 1: Manual Registration
    Note over Partner,Application: Partner contacts provider to receive credentials (username, password).

    %% Step 2: Authentication and Get Access Token
    Note over Partner,Application: Authentication and Get Token
    Partner->>Application: POST /api/account/gettoken (username, password)
    activate Application
    Application->>Application: Verify information, generate token
    Application-->>Partner: 200 OK (Access Token)
    deactivate Application

    %% Step 3: Get Certificate Information
    Note over Partner,Application: Get Certificate Information
    Partner->>Application: POST /api/certificate/getinfosn (with Access Token)
    activate Application
    Application->>Application: Retrieve certificate information
    Application-->>Partner: 200 OK (Certificate Data)
    deactivate Application

    %% Step 4: Use HSM Services
    loop Using digital signature services
        alt Digital Signature
            Partner->>Application: POST /api/sign/signhash (data to sign, Token)
            activate Application
            Application->>Application: Perform hash signing
            Application-->>Partner: 200 OK (Signed Data)
            deactivate Application
        else Data Encryption
            Partner->>Application: POST /api/sign/encryptjwe (data to encrypt, Token)
            activate Application
            Application->>Application: Perform JWE encryption
            Application-->>Partner: 200 OK (Encrypted Data)
            deactivate Application
        else Data Decryption
            Partner->>Application: POST /api/sign/decryptjwe (data to decrypt, Token)
            activate Application
            Application->>Application: Perform JWE decryption
            Application-->>Partner: 200 OK (Decrypted Data)
            deactivate Application
        end
    end

    Note over Partner,Application: Integration successful! System ready to use all features.
```

## Benefits

### ✅ High Security

- Certificates stored securely in HSM
- Encryption according to international JWE standard (AES)
- Token-based authentication

### ✅ Easy Integration

- Simple RESTful APIs
- Detailed documentation with examples
- Multiple hash signing support

### ✅ High Performance

- Batch signing processing (multiple hashes at once)
- Fast response time
- Scalable architecture

## Available APIs

| API                          | Purpose                      | Method |
| ---------------------------- | ---------------------------- | ------ |
| `/api/account/gettoken`      | Authentication and get token | POST   |
| `/api/certificate/getinfosn` | Get certificate information  | POST   |
| `/api/sign/encryptjwe`       | Encrypt data with JWE        | POST   |
| `/api/sign/decryptjwe`       | Decrypt JWE data             | POST   |
| `/api/sign/signhash`         | Sign data (batch)            | POST   |

## Getting Started

1. **[Authentication and Security](/hsm/authentication)** - Learn how to get tokens
2. **[Certificate Management](/hsm/certificate)** - Certificate APIs
3. **[Data Encryption](/hsm/encryption)** - Encrypt/Decrypt with JWE
4. **[Digital Signature](/hsm/signing)** - Digital signature APIs

## Support

- 📧 **Email**: info@fast.com.vn
- 📞 **Hotline**: (028) 7108-8788 (Ext. 3)
- 🌐 **Website**: [fast.com.vn](https://fast.com.vn)

---

**Ready to get started?** Begin with [Authentication and Security](/hsm/authentication) to get your access token.
