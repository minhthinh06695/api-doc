---
sidebar_position: 3
---

# Quản lý chứng thư số

API này cho phép lấy thông tin chi tiết của chứng thư số thông qua Serial Number.

## API Get Certificate Info

### Endpoint

```
POST /api/certificate/getinfosn
```

### Mô tả

Lấy thông tin chi tiết của chứng thư số bao gồm thông tin người sở hữu, thời gian hiệu lực, và các thuộc tính khác.

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
  "certificateSN": "{SN}"
}
```

#### Tham số

| Attribute       | Type   | Required | Description                    |
| --------------- | ------ | -------- | ------------------------------ |
| `certificateSN` | string | ✔️       | Serial Number của chứng thư số |

### Response

#### Thành công (200 OK)

```json
{
  "success": true,
  "message": "Success",
  "code": 200,
  "data": {
    "serialNumber": "1234567890ABCDEF",
    "issuer": "CN=Fast CA, O=Fast Software Company, C=VN",
    "subject": "CN=Nguyen Van A, O=Company ABC, C=VN",
    "validFrom": "2024-01-01T00:00:00Z",
    "validTo": "2025-12-31T23:59:59Z",
    "thumbprint": "A1B2C3D4E5F6...",
    "keyUsage": ["digitalSignature", "keyEncipherment"],
    "status": "valid"
  }
}
```

#### Thất bại

```json
{
  "success": false,
  "message": "Certificate not found",
  "code": 404,
  "data": null
}
```

### Response Fields

| Attribute           | Type    | Description                                      |
| ------------------- | ------- | ------------------------------------------------ |
| `success`           | boolean | Trạng thái thành công của request                |
| `message`           | string  | Thông báo kết quả                                |
| `code`              | number  | HTTP status code                                 |
| `data.serialNumber` | string  | Serial Number của certificate                    |
| `data.issuer`       | string  | Thông tin tổ chức phát hành                      |
| `data.subject`      | string  | Thông tin chủ sở hữu certificate                 |
| `data.validFrom`    | string  | Thời gian bắt đầu hiệu lực (ISO 8601)            |
| `data.validTo`      | string  | Thời gian hết hiệu lực (ISO 8601)                |
| `data.thumbprint`   | string  | Thumbprint của certificate                       |
| `data.keyUsage`     | array   | Mục đích sử dụng của key                         |
| `data.status`       | string  | Trạng thái certificate (valid, expired, revoked) |

## Code Examples

### cURL

```bash
curl -X POST https://hsm.fast.com.vn/api/certificate/getinfosn \
  -H "Content-Type: application/json" \
  -H "Authorization: {your_token}" \
  -d '{
    "certificateSN": "1234567890ABCDEF"
  }'
```

### JavaScript (Fetch)

```javascript
const getCertificateInfo = async (serialNumber, token) => {
  try {
    const response = await fetch(
      "https://hsm.fast.com.vn/api/certificate/getinfosn",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `${token}`,
        },
        body: JSON.stringify({
          certificateSN: serialNumber,
        }),
      }
    );

    const result = await response.json();

    if (result.success) {
      console.log("Certificate Info:", result.data);
      return result.data;
    } else {
      console.error("Error:", result.message);
      return null;
    }
  } catch (error) {
    console.error("Request failed:", error);
    return null;
  }
};

// Sử dụng
const token = localStorage.getItem("hsm_token");
const certInfo = await getCertificateInfo("1234567890ABCDEF", token);
```

### C# (.NET)

```csharp
public class CertificateRequest
{
    public string certificateSN { get; set; }
}

public class CertificateResponse
{
    public bool success { get; set; }
    public string message { get; set; }
    public int code { get; set; }
    public CertificateData data { get; set; }
}

public class CertificateData
{
    public string serialNumber { get; set; }
    public string issuer { get; set; }
    public string subject { get; set; }
    public DateTime validFrom { get; set; }
    public DateTime validTo { get; set; }
    public string thumbprint { get; set; }
    public string[] keyUsage { get; set; }
    public string status { get; set; }
}

// Sử dụng
public async Task<CertificateData> GetCertificateInfoAsync(string serialNumber, string token)
{
    var client = new HttpClient();
    client.DefaultRequestHeaders.Add("Authorization", token);

    var request = new CertificateRequest { certificateSN = serialNumber };
    var json = JsonSerializer.Serialize(request);
    var content = new StringContent(json, Encoding.UTF8, "application/json");

    var response = await client.PostAsync("https://hsm.fast.com.vn/api/certificate/getinfosn", content);
    var responseJson = await response.Content.ReadAsStringAsync();
    var result = JsonSerializer.Deserialize<CertificateResponse>(responseJson);

    return result.success ? result.data : null;
}
```

### PHP

```php
<?php
function getCertificateInfo($serialNumber, $token) {
    $data = array('certificateSN' => $serialNumber);

    $options = array(
        'http' => array(
            'header'  => "Content-type: application/json\r\n" .
                        "Authorization: $token\r\n",
            'method'  => 'POST',
            'content' => json_encode($data)
        )
    );

    $context = stream_context_create($options);
    $result = file_get_contents('https://hsm.fast.com.vn/api/certificate/getinfosn', false, $context);
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
    $certInfo = getCertificateInfo('1234567890ABCDEF', $token);
    echo json_encode($certInfo, JSON_PRETTY_PRINT);
} catch (Exception $e) {
    echo "Error: " . $e->getMessage();
}
?>
```

## Trạng thái Certificate

### Status Values

| Status      | Mô tả                                | Hành động                              |
| ----------- | ------------------------------------ | -------------------------------------- |
| `valid`     | Certificate hợp lệ và có thể sử dụng | Có thể thực hiện ký số, mã hóa         |
| `expired`   | Certificate đã hết hạn               | Cần gia hạn certificate                |
| `revoked`   | Certificate đã bị thu hồi            | Không thể sử dụng, cần certificate mới |
| `suspended` | Certificate tạm thời bị đình chỉ     | Liên hệ Fast support                   |

### Key Usage Types

| Key Usage          | Mô tả          |
| ------------------ | -------------- |
| `digitalSignature` | Ký số điện tử  |
| `keyEncipherment`  | Mã hóa khóa    |
| `dataEncipherment` | Mã hóa dữ liệu |
| `nonRepudiation`   | Chống chối bỏ  |

## Validation

### Kiểm tra tính hợp lệ

```javascript
const isValidCertificate = (certInfo) => {
  if (!certInfo) return false;

  const now = new Date();
  const validFrom = new Date(certInfo.validFrom);
  const validTo = new Date(certInfo.validTo);

  return certInfo.status === "valid" && now >= validFrom && now <= validTo;
};

// Sử dụng
const certInfo = await getCertificateInfo("1234567890ABCDEF", token);
if (isValidCertificate(certInfo)) {
  console.log("Certificate is valid for use");
} else {
  console.log("Certificate cannot be used");
}
```

## Error Handling

### Lỗi thường gặp

| Code | Message                      | Nguyên nhân                 | Giải pháp          |
| ---- | ---------------------------- | --------------------------- | ------------------ |
| 401  | Unauthorized                 | Token không hợp lệ          | Re-authenticate    |
| 404  | Certificate not found        | Serial Number không tồn tại | Kiểm tra lại SN    |
| 400  | Invalid serial number format | Định dạng SN sai            | Kiểm tra format SN |
| 500  | Internal server error        | Lỗi hệ thống                | Liên hệ support    |

---

**Tiếp theo:** Tìm hiểu về [Mã hóa dữ liệu](/hsm/encryption) với chuẩn JWE.
