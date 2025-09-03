---
sidebar_position: 3
---

# Certificate Management

The Certificate Management API allows you to retrieve information about digital certificates stored in the HSM. This information is essential before performing signing or encryption operations.

## Get Certificate Information API

### Endpoint

<blockquote>
  <pre><code><b>POST</b> /api/certificate/getinfosn</code></pre>
</blockquote>

### Headers

```http
Content-Type: application/json
Authorization: Bearer {AccessToken}
```

### Request Body

```json
{
  "certificateSN": "{Serial_Number}"
}
```

#### Parameters

| Attribute       | Type   | Required | Description                      |
| --------------- | ------ | -------- | -------------------------------- |
| `certificateSN` | string | ✔️       | Serial Number of the certificate |

### Response

#### Success (200 OK)

```json
{
  "success": true,
  "message": "Successfully",
  "code": 200,
  "data": {
    "serialNumber": "1234567890ABCDEF",
    "subject": "CN=John Doe, O=Example Corp, C=US",
    "issuer": "CN=Fast CA, O=Fast Corporation, C=VN",
    "validFrom": "2024-01-01T00:00:00Z",
    "validTo": "2025-12-31T23:59:59Z",
    "status": "valid",
    "keyUsage": ["digitalSignature", "keyEncipherment"],
    "algorithm": "RSA-2048",
    "thumbprint": "A1B2C3D4E5F6789..."
  }
}
```

#### Failure

```json
{
  "success": false,
  "message": "{Error_Message}",
  "code": {Error_Code},
  "data": null
}
```

### Response Fields

| Attribute           | Type    | Description                 |
| ------------------- | ------- | --------------------------- |
| `success`           | boolean | Request success status      |
| `message`           | string  | Response message            |
| `code`              | number  | HTTP status code            |
| `data.serialNumber` | string  | Certificate serial number   |
| `data.subject`      | string  | Certificate subject         |
| `data.issuer`       | string  | Certificate issuer          |
| `data.validFrom`    | string  | Certificate valid from date |
| `data.validTo`      | string  | Certificate valid to date   |
| `data.status`       | string  | Certificate status          |
| `data.keyUsage`     | array   | Allowed key usage types     |
| `data.algorithm`    | string  | Cryptographic algorithm     |
| `data.thumbprint`   | string  | Certificate thumbprint      |

## Code Examples

### cURL

```bash
curl -X POST https://hsm.fast.com.vn/api/certificate/getinfosn \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer {your_token}" \
  -d '{
    "certificateSN": "1234567890ABCDEF"
  }'
```

### JavaScript

```javascript
const getCertificateInfo = async (certificateSN, token) => {
  try {
    const response = await fetch(
      "https://hsm.fast.com.vn/api/certificate/getinfosn",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          certificateSN: certificateSN,
        }),
      }
    );

    const result = await response.json();

    if (result.success) {
      console.log("Certificate information:", result.data);
      return result.data;
    } else {
      console.error("Failed to get certificate info:", result.message);
      return null;
    }
  } catch (error) {
    console.error("Request failed:", error);
    return null;
  }
};

// Usage
const token = localStorage.getItem("hsm_token");
const certInfo = await getCertificateInfo("1234567890ABCDEF", token);
if (certInfo) {
  console.log("Certificate status:", certInfo.status);
  console.log("Valid until:", certInfo.validTo);
}
```

### Python

```python
import requests
import json
from datetime import datetime

def get_certificate_info(certificate_sn, token):
    url = "https://hsm.fast.com.vn/api/certificate/getinfosn"
    headers = {
        "Content-Type": "application/json",
        "Authorization": f"Bearer {token}"
    }
    payload = {
        "certificateSN": certificate_sn
    }

    try:
        response = requests.post(url, json=payload, headers=headers)
        result = response.json()

        if result.get("success"):
            cert_data = result["data"]
            print(f"Certificate Status: {cert_data['status']}")
            print(f"Valid Until: {cert_data['validTo']}")
            return cert_data
        else:
            print(f"Failed to get certificate info: {result.get('message')}")
            return None
    except Exception as e:
        print(f"Request failed: {e}")
        return None

# Usage
token = "your_access_token"
cert_info = get_certificate_info("1234567890ABCDEF", token)
if cert_info:
    print("Certificate information retrieved successfully")
```

### C#

