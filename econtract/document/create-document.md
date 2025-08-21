---
sidebar_position: 1
---

# CreateDocument

## Endpoint

```
POST /api/econ/createDocument
```

## Mô tả

Tạo tài liệu mới từ template có sẵn trong hệ thống.

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
  "templateCode": "{template_code}",
  "documentData": {
    "buyer_name": "Công ty ABC",
    "seller_name": "Công ty XYZ",
    "contract_date": "2024-08-21",
    "total_amount": 1000000000
  },
  "signers": [
    {
      "email": "signer1@company.com",
      "fullName": "Nguyễn Văn A",
      "role": "BUYER",
      "order": 1
    },
    {
      "email": "signer2@company.com",
      "fullName": "Trần Thị B",
      "role": "SELLER",
      "order": 2
    }
  ],
  "completionEmails": ["manager@company.com", "admin@company.com"],
  "deadline": "2024-08-31",
  "callbackUrl": "https://yourapp.com/webhook/econtract",
  "metadata": {
    "project_id": "PRJ_001",
    "department": "SALES"
  }
}
```

## Tham số

| Attribute          | Type   | Required | Description                       |
| ------------------ | ------ | -------- | --------------------------------- |
| `templateCode`     | string | ✔️       | Mã template để tạo tài liệu       |
| `documentData`     | object | ✔️       | Dữ liệu điền vào template         |
| `signers`          | array  | ✔️       | Danh sách người ký                |
| `completionEmails` | array  |          | Email nhận thông báo hoàn thành   |
| `deadline`         | string |          | Hạn chót hoàn thành (YYYY-MM-DD)  |
| `callbackUrl`      | string |          | URL nhận callback khi có thay đổi |
| `metadata`         | object |          | Thông tin bổ sung                 |

### Signer Object

| Attribute  | Type   | Required | Description                |
| ---------- | ------ | -------- | -------------------------- |
| `email`    | string | ✔️       | Email người ký             |
| `fullName` | string | ✔️       | Họ tên người ký            |
| `role`     | string |          | Vai trò (BUYER, SELLER...) |
| `order`    | number | ✔️       | Thứ tự ký (1, 2, 3...)     |

:::warning Lưu ý về signers

- `order` phải là số nguyên dương và duy nhất
- Người ký sẽ nhận email theo thứ tự `order`
- Email phải đúng định dạng và không được trùng lặp
  :::

## Response

### Thành công (200 OK)

```json
{
  "success": true,
  "message": "Document created successfully",
  "code": 200,
  "data": {
    "documentId": "DOC_12345678",
    "templateCode": "TEMPLATE_001",
    "status": "PENDING_APPROVAL",
    "createdAt": "2024-08-21T10:30:00Z",
    "deadline": "2024-08-31T23:59:59Z",
    "signers": [
      {
        "email": "signer1@company.com",
        "fullName": "Nguyễn Văn A",
        "role": "BUYER",
        "order": 1,
        "status": "PENDING",
        "signedAt": null
      },
      {
        "email": "signer2@company.com",
        "fullName": "Trần Thị B",
        "role": "SELLER",
        "order": 2,
        "status": "WAITING",
        "signedAt": null
      }
    ],
    "previewUrl": "https://econtract.fast.com.vn/preview/DOC_12345678"
  }
}
```

### Thất bại

```json
{
  "success": false,
  "message": "Template not found",
  "code": 203,
  "data": null
}
```

## Response Fields

| Attribute           | Type    | Description                       |
| ------------------- | ------- | --------------------------------- |
| `success`           | boolean | Trạng thái thành công của request |
| `message`           | string  | Thông báo kết quả                 |
| `code`              | number  | HTTP status code                  |
| `data.documentId`   | string  | ID tài liệu được tạo              |
| `data.templateCode` | string  | Mã template đã sử dụng            |
| `data.status`       | string  | Trạng thái hiện tại               |
| `data.createdAt`    | string  | Thời gian tạo (ISO 8601)          |
| `data.deadline`     | string  | Hạn chót hoàn thành               |
| `data.signers`      | array   | Thông tin người ký                |
| `data.previewUrl`   | string  | URL xem trước tài liệu            |

### Signer Status Values

| Status     | Description                   |
| ---------- | ----------------------------- |
| `PENDING`  | Đang chờ ký (thứ tự hiện tại) |
| `WAITING`  | Chờ đến lượt ký               |
| `SIGNED`   | Đã ký thành công              |
| `REJECTED` | Đã từ chối ký                 |

## Error Codes

| Code | Message                                               | Description                       |
| ---- | ----------------------------------------------------- | --------------------------------- |
| 203  | Template không tồn tại                                | Mã template không hợp lệ          |
| 655  | Đã quá số tài liệu chưa ký cho phép                   | Vượt quá giới hạn pending docs    |
| 656  | Đã sử dụng hết số lượng tài liệu                      | Hết quota tạo tài liệu            |
| 657  | Email người tạo không đúng định dạng                  | Format email creator không hợp lệ |
| 658  | Email trong danh sách hoàn thành không đúng định dạng | Email completion không hợp lệ     |
| 659  | Email ở chi tiết không đúng định dạng                 | Email signer không hợp lệ         |
| 660  | Trùng email ở chi tiết                                | Email signer bị trùng lặp         |
| 663  | Chưa phân quyền sử dụng trên loại tài liệu            | Không có permission trên template |
| 664  | Giá trị trường ngày không đúng                        | Format ngày deadline không hợp lệ |

## Code Examples

### cURL

```bash
curl -X POST http://domain:port/api/econ/createDocument \
  -H "Content-Type: application/json" \
  -H "Authorization: your_access_token" \
  -d '{
    "templateCode": "TEMPLATE_001",
    "documentData": {
      "buyer_name": "Công ty ABC",
      "seller_name": "Công ty XYZ",
      "contract_date": "2024-08-21",
      "total_amount": 1000000000
    },
    "signers": [
      {
        "email": "signer1@company.com",
        "fullName": "Nguyễn Văn A",
        "order": 1
      },
      {
        "email": "signer2@company.com",
        "fullName": "Trần Thị B",
        "order": 2
      }
    ],
    "deadline": "2024-08-31",
    "callbackUrl": "https://yourapp.com/webhook/econtract"
  }'
