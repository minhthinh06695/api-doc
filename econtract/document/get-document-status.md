---
sidebar_position: 2
---

# GetDocumentStatus

## Endpoint

> ```http
> POST /api/econ/getDocumentStatus
> ```

## Mô tả

Lấy thông tin trạng thái của một hoặc nhiều tài liệu.

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
  "documentIds": ["DOC_12345678", "DOC_87654321"]
}
```

## Tham số

| Attribute     | Type  | Required | Description                        |
| ------------- | ----- | -------- | ---------------------------------- |
| `documentIds` | array | ✔️       | Danh sách ID tài liệu cần kiểm tra |

:::warning Giới hạn
Tối đa 100 document IDs trong một request để đảm bảo hiệu suất.
:::

## Response

### Thành công (200 OK)

```json
{
  "success": true,
  "message": "Successfully",
  "code": 200,
  "data": {
    "arr_status": [
      {
        "id": "DOC_12345678",
        "status": "SIGNING",
        "statusName": "Đang ký",
        "apiKey": "API_KEY_001",
        "file_id": "FILE_12345",
        "description": "Hợp đồng mua bán - Công ty ABC",
        "sign_process": [
          {
            "order": 1,
            "email": "signer1@company.com",
            "fullName": "Nguyễn Văn A",
            "role": "BUYER",
            "status": "SIGNED",
            "signedAt": "2024-08-21T14:30:00Z",
            "ipAddress": "192.168.1.100"
          },
          {
            "order": 2,
            "email": "signer2@company.com",
            "fullName": "Trần Thị B",
            "role": "SELLER",
            "status": "PENDING",
            "signedAt": null,
            "ipAddress": null
          }
        ],
        "createdAt": "2024-08-21T10:30:00Z",
        "deadline": "2024-08-31T23:59:59Z",
        "completedAt": null
      },
      {
        "id": "DOC_87654321",
        "status": "COMPLETED",
        "statusName": "Hoàn thành",
        "apiKey": "API_KEY_002",
        "file_id": "FILE_87654",
        "description": "Hợp đồng lao động - Nhân viên XYZ",
        "sign_process": [
          {
            "order": 1,
            "email": "hr@company.com",
            "fullName": "Phòng nhân sự",
            "role": "EMPLOYER",
            "status": "SIGNED",
            "signedAt": "2024-08-20T09:15:00Z",
            "ipAddress": "192.168.1.50"
          },
          {
            "order": 2,
            "email": "employee@company.com",
            "fullName": "Nguyễn Văn C",
            "role": "EMPLOYEE",
            "status": "SIGNED",
            "signedAt": "2024-08-20T16:45:00Z",
            "ipAddress": "192.168.1.200"
          }
        ],
        "createdAt": "2024-08-20T08:00:00Z",
        "deadline": "2024-08-30T23:59:59Z",
        "completedAt": "2024-08-20T16:45:00Z"
      }
    ]
  }
}
```

### Thất bại

```json
{
  "success": false,
  "message": "No documents found",
  "code": 204,
  "data": null
}
```

## Response Fields

| Attribute         | Type    | Description                        |
| ----------------- | ------- | ---------------------------------- |
| `success`         | boolean | Trạng thái thành công của request  |
| `message`         | string  | Thông báo kết quả                  |
| `code`            | number  | HTTP status code                   |
| `data.arr_status` | array   | Mảng thông tin trạng thái tài liệu |
| `id`              | string  | ID tài liệu                        |
| `status`          | string  | Mã trạng thái hiện tại             |
| `statusName`      | string  | Tên trạng thái hiện tại            |
| `apiKey`          | string  | Khóa API từ phần mềm tác nghiệp    |
| `file_id`         | string  | ID file PDF                        |
| `description`     | string  | Mô tả tài liệu                     |
| `sign_process`    | array   | Thông tin quy trình ký             |
| `createdAt`       | string  | Thời gian tạo tài liệu             |
| `deadline`        | string  | Hạn chót hoàn thành                |
| `completedAt`     | string  | Thời gian hoàn thành               |

### Sign Process Fields

| Attribute   | Type   | Description                               |
| ----------- | ------ | ----------------------------------------- |
| `order`     | number | Thứ tự ký                                 |
| `email`     | string | Email người ký                            |
| `fullName`  | string | Họ tên người ký                           |
| `role`      | string | Vai trò trong tài liệu                    |
| `status`    | string | Trạng thái ký (PENDING, SIGNED, REJECTED) |
| `signedAt`  | string | Thời gian ký (ISO 8601)                   |
| `ipAddress` | string | Địa chỉ IP khi ký                         |

## Document Status Values

| Status             | Description   |
| ------------------ | ------------- |
| `DRAFT`            | Nháp          |
| `PENDING_APPROVAL` | Chờ phê duyệt |
| `APPROVED`         | Đã phê duyệt  |
| `SIGNING`          | Đang ký       |
| `COMPLETED`        | Hoàn thành    |
| `REJECTED`         | Từ chối       |
| `CANCELLED`        | Hủy bỏ        |
| `EXPIRED`          | Hết hạn       |

## Code Examples

### cURL

```bash
curl -X POST https://domain/api/econ/getDocumentStatus \
  -H "Content-Type: application/json" \
  -H "Authorization: your_access_token" \
  -d '{
    "documentIds": ["DOC_12345678", "DOC_87654321"]
  }'
