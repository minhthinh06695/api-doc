---
sidebar_position: 2
---

# Xác thực và Bảo mật

## Tổng quan

FastAPI sử dụng phương thức xác thực dựa trên token (token-based authentication). Để truy cập API, bạn cần:

1. Lấy token xác thực từ API getToken
2. Sử dụng token trong header của tất cả các request

## Lấy token xác thực

Để lấy token xác thực, bạn cần gọi API getToken với thông tin đăng nhập:

```http
POST /api/getToken
Content-Type: application/json

{
  "username": "your_username",
  "password": "your_password"
}
```

### Phản hồi thành công

```json
{
  "success": true,
  "token": "base64_encoded_token_string",
  "expires": "2023-04-30T23:59:59Z"
}
```

### Phản hồi lỗi

```json
{
  "success": false,
  "messages": "Invalid username or password",
  "code": 401
}
```

## Sử dụng token trong các request

Sau khi lấy được token, bạn cần gửi token trong header `Authorization` cho tất cả các request tiếp theo:

```http
POST /api/SyncData
Content-Type: application/json
Authorization: your_token_here

{
  // Request body
}
```

## Thời hạn của token

Token có thời hạn hiệu lực. Thông thường, token sẽ hết hạn sau một khoảng thời gian nhất định (thường là 24 giờ). Khi token hết hạn, bạn cần phải lấy token mới.

## Quy trình xác thực

1. Client gửi thông tin đăng nhập để lấy token.
2. Server xác minh thông tin và trả về token nếu hợp lệ.
3. Client lưu trữ token và gửi kèm trong mọi request.
4. Server xác thực token trước khi xử lý request.
5. Nếu token hết hạn hoặc không hợp lệ, server trả về lỗi 401 Unauthorized.

## Bảo mật

Một số lưu ý để đảm bảo bảo mật khi sử dụng API:

1. **Bảo vệ thông tin đăng nhập**: Không chia sẻ thông tin đăng nhập hoặc token với bất kỳ ai.
2. **Sử dụng HTTPS**: Luôn sử dụng HTTPS để gửi và nhận dữ liệu từ API.
3. **Xử lý lỗi xác thực**: Xây dựng cơ chế tự động lấy token mới khi token hết hạn.
4. **Giới hạn quyền truy cập**: Mỗi token chỉ nên có quyền truy cập vào các tài nguyên cần thiết.

## Mã lỗi xác thực

| Mã lỗi | Mô tả |
|--------|-------|
| 401 | Unauthorized - Token không hợp lệ hoặc hết hạn |
| 403 | Forbidden - Không có quyền truy cập vào tài nguyên |

## Ví dụ xác thực bằng các ngôn ngữ lập trình

### Ví dụ với JavaScript (Node.js)

```javascript
const axios = require('axios');

// Lấy token
async function getToken() {
  try {
    const response = await axios.post('https://api.example.com/api/getToken', {
      username: 'your_username',
      password: 'your_password'
    });
    return response.data.token;
  } catch (error) {
    console.error('Lỗi khi lấy token:', error);
    throw error;
  }
}

// Sử dụng token để gọi API
async function callApi() {
  const token = await getToken();
  
  try {
    const response = await axios.post('https://api.example.com/api/SyncData', 
      { form: 'setCustomers', data: [...] },
      { headers: { Authorization: token } }
    );
    return response.data;
  } catch (error) {
    console.error('Lỗi khi gọi API:', error);
    throw error;
  }
}
```

### Ví dụ với C#

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
    
    // Lấy token
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
            
        return result.Token;
    }
    
    // Gọi API với token
    public async Task<ApiResult> SyncDataAsync(string token, object data)
    {
        _client.DefaultRequestHeaders.Authorization = 
            new System.Net.Http.Headers.AuthenticationHeaderValue(token);
            
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
    
    [JsonProperty("token")]
    public string Token { get; set; }
    
    [JsonProperty("expires")]
    public DateTime Expires { get; set; }
}
```