```

### JavaScript

```javascript
const createDocument = async (
  templateCode,
  documentData,
  signers,
  options = {},
  token
) => {
  try {
    const requestBody = {
      templateCode: templateCode,
      documentData: documentData,
      signers: signers,
      ...options, // completionEmails, deadline, callbackUrl, metadata
    };

    const response = await fetch("http://domain:port/api/econ/createDocument", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
      body: JSON.stringify(requestBody),
    });

    const result = await response.json();

    if (result.success) {
      console.log("Document created:", result.data.documentId);
      return result.data;
    } else {
      throw new Error(`Error ${result.code}: ${result.message}`);
    }
  } catch (error) {
    console.error("Failed to create document:", error);
    return null;
  }
};

// Sử dụng
const token = localStorage.getItem("econtract_token");

const docData = {
  buyer_name: "Công ty ABC",
  seller_name: "Công ty XYZ",
  contract_date: "2024-08-21",
  total_amount: 1000000000,
};

const signers = [
  {
    email: "signer1@company.com",
    fullName: "Nguyễn Văn A",
    role: "BUYER",
    order: 1,
  },
  {
    email: "signer2@company.com",
    fullName: "Trần Thị B",
    role: "SELLER",
    order: 2,
  },
];

const options = {
  completionEmails: ["admin@company.com"],
  deadline: "2024-08-31",
  callbackUrl: "https://yourapp.com/webhook/econtract",
  metadata: {
    project_id: "PRJ_001",
    department: "SALES",
  },
};

const document = await createDocument(
  "TEMPLATE_001",
  docData,
  signers,
  options,
  token
);
```

### C# (.NET)

```csharp
public class CreateDocumentRequest
{
    public string templateCode { get; set; }
    public Dictionary<string, object> documentData { get; set; }
    public SignerInfo[] signers { get; set; }
    public string[] completionEmails { get; set; }
    public string deadline { get; set; }
    public string callbackUrl { get; set; }
    public Dictionary<string, object> metadata { get; set; }
}

public class SignerInfo
{
    public string email { get; set; }
    public string fullName { get; set; }
    public string role { get; set; }
    public int order { get; set; }
}

public class CreateDocumentResponse
{
    public bool success { get; set; }
    public string message { get; set; }
    public int code { get; set; }
    public DocumentData data { get; set; }
}

public class DocumentData
{
    public string documentId { get; set; }
    public string templateCode { get; set; }
    public string status { get; set; }
    public DateTime createdAt { get; set; }
    public DateTime deadline { get; set; }
    public SignerStatus[] signers { get; set; }
    public string previewUrl { get; set; }
}