```

### JavaScript

```javascript
const getDocumentStatus = async (documentIds, token) => {
  try {
    const response = await fetch("https://domain/api/econ/getDocumentStatus", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
      body: JSON.stringify({
        documentIds: documentIds,
      }),
    });

    const result = await response.json();

    if (result.success) {
      console.log("Document statuses:", result.data.arr_status);
      return result.data.arr_status;
    } else {
      throw new Error(result.message);
    }
  } catch (error) {
    console.error("Failed to get document status:", error);
    return null;
  }
};

// Sử dụng
const token = localStorage.getItem("econtract_token");
const documentIds = ["DOC_12345678", "DOC_87654321"];

const statuses = await getDocumentStatus(documentIds, token);

if (statuses && statuses.length > 0) {
  statuses.forEach((doc) => {
    console.log(`Document ${doc.id}: ${doc.statusName}`);
    console.log(`Progress: ${getSigningProgress(doc.sign_process)}`);
  });
}

// Helper function để tính progress
const getSigningProgress = (signProcess) => {
  const total = signProcess.length;
  const signed = signProcess.filter((s) => s.status === "SIGNED").length;
  return `${signed}/${total} signed`;
};
```

### C# (.NET)

```csharp
public class GetDocumentStatusRequest
{
    public string[] documentIds { get; set; }
}

public class GetDocumentStatusResponse
{
    public bool success { get; set; }
    public string message { get; set; }
    public int code { get; set; }
    public DocumentStatusData data { get; set; }
}

public class DocumentStatusData
{
    public DocumentStatus[] arr_status { get; set; }
}

public class DocumentStatus
{
    public string id { get; set; }
    public string status { get; set; }
    public string statusName { get; set; }
    public string apiKey { get; set; }
    public string file_id { get; set; }
    public string description { get; set; }
    public SignProcess[] sign_process { get; set; }
    public DateTime createdAt { get; set; }
    public DateTime deadline { get; set; }
    public DateTime? completedAt { get; set; }
}

public class SignProcess
{
    public int order { get; set; }
    public string email { get; set; }
    public string fullName { get; set; }
    public string role { get; set; }
    public string status { get; set; }
    public DateTime? signedAt { get; set; }
    public string ipAddress { get; set; }
}

