---
sidebar_position: 2
---

# Authentication and Security

## Overview

FastAPI uses token-based authentication. To access the API, you need to:

1. Obtain an authentication token from the `getToken` API.
2. Use the token in the header of all requests.

## Obtaining an Authentication Token

To obtain an authentication token, you need to call the `getToken` API with your login credentials:

```http
POST /api/getToken
Content-Type: application/json

{
  "username": "your_username",
  "password": "your_password"
}
```

### Successful Response

```json
{
    "success": true,
    "code": 200,
    "messages": "Success",
    "token": {
        "accesstoken": "base64_encoded_token_string",
        "expires": "2025-04-24T10:02:42Z"
    }
}
```

### Error Response

```json
{
  "success": false,
  "messages": "Invalid username or password",
  "code": 401
}
```

## Using the Token in Requests

After obtaining the token, you need to include it in the `Authorization` header for all subsequent requests:

```http
POST /api/SyncData
Content-Type: application/json
Authorization: your_token_here

{
  // Request body
}
```

## Token Expiration

Tokens have a validity period. Typically, a token will expire after a certain amount of time (usually 24 hours). When the token expires, you need to obtain a new one.

## Authentication Workflow

1. The client sends login credentials to obtain a token.
2. The server verifies the credentials and returns a token if valid.
3. The client stores the token and includes it in every request.
4. The server validates the token before processing the request.
5. If the token is expired or invalid, the server returns a 401 Unauthorized error.

## Security

Here are some tips to ensure security when using the API:

1. **Protect your credentials**: Do not share your login credentials or token with anyone.
2. **Use HTTPS**: Always use HTTPS to send and receive data from the API.
3. **Handle authentication errors**: Implement a mechanism to automatically obtain a new token when the current one expires.
4. **Limit access rights**: Each token should only have access to the necessary resources.

## Authentication Error Codes

| Error Code | Description |
|------------|-------------|
| 401        | Unauthorized - Token is invalid or expired |
| 403        | Forbidden - No access to the resource |

## Authentication Examples in Programming Languages

### Example with JavaScript (Node.js)

```javascript
const axios = require('axios');

// Obtain token
async function getToken() {
  try {
    const response = await axios.post('https://api.example.com/api/getToken', {
      username: 'your_username',
      password: 'your_password'
    });
    return response.data.token;
  } catch (error) {
    console.error('Error obtaining token:', error);
    throw error;
  }
}

// Use token to call API
async function callApi() {
  const token = await getToken();
  
  try {
    const response = await axios.post('https://api.example.com/api/SyncData', 
      { form: 'setCustomer', data: [...] },
      { headers: { Authorization: token } }
    );
    return response.data;
  } catch (error) {
    console.error('Error calling API:', error);
    throw error;
  }
}
```

### Example with C#

```csharp
using System;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;
using Newtonsoft.Json;

public class ApiClient
{
    private readonly HttpClient _client = new HttpClient();
    private readonly string _baseUrl = "https://api.example.com/api";
    
    // Obtain token
    public async Task<string> GetTokenAsync(string username, string password)
    {
        var content = new StringContent(
            JsonConvert.SerializeObject(new { username, password }),
            Encoding.UTF8,
            "application/json");
            
        var response = await _client.PostAsync($"{_baseUrl}/getToken", content);
        response.EnsureSuccessStatusCode();
        
        var result = JsonConvert.DeserializeObject<TokenResponse>(
            await response.Content.ReadAsStringAsync());
            
        return result.Token.AccessToken;
    }
    
    // Call API with token
    public async Task<ApiResult> SyncDataAsync(string token, object data)
    {
        _client.DefaultRequestHeaders.Authorization = 
            new System.Net.Http.Headers.AuthenticationHeaderValue("Bearer", token);
            
        var content = new StringContent(
            JsonConvert.SerializeObject(data),
            Encoding.UTF8,
            "application/json");
            
        var response = await _client.PostAsync($"{_baseUrl}/SyncData", content);
        response.EnsureSuccessStatusCode();
        
        return JsonConvert.DeserializeObject<ApiResult>(
            await response.Content.ReadAsStringAsync());
    }
}

public class TokenResponse
{
    [JsonProperty("success")]
    public bool Success { get; set; }
    
    [JsonProperty("code")]
    public int Code { get; set; }
    
    [JsonProperty("messages")]
    public string Messages { get; set; }
    
    [JsonProperty("token")]
    public TokenData Token { get; set; }
}

public class TokenData
{
    [JsonProperty("accesstoken")]
    public string AccessToken { get; set; }
    
    [JsonProperty("expires")]
    public DateTime Expires { get; set; }
}

public class ApiResult
{
    [JsonProperty("success")]
    public bool Success { get; set; }
    
    [JsonProperty("code")]
    public int Code { get; set; }
    
    [JsonProperty("messages")]
    public string Messages { get; set; }
    
}
```