// Sử dụng
public async Task<DocumentData> CreateDocumentAsync(
    string templateCode,
    Dictionary<string, object> documentData,
    SignerInfo[] signers,
    string token)
{
    var client = new HttpClient();
    client.DefaultRequestHeaders.Add("Authorization", token);

    var request = new CreateDocumentRequest
    {
        templateCode = templateCode,
        documentData = documentData,
        signers = signers,
        deadline = "2024-08-31",
        callbackUrl = "https://yourapp.com/webhook/econtract"
    };

    var json = JsonSerializer.Serialize(request);
    var content = new StringContent(json, Encoding.UTF8, "application/json");

    var response = await client.PostAsync("http://domain:port/api/econ/createDocument", content);
    var responseJson = await response.Content.ReadAsStringAsync();
    var result = JsonSerializer.Deserialize<CreateDocumentResponse>(responseJson);

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
function createDocument($templateCode, $documentData, $signers, $options = [], $token) {
    $requestData = array(
        'templateCode' => $templateCode,
        'documentData' => $documentData,
        'signers' => $signers
    );

    // Merge với options
    $requestData = array_merge($requestData, $options);

    $options = array(
        'http' => array(
            'header'  => "Content-type: application/json\r\n" .
                        "Authorization: $token\r\n",
            'method'  => 'POST',
            'content' => json_encode($requestData)
        )
    );

    $context = stream_context_create($options);
    $result = file_get_contents('http://domain:port/api/econ/createDocument', false, $context);
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

    $docData = array(
        'buyer_name' => 'Công ty ABC',
        'seller_name' => 'Công ty XYZ',
        'contract_date' => '2024-08-21',
        'total_amount' => 1000000000
    );

    $signers = array(
        array(
            'email' => 'signer1@company.com',
            'fullName' => 'Nguyễn Văn A',
            'role' => 'BUYER',
            'order' => 1
        ),
        array(
            'email' => 'signer2@company.com',
            'fullName' => 'Trần Thị B',
            'role' => 'SELLER',
            'order' => 2
        )
    );

    $options = array(
        'deadline' => '2024-08-31',
        'callbackUrl' => 'https://yourapp.com/webhook/econtract'
    );

    $document = createDocument('TEMPLATE_001', $docData, $signers, $options, $token);
    echo "Document created: " . $document['documentId'];

} catch (Exception $e) {
    echo "Error: " . $e->getMessage();
}
?>
```

## Validation Examples

### 1. Validate document data before create

```javascript
const validateDocumentData = (templateCode, documentData, templates) => {
  const template = templates.find((t) => t.templateCode === templateCode);
  if (!template) {
    throw new Error("Template not found");
  }

  const errors = [];

  template.fields.forEach((field) => {
    const value = documentData[field.fieldName];

    // Check required fields
    if (field.required && (!value || value === "")) {
      errors.push(`Field '${field.fieldName}' is required`);
    }

    // Validate data types
    if (value) {
      switch (field.fieldType) {
        case "number":
          if (isNaN(value)) {
            errors.push(`Field '${field.fieldName}' must be a number`);
          }
          break;
        case "email":
          if (!isValidEmail(value)) {
            errors.push(`Field '${field.fieldName}' must be a valid email`);
          }
          break;
        case "date":
          if (!isValidDate(value)) {
            errors.push(
              `Field '${field.fieldName}' must be a valid date (YYYY-MM-DD)`
            );
          }
          break;
      }
    }
  });

  if (errors.length > 0) {
    throw new Error("Validation failed: " + errors.join(", "));
  }
};
```

### 2. Validate signers

```javascript
const validateSigners = (signers) => {
  const errors = [];
  const emails = new Set();
  const orders = new Set();

  signers.forEach((signer, index) => {
    // Check required fields
    if (!signer.email) {
      errors.push(`Signer ${index + 1}: email is required`);
    }
    if (!signer.fullName) {
      errors.push(`Signer ${index + 1}: fullName is required`);
    }
    if (!signer.order) {
      errors.push(`Signer ${index + 1}: order is required`);
    }

    // Check email format
    if (signer.email && !isValidEmail(signer.email)) {
      errors.push(`Signer ${index + 1}: invalid email format`);
    }

    // Check duplicate email
    if (signer.email) {
      if (emails.has(signer.email)) {
        errors.push(`Duplicate email: ${signer.email}`);
      }
      emails.add(signer.email);
    }

    // Check duplicate order
    if (signer.order) {
      if (orders.has(signer.order)) {
        errors.push(`Duplicate order: ${signer.order}`);
      }
      orders.add(signer.order);
    }

    // Check order is positive integer
    if (
      signer.order &&
      (!Number.isInteger(signer.order) || signer.order <= 0)
    ) {
      errors.push(`Signer ${index + 1}: order must be a positive integer`);
    }
  });

  if (errors.length > 0) {
    throw new Error("Signer validation failed: " + errors.join(", "));
  }
};
```

## Error Handling Best Practices

```javascript
const handleCreateDocumentError = (error) => {
  if (error.code) {
    switch (error.code) {
      case 203:
        return "Template không tồn tại. Vui lòng chọn template khác.";
      case 655:
        return "Đã vượt quá số lượng tài liệu chưa ký cho phép. Vui lòng hoàn thành các tài liệu đang chờ.";
      case 656:
        return "Đã hết quota tạo tài liệu. Vui lòng liên hệ admin để tăng quota.";
      case 657:
      case 658:
      case 659:
        return "Địa chỉ email không đúng định dạng. Vui lòng kiểm tra lại.";
      case 660:
        return "Email người ký bị trùng lặp. Mỗi người chỉ được ký một lần.";
      case 663:
        return "Không có quyền sử dụng template này. Vui lòng liên hệ admin.";
      case 664:
        return "Ngày deadline không hợp lệ. Vui lòng sử dụng định dạng YYYY-MM-DD.";
      default:
        return error.message || "Có lỗi xảy ra khi tạo tài liệu.";
    }
  }
  return error.message || "Lỗi không xác định.";
};

// Sử dụng
try {
  const document = await createDocument(
    templateCode,
    data,
    signers,
    options,
    token
  );
  showSuccess("Tài liệu được tạo thành công!");
} catch (error) {
  const errorMessage = handleCreateDocumentError(error);
  showError(errorMessage);
}
```

---

**Tiếp theo:** Tìm hiểu [GetDocumentStatus API](/econtract/document/get-document-status) để theo dõi trạng thái tài liệu.