// Sử dụng
public async Task<DocumentStatus[]> GetDocumentStatusAsync(string[] documentIds, string token)
{
    var client = new HttpClient();
    client.DefaultRequestHeaders.Add("Authorization", token);

    var request = new GetDocumentStatusRequest { documentIds = documentIds };
    var json = JsonSerializer.Serialize(request);
    var content = new StringContent(json, Encoding.UTF8, "application/json");

    var response = await client.PostAsync("https://domain/api/econ/getDocumentStatus", content);
    var responseJson = await response.Content.ReadAsStringAsync();
    var result = JsonSerializer.Deserialize<GetDocumentStatusResponse>(responseJson);

    return result.success ? result.data.arr_status : new DocumentStatus[0];
}
```

## Use Cases

### 1. Real-time status monitoring

```javascript
class DocumentStatusMonitor {
  constructor(token) {
    this.token = token;
    this.documentIds = [];
    this.intervalId = null;
    this.callbacks = [];
  }

  addDocument(documentId) {
    if (!this.documentIds.includes(documentId)) {
      this.documentIds.push(documentId);
    }
  }

  removeDocument(documentId) {
    this.documentIds = this.documentIds.filter((id) => id !== documentId);
  }

  onStatusChange(callback) {
    this.callbacks.push(callback);
  }

  async startMonitoring(intervalSeconds = 30) {
    this.intervalId = setInterval(async () => {
      if (this.documentIds.length > 0) {
        const statuses = await getDocumentStatus(this.documentIds, this.token);

        if (statuses) {
          this.callbacks.forEach((callback) => {
            callback(statuses);
          });
        }
      }
    }, intervalSeconds * 1000);
  }

  stopMonitoring() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
  }
}

// Sử dụng
const monitor = new DocumentStatusMonitor(token);

monitor.addDocument("DOC_12345678");
monitor.addDocument("DOC_87654321");

monitor.onStatusChange((statuses) => {
  statuses.forEach((doc) => {
    updateDocumentUI(doc);

    if (doc.status === "COMPLETED") {
      showNotification(`Document ${doc.id} completed!`);
      monitor.removeDocument(doc.id);
    }
  });
});

monitor.startMonitoring(30); // Check every 30 seconds
```

### 2. Bulk status check with filtering

```javascript
const checkMultipleDocumentsWithFilter = async (
  documentIds,
  filterStatus,
  token
) => {
  // Split large arrays into chunks to avoid API limits
  const chunks = [];
  const chunkSize = 100;

  for (let i = 0; i < documentIds.length; i += chunkSize) {
    chunks.push(documentIds.slice(i, i + chunkSize));
  }

  const allStatuses = [];

  for (const chunk of chunks) {
    const statuses = await getDocumentStatus(chunk, token);
    if (statuses) {
      allStatuses.push(...statuses);
    }
  }

  // Filter by status if specified
  if (filterStatus) {
    return allStatuses.filter((doc) => doc.status === filterStatus);
  }

  return allStatuses;
};

// Sử dụng
const pendingDocs = await checkMultipleDocumentsWithFilter(
  allDocumentIds,
  "SIGNING",
  token
);

console.log(`Found ${pendingDocs.length} documents pending signature`);
```

### 3. Progress calculation and visualization

```javascript
const calculateDocumentProgress = (signProcess) => {
  const total = signProcess.length;
  const signed = signProcess.filter((s) => s.status === "SIGNED").length;
  const rejected = signProcess.filter((s) => s.status === "REJECTED").length;

  return {
    total,
    signed,
    rejected,
    pending: total - signed - rejected,
    percentage: Math.round((signed / total) * 100),
    isCompleted: signed === total,
    hasRejection: rejected > 0,
  };
};

