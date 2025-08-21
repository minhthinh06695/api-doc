---
sidebar_position: 1
---

# GetToken

## Endpoint

```
POST /api/econ/getToken
```

## Mô tả

Lấy accessToken để phục vụ cho việc truy cập các API khác trong hệ thống eContract.

## Headers

```http
Content-Type: application/json
```

## Request Body

```json
{
  "username": "{user}",
  "password": "{password}"
}
```

## Tham số

| Attribute  | Type   | Required | Description            |
| ---------- | ------ | -------- | ---------------------- |
| `username` | string | ✔️       | Tên đăng nhập được cấp |
| `password` | string | ✔️       | Mật khẩu được cấp      |

:::info Lưu ý
`username` và `password` sẽ được Fast cung cấp khi đối tác đăng ký thành công dịch vụ Fast e-Contract.
:::

## Response

### Thành công (200 OK)

```json
{
  "success": true,
  "message": "Successfully",
  "code": 200,
  "data": {
    "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

### Thất bại

```json
{
  "success": false,
  "message": "Invalid username or password",
  "code": 401,
  "data": null
}
```

## Response Fields

| Attribute          | Type    | Description                             |
| ------------------ | ------- | --------------------------------------- |
| `success`          | boolean | Trạng thái thành công của request       |
| `message`          | string  | Thông báo kết quả                       |
| `code`             | number  | HTTP status code                        |
| `data.accessToken` | string  | AccessToken để sử dụng cho các API khác |

## Sử dụng Token

Token nhận được cần được truyền vào **Header Authorization** cho tất cả các API e-Contract khác:

```http
Authorization: {accessToken}
```

### Ví dụ

```http
Authorization: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

## Code Examples

### cURL

```bash
curl -X POST http://domain:port/api/econ/getToken \
  -H "Content-Type: application/json" \
  -d '{
    "username": "your_username",
    "password": "your_password"
  }'
```

### JavaScript

```javascript
const getToken = async (username, password) => {
  try {
    const response = await fetch("http://domain:port/api/econ/getToken", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: username,
        password: password,
      }),
    });

    const result = await response.json();

    if (result.success) {
      localStorage.setItem("econtract_token", result.data.accessToken);
      return result.data.accessToken;
    } else {
      throw new Error(result.message);
    }
  } catch (error) {
    console.error("Authentication failed:", error);
    return null;
  }
};

// Sử dụng
const token = await getToken("your_username", "your_password");
if (token) {
  console.log("Authentication successful!");
}
```

### C# (.NET)

```csharp
using System.Text.Json;
using System.Text;

public class AuthRequest
{
    public string username { get; set; }
    public string password { get; set; }
}

public class AuthResponse
{
    public bool success { get; set; }
    public string message { get; set; }
    public int code { get; set; }
    public AuthData data { get; set; }
}

public class AuthData
{
    public string accessToken { get; set; }
}

// Sử dụng
var client = new HttpClient();
var request = new AuthRequest
{
    username = "your_username",
    password = "your_password"
};

var json = JsonSerializer.Serialize(request);
var content = new StringContent(json, Encoding.UTF8, "application/json");

var response = await client.PostAsync("http://domain:port/api/econ/getToken", content);
var responseJson = await response.Content.ReadAsStringAsync();
var result = JsonSerializer.Deserialize<AuthResponse>(responseJson);

if (result.success)
{
    var token = result.data.accessToken;
    // Sử dụng token cho các API khác
}
```

### PHP

```php
<?php
function getToken($username, $password) {
    $data = array(
        'username' => $username,
        'password' => $password
    );

    $options = array(
        'http' => array(
            'header'  => "Content-type: application/json\r\n",
            'method'  => 'POST',
            'content' => json_encode($data)
        )
    );

    $context = stream_context_create($options);
    $result = file_get_contents('http://domain:port/api/econ/getToken', false, $context);
    $response = json_decode($result, true);

    if ($response['success']) {
        return $response['data']['accessToken'];
    } else {
        throw new Exception($response['message']);
    }
}

// Sử dụng
try {
    $token = getToken('your_username', 'your_password');
    echo "Token: " . $token;
} catch (Exception $e) {
    echo "Error: " . $e->getMessage();
}
?>
```

## Bảo mật Token

:::warning Quan trọng

- Token có thời gian hết hạn, cần refresh định kỳ
- Không lưu token trong localStorage trên production
- Sử dụng HTTPS cho tất cả requests
- Không chia sẻ token với bên thứ ba
  :::

### Best Practices

1. **Lưu trữ an toàn**: Lưu token trong memory hoặc secure storage
2. **Kiểm tra hết hạn**: Implement logic để refresh token khi cần
3. **Xử lý lỗi**: Handle 401 errors và re-authenticate
4. **Logging**: Log authentication events để audit

---

**Tiếp theo:** Tìm hiểu [CheckUserName API](/econtract/authentication/check-user) để kiểm tra user tồn tại.
