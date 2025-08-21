---
sidebar_position: 5
---

# Ký số điện tử

API ký số cho phép ký nhiều hash data cùng lúc (batch signing) để tối ưu hiệu suất và đảm bảo tính toàn vẹn dữ liệu.

## API Sign Hash

### Endpoint

```
POST /api/sign/signhash
```

### Mô tả

API này dùng để ký số dữ liệu. Hỗ trợ ký nhiều hash cùng lúc (batch signing) để tăng hiệu suất xử lý.

### Headers

```http
Content-Type: application/json
Authorization: {AccessToken}
```

:::info Xác thực bắt buộc
API này yêu cầu token xác thực. Vui lòng tham khảo [Xác thực và bảo mật](/hsm/authentication) để lấy token.
:::

### Request Body

```json
{
  "certificateSN": "{SN}",
  "hashArray": ["{StringHash1}", "{StringHash2}", "{StringHash3}"]
}
```

#### Tham số

| Attribute       | Type   | Required | Description                                     |
| --------------- | ------ | -------- | ----------------------------------------------- |
| `certificateSN` | string | ✔️       | Serial Number của chứng thư số                  |
| `hashArray`     | array  | ✔️       | Mảng các hash cần ký, mỗi hash là base64 string |

:::warning Lưu ý quan trọng

- Mỗi `StringHash` trong `hashArray` phải được mã hóa dưới dạng **base64 string**
- Thứ tự của signature trong response sẽ tương ứng với thứ tự của hash trong request
- Tối đa 100 hash trong một request
  :::

### Response

#### Thành công (200 OK)

```json
{
  "success": true,
  "message": "Successfully",
  "code": 200,
  "signatureArray": [
    "{StringSignature1}",
    "{StringSignature2}",
    "{StringSignature3}"
  ]
}
```

#### Thất bại

```json
{
    "success": false,
    "message": "{messageError}",
    "code": {code},
    "signatureArray": null
}
```

### Response Fields

| Attribute        | Type    | Description                                 |
| ---------------- | ------- | ------------------------------------------- |
| `success`        | boolean | Trạng thái thành công của request           |
| `message`        | string  | Thông báo kết quả                           |
| `code`           | number  | HTTP status code                            |
| `signatureArray` | array   | Mảng chứa signature tương ứng với từng hash |

## Code Examples

### cURL

```bash
curl -X POST https://hsm.fast.com.vn/api/sign/signhash \
  -H "Content-Type: application/json" \
  -H "Authorization: {your_token}" \
  -d '{
    "certificateSN": "1234567890ABCDEF",
    "hashArray": [
        "SGVsbG8gV29ybGQ=",
        "VGhpcyBpcyBhIHRlc3Q=",
        "QW5vdGhlciBoYXNoIGRhdGE="
    ]
  }'
```

### JavaScript

```javascript
// Helper function để tạo SHA-256 hash và encode base64
const createHashBase64 = async (data) => {
  const encoder = new TextEncoder();
  const dataBuffer = encoder.encode(data);
  const hashBuffer = await crypto.subtle.digest("SHA-256", dataBuffer);
  const hashArray = new Uint8Array(hashBuffer);
  return btoa(String.fromCharCode(...hashArray));
};

const signMultipleHashes = async (certificateSN, dataArray, token) => {
  try {
    // Tạo hash base64 cho mỗi data
    const hashArray = await Promise.all(
      dataArray.map((data) => createHashBase64(data))
    );

    const response = await fetch("https://hsm.fast.com.vn/api/sign/signhash", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `${token}`,
      },
      body: JSON.stringify({
        certificateSN: certificateSN,
        hashArray: hashArray,
      }),
    });

    const result = await response.json();

    if (result.success) {
      console.log("Signatures:", result.signatureArray);
      return result.signatureArray;
    } else {
      console.error("Signing failed:", result.message);
      return null;
    }
  } catch (error) {
    console.error("Request failed:", error);
    return null;
  }
};

// Sử dụng
const token = localStorage.getItem("hsm_token");
const dataToSign = [
  "Document content 1",
  "Document content 2",
  "Document content 3",
];

const signatures = await signMultipleHashes(
  "1234567890ABCDEF",
  dataToSign,
  token
);
```

### C# (.NET)

```csharp
using System.Security.Cryptography;
using System.Text;
using System.Text.Json;

public class SignRequest
{
    public string certificateSN { get; set; }
    public string[] hashArray { get; set; }
}

public class SignResponse
{
    public bool success { get; set; }
    public string message { get; set; }
    public int code { get; set; }
    public string[] signatureArray { get; set; }
}

// Helper method để tạo hash
private static string CreateSHA256HashBase64(string input)
{
    using (SHA256 sha256Hash = SHA256.Create())
    {
        byte[] data = sha256Hash.ComputeHash(Encoding.UTF8.GetBytes(input));
        return Convert.ToBase64String(data);
    }
}

// Ký nhiều hash
public async Task<string[]> SignMultipleHashesAsync(string certificateSN, string[] dataArray, string token)
{
    var client = new HttpClient();
    client.DefaultRequestHeaders.Add("Authorization", token);

    // Tạo hash base64 cho mỗi data
    var hashArray = dataArray.Select(CreateSHA256HashBase64).ToArray();

    var request = new SignRequest
    {
        certificateSN = certificateSN,
        hashArray = hashArray
    };

    var json = JsonSerializer.Serialize(request);
    var content = new StringContent(json, Encoding.UTF8, "application/json");

    var response = await client.PostAsync("https://hsm.fast.com.vn/api/sign/signhash", content);
    var responseJson = await response.Content.ReadAsStringAsync();
    var result = JsonSerializer.Deserialize<SignResponse>(responseJson);

    return result.success ? result.signatureArray : null;
}

// Sử dụng
var dataToSign = new string[]
{
    "Document content 1",
    "Document content 2",
    "Document content 3"
};

var signatures = await SignMultipleHashesAsync("1234567890ABCDEF", dataToSign, token);
```

## Error Handling

### Common Error Codes

| Code | Message                | Cause                            | Solution                 |
| ---- | ---------------------- | -------------------------------- | ------------------------ |
| 401  | Unauthorized           | Invalid token                    | Re-authenticate          |
| 400  | Invalid certificate SN | Certificate not found/expired    | Validate certificate     |
| 400  | Invalid hash format    | Hash not properly base64 encoded | Check hash encoding      |
| 400  | Too many hashes        | Batch size > 100                 | Reduce batch size        |
| 500  | Signing failed         | HSM error or certificate issue   | Retry or contact support |

### Robust Error Handling

```javascript
const handleSigningErrors = async (certificateSN, hashArray, token) => {
  try {
    const result = await signMultipleHashes(certificateSN, hashArray, token);
    return { success: true, data: result };
  } catch (error) {
    if (error.status === 401) {
      // Token expired, try to refresh
      const newToken = await refreshToken();
      return handleSigningErrors(certificateSN, hashArray, newToken);
    } else if (error.status === 400) {
      // Validation error
      return {
        success: false,
        error: "Validation failed",
        details: error.message,
      };
    } else {
      // Server error
      return {
        success: false,
        error: "Server error",
        retry: true,
      };
    }
  }
};
```

---

**🎉 Hoàn tất!** Bạn đã tìm hiểu tất cả các APIs của Fast HSM. Quay lại [Tổng quan](/hsm/) để xem toàn bộ tài liệu.