const renderProgressBar = (documentStatus) => {
  const progress = calculateDocumentProgress(documentStatus.sign_process);

  const progressBar = document.createElement("div");
  progressBar.className = "progress-container";

  progressBar.innerHTML = `
    <div class="progress-info">
      <span>Document: ${documentStatus.description}</span>
      <span>Progress: ${progress.signed}/${progress.total} (${
    progress.percentage
  }%)</span>
    </div>
    <div class="progress-bar">
      <div class="progress-fill ${progress.hasRejection ? "error" : ""}" 
           style="width: ${progress.percentage}%"></div>
    </div>
    <div class="signer-list">
      ${documentStatus.sign_process
        .map(
          (signer) => `
        <div class="signer ${signer.status.toLowerCase()}">
          <span class="order">${signer.order}</span>
          <span class="name">${signer.fullName}</span>
          <span class="status">${signer.status}</span>
          ${
            signer.signedAt
              ? `<span class="time">${new Date(
                  signer.signedAt
                ).toLocaleString()}</span>`
              : ""
          }
        </div>
      `
        )
        .join("")}
    </div>
  `;

  return progressBar;
};
```

### 4. Auto-retry with exponential backoff

```javascript
const getDocumentStatusWithRetry = async (
  documentIds,
  token,
  maxRetries = 3
) => {
  let retryCount = 0;

  while (retryCount < maxRetries) {
    try {
      const statuses = await getDocumentStatus(documentIds, token);
      return statuses;
    } catch (error) {
      retryCount++;

      if (retryCount >= maxRetries) {
        throw error;
      }

      // Exponential backoff: 1s, 2s, 4s
      const delay = Math.pow(2, retryCount) * 1000;
      console.log(`Retry ${retryCount}/${maxRetries} after ${delay}ms...`);

      await new Promise((resolve) => setTimeout(resolve, delay));
    }
  }
};
```

### 5. Status change notifications

```javascript
class DocumentStatusNotifier {
  constructor(token) {
    this.token = token;
    this.previousStatuses = new Map();
  }

  async checkForChanges(documentIds) {
    const currentStatuses = await getDocumentStatus(documentIds, this.token);

    if (!currentStatuses) return;

    const changes = [];

    currentStatuses.forEach((doc) => {
      const previousStatus = this.previousStatuses.get(doc.id);

      if (previousStatus && previousStatus !== doc.status) {
        changes.push({
          documentId: doc.id,
          description: doc.description,
          fromStatus: previousStatus,
          toStatus: doc.status,
          statusName: doc.statusName,
        });
      }

      this.previousStatuses.set(doc.id, doc.status);
    });

    return changes;
  }

  async sendNotifications(changes) {
    for (const change of changes) {
      await this.sendNotification(change);
    }
  }

  async sendNotification(change) {
    const message = `Document ${change.documentId} status changed from ${change.fromStatus} to ${change.toStatus}`;

    // Send email, SMS, push notification, etc.
    console.log("Notification:", message);

    // Example: Send to webhook
    if (this.webhookUrl) {
      await fetch(this.webhookUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "status_change",
          documentId: change.documentId,
          description: change.description,
          fromStatus: change.fromStatus,
          toStatus: change.toStatus,
          timestamp: new Date().toISOString(),
        }),
      });
    }
  }
}
```

## Error Handling

| Code | Message            | Cause                      | Solution                     |
| ---- | ------------------ | -------------------------- | ---------------------------- |
| 204  | No documents found | Document IDs không tồn tại | Kiểm tra Document IDs        |
| 401  | Unauthorized       | Token không hợp lệ         | Re-authenticate              |
| 500  | System error       | Lỗi hệ thống               | Thử lại hoặc liên hệ support |

:::tip Performance Tips

- Sử dụng batch requests thay vì gọi API cho từng document riêng lẻ
- Implement caching cho các document đã completed
- Sử dụng websocket hoặc webhook thay vì polling liên tục
- Giới hạn số lượng document IDs trong mỗi request (≤ 100)
  :::

---

**Tiếp theo:** Tìm hiểu [GetDocumentHistory API](/econtract/document/get-document-history) để xem lịch sử hoạt động chi tiết.
