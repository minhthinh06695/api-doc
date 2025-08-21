---
sidebar_position: 2
---

# Xác thực và bảo mật

Trước khi thực hiện các API liên quan đến ký số và mã hóa, bạn cần gọi API xác thực để lấy token truy cập.

## API Get Token

### Endpoint

```
POST /api/account/gettoken
```

### Mô tả

API này dùng để xác thực người dùng và nhận token truy cập. Token này sẽ được sử dụng cho tất cả các API khác trong hệ thống HSM.

### Headers

```http
Content-Type: application/json
```

### Request Body

```json
{
  "username": "{user}",
  "password": "{password}"
}
```

#### Tham số

| Attribute  | Type   | Required | Description                                 |
| ---------- | ------ | -------- | ------------------------------------------- |
| `username` | string | ✔️       | Tên đăng nhập được cấp khi đăng ký Fast HSM |
| `password` | string | ✔️       | Mật khẩu được cấp khi đăng ký Fast HSM      |

:::info Lưu ý
`username` và `password` sẽ được Fast cung cấp khi đối tác đăng ký thành công chứng thư số trên hệ thống Fast HSM.
:::

### Response

#### Thành công (200 OK)

```json
{
  "success": true,
  "message": "Success",
  "code": 200,
  "data": {
    "token": "{AccessToken}"
  }
}
```

#### Thất bại (401 Unauthorized)

```json
{
  "success": false,
  "message": "Invalid username or password",
  "code": 401,
  "data": null
}
```

### Response Fields

| Attribute    | Type    | Description                             |
| ------------ | ------- | --------------------------------------- |
| `success`    | boolean | Trạng thái thành công của request       |
| `message`    | string  | Thông báo kết quả                       |
| `code`       | number  | HTTP status code                        |
| `data.token` | string  | AccessToken để sử dụng cho các API khác |

## Sử dụng Token

Token nhận được cần được truyền vào **Header Authorization** cho tất cả các API HSM khác:

```http
Authorization: {AccessToken}
```

### Ví dụ

```http
Authorization: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

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

### JavaScript (Fetch)

```javascript
const response = await fetch("https://hsm.fast.com.vn/api/account/gettoken", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    username: "your_username",
    password: "your_password",
  }),
});

const result = await response.json();
if (result.success) {
  const token = result.data.token;
  // Lưu token để sử dụng cho các API khác
  localStorage.setItem("hsm_token", token);
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
    public string token { get; set; }
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

var response = await client.PostAsync("https://hsm.fast.com.vn/api/account/gettoken", content);
var responseJson = await response.Content.ReadAsStringAsync();
var result = JsonSerializer.Deserialize<AuthResponse>(responseJson);

if (result.success)
{
    var token = result.data.token;
    // Sử dụng token cho các API khác
}
```

### PHP

```php
<?php
$data = array(
    'username' => 'your_username',
    'password' => 'your_password'
);

$options = array(
    'http' => array(
        'header'  => "Content-type: application/json\r\n",
        'method'  => 'POST',
        'content' => json_encode($data)
    )
);

$context = stream_context_create($options);
$result = file_get_contents('https://hsm.fast.com.vn/api/account/gettoken', false, $context);
$response = json_decode($result, true);

if ($response['success']) {
    $token = $response['data']['token'];
    // Sử dụng token cho các API khác
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

## Troubleshooting

### Lỗi thường gặp

| Lỗi                | Nguyên nhân           | Giải pháp                        |
| ------------------ | --------------------- | -------------------------------- |
| 401 Unauthorized   | Username/password sai | Kiểm tra thông tin đăng nhập     |
| 403 Forbidden      | Tài khoản bị khóa     | Liên hệ Fast support             |
| 500 Internal Error | Lỗi server            | Thử lại sau hoặc liên hệ support |

---

**Tiếp theo:** Tìm hiểu về [Quản lý chứng thư số](/hsm/certificate) để lấy thông tin certificate.
