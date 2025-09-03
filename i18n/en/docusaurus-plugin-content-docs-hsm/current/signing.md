---
sidebar_position: 5
---

# Digital Signature

Fast HSM provides digital signature capabilities for signing hash data using certificates stored in the HSM. This API supports batch processing for signing multiple hashes simultaneously.

## Sign Hash API

### Endpoint

<blockquote>
  <pre><code><b>POST</b> /api/sign/signhash</code></pre>
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
  "hashArray": ["{Base64_Hash_1}", "{Base64_Hash_2}", "{Base64_Hash_3}"]
}
```

#### Parameters

| Attribute       | Type     | Required | Description                         |
| --------------- | -------- | -------- | ----------------------------------- |
| `certificateSN` | string   | ✔️       | Serial Number of the certificate    |
| `hashArray`     | string[] | ✔️       | Array of base64-encoded hash values |

### Response

#### Success (200 OK)

```json
{
  "success": true,
  "message": "Successfully",
  "code": 200,
  "signatureArray": [
    "{Base64_Signature_1}",
    "{Base64_Signature_2}",
    "{Base64_Signature_3}"
  ]
}
```

#### Failure

```json
{
  "success": false,
  "message": "{Error_Message}",
  "code": {Error_Code},
  "signatureArray": null
}
```

### Response Fields

| Attribute        | Type     | Description                        |
| ---------------- | -------- | ---------------------------------- |
| `success`        | boolean  | Request success status             |
| `message`        | string   | Response message                   |
| `code`           | number   | HTTP status code                   |
| `signatureArray` | string[] | Array of base64-encoded signatures |

## Code Examples

### Basic Signing

#### cURL

```bash
curl -X POST https://hsm.fast.com.vn/api/sign/signhash \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer {your_token}" \
  -d '{
    "certificateSN": "1234567890ABCDEF",
    "hashArray": [
        "SGVsbG8gV29ybGQ=",
        "VGhpcyBpcyBhIHRlc3Q=",
        "QW5vdGhlciBoYXNoIGRhdGE="
    ]
  }'
```

#### JavaScript

```javascript
// Helper function to create SHA-256 hash and encode to base64
const createHashBase64 = async (data) => {
  const encoder = new TextEncoder();
  const dataBuffer = encoder.encode(data);
  const hashBuffer = await crypto.subtle.digest("SHA-256", dataBuffer);
  const hashArray = new Uint8Array(hashBuffer);
  return btoa(String.fromCharCode(...hashArray));
};