```csharp
using System;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;
using Newtonsoft.Json;

public class CertificateManager
{
    private static readonly HttpClient httpClient = new HttpClient();

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
        public string subject { get; set; }
        public string issuer { get; set; }
        public DateTime validFrom { get; set; }
        public DateTime validTo { get; set; }
        public string status { get; set; }
        public string[] keyUsage { get; set; }
        public string algorithm { get; set; }
        public string thumbprint { get; set; }
    }

    public static async Task<CertificateData> GetCertificateInfoAsync(string certificateSN, string token)
    {
        try
        {
            var request = new CertificateRequest
            {
                certificateSN = certificateSN
            };

            var json = JsonConvert.SerializeObject(request);
            var content = new StringContent(json, Encoding.UTF8, "application/json");

            httpClient.DefaultRequestHeaders.Clear();
            httpClient.DefaultRequestHeaders.Add("Authorization", $"Bearer {token}");

            var response = await httpClient.PostAsync(
                "https://hsm.fast.com.vn/api/certificate/getinfosn",
                content
            );

            var responseBody = await response.Content.ReadAsStringAsync();
            var result = JsonConvert.DeserializeObject<CertificateResponse>(responseBody);

            if (result.success)
            {
                Console.WriteLine($"Certificate Status: {result.data.status}");
                Console.WriteLine($"Valid Until: {result.data.validTo}");
                return result.data;
            }
            else
            {
                Console.WriteLine($"Failed to get certificate info: {result.message}");
                return null;
            }
        }
        catch (Exception ex)
        {
            Console.WriteLine($"Request failed: {ex.Message}");
            return null;
        }
    }
}

// Usage
var token = "your_access_token";
var certInfo = await CertificateManager.GetCertificateInfoAsync("1234567890ABCDEF", token);
if (certInfo != null)
{
    Console.WriteLine("Certificate information retrieved successfully");
}
```

### PHP

```php
<?php
function getCertificateInfo($certificateSN, $token) {
    $url = "https://hsm.fast.com.vn/api/certificate/getinfosn";

    $data = array(
        'certificateSN' => $certificateSN
    );

    $options = array(
        'http' => array(
            'header' => "Content-Type: application/json\r\n" .
                       "Authorization: Bearer " . $token . "\r\n",
            'method' => 'POST',
            'content' => json_encode($data)
        )
    );

    try {
        $context = stream_context_create($options);
        $result = file_get_contents($url, false, $context);
        $response = json_decode($result, true);

        if ($response['success']) {
            echo "Certificate Status: " . $response['data']['status'] . "\n";
            echo "Valid Until: " . $response['data']['validTo'] . "\n";
            return $response['data'];
        } else {
            echo "Failed to get certificate info: " . $response['message'] . "\n";
            return null;
        }
    } catch (Exception $e) {
        echo "Request failed: " . $e->getMessage() . "\n";
        return null;
    }
}

// Usage
$token = "your_access_token";
$certInfo = getCertificateInfo("1234567890ABCDEF", $token);
if ($certInfo) {
    echo "Certificate information retrieved successfully\n";
}
?>
```

## Certificate Status

### Status Values

| Status      | Description                          | Action                           |
| ----------- | ------------------------------------ | -------------------------------- |
| `valid`     | Certificate is valid and can be used | Can perform signing, encryption  |
| `expired`   | Certificate has expired              | Need to renew certificate        |
| `revoked`   | Certificate has been revoked         | Cannot use, need new certificate |
| `suspended` | Certificate is temporarily suspended | Contact Fast support             |

### Key Usage Types

| Key Usage          | Description       |
| ------------------ | ----------------- |
| `digitalSignature` | Digital signature |
| `keyEncipherment`  | Key encryption    |
| `dataEncipherment` | Data encryption   |
| `nonRepudiation`   | Non-repudiation   |

## Validation

### Check Certificate Validity

```javascript
const isValidCertificate = (certInfo) => {
  if (!certInfo) return false;

  const now = new Date();
  const validFrom = new Date(certInfo.validFrom);
  const validTo = new Date(certInfo.validTo);

  return certInfo.status === "valid" && now >= validFrom && now <= validTo;
};

// Usage
const certInfo = await getCertificateInfo("1234567890ABCDEF", token);
if (isValidCertificate(certInfo)) {
  console.log("Certificate is valid for use");
} else {
  console.log("Certificate cannot be used");
}
```

## Error Handling

### Common Errors

| Code | Message                      | Cause                       | Solution        |
| ---- | ---------------------------- | --------------------------- | --------------- |
| 401  | Unauthorized                 | Invalid token               | Re-authenticate |
| 404  | Certificate not found        | Serial Number doesn't exist | Check SN        |
| 400  | Invalid serial number format | Invalid SN format           | Check SN format |
| 500  | Internal server error        | System error                | Contact support |

---

**Next:** Learn about [Data Encryption](/hsm/encryption) with JWE standard.
