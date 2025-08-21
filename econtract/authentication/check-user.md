---
sidebar_position: 2
---

# CheckUserName

## Endpoint

```
POST /api/econ/checkUserName
```

## Mô tả

Kiểm tra tên đăng nhập có tồn tại trong hệ thống eContract hay không.

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
  "username": "{user}"
}
```

## Tham số

| Attribute  | Type   | Required | Description                |
| ---------- | ------ | -------- | -------------------------- |
| `username` | string | ✔️       | Tên đăng nhập cần kiểm tra |

## Response

### Thành công - User tồn tại (200 OK)

```json
{
  "success": true,
  "message": "User exists",
  "code": 200,
  "data": {
    "exists": true,
    "username": "user123",
    "fullName": "Nguyễn Văn A",
    "email": "user@example.com"
  }
}
```

### Thành công - User không tồn tại (204 No Content)

```json
{
  "success": true,
  "message": "User not found",
  "code": 204,
  "data": {
    "exists": false
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

| Attribute       | Type    | Description                       |
| --------------- | ------- | --------------------------------- |
| `success`       | boolean | Trạng thái thành công của request |
| `message`       | string  | Thông báo kết quả                 |
| `code`          | number  | HTTP status code                  |
| `data.exists`   | boolean | User có tồn tại hay không         |
| `data.username` | string  | Tên đăng nhập (nếu tồn tại)       |
| `data.fullName` | string  | Họ tên đầy đủ (nếu tồn tại)       |
| `data.email`    | string  | Email (nếu tồn tại)               |

## Code Examples

### cURL

```bash
curl -X POST http://domain:port/api/econ/checkUserName \
  -H "Content-Type: application/json" \
  -H "Authorization: your_access_token" \
  -d '{
    "username": "user123"
  }'
```

### JavaScript

```javascript
const checkUserExists = async (username, token) => {
  try {
    const response = await fetch("http://domain:port/api/econ/checkUserName", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
      body: JSON.stringify({
        username: username,
      }),
    });

    const result = await response.json();

    if (result.success) {
      return {
        exists: result.data.exists,
        userInfo: result.data.exists
          ? {
              username: result.data.username,
              fullName: result.data.fullName,
              email: result.data.email,
            }
          : null,
      };
    } else {
      throw new Error(result.message);
    }
  } catch (error) {
    console.error("Check user failed:", error);
    return null;
  }
};

// Sử dụng
const token = localStorage.getItem("econtract_token");
const userCheck = await checkUserExists("user123", token);

if (userCheck) {
  if (userCheck.exists) {
    console.log("User found:", userCheck.userInfo);
  } else {
    console.log("User not found");
  }
}
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
    public bool exists { get; set; }
    public string username { get; set; }
    public string fullName { get; set; }
    public string email { get; set; }
}

// Sử dụng
public async Task<CheckUserData> CheckUserExistsAsync(string username, string token)
{
    var client = new HttpClient();
    client.DefaultRequestHeaders.Add("Authorization", token);

    var request = new CheckUserRequest { username = username };
    var json = JsonSerializer.Serialize(request);
    var content = new StringContent(json, Encoding.UTF8, "application/json");

    var response = await client.PostAsync("http://domain:port/api/econ/checkUserName", content);
    var responseJson = await response.Content.ReadAsStringAsync();
    var result = JsonSerializer.Deserialize<CheckUserResponse>(responseJson);

    return result.success ? result.data : null;
}
```

### PHP

```php
<?php
function checkUserExists($username, $token) {
    $data = array('username' => $username);

    $options = array(
        'http' => array(
            'header'  => "Content-type: application/json\r\n" .
                        "Authorization: $token\r\n",
            'method'  => 'POST',
            'content' => json_encode($data)
        )
    );

    $context = stream_context_create($options);
    $result = file_get_contents('http://domain:port/api/econ/checkUserName', false, $context);
    $response = json_decode($result, true);

    if ($response['success']) {
        return $response['data'];
    } else {
        throw new Exception($response['message']);
    }
}

// Sử dụng
try {
    $token = 'your_access_token';
    $userInfo = checkUserExists('user123', $token);

    if ($userInfo['exists']) {
        echo "User found: " . $userInfo['fullName'];
    } else {
        echo "User not found";
    }
} catch (Exception $e) {
    echo "Error: " . $e->getMessage();
}
?>
```

## Use Cases

### 1. Validation trước khi tạo tài liệu

```javascript
const validateSignersBeforeCreate = async (signers, token) => {
  const validationResults = [];

  for (const signer of signers) {
    const username = signer.email.split("@")[0]; // Hoặc logic khác để lấy username
    const userCheck = await checkUserExists(username, token);

    validationResults.push({
      email: signer.email,
      username: username,
      exists: userCheck?.exists || false,
      userInfo: userCheck?.userInfo,
    });
  }

  return validationResults;
};
```

### 2. Auto-complete username

```javascript
const searchUsers = async (query, token) => {
  // Gọi API cho nhiều username candidates
  const candidates = generateUsernameCandidates(query);
  const results = [];

  for (const candidate of candidates) {
    const userCheck = await checkUserExists(candidate, token);
    if (userCheck?.exists) {
      results.push(userCheck.userInfo);
    }
  }

  return results;
};
```

## Error Handling

| Code | Message            | Cause                    | Solution                     |
| ---- | ------------------ | ------------------------ | ---------------------------- |
| 201  | Invalid parameters | Username thiếu hoặc rỗng | Kiểm tra tham số đầu vào     |
| 401  | Unauthorized       | Token không hợp lệ       | Re-authenticate              |
| 500  | System error       | Lỗi hệ thống             | Thử lại hoặc liên hệ support |

---

**Tiếp theo:** Tìm hiểu [CheckUserAuthen API](/econtract/authentication/check-permission) để kiểm tra quyền trên template.