const signMultipleHashes = async (certificateSN, dataArray, token) => {
  try {
    // Create base64 hash for each data
    const hashArray = await Promise.all(
      dataArray.map((data) => createHashBase64(data))
    );

    const response = await fetch("https://hsm.fast.com.vn/api/sign/signhash", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
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

// Usage
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
if (signatures) {
  console.log(`Successfully signed ${signatures.length} documents`);
}
```

### Python

```python
import requests
import json
import hashlib
import base64

def create_hash_base64(data):
    """Create SHA-256 hash and encode to base64"""
    sha256_hash = hashlib.sha256(data.encode()).digest()
    return base64.b64encode(sha256_hash).decode()

def sign_multiple_hashes(certificate_sn, data_array, token):
    url = "https://hsm.fast.com.vn/api/sign/signhash"
    headers = {
        "Content-Type": "application/json",
        "Authorization": f"Bearer {token}"
    }

    # Create hash array
    hash_array = [create_hash_base64(data) for data in data_array]

    payload = {
        "certificateSN": certificate_sn,
        "hashArray": hash_array
    }

    try:
        response = requests.post(url, json=payload, headers=headers)
        result = response.json()

        if result.get("success"):
            signatures = result["signatureArray"]
            print(f"Successfully signed {len(signatures)} documents")
            return signatures
        else:
            print(f"Signing failed: {result.get('message')}")
            return None
    except Exception as e:
        print(f"Request failed: {e}")
        return None

# Usage
token = "your_access_token"
data_to_sign = [
    "Document content 1",
    "Document content 2",
    "Document content 3"
]

signatures = sign_multiple_hashes("1234567890ABCDEF", data_to_sign, token)
if signatures:
    print("All documents signed successfully")
```

### C#

```csharp
using System;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;
using System.Security.Cryptography;
using Newtonsoft.Json;
using System.Linq;

public class HsmSigning
{
    private static readonly HttpClient httpClient = new HttpClient();

    public class SigningRequest
    {
        public string certificateSN { get; set; }
        public string[] hashArray { get; set; }
    }

    public class SigningResponse
    {
        public bool success { get; set; }
        public string message { get; set; }
        public int code { get; set; }
        public string[] signatureArray { get; set; }
    }

    private static string CreateHashBase64(string data)
    {
        using (var sha256 = SHA256.Create())
        {
            var hashBytes = sha256.ComputeHash(Encoding.UTF8.GetBytes(data));
            return Convert.ToBase64String(hashBytes);
        }
    }

    public static async Task<string[]> SignMultipleHashesAsync(string certificateSN, string[] dataArray, string token)
    {
        try
        {
            // Create hash array
            var hashArray = dataArray.Select(CreateHashBase64).ToArray();

            var request = new SigningRequest
            {
                certificateSN = certificateSN,
                hashArray = hashArray
            };

            var json = JsonConvert.SerializeObject(request);
            var content = new StringContent(json, Encoding.UTF8, "application/json");

            httpClient.DefaultRequestHeaders.Clear();
            httpClient.DefaultRequestHeaders.Add("Authorization", $"Bearer {token}");

            var response = await httpClient.PostAsync(
                "https://hsm.fast.com.vn/api/sign/signhash",
                content
            );

            var responseBody = await response.Content.ReadAsStringAsync();
            var result = JsonConvert.DeserializeObject<SigningResponse>(responseBody);

            if (result.success)
            {
                Console.WriteLine($"Successfully signed {result.signatureArray.Length} documents");
                return result.signatureArray;
            }
            else
            {
                Console.WriteLine($"Signing failed: {result.message}");
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
var dataToSign = new string[]
{
    "Document content 1",
    "Document content 2",
    "Document content 3"
};

var signatures = await HsmSigning.SignMultipleHashesAsync("1234567890ABCDEF", dataToSign, token);
if (signatures != null)
{
    Console.WriteLine("All documents signed successfully");
}
```

### PHP

```php
<?php
function createHashBase64($data) {
    return base64_encode(hash('sha256', $data, true));
}

function signMultipleHashes($certificateSN, $dataArray, $token) {
    $url = "https://hsm.fast.com.vn/api/sign/signhash";

    // Create hash array
    $hashArray = array_map('createHashBase64', $dataArray);

    $payload = array(
        'certificateSN' => $certificateSN,
        'hashArray' => $hashArray
    );

    $options = array(
        'http' => array(
            'header' => "Content-Type: application/json\r\n" .
                       "Authorization: Bearer " . $token . "\r\n",
            'method' => 'POST',
            'content' => json_encode($payload)
        )
    );

    try {
        $context = stream_context_create($options);
        $result = file_get_contents($url, false, $context);
        $response = json_decode($result, true);

        if ($response['success']) {
            $signatures = $response['signatureArray'];
            echo "Successfully signed " . count($signatures) . " documents\n";
            return $signatures;
        } else {
            echo "Signing failed: " . $response['message'] . "\n";
            return null;
        }
    } catch (Exception $e) {
        echo "Request failed: " . $e->getMessage() . "\n";
        return null;
    }
}

// Usage
$token = "your_access_token";
$dataToSign = array(
    "Document content 1",
    "Document content 2",
    "Document content 3"
);

$signatures = signMultipleHashes("1234567890ABCDEF", $dataToSign, $token);
if ($signatures) {
    echo "All documents signed successfully\n";
}
?>
```

## Advanced Features

### Batch Processing

The API supports signing up to 100 hashes in a single request. This is particularly useful for bulk document processing:

```javascript
const processBulkDocuments = async (certificateSN, documents, token) => {
  const batchSize = 100;
  const allSignatures = [];

  for (let i = 0; i < documents.length; i += batchSize) {
    const batch = documents.slice(i, i + batchSize);
    console.log(`Processing batch ${Math.floor(i / batchSize) + 1}...`);

    const signatures = await signMultipleHashes(certificateSN, batch, token);
    if (signatures) {
      allSignatures.push(...signatures);
    } else {
      throw new Error(`Batch ${Math.floor(i / batchSize) + 1} failed`);
    }
  }

  return allSignatures;
};
```

### Signature Verification

```javascript
const verifySignature = async (originalData, signature, certificateInfo) => {
  try {
    // Create hash of original data
    const hash = await createHashBase64(originalData);

    // In a real implementation, you would verify the signature
    // using the certificate's public key
    console.log("Hash:", hash);
    console.log("Signature:", signature);
    console.log("Certificate:", certificateInfo.subject);

    // This is a simplified verification - implement proper verification
    // using cryptographic libraries in production
    return signature && signature.length > 0;
  } catch (error) {
    console.error("Verification failed:", error);
    return false;
  }
};
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

## Performance Considerations

### Best Practices

1. **Batch Processing**: Always use batch processing for multiple documents
2. **Connection Pooling**: Reuse HTTP connections when possible
3. **Async Processing**: Use asynchronous operations for better performance
4. **Error Recovery**: Implement retry mechanisms for transient errors

### Example with Retry Logic

```javascript
const signWithRetry = async (
  certificateSN,
  dataArray,
  token,
  maxRetries = 3
) => {
  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      console.log(`Signing attempt ${attempt}/${maxRetries}`);
      const result = await signMultipleHashes(certificateSN, dataArray, token);
      if (result) {
        console.log("Signing successful");
        return result;
      }
    } catch (error) {
      console.error(`Attempt ${attempt} failed:`, error.message);

      if (attempt === maxRetries) {
        throw new Error(`All ${maxRetries} attempts failed`);
      }

      // Wait before retry (exponential backoff)
      const delay = Math.pow(2, attempt) * 1000;
      await new Promise((resolve) => setTimeout(resolve, delay));
    }
  }
};
```

---

**🎉 Complete!** You have learned all Fast HSM APIs. Return to [Overview](/hsm/) to see the full documentation.
