---
sidebar_position: 1
---

# GetToken

## Endpoint

> ```http
> GET /api/econ/getToken?entity={entity}&token={token}
> ```

## Mô tả

Lấy accessToken để phục vụ cho việc truy cập các API khác trong hệ thống eContract.

## Headers

```http
Content-Type: application/json
```

## Tham số

| Attribute | Type   | Required | Description               |
| --------- | ------ | -------- | ------------------------- |
| `entity`  | string | ✔️       | Mã kết nối của khách hàng |
| `token`   | string | ✔️       | token kết nối             |

:::info Lưu ý
`entity` và `token` sẽ được Fast cung cấp khi đối tác đăng ký thành công dịch vụ Fast e-Contract.
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
curl --location 'https://{domian}/api/econ/getToken?entity={entity}&token={token}
```

### JavaScript

```javascript
const getToken = async (entity, token) => {
  try {
    const response = await fetch(
      `https://{domain}/api/econ/getToken?entity=${entity}&token=${token}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

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
const accessToken = await getToken(
  "000004",
  "6fa7cb23bc8649c2b57445f822d30093"
);

if (accessToken) {
  console.log("Authentication successful!");
}
```

### C# (.NET)

```csharp
using System.Text.Json;

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

public async Task<string> GetTokenAsync(string entity, string token)
{
    var client = new HttpClient();

    var url = $"https://{{domain}}/api/econ/getToken?entity={entity}&token={token}";

    var response = await client.GetAsync(url);
    var responseJson = await response.Content.ReadAsStringAsync();
    var result = JsonSerializer.Deserialize<AuthResponse>(responseJson);

    if (result.success)
    {
        return result.data.accessToken;
    }
    else
    {
        throw new Exception(result.message);
    }
}

// Sử dụng
try
{
    var accessToken = await GetTokenAsync("000004", "6fa7cb23bc8649c2b57445f822d30093");
    // Sử dụng accessToken cho các API khác
}
catch (Exception ex)
{
    Console.WriteLine($"Error: {ex.Message}");
}
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
