---
sidebar_position: 2
---

# CheckUserName

## Endpoint

> ```http
> POST /api/econ/checkUserName?user={user}
> ```

## Mô tả

Kiểm tra tên đăng nhập có tồn tại trong hệ thống eContract hay không.

## Headers

```http
Content-Type: application/json
Authorization: {accessToken}
```

:::info Xác thực bắt buộc
API này yêu cầu token xác thực. Vui lòng tham khảo [GetToken API](/econtract/authentication/get-token) để lấy accessToken.
:::

## Tham số

| Attribute | Type   | Required | Description                |
| --------- | ------ | -------- | -------------------------- |
| `user`    | string | ✔️       | Tên đăng nhập cần kiểm tra |

## Response

### Thành công - User tồn tại (200 OK)

```json
{
  "success": true,
  "message": "Successfully",
  "code": 200,
  "data": {
    "result": 1
  }
}
```

### Thành công - User không tồn tại (204 No Content)

```json
{
  "success": true,
  "message": "Successfully",
  "code": 200,
  "data": {
    "result": 0
  }
}
```

### Thất bại

```json
{
  "success": false,
  "message": "Invalid parameters",
  "code": 201,
  "data": null
}
```

## Response Fields

| Attribute     | Type    | Description                       |
| ------------- | ------- | --------------------------------- |
| `success`     | boolean | Trạng thái thành công của request |
| `message`     | string  | Thông báo kết quả                 |
| `code`        | number  | HTTP status code                  |
| `data.result` | boolean | User có tồn tại hay không         |

## Code Examples

### cURL

```bash
curl -X POST https://domain/api/econ/checkUserName?user={user} \
  -H "Content-Type: application/json" \
  -H "Authorization: your_access_token" \
  -d '{
    "username": "user123"
  }'
```

### C# (.NET)

```csharp
public class CheckUserRequest
{
    public string username { get; set; }
}

public class CheckUserResponse
{
    public bool success { get; set; }
    public string message { get; set; }
    public int code { get; set; }
    public CheckUserData data { get; set; }
}

public class CheckUserData
{
    public bool result { get; set; }
}

// Sử dụng
public async Task<CheckUserData> CheckUserExistsAsync(string username, string token)
{
    var client = new HttpClient();
    client.DefaultRequestHeaders.Add("Authorization", token);
    var content = new StringContent(null, Encoding.UTF8, "application/json");

    var response = await client.PostAsync($"https://domain/api/econ/checkUserName?user={username}", content);
    var responseJson = await response.Content.ReadAsStringAsync();
    var result = JsonSerializer.Deserialize<CheckUserResponse>(responseJson);

    return result.success ? result.data : null;
}
```

## Error Handling

| Code | Message            | Cause                    | Solution                     |
| ---- | ------------------ | ------------------------ | ---------------------------- |
| 201  | Invalid parameters | Username thiếu hoặc rỗng | Kiểm tra tham số đầu vào     |
| 401  | Unauthorized       | Token không hợp lệ       | Re-authenticate              |
| 500  | System error       | Lỗi hệ thống             | Thử lại hoặc liên hệ support |

---

**Tiếp theo:** Tìm hiểu [CheckUserAuthen API](/econtract/authentication/check-permission) để kiểm tra quyền trên template.
