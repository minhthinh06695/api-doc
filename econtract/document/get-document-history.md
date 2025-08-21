---
sidebar_position: 3
---

# GetDocumentHistory

## Endpoint

```
POST /api/econ/getDocumentHistory
```

## Mô tả

Lấy lịch sử hoạt động của tài liệu.

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
  "documentId": "DOC_12345678"
}
```

## Tham số

| Attribute    | Type   | Required | Description                 |
| ------------ | ------ | -------- | --------------------------- |
| `documentId` | string | ✔️       | ID tài liệu cần xem lịch sử |

## Response

### Thành công (200 OK)

```json
{
  "success": true,
  "message": "Successfully",
  "code": 200,
  "data": {
    "documentId": "DOC_12345678",
    "history": [
      {
        "id": 1,
        "action": "DOCUMENT_CREATED",
        "actionName": "Tạo tài liệu",
        "performer": "admin@company.com",
        "performerName": "Quản trị viên",
        "timestamp": "2024-08-21T10:30:00Z",
        "details": "Tài liệu được tạo từ template TEMPLATE_001",
        "ipAddress": "192.168.1.10"
      },
      {
        "id": 2,
        "action": "EMAIL_SENT",
        "actionName": "Gửi email thông báo",
        "performer": "system",
        "performerName": "Hệ thống",
        "timestamp": "2024-08-21T10:31:00Z",
        "details": "Gửi email thông báo đến signer1@company.com",
        "ipAddress": "127.0.0.1"
      },
      {
        "id": 3,
        "action": "DOCUMENT_VIEWED",
        "actionName": "Xem tài liệu",
        "performer": "signer1@company.com",
        "performerName": "Nguyễn Văn A",
        "timestamp": "2024-08-21T14:25:00Z",
        "details": "Người ký đã xem tài liệu",
        "ipAddress": "192.168.1.100"
      },
      {
        "id": 4,
        "action": "DOCUMENT_SIGNED",
        "actionName": "Ký tài liệu",
        "performer": "signer1@company.com",
        "performerName": "Nguyễn Văn A",
        "timestamp": "2024-08-21T14:30:00Z",
        "details": "Ký số thành công với chứng thư số ABC123",
        "ipAddress": "192.168.1.100"
      },
      {
        "id": 5,
        "action": "EMAIL_SENT",
        "actionName": "Gửi email thông báo",
        "performer": "system",
        "performerName": "Hệ thống",
        "timestamp": "2024-08-21T14:31:00Z",
        "details": "Gửi email thông báo đến signer2@company.com",
        "ipAddress": "127.0.0.1"
      },
      {
        "id": 6,
        "action": "DOCUMENT_VIEWED",
        "actionName": "Xem tài liệu",
        "performer": "signer2@company.com",
        "performerName": "Trần Thị B",
        "timestamp": "2024-08-21T15:10:00Z",
        "details": "Người ký đã xem tài liệu",
        "ipAddress": "192.168.1.150"
      },
      {
        "id": 7,
        "action": "DOCUMENT_SIGNED",
        "actionName": "Ký tài liệu",
        "performer": "signer2@company.com",
        "performerName": "Trần Thị B",
        "timestamp": "2024-08-21T15:15:00Z",
        "details": "Ký số thành công với chứng thư số XYZ789",
        "ipAddress": "192.168.1.150"
      },
      {
        "id": 8,
        "action": "DOCUMENT_COMPLETED",
        "actionName": "Hoàn thành tài liệu",
        "performer": "system",
        "performerName": "Hệ thống",
        "timestamp": "2024-08-21T15:16:00Z",
        "details": "Tài liệu đã hoàn thành, tất cả bên đã ký",
        "ipAddress": "127.0.0.1"
      },
      {
        "id": 9,
        "action": "EMAIL_SENT",
        "actionName": "Gửi email thông báo",
        "performer": "system",
        "performerName": "Hệ thống",
        "timestamp": "2024-08-21T15:17:00Z",
        "details": "Gửi email hoàn thành đến admin@company.com",
        "ipAddress": "127.0.0.1"
      }
    ]
  }
}
```

### Thất bại

```json
{
  "success": false,
  "message": "Document not found",
  "code": 195,
  "data": null
}
```

## Response Fields

| Attribute                 | Type    | Description                       |
| ------------------------- | ------- | --------------------------------- |
| `success`                 | boolean | Trạng thái thành công của request |
| `message`                 | string  | Thông báo kết quả                 |
| `code`                    | number  | HTTP status code                  |
| `data.documentId`         | string  | ID tài liệu                       |
| `data.history`            | array   | Danh sách lịch sử hoạt động       |
| `history[].id`            | number  | ID bản ghi lịch sử                |
| `history[].action`        | string  | Mã hành động                      |
| `history[].actionName`    | string  | Tên hành động                     |
| `history[].performer`     | string  | Email người thực hiện             |
| `history[].performerName` | string  | Tên người thực hiện               |
| `history[].timestamp`     | string  | Thời gian thực hiện (ISO 8601)    |
| `history[].details`       | string  | Chi tiết hành động                |
| `history[].ipAddress`     | string  | Địa chỉ IP                        |

## Action Types

| Action Code           | Action Name         | Description                   |
| --------------------- | ------------------- | ----------------------------- |
| `DOCUMENT_CREATED`    | Tạo tài liệu        | Tài liệu được tạo từ template |
| `DOCUMENT_VIEWED`     | Xem tài liệu        | Người dùng xem tài liệu       |
| `DOCUMENT_SIGNED`     | Ký tài liệu         | Người ký đã ký thành công     |
| `DOCUMENT_REJECTED`   | Từ chối ký          | Người ký từ chối ký tài liệu  |
| `DOCUMENT_COMPLETED`  | Hoàn thành tài liệu | Tất cả bên đã ký xong         |
| `DOCUMENT_CANCELLED`  | Hủy tài liệu        | Tài liệu bị hủy bỏ            |
| `DOCUMENT_EXPIRED`    | Hết hạn tài liệu    | Tài liệu vượt quá deadline    |
| `EMAIL_SENT`          | Gửi email thông báo | Hệ thống gửi email            |
| `REMINDER_SENT`       | Gửi email nhắc nhở  | Gửi email nhắc nhở ký         |
| `STATUS_CHANGED`      | Thay đổi trạng thái | Trạng thái tài liệu thay đổi  |
| `COMMENT_ADDED`       | Thêm bình luận      | Người dùng thêm bình luận     |
| `DOCUMENT_DOWNLOADED` | Tải xuống tài liệu  | Tài liệu được tải xuống       |

## Code Examples

### cURL

```bash
curl -X POST http://domain:port/api/econ/getDocumentHistory \
  -H "Content-Type: application/json" \
  -H "Authorization: your_access_token" \
  -d '{
    "documentId": "DOC_12345678"
  }'
