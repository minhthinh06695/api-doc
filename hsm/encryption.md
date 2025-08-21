---
sidebar_position: 4
---

# Mã hóa dữ liệu

Fast HSM cung cấp APIs mã hóa và giải mã dữ liệu theo chuẩn JWE (JSON Web Encryption) với thuật toán AES.

## API Encrypt JWE

### Endpoint

```
POST /api/sign/encryptjwe
```

### Mô tả

API này dùng để mã hóa dữ liệu theo chuẩn JWE (AES). Dữ liệu sau khi mã hóa sẽ được trả về dưới dạng base64 string.

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
  "data": "{ClearText}"
}
```

#### Tham số

| Attribute       | Type   | Required | Description                     |
| --------------- | ------ | -------- | ------------------------------- |
| `certificateSN` | string | ✔️       | Serial Number của chứng thư số  |
| `data`          | string | ✔️       | Dữ liệu cần mã hóa (plain text) |

### Response

#### Thành công (200 OK)

```json
{
  "success": true,
  "message": "Successfully",
  "code": 200,
  "data": {
    "data": "Base64({EncryptedData})"
  }
}
```

#### Thất bại

```json
{
    "success": false,
    "message": "{messageError}",
    "code": {code},
    "data": null
}
```

### Response Fields

| Attribute   | Type    | Description                          |
| ----------- | ------- | ------------------------------------ |
| `success`   | boolean | Trạng thái thành công của request    |
| `message`   | string  | Thông báo kết quả                    |
| `code`      | number  | HTTP status code                     |
| `data.data` | string  | Dữ liệu đã mã hóa dạng base64 string |

---

## API Decrypt JWE

### Endpoint

```
POST /api/sign/decryptjwe
```

### Mô tả

API này dùng để giải mã dữ liệu đã được mã hóa theo chuẩn JWE (AES).

### Headers

```http
Content-Type: application/json
Authorization: {AccessToken}
```

### Request Body

```json
{
  "certificateSN": "{SN}",
  "data": "{EncryptedData}"
}
```

#### Tham số

| Attribute       | Type   | Required | Description                    |
| --------------- | ------ | -------- | ------------------------------ |
| `certificateSN` | string | ✔️       | Serial Number của chứng thư số |
| `data`          | string | ✔️       | Dữ liệu đã mã hóa              |

### Response

#### Thành công (200 OK)

```json
{
  "success": true,
  "message": "Successfully",
  "code": 200,
  "data": {
    "data": "{ClearText}"
  }
}
```

#### Thất bại

```json
{
    "success": false,
    "message": "{messageError}",
    "code": {code},
    "data": null
}
```

### Response Fields

| Attribute   | Type    | Description                       |
| ----------- | ------- | --------------------------------- |
| `success`   | boolean | Trạng thái thành công của request |
| `message`   | string  | Thông báo kết quả                 |
| `code`      | number  | HTTP status code                  |
| `data.data` | string  | Dữ liệu đã giải mã (plain text)   |

## Code Examples

### Mã hóa dữ liệu

#### cURL

```bash
# Encrypt
curl -X POST https://hsm.fast.com.vn/api/sign/encryptjwe \
  -H "Content-Type: application/json" \
  -H "Authorization: {your_token}" \
  -d '{
    "certificateSN": "1234567890ABCDEF",
    "data": "Hello World - This is secret data"
  }'
```

#### JavaScript

```javascript
const encryptData = async (certificateSN, plainText, token) => {
  try {
    const response = await fetch(
      "https://hsm.fast.com.vn/api/sign/encryptjwe",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `${token}`,
        },
        body: JSON.stringify({
          certificateSN: certificateSN,
          data: plainText,
        }),
      }
    );

    const result = await response.json();

    if (result.success) {
      console.log("Encrypted data:", result.data.data);
      return result.data.data;
    } else {
      console.error("Encryption failed:", result.message);
      return null;
    }
  } catch (error) {
    console.error("Request failed:", error);
    return null;
  }
};

// Sử dụng
const token = localStorage.getItem("hsm_token");
const encryptedData = await encryptData(
  "1234567890ABCDEF",
  "Hello World - This is secret data",
  token
);
```

#### C# (.NET)

```csharp
public class EncryptRequest
{
    public string certificateSN { get; set; }
    public string data { get; set; }
}

public class EncryptResponse
{
    public bool success { get; set; }
    public string message { get; set; }
    public int code { get; set; }
    public EncryptData data { get; set; }
}

public class EncryptData
{
    public string data { get; set; }
}

// Mã hóa
public async Task<string> EncryptDataAsync(string certificateSN, string plainText, string token)
{
    var client = new HttpClient();
    client.DefaultRequestHeaders.Add("Authorization", token);

    var request = new EncryptRequest
    {
        certificateSN = certificateSN,
        data = plainText
    };

    var json = JsonSerializer.Serialize(request);
    var content = new StringContent(json, Encoding.UTF8, "application/json");

    var response = await client.PostAsync("https://hsm.fast.com.vn/api/sign/encryptjwe", content);
    var responseJson = await response.Content.ReadAsStringAsync();
    var result = JsonSerializer.Deserialize<EncryptResponse>(responseJson);

    return result.success ? result.data.data : null;
}
```

### Giải mã dữ liệu

#### cURL

```bash
# Decrypt
curl -X POST https://hsm.fast.com.vn/api/sign/decryptjwe \
  -H "Content-Type: application/json" \
  -H "Authorization: {your_token}" \
  -d '{
    "certificateSN": "1234567890ABCDEF",
    "data": "eyJhbGciOiJSU0EtT0FFUC0yNTYi..."
  }'
