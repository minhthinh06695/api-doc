---
sidebar_position: 4
---

# Data Encryption

Fast HSM provides data encryption and decryption capabilities using the JWE (JSON Web Encryption) standard with AES encryption. This ensures secure data transmission and storage.

## Encrypt Data API

### Endpoint

<blockquote>
  <pre><code><b>POST</b> /api/sign/encryptjwe</code></pre>
</blockquote>

### Headers

```http
Content-Type: application/json
Authorization: Bearer {AccessToken}
```

### Request Body

```json
{
  "certificateSN": "{Serial_Number}",
  "data": "{PlainText}"
}
```

#### Parameters

| Attribute       | Type   | Required | Description                      |
| --------------- | ------ | -------- | -------------------------------- |
| `certificateSN` | string | ✔️       | Serial Number of the certificate |
| `data`          | string | ✔️       | Plain text data to encrypt       |

### Response

#### Success (200 OK)

```json
{
  "success": true,
  "message": "Successfully",
  "code": 200,
  "data": {
    "data": "{EncryptedJWE}"
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

| Attribute   | Type    | Description                  |
| ----------- | ------- | ---------------------------- |
| `success`   | boolean | Request success status       |
| `message`   | string  | Response message             |
| `code`      | number  | HTTP status code             |
| `data.data` | string  | Encrypted data in JWE format |

## Decrypt Data API

### Endpoint

<blockquote>
  <pre><code><b>POST</b> /api/sign/decryptjwe</code></pre>
</blockquote>

### Headers

```http
Content-Type: application/json
Authorization: Bearer {AccessToken}
```

### Request Body

```json
{
  "certificateSN": "{Serial_Number}",
  "data": "{EncryptedData}"
}
```

#### Parameters

| Attribute       | Type   | Required | Description                      |
| --------------- | ------ | -------- | -------------------------------- |
| `certificateSN` | string | ✔️       | Serial Number of the certificate |
| `data`          | string | ✔️       | Encrypted data to decrypt        |

### Response

#### Success (200 OK)

```json
{
  "success": true,
  "message": "Successfully",
  "code": 200,
  "data": {
    "data": "{PlainText}"
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

| Attribute   | Type    | Description                 |
| ----------- | ------- | --------------------------- |
| `success`   | boolean | Request success status      |
| `message`   | string  | Response message            |
| `code`      | number  | HTTP status code            |
| `data.data` | string  | Decrypted data (plain text) |

## Code Examples

### Encrypt Data

#### cURL

```bash
# Encrypt
curl -X POST https://hsm.fast.com.vn/api/sign/encryptjwe \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer {your_token}" \
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
          Authorization: `Bearer ${token}`,
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

// Usage
const token = localStorage.getItem("hsm_token");
const encryptedData = await encryptData(
  "1234567890ABCDEF",
  "Hello World - This is secret data",
  token
);
```

### Decrypt Data

#### cURL

```bash
# Decrypt
curl -X POST https://hsm.fast.com.vn/api/sign/decryptjwe \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer {your_token}" \
  -d '{
    "certificateSN": "1234567890ABCDEF",
    "data": "eyJhbGciOiJSU0EtT0FFUC0yNTYiLCJlbmMiOiJBMjU2R0NNIn0..."
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
          Authorization: `Bearer ${token}`,
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

// Usage
const token = localStorage.getItem("hsm_token");
const decryptedData = await decryptData(
  "1234567890ABCDEF",
  encryptedData,
  token
);
```

### Python

```python
import requests
import json

def encrypt_data(certificate_sn, plain_text, token):
    url = "https://hsm.fast.com.vn/api/sign/encryptjwe"
    headers = {
        "Content-Type": "application/json",
        "Authorization": f"Bearer {token}"
    }
    payload = {
        "certificateSN": certificate_sn,
        "data": plain_text
    }

    try:
        response = requests.post(url, json=payload, headers=headers)
        result = response.json()

        if result.get("success"):
            encrypted_data = result["data"]["data"]
            print("Data encrypted successfully")
            return encrypted_data
        else:
            print(f"Encryption failed: {result.get('message')}")
            return None
    except Exception as e:
        print(f"Request failed: {e}")
        return None

def decrypt_data(certificate_sn, encrypted_data, token):
    url = "https://hsm.fast.com.vn/api/sign/decryptjwe"
    headers = {
        "Content-Type": "application/json",
        "Authorization": f"Bearer {token}"
    }
    payload = {
        "certificateSN": certificate_sn,
        "data": encrypted_data
    }

    try:
        response = requests.post(url, json=payload, headers=headers)
        result = response.json()

        if result.get("success"):
            plain_text = result["data"]["data"]
            print("Data decrypted successfully")
            return plain_text
        else:
            print(f"Decryption failed: {result.get('message')}")
            return None
    except Exception as e:
        print(f"Request failed: {e}")
        return None

# Usage
token = "your_access_token"
original_data = "Hello World - This is secret data"

# Encrypt
encrypted = encrypt_data("1234567890ABCDEF", original_data, token)
if encrypted:
    # Decrypt
    decrypted = decrypt_data("1234567890ABCDEF", encrypted, token)
    if decrypted == original_data:
        print("✅ Encryption/Decryption successful!")
    else:
        print("❌ Data integrity check failed!")
```

### C#

```csharp
using System;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;
using Newtonsoft.Json;

public class HsmEncryption
{
    private static readonly HttpClient httpClient = new HttpClient();

    public class EncryptionRequest
    {
        public string certificateSN { get; set; }
        public string data { get; set; }
    }

    public class EncryptionResponse
    {
        public bool success { get; set; }
        public string message { get; set; }
        public int code { get; set; }
        public EncryptionData data { get; set; }
    }

    public class EncryptionData
    {
        public string data { get; set; }
    }

    public static async Task<string> EncryptDataAsync(string certificateSN, string plainText, string token)
    {
        try
        {
            var request = new EncryptionRequest
            {
                certificateSN = certificateSN,
                data = plainText
            };

            var json = JsonConvert.SerializeObject(request);
            var content = new StringContent(json, Encoding.UTF8, "application/json");

            httpClient.DefaultRequestHeaders.Clear();
            httpClient.DefaultRequestHeaders.Add("Authorization", $"Bearer {token}");

            var response = await httpClient.PostAsync(
                "https://hsm.fast.com.vn/api/sign/encryptjwe",
                content
            );

            var responseBody = await response.Content.ReadAsStringAsync();
            var result = JsonConvert.DeserializeObject<EncryptionResponse>(responseBody);

            if (result.success)
            {
                Console.WriteLine("Data encrypted successfully");
                return result.data.data;
            }
            else
            {
                Console.WriteLine($"Encryption failed: {result.message}");
                return null;
            }
        }
        catch (Exception ex)
        {
            Console.WriteLine($"Request failed: {ex.Message}");
            return null;
        }
    }

    public static async Task<string> DecryptDataAsync(string certificateSN, string encryptedData, string token)
    {
        try
        {
            var request = new EncryptionRequest
            {
                certificateSN = certificateSN,
                data = encryptedData
            };

            var json = JsonConvert.SerializeObject(request);
            var content = new StringContent(json, Encoding.UTF8, "application/json");

            httpClient.DefaultRequestHeaders.Clear();
            httpClient.DefaultRequestHeaders.Add("Authorization", $"Bearer {token}");

            var response = await httpClient.PostAsync(
                "https://hsm.fast.com.vn/api/sign/decryptjwe",
                content
            );

            var responseBody = await response.Content.ReadAsStringAsync();
            var result = JsonConvert.DeserializeObject<EncryptionResponse>(responseBody);

            if (result.success)
            {
                Console.WriteLine("Data decrypted successfully");
                return result.data.data;
            }
            else
            {
                Console.WriteLine($"Decryption failed: {result.message}");
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
var originalData = "Hello World - This is secret data";

// Encrypt
var encryptedData = await HsmEncryption.EncryptDataAsync("1234567890ABCDEF", originalData, token);
if (!string.IsNullOrEmpty(encryptedData))
{
    // Decrypt
    var decryptedData = await HsmEncryption.DecryptDataAsync("1234567890ABCDEF", encryptedData, token);
    if (originalData == decryptedData)
    {
        Console.WriteLine("✅ Encryption/Decryption successful!");
    }
    else
    {
        Console.WriteLine("❌ Data integrity check failed!");
    }
}
```

### Complete Workflow Example

```javascript
// Complete workflow: Encrypt -> Decrypt
const completeEncryptionWorkflow = async () => {
  const token = localStorage.getItem("hsm_token");
  const certificateSN = "1234567890ABCDEF";
  const originalData = "This is confidential information";

  try {
    // Step 1: Encrypt data
    console.log("Original data:", originalData);
    const encryptedData = await encryptData(certificateSN, originalData, token);

    if (!encryptedData) {
      throw new Error("Encryption failed");
    }

    console.log("Encrypted data:", encryptedData);

    // Step 2: Decrypt data
    const decryptedData = await decryptData(
      certificateSN,
      encryptedData,
      token
    );

    if (!decryptedData) {
      throw new Error("Decryption failed");
    }

    console.log("Decrypted data:", decryptedData);

    // Verify data integrity
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

### Supported Algorithms

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

### ✅ Do's

- **Validate certificate** before encryption/decryption
- **Use HTTPS** for all API calls
- **Handle errors** properly to avoid information leakage
- **Log operations** for audit purposes
- **Rotate certificates** periodically

### ❌ Don'ts

- **Don't store plain text** in logs
- **Don't hardcode** certificate serial numbers
- **Don't send encrypted data** over HTTP
- **Don't ignore** certificate expiration warnings

## Troubleshooting

### Common Errors

| Code | Message                | Cause                           | Solution              |
| ---- | ---------------------- | ------------------------------- | --------------------- |
| 401  | Unauthorized           | Invalid token                   | Re-authenticate       |
| 400  | Invalid certificate SN | Wrong SN or expired certificate | Check certificate     |
| 400  | Invalid data format    | Wrong input data format         | Check base64 encoding |
| 500  | Encryption failed      | Encryption process error        | Contact support       |
| 500  | Decryption failed      | Data corrupted or wrong key     | Check input data      |

---

**Next:** Learn about [Digital Signature](/hsm/signing) to sign hash data.