```

### JavaScript

```javascript
const getDocumentHistory = async (documentId, token) => {
  try {
    const response = await fetch(
      "http://domain:port/api/econ/getDocumentHistory",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
        body: JSON.stringify({
          documentId: documentId,
        }),
      }
    );

    const result = await response.json();

    if (result.success) {
      console.log("Document history:", result.data.history);
      return result.data;
    } else {
      throw new Error(result.message);
    }
  } catch (error) {
    console.error("Failed to get document history:", error);
    return null;
  }
};

// Sử dụng
const token = localStorage.getItem("econtract_token");
const history = await getDocumentHistory("DOC_12345678", token);

if (history && history.history.length > 0) {
  console.log(
    `Document ${history.documentId} has ${history.history.length} history entries`
  );

  history.history.forEach((entry, index) => {
    console.log(
      `${index + 1}. ${entry.actionName} by ${
        entry.performerName
      } at ${new Date(entry.timestamp).toLocaleString()}`
    );
  });
}
```

### C# (.NET)

```csharp
public class GetDocumentHistoryRequest
{
    public string documentId { get; set; }
}

public class GetDocumentHistoryResponse
{
    public bool success { get; set; }
    public string message { get; set; }
    public int code { get; set; }
    public DocumentHistoryData data { get; set; }
}

public class DocumentHistoryData
{
    public string documentId { get; set; }
    public HistoryEntry[] history { get; set; }
}

public class HistoryEntry
{
    public int id { get; set; }
    public string action { get; set; }
    public string actionName { get; set; }
    public string performer { get; set; }
    public string performerName { get; set; }
    public DateTime timestamp { get; set; }
    public string details { get; set; }
    public string ipAddress { get; set; }
}