```

#### JavaScript

```javascript
const decryptData = async (certificateSN, encryptedData, token) => {
  try {
    const response = await fetch(
      "https://hsm.fast.com.vn/api/sign/decryptjwe",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `${token}`,
        },
        body: JSON.stringify({
          certificateSN: certificateSN,
          data: encryptedData,
        }),
      }
    );

    const result = await response.json();

    if (result.success) {
      console.log("Decrypted data:", result.data.data);
      return result.data.data;
    } else {
      console.error("Decryption failed:", result.message);
      return null;
    }
  } catch (error) {
    console.error("Request failed:", error);
    return null;
  }
};

// Sử dụng
const decryptedData = await decryptData(
  "1234567890ABCDEF",
  encryptedData,
  token
);
```

#### C# (.NET)

```csharp
// Giải mã (sử dụng cùng class như encrypt)
public async Task<string> DecryptDataAsync(string certificateSN, string encryptedData, string token)
{
    var client = new HttpClient();
    client.DefaultRequestHeaders.Add("Authorization", token);

    var request = new EncryptRequest
    {
        certificateSN = certificateSN,
        data = encryptedData
    };

    var json = JsonSerializer.Serialize(request);
    var content = new StringContent(json, Encoding.UTF8, "application/json");

    var response = await client.PostAsync("https://hsm.fast.com.vn/api/sign/decryptjwe", content);
    var responseJson = await response.Content.ReadAsStringAsync();
    var result = JsonSerializer.Deserialize<EncryptResponse>(responseJson);

    return result.success ? result.data.data : null;
}
```

### Complete Workflow Example

```javascript
// Quy trình đầy đủ: Mã hóa -> Giải mã
const completeEncryptionWorkflow = async () => {
  const token = localStorage.getItem("hsm_token");
  const certificateSN = "1234567890ABCDEF";
  const originalData = "This is confidential information";

  try {
    // Bước 1: Mã hóa dữ liệu
    console.log("Original data:", originalData);
    const encryptedData = await encryptData(certificateSN, originalData, token);

    if (!encryptedData) {
      throw new Error("Encryption failed");
    }

    console.log("Encrypted data:", encryptedData);

    // Bước 2: Giải mã dữ liệu
    const decryptedData = await decryptData(
      certificateSN,
      encryptedData,
      token
    );

    if (!decryptedData) {
      throw new Error("Decryption failed");
    }

    console.log("Decrypted data:", decryptedData);

    // Kiểm tra tính toàn vẹn
    if (originalData === decryptedData) {
      console.log("✅ Encryption/Decryption successful!");
    } else {
      console.log("❌ Data integrity check failed!");
    }
  } catch (error) {
    console.error("Workflow failed:", error);
  }
};
```

## JWE Standard Information

### Thuật toán hỗ trợ

| Component              | Algorithm    |
| ---------------------- | ------------ |
| **Key Encryption**     | RSA-OAEP-256 |
| **Content Encryption** | AES256-GCM   |
| **Key Derivation**     | PBKDF2       |

### JWE Structure

```
eyJhbGciOiJSU0EtT0FFUC0yNTYiLCJlbmMiOiJBMjU2R0NNIn0.
[Protected Header]
.
[Encrypted Key]
.
[Initialization Vector]
.
[Ciphertext]
.
[Authentication Tag]
```

## Security Best Practices

### ✅ Nên làm

- **Validate certificate** trước khi mã hóa/giải mã
- **Use HTTPS** cho tất cả API calls
- **Handle errors** properly để tránh leaking information
- **Log operations** cho audit purposes
- **Rotate certificates** định kỳ

### ❌ Không nên làm

- **Không lưu plain text** trong logs
- **Không hardcode** certificate serial numbers
- **Không gửi encrypted data** qua HTTP
- **Không ignore** certificate expiration warnings

## Troubleshooting

### Lỗi thường gặp

| Code | Message                | Nguyên nhân                     | Giải pháp                |
| ---- | ---------------------- | ------------------------------- | ------------------------ |
| 401  | Unauthorized           | Token không hợp lệ              | Re-authenticate          |
| 400  | Invalid certificate SN | Certificate SN sai hoặc expired | Kiểm tra certificate     |
| 400  | Invalid data format    | Dữ liệu input không đúng format | Kiểm tra base64 encoding |
| 500  | Encryption failed      | Lỗi quá trình mã hóa            | Liên hệ support          |
| 500  | Decryption failed      | Dữ liệu bị corrupt hoặc key sai | Kiểm tra dữ liệu input   |

---

**Tiếp theo:** Tìm hiểu về [Ký số điện tử](/hsm/signing) để ký hash data.
