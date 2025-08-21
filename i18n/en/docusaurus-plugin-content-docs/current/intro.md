---
sidebar_position: 1
---

import ThemedImage from '@theme/ThemedImage';

# Fast ERP API Documentation

## Introduction

Explore our guides to find your suitable solutions by familiarizing yourself with our latest documentation including bussiness models, developer guides, API reference and more...

## Key Features

- **Secure Authentication**: The system uses token-based authentication to ensure API security.
- **Master Data Synchronization**: Supports synchronization of category data such as customers, materials, cases...
- **Complex Document Synchronization**: Supports synchronization of multi-level document data such as purchase invoices, sales invoices...
- **Data Queries**: Provides the ability to query data from the system.

## Data Processing Flow

```mermaid
sequenceDiagram
    participant Client
    participant Auth_Server as Authentication Server
    participant API_Server as API Server
    participant Database

    %% Step 1: Authentication and token retrieval
    Client->>Auth_Server: POST api/getToken (username, password)
    Note over Auth_Server: Verify login information
    alt Authentication successful
        Auth_Server->>Auth_Server: Create JWT token (with expiration)
        Auth_Server-->>Client: 200 OK (token, expiry)
    else Authentication failed
        Auth_Server-->>Client: 401 Unauthorized
    end

    %% Step 2: Send data processing request
    Client->>API_Server: POST /api/SyncVoucher (data, Authorization: {token})
    API_Server->>Auth_Server: Verify token

    alt Valid token
        Auth_Server-->>API_Server: Valid token (user info, permissions)

        %% Step 3: Data processing
        Note over API_Server: Check access rights
        API_Server->>API_Server: Validate and transform data
        API_Server->>Database: Save data
        Database-->>API_Server: Confirm successful save

        %% Step 4: Response
        API_Server-->>Client: 200 OK (processing results)
    else Invalid or expired token
        Auth_Server-->>API_Server: Invalid token
        API_Server-->>Client: 401 Unauthorized
        Note over Client: Re-authentication required
    end
```

<figure style={{textAlign: 'center'}}>
  <figcaption style={{marginTop: '10px', fontSize: '14px', fontStyle: 'italic'}}>
    Figure 1: API Data Processing Flow Diagram
  </figcaption>
</figure>

### 1. Authentication and Token Retrieval

- Client sends authentication request with login information (username/password).
- The system verifies the information and creates a token.
- The token is returned to the client along with its expiration time.

### 2. Send Data Processing Request

- Client sends a request with the authentication token in the header.
- API verifies the token and access rights.

### 3. Data Processing

- Valid data is transformed and saved to the database.
- The system processes related business logic.

### 4. Response

- Processing results are returned to the client.
- In case of an expired token, the system returns an error code requesting the client to re-authenticate.

## Getting Started with Integration

# Getting Started with the API

To start using the API, you need to:

1. Register and obtain authentication credentials (username/password).
2. Learn about [authentication and security](./authentication).
3. Explore the available API endpoints in the list below:

| API                                                | Format                | API Defined by |
| -------------------------------------------------- | --------------------- | -------------- |
| [Category Data Synchronization](./api/sync-data)   | POST /api/SyncData    | Fast           |
| [Voucher Data Synchronization](./api/sync-voucher) | POST /api/SyncVoucher | Fast           |
| [Get Data](./api/get-data)                         | POST /api/GetData     | Fast           |
