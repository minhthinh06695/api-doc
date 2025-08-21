---
sidebar_position: 3
---

# CheckUserAuthen

## Endpoint

```
POST /api/econ/checkUserAuthen
```

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

## Request Body

```json
{
  "username": "{user}",
  "templateCode": "{template_code}"
}
```

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
  "message": "User has permission",
  "code": 200,
  "data": {
    "hasPermission": true,
    "permissions": ["CREATE", "VIEW", "EDIT"],
    "templateInfo": {
      "code": "TEMPLATE_001",
      "name": "Hợp đồng mua bán",
      "description": "Template hợp đồng mua bán hàng hóa"
    }
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

| Attribute                       | Type    | Description                       |
| ------------------------------- | ------- | --------------------------------- |
| `success`                       | boolean | Trạng thái thành công của request |
| `message`                       | string  | Thông báo kết quả                 |
| `code`                          | number  | HTTP status code                  |
| `data.hasPermission`            | boolean | Có quyền hay không                |
| `data.permissions`              | array   | Danh sách quyền cụ thể            |
| `data.templateInfo.code`        | string  | Mã template                       |
| `data.templateInfo.name`        | string  | Tên template                      |
| `data.templateInfo.description` | string  | Mô tả template                    |

## Permission Types

| Permission | Description                    |
| ---------- | ------------------------------ |
| `CREATE`   | Quyền tạo tài liệu từ template |
| `VIEW`     | Quyền xem template             |
| `EDIT`     | Quyền chỉnh sửa template       |
| `DELETE`   | Quyền xóa tài liệu             |
| `APPROVE`  | Quyền phê duyệt tài liệu       |

## Code Examples

### cURL

```bash
curl -X POST http://domain:port/api/econ/checkUserAuthen \
  -H "Content-Type: application/json" \
  -H "Authorization: your_access_token" \
  -d '{
    "username": "user123",
    "templateCode": "TEMPLATE_001"
  }'
```

### JavaScript

```javascript
const checkUserPermission = async (username, templateCode, token) => {
  try {
    const response = await fetch(
      "http://domain:port/api/econ/checkUserAuthen",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
        body: JSON.stringify({
          username: username,
          templateCode: templateCode,
        }),
      }
    );

    const result = await response.json();

    if (result.success) {
      return {
        hasPermission: result.data.hasPermission,
        permissions: result.data.permissions,
        templateInfo: result.data.templateInfo,
      };
    } else {
      // Xử lý các lỗi khác nhau
      switch (result.code) {
        case 663:
          throw new Error("User does not have permission on this template");
        case 203:
          throw new Error("Template not found");
        case 662:
          throw new Error("Username not found");
        default:
          throw new Error(result.message);
      }
    }
  } catch (error) {
    console.error("Check permission failed:", error);
    return null;
  }
};

// Sử dụng
const token = localStorage.getItem("econtract_token");
const permission = await checkUserPermission("user123", "TEMPLATE_001", token);

if (permission) {
  if (permission.hasPermission) {
    console.log("User has permissions:", permission.permissions);
    console.log("Template info:", permission.templateInfo);
  } else {
    console.log("User does not have permission");
  }
}
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
    public bool hasPermission { get; set; }
    public string[] permissions { get; set; }
    public TemplateInfo templateInfo { get; set; }
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

    var request = new CheckPermissionRequest
    {
        username = username,
        templateCode = templateCode
    };

    var json = JsonSerializer.Serialize(request);
    var content = new StringContent(json, Encoding.UTF8, "application/json");

    var response = await client.PostAsync("http://domain:port/api/econ/checkUserAuthen", content);
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

### PHP

```php
<?php
function checkUserPermission($username, $templateCode, $token) {
    $data = array(
        'username' => $username,
        'templateCode' => $templateCode
    );

    $options = array(
        'http' => array(
            'header'  => "Content-type: application/json\r\n" .
                        "Authorization: $token\r\n",
            'method'  => 'POST',
            'content' => json_encode($data)
        )
    );

    $context = stream_context_create($options);
    $result = file_get_contents('http://domain:port/api/econ/checkUserAuthen', false, $context);
    $response = json_decode($result, true);

    if ($response['success']) {
        return $response['data'];
    } else {
        throw new Exception("Error {$response['code']}: {$response['message']}");
    }
}

// Sử dụng
try {
    $token = 'your_access_token';
    $permission = checkUserPermission('user123', 'TEMPLATE_001', $token);

    if ($permission['hasPermission']) {
        echo "User has permissions: " . implode(', ', $permission['permissions']);
        echo "\nTemplate: " . $permission['templateInfo']['name'];
    } else {
        echo "User does not have permission";
    }
} catch (Exception $e) {
    echo "Error: " . $e->getMessage();
}
?>
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

### 2. Hiển thị UI dựa trên quyền

```javascript
const buildUIBasedOnPermission = async (username, templateCode, token) => {
  const permission = await checkUserPermission(username, templateCode, token);

  const ui = {
    showCreateButton: false,
    showEditButton: false,
    showDeleteButton: false,
    showApproveButton: false,
  };

  if (permission && permission.hasPermission) {
    ui.showCreateButton = permission.permissions.includes("CREATE");
    ui.showEditButton = permission.permissions.includes("EDIT");
    ui.showDeleteButton = permission.permissions.includes("DELETE");
    ui.showApproveButton = permission.permissions.includes("APPROVE");
  }

  return ui;
};
```

### 3. Batch permission check

```javascript
const checkMultipleTemplatePermissions = async (
  username,
  templateCodes,
  token
) => {
  const results = [];

  for (const templateCode of templateCodes) {
    try {
      const permission = await checkUserPermission(
        username,
        templateCode,
        token
      );
      results.push({
        templateCode,
        hasPermission: permission?.hasPermission || false,
        permissions: permission?.permissions || [],
        templateInfo: permission?.templateInfo,
      });
    } catch (error) {
      results.push({
        templateCode,
        hasPermission: false,
        error: error.message,
      });
    }
  }

  return results;
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
