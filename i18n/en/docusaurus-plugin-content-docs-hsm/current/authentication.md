---
sidebar_position: 2
---

# Authentication & Security

To use Fast HSM APIs, you need to authenticate and obtain an access token. This token will be required for all subsequent API calls.

## Get Token API

### Endpoint

<blockquote>
  <pre><code><b>POST</b> /api/account/gettoken</code></pre>
</blockquote>

### Headers

```http
Content-Type: application/json
```

### Request Body

```json
{
  "username": "{your_username}",
  "password": "{your_password}"
}
```

#### Parameters

| Attribute  | Type   | Required | Description               |
| ---------- | ------ | -------- | ------------------------- |
| `username` | string | ✔️       | Username provided by Fast |
| `password` | string | ✔️       | Password provided by Fast |

### Response

#### Success (200 OK)

```json
{
  "success": true,
  "message": "Successfully",
  "code": 200,
  "data": {
    "accessToken": "{JWT_Token}",
    "tokenType": "Bearer",
    "expiresIn": 3600
  }
}
```

#### Failure

```json
{
  "success": false,
  "message": "{Error_Message}",
  "code": {Error_Code},
  "data": null
}
```

### Response Fields

| Attribute          | Type    | Description                     |
| ------------------ | ------- | ------------------------------- |
| `success`          | boolean | Request success status          |
| `message`          | string  | Response message                |
| `code`             | number  | HTTP status code                |
| `data.accessToken` | string  | JWT access token                |
| `data.tokenType`   | string  | Token type (Bearer)             |
| `data.expiresIn`   | number  | Token expiration time (seconds) |

## Code Examples

### cURL

```bash
curl -X POST https://hsm.fast.com.vn/api/account/gettoken \
  -H "Content-Type: application/json" \
  -d '{
    "username": "your_username",
    "password": "your_password"
  }'
```

### JavaScript

```javascript
const getHsmToken = async (username, password) => {
  try {
    const response = await fetch(
      "https://hsm.fast.com.vn/api/account/gettoken",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: username,
          password: password,
        }),
      }
    );

    const result = await response.json();

    if (result.success) {
      // Store token securely
      localStorage.setItem("hsm_token", result.data.accessToken);
      console.log("Authentication successful");
      return result.data.accessToken;
    } else {
      console.error("Authentication failed:", result.message);
      return null;
    }
  } catch (error) {
    console.error("Request failed:", error);
    return null;
  }
};

// Usage
const token = await getHsmToken("your_username", "your_password");
if (token) {
  console.log("Ready to use HSM APIs");
}
```

### Python

```python
import requests
import json

def get_hsm_token(username, password):
    url = "https://hsm.fast.com.vn/api/account/gettoken"
    payload = {
        "username": username,
        "password": password
    }
    headers = {
        "Content-Type": "application/json"
    }

    try:
        response = requests.post(url, json=payload, headers=headers)
        result = response.json()

        if result.get("success"):
            token = result["data"]["accessToken"]
            print("Authentication successful")
            return token
        else:
            print(f"Authentication failed: {result.get('message')}")
            return None
    except Exception as e:
        print(f"Request failed: {e}")
        return None

# Usage
token = get_hsm_token("your_username", "your_password")
if token:
    print("Ready to use HSM APIs")
```

### C#

```csharp
using System;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;
using Newtonsoft.Json;

public class HsmAuth
{
    private static readonly HttpClient httpClient = new HttpClient();

    public class TokenRequest
    {
        public string username { get; set; }
        public string password { get; set; }
    }

    public class TokenResponse
    {
        public bool success { get; set; }
        public string message { get; set; }
        public int code { get; set; }
        public TokenData data { get; set; }
    }

    public class TokenData
    {
        public string accessToken { get; set; }
        public string tokenType { get; set; }
        public int expiresIn { get; set; }
    }

    public static async Task<string> GetHsmTokenAsync(string username, string password)
    {
        try
        {
            var request = new TokenRequest
            {
                username = username,
                password = password
            };

            var json = JsonConvert.SerializeObject(request);
            var content = new StringContent(json, Encoding.UTF8, "application/json");

            var response = await httpClient.PostAsync(
                "https://hsm.fast.com.vn/api/account/gettoken",
                content
            );

            var responseBody = await response.Content.ReadAsStringAsync();
            var result = JsonConvert.DeserializeObject<TokenResponse>(responseBody);

            if (result.success)
            {
                Console.WriteLine("Authentication successful");
                return result.data.accessToken;
            }
            else
            {
                Console.WriteLine($"Authentication failed: {result.message}");
                return null;
            }
        }
        catch (Exception ex)
        {
            Console.WriteLine($"Request failed: {ex.Message}");
            return null;
        }
    }
}

// Usage
var token = await HsmAuth.GetHsmTokenAsync("your_username", "your_password");
if (!string.IsNullOrEmpty(token))
{
    Console.WriteLine("Ready to use HSM APIs");
}
```

## Token Management

### Token Usage

Once you obtain the access token, include it in the `Authorization` header for all subsequent API calls:

```http
Authorization: Bearer {your_access_token}
```

### Token Refresh

Tokens have a limited lifetime (typically 1 hour). When a token expires, you'll receive a `401 Unauthorized` response. In this case, you need to obtain a new token using the same authentication process.

### Security Best Practices

1. **Secure Storage**: Store tokens in memory or secure storage
2. **Expiration Handling**: Implement logic to refresh tokens when needed
3. **Error Handling**: Handle 401 errors and re-authenticate
4. **Logging**: Log authentication events for audit purposes

## Troubleshooting

### Common Errors

| Error              | Cause                   | Solution                       |
| ------------------ | ----------------------- | ------------------------------ |
| 401 Unauthorized   | Wrong username/password | Check credentials              |
| 403 Forbidden      | Account locked          | Contact Fast support           |
| 500 Internal Error | Server error            | Retry later or contact support |

---

**Next:** Learn about [Certificate Management](/hsm/certificate) to retrieve certificate information.