// Sử dụng
public async Task<DocumentHistoryData> GetDocumentHistoryAsync(string documentId, string token)
{
    var client = new HttpClient();
    client.DefaultRequestHeaders.Add("Authorization", token);

    var request = new GetDocumentHistoryRequest { documentId = documentId };
    var json = JsonSerializer.Serialize(request);
    var content = new StringContent(json, Encoding.UTF8, "application/json");

    var response = await client.PostAsync("http://domain:port/api/econ/getDocumentHistory", content);
    var responseJson = await response.Content.ReadAsStringAsync();
    var result = JsonSerializer.Deserialize<GetDocumentHistoryResponse>(responseJson);

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
function getDocumentHistory($documentId, $token) {
    $data = array('documentId' => $documentId);

    $options = array(
        'http' => array(
            'header'  => "Content-type: application/json\r\n" .
                        "Authorization: $token\r\n",
            'method'  => 'POST',
            'content' => json_encode($data)
        )
    );

    $context = stream_context_create($options);
    $result = file_get_contents('http://domain:port/api/econ/getDocumentHistory', false, $context);
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
    $history = getDocumentHistory('DOC_12345678', $token);

    echo "Document {$history['documentId']} history:\n";

    foreach ($history['history'] as $entry) {
        $time = date('Y-m-d H:i:s', strtotime($entry['timestamp']));
        echo "- {$entry['actionName']} by {$entry['performerName']} at $time\n";
        echo "  Details: {$entry['details']}\n\n";
    }
} catch (Exception $e) {
    echo "Error: " . $e->getMessage();
}
?>
```

## Use Cases

### 1. Timeline visualization

```javascript
const renderHistoryTimeline = (history) => {
  const timeline = document.createElement("div");
  timeline.className = "history-timeline";

  history.forEach((entry, index) => {
    const timelineItem = document.createElement("div");
    timelineItem.className = "timeline-item";

    const actionIcon = getActionIcon(entry.action);
    const timeFormatted = new Date(entry.timestamp).toLocaleString();

    timelineItem.innerHTML = `
      <div class="timeline-marker ${entry.action.toLowerCase()}">
        <i class="${actionIcon}"></i>
      </div>
      <div class="timeline-content">
        <div class="timeline-header">
          <h4>${entry.actionName}</h4>
          <span class="timestamp">${timeFormatted}</span>
        </div>
        <div class="timeline-body">
          <p><strong>Performed by:</strong> ${entry.performerName}</p>
          <p><strong>Details:</strong> ${entry.details}</p>
          ${
            entry.ipAddress && entry.ipAddress !== "127.0.0.1"
              ? `<p><strong>IP Address:</strong> ${entry.ipAddress}</p>`
              : ""
          }
        </div>
      </div>
    `;

    timeline.appendChild(timelineItem);
  });

  return timeline;
};

const getActionIcon = (action) => {
  const icons = {
    DOCUMENT_CREATED: "fas fa-plus-circle",
    DOCUMENT_VIEWED: "fas fa-eye",
    DOCUMENT_SIGNED: "fas fa-signature",
    DOCUMENT_REJECTED: "fas fa-times-circle",
    DOCUMENT_COMPLETED: "fas fa-check-circle",
    DOCUMENT_CANCELLED: "fas fa-ban",
    EMAIL_SENT: "fas fa-envelope",
    REMINDER_SENT: "fas fa-bell",
    DOCUMENT_DOWNLOADED: "fas fa-download",
  };

  return icons[action] || "fas fa-info-circle";
};
```

### 2. Audit trail export

```javascript
const exportHistoryToCSV = (documentHistory) => {
  const headers = ["Timestamp", "Action", "Performer", "Details", "IP Address"];

  const csvContent = [
    headers.join(","),
    ...documentHistory.history.map((entry) =>
      [
        new Date(entry.timestamp).toISOString(),
        entry.actionName,
        entry.performerName,
        `"${entry.details.replace(/"/g, '""')}"`, // Escape quotes
        entry.ipAddress || "",
      ].join(",")
    ),
  ].join("\n");

  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = `document_${documentHistory.documentId}_history.csv`;
  link.click();
};
```

### 3. History filtering and search

```javascript
class DocumentHistoryFilter {
  constructor(history) {
    this.originalHistory = history;
    this.filteredHistory = history;
  }

  filterByAction(actions) {
    this.filteredHistory = this.filteredHistory.filter((entry) =>
      actions.includes(entry.action)
    );
    return this;
  }

  filterByPerformer(performerEmail) {
    this.filteredHistory = this.filteredHistory.filter((entry) =>
      entry.performer.toLowerCase().includes(performerEmail.toLowerCase())
    );
    return this;
  }

  filterByDateRange(startDate, endDate) {
    const start = new Date(startDate);
    const end = new Date(endDate);

    this.filteredHistory = this.filteredHistory.filter((entry) => {
      const entryDate = new Date(entry.timestamp);
      return entryDate >= start && entryDate <= end;
    });
    return this;
  }

  searchByDetails(searchTerm) {
    this.filteredHistory = this.filteredHistory.filter(
      (entry) =>
        entry.details.toLowerCase().includes(searchTerm.toLowerCase()) ||
        entry.actionName.toLowerCase().includes(searchTerm.toLowerCase())
    );
    return this;
  }

  getResults() {
    return this.filteredHistory;
  }

  reset() {
    this.filteredHistory = this.originalHistory;
    return this;
  }
}

// Sử dụng
const filter = new DocumentHistoryFilter(history.history);

// Lọc chỉ các action liên quan đến signing
const signingHistory = filter
  .filterByAction(["DOCUMENT_SIGNED", "DOCUMENT_REJECTED", "DOCUMENT_VIEWED"])
  .getResults();

// Tìm kiếm theo từ khóa
const searchResults = filter
  .reset()
  .searchByDetails("chứng thư số")
  .getResults();
```

### 4. Performance metrics calculation

```javascript
const calculateDocumentMetrics = (history) => {
  const createdEntry = history.find((h) => h.action === "DOCUMENT_CREATED");
  const completedEntry = history.find((h) => h.action === "DOCUMENT_COMPLETED");

  if (!createdEntry) return null;

  const metrics = {
    totalTime: null,
    signingTime: null,
    viewCounts: {},
    emailsSent: 0,
    remindersSent: 0,
    signingOrder: [],
  };

  // Calculate total time to completion
  if (completedEntry) {
    const created = new Date(createdEntry.timestamp);
    const completed = new Date(completedEntry.timestamp);
    metrics.totalTime = Math.round((completed - created) / (1000 * 60 * 60)); // hours
  }

  // Calculate signing duration
  const firstSignEntry = history.find((h) => h.action === "DOCUMENT_SIGNED");
  const lastSignEntry = history
    .filter((h) => h.action === "DOCUMENT_SIGNED")
    .pop();

  if (firstSignEntry && lastSignEntry) {
    const firstSign = new Date(firstSignEntry.timestamp);
    const lastSign = new Date(lastSignEntry.timestamp);
    metrics.signingTime = Math.round((lastSign - firstSign) / (1000 * 60)); // minutes
  }

  // Count views by performer
  history
    .filter((h) => h.action === "DOCUMENT_VIEWED")
    .forEach((entry) => {
      metrics.viewCounts[entry.performer] =
        (metrics.viewCounts[entry.performer] || 0) + 1;
    });

  // Count emails and reminders
  metrics.emailsSent = history.filter((h) => h.action === "EMAIL_SENT").length;
  metrics.remindersSent = history.filter(
    (h) => h.action === "REMINDER_SENT"
  ).length;

  // Track signing order
  metrics.signingOrder = history
    .filter((h) => h.action === "DOCUMENT_SIGNED")
    .map((h) => ({
      performer: h.performerName,
      timestamp: h.timestamp,
    }));

  return metrics;
};
```

### 5. Real-time history updates

```javascript
class DocumentHistoryWatcher {
  constructor(documentId, token) {
    this.documentId = documentId;
    this.token = token;
    this.lastHistoryId = 0;
    this.callbacks = [];
    this.intervalId = null;
  }

  onNewEntry(callback) {
    this.callbacks.push(callback);
  }

  async checkForUpdates() {
    try {
      const historyData = await getDocumentHistory(this.documentId, this.token);

      if (historyData && historyData.history.length > 0) {
        const newEntries = historyData.history.filter(
          (entry) => entry.id > this.lastHistoryId
        );

        if (newEntries.length > 0) {
          this.lastHistoryId = Math.max(
            ...historyData.history.map((h) => h.id)
          );

          this.callbacks.forEach((callback) => {
            callback(newEntries, historyData.history);
          });
        }
      }
    } catch (error) {
      console.error("Error checking history updates:", error);
    }
  }

  startWatching(intervalSeconds = 30) {
    // Get initial history
    this.checkForUpdates();

    // Set up polling
    this.intervalId = setInterval(() => {
      this.checkForUpdates();
    }, intervalSeconds * 1000);
  }

  stopWatching() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
  }
}

// Sử dụng
const watcher = new DocumentHistoryWatcher("DOC_12345678", token);

watcher.onNewEntry((newEntries, fullHistory) => {
  newEntries.forEach((entry) => {
    showNotification(
      `New activity: ${entry.actionName} by ${entry.performerName}`
    );
  });

  updateHistoryUI(fullHistory);
});

watcher.startWatching(15); // Check every 15 seconds
```

## Error Handling

| Code | Message            | Cause                     | Solution                     |
| ---- | ------------------ | ------------------------- | ---------------------------- |
| 195  | Document not found | Document ID không tồn tại | Kiểm tra Document ID         |
| 401  | Unauthorized       | Token không hợp lệ        | Re-authenticate              |
| 500  | System error       | Lỗi hệ thống              | Thử lại hoặc liên hệ support |

:::tip Audit Best Practices

- Lưu trữ lịch sử hoạt động để đáp ứng yêu cầu compliance
- Export history ra file để backup và báo cáo
- Monitor các action bất thường (nhiều attempts, unusual IP)
- Sử dụng lịch sử để phân tích và cải thiện quy trình
  :::

---

**Tiếp theo:** Tìm hiểu [DownloadDocument API](/econtract/document/download-document) để tải xuống tài liệu hoàn thành.
