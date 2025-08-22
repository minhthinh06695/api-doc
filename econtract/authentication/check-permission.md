---
sidebar_position: 3
---

# CheckUserAuthen

## Endpoint

> ```http
> POST /api/econ/checkUserAuthen?user={userName}&templateCode={templateCode}
> ```

## Mô tả

Kiểm tra người dùng có quyền trên mẫu tài liệu cụ thể hay không.

## Headers

```http
Content-Type: application/json
Authorization: {accessToken}
```

:::info Xác thực bắt buộc
API này yêu cầu token xác thực. Vui lòng tham khảo [GetToken API](/econtract/authentication/get-token) để lấy token.
:::

## Tham số

| Attribute      | Type   | Required | Description                    |
| -------------- | ------ | -------- | ------------------------------ |
| `username`     | string | ✔️       | Tên đăng nhập                  |
| `templateCode` | string | ✔️       | Mã template cần kiểm tra quyền |

## Response

### Có quyền (200 OK)

```json
{
  "success": true,
  "message": "Successfully",
  "code": 200,
  "data": {
    "result": "200",
    "message": "OK"
  }
}
```

### Không có quyền (663)

```json
{
  "success": false,
  "message": "User does not have permission on this template",
  "code": 663,
  "data": null
}
```

### Template không tồn tại (203)

```json
{
  "success": false,
  "message": "Template not found",
  "code": 203,
  "data": null
}
```

### User không tồn tại (662)

```json
{
  "success": false,
  "message": "Username not found",
  "code": 662,
  "data": null
}
```

## Response Fields

| Attribute      | Type    | Description                       |
| -------------- | ------- | --------------------------------- |
| `success`      | boolean | Trạng thái thành công của request |
| `message`      | string  | Thông báo kết quả                 |
| `code`         | number  | HTTP status code                  |
| `data.reult`   | boolean | 200 --> có quyền                  |
| `data.message` | string  | Mô tả                             |

## Code Examples

### cURL

```bash
curl -X POST https://domain/api/econ/checkUserAuthen?user={username}&templateCode={templateCode} \
  -H "Content-Type: application/json" \
  -H "Authorization: your_access_token" \
```

### C# (.NET)

```csharp
public class CheckPermissionRequest
{
    public string username { get; set; }
    public string templateCode { get; set; }
}

public class CheckPermissionResponse
{
    public bool success { get; set; }
    public string message { get; set; }
    public int code { get; set; }
    public CheckPermissionData data { get; set; }
}

public class CheckPermissionData
{
    public string result { get; set; }
    public string message { get; set; }
}

public class TemplateInfo
{
    public string code { get; set; }
    public string name { get; set; }
    public string description { get; set; }
}

// Sử dụng
public async Task<CheckPermissionData> CheckUserPermissionAsync(string username, string templateCode, string token)
{
    var client = new HttpClient();
    client.DefaultRequestHeaders.Add("Authorization", token);

    var json = JsonSerializer.Serialize(request);

    var response = await client.PostAsync($"https://domain/api/econ/checkUserAuthen?user={username}&templateCode={templateCode}", null);

    var responseJson = await response.Content.ReadAsStringAsync();
    var result = JsonSerializer.Deserialize<CheckPermissionResponse>(responseJson);

    if (result.success)
    {
        return result.data;
    }
    else
    {
        throw new Exception($"Error {result.code}: {result.message}");
    }
}
```

## Use Cases

### 1. Kiểm tra quyền trước khi tạo tài liệu

```javascript
const validatePermissionBeforeCreate = async (
  username,
  templateCode,
  token
) => {
  const permission = await checkUserPermission(username, templateCode, token);

  if (!permission || !permission.hasPermission) {
    throw new Error(
      "User does not have permission to create document with this template"
    );
  }

  if (!permission.permissions.includes("CREATE")) {
    throw new Error("User does not have CREATE permission on this template");
  }

  return true;
};

// Sử dụng trong create document
const createDocument = async (templateCode, data, token) => {
  // Kiểm tra quyền trước
  await validatePermissionBeforeCreate("current_user", templateCode, token);

  // Tiếp tục tạo document...
};
```

## Error Handling

| Code | Message                                   | Cause                            | Solution                     |
| ---- | ----------------------------------------- | -------------------------------- | ---------------------------- |
| 201  | Invalid parameters                        | Thiếu username hoặc templateCode | Kiểm tra tham số đầu vào     |
| 203  | Template not found                        | Template code không tồn tại      | Kiểm tra mã template         |
| 401  | Unauthorized                              | Token không hợp lệ               | Re-authenticate              |
| 662  | Username not found                        | Username không tồn tại           | Kiểm tra username            |
| 663  | User does not have permission on template | Không có quyền trên template     | Liên hệ admin để cấp quyền   |
| 665  | No permission on organization             | Không có quyền trên đơn vị       | Kiểm tra quyền organization  |
| 666  | No permission on department               | Không có quyền trên bộ phận      | Kiểm tra quyền department    |
| 500  | System error                              | Lỗi hệ thống                     | Thử lại hoặc liên hệ support |

## Security Notes

:::warning Bảo mật

- Luôn kiểm tra quyền trước khi thực hiện các thao tác quan trọng
- Không tin tưởng client-side permission check - luôn validate ở server
- Log các lần check permission để audit
- Implement caching để tăng performance nhưng cần invalidate khi có thay đổi quyền
  :::

---

**Tiếp theo:** Tìm hiểu [GetTemplate API](/econtract/template/get-template) để lấy danh sách templates có quyền truy cập.
