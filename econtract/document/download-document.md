---
sidebar_position: 4
---

# DownloadDocument

## Endpoint

> ```http
> POST /api/econ/downloadDocument
> ```

## Mô tả

Tải xuống file PDF của tài liệu đã hoàn thành.

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

| Attribute    | Type   | Required | Description               |
| ------------ | ------ | -------- | ------------------------- |
| `documentId` | string | ✔️       | ID tài liệu cần tải xuống |

:::warning Điều kiện tải xuống
Chỉ có thể tải xuống tài liệu có trạng thái `COMPLETED` hoặc `REJECTED` hoặc `CANCELLED`. Tài liệu đang trong quá trình ký sẽ không thể tải xuống.
:::

## Response

### Thành công (200 OK)

```json
{
  "success": true,
  "message": "Successfully",
  "code": 200,
  "data": {
    "documentId": "DOC_12345678",
    "fileName": "hop_dong_mua_ban_DOC_12345678.pdf",
    "fileSize": 1024576,
    "downloadUrl": "https://econtract.fast.com.vn/download/DOC_12345678",
    "fileContent": "JVBERi0xLjQKJdPr6eEKMSAwIG9iago8PAovVHlwZSAvQ2F0YWxvZwovUGFnZXMgMiAwIFIKPj4KZW5kb2JqCjIgMCBvYmoKPDwKL1R5cGUgL1BhZ2VzCi9LaWRzIFszIDAgUl0KL0NvdW50IDEKPD4KZW5kb2JqCjMgMCBvYmoKPDwKL1R5cGUgL1BhZ2UKL1BhcmVudCAyIDAgUgovUmVzb3VyY2VzIDw8IC9Gb250IDw8IC9GMSA0IDAgUiA+PiA+PgovTWVkaWFCb3ggWzAgMCA2MTIgNzkyXQovQ29udGVudHMgNSAwIFIKPj4KZW5kb2JqCjQgMCBvYmoKPDwKL1R5cGUgL0ZvbnQKL1N1YnR5cGUgL1R5cGUxCi9CYXNlRm9udCAvSGVsdmV0aWNhCj4+CmVuZG9iago1IDAgb2JqCjw8Ci9MZW5ndGggNDQKPj4Kc3RyZWFtCkJUCi9GMSAyNCBUZgoxMDAgNzAwIFRkCihIZWxsbyBXb3JsZCkgVGoKRVQKZW5kc3RyZWFtCmVuZG9iagp4cmVmCjAgNgowMDAwMDAwMDAwIDY1NTM1IGYgCjAwMDAwMDAwMDkgMDAwMDAgbiAKMDAwMDAwMDA1OCAwMDAwMCBuIAowMDAwMDAwMTE1IDAwMDAwIG4gCjAwMDAwMDAyNDUgMDAwMDAgbiAKMDAwMDAwMDMxMiAwMDAwMCBuIAp0cmFpbGVyCjw8Ci9TaXplIDYKL1Jvb3QgMSAwIFIKPj4Kc3RhcnR4cmVmCjQwNQolJUVPRgo=",
    "createdAt": "2024-08-21T15:16:00Z",
    "signatures": [
      {
        "signerName": "Nguyễn Văn A",
        "signerEmail": "signer1@company.com",
        "signedAt": "2024-08-21T14:30:00Z",
        "certificateInfo": "CN=Nguyen Van A, O=Company ABC"
      },
      {
        "signerName": "Trần Thị B",
        "signerEmail": "signer2@company.com",
        "signedAt": "2024-08-21T15:15:00Z",
        "certificateInfo": "CN=Tran Thi B, O=Company XYZ"
      }
    ]
  }
}
```

### Tài liệu không tồn tại hoặc chưa hoàn thành

```json
{
  "success": false,
  "message": "Document not found or not completed",
  "code": 195,
  "data": null
}
```

### Không có quyền tải xuống

```json
{
  "success": false,
  "message": "No permission to download this document",
  "code": 665,
  "data": null
}
```

## Response Fields

| Attribute                      | Type    | Description                       |
| ------------------------------ | ------- | --------------------------------- |
| `success`                      | boolean | Trạng thái thành công của request |
| `message`                      | string  | Thông báo kết quả                 |
| `code`                         | number  | HTTP status code                  |
| `data.documentId`              | string  | ID tài liệu                       |
| `data.fileName`                | string  | Tên file PDF                      |
| `data.fileSize`                | number  | Kích thước file (bytes)           |
| `data.downloadUrl`             | string  | URL tải xuống trực tiếp           |
| `data.fileContent`             | string  | Nội dung file PDF (base64)        |
| `data.createdAt`               | string  | Thời gian tạo file PDF            |
| `data.signatures`              | array   | Thông tin chữ ký số               |
| `signatures[].signerName`      | string  | Tên người ký                      |
| `signatures[].signerEmail`     | string  | Email người ký                    |
| `signatures[].signedAt`        | string  | Thời gian ký                      |
| `signatures[].certificateInfo` | string  | Thông tin chứng thư số            |

## Download Methods

### Method 1: Base64 Content

Sử dụng `fileContent` để tải xuống trực tiếp:

```javascript
const downloadFromBase64 = (fileName, base64Content) => {
  const binaryString = atob(base64Content);
  const bytes = new Uint8Array(binaryString.length);

  for (let i = 0; i < binaryString.length; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }

  const blob = new Blob([bytes], { type: "application/pdf" });
  const url = window.URL.createObjectURL(blob);

  const a = document.createElement("a");
  a.style.display = "none";
  a.href = url;
  a.download = fileName;
  document.body.appendChild(a);
  a.click();
  window.URL.revokeObjectURL(url);
  document.body.removeChild(a);
};
```

### Method 2: Direct URL

Sử dụng `downloadUrl` để tải xuống:

```javascript
const downloadFromUrl = (downloadUrl, fileName) => {
  const a = document.createElement("a");
  a.href = downloadUrl;
  a.download = fileName;
  a.target = "_blank";
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
};
```

## Code Examples

### cURL

```bash
curl -X POST https://domain/api/econ/downloadDocument \
  -H "Content-Type: application/json" \
  -H "Authorization: your_access_token" \
  -d '{
    "documentId": "DOC_12345678"
  }'
```

### JavaScript

```javascript
const downloadDocument = async (documentId, token) => {
  try {
    const response = await fetch("https://domain/api/econ/downloadDocument", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
      body: JSON.stringify({
        documentId: documentId,
      }),
    });

    const result = await response.json();

    if (result.success) {
      // Method 1: Download từ base64 content
      const binaryString = atob(result.data.fileContent);
      const bytes = new Uint8Array(binaryString.length);
      for (let i = 0; i < binaryString.length; i++) {
        bytes[i] = binaryString.charCodeAt(i);
      }

      const blob = new Blob([bytes], { type: "application/pdf" });
      const url = window.URL.createObjectURL(blob);

      const a = document.createElement("a");
      a.style.display = "none";
      a.href = url;
      a.download = result.data.fileName;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);

      console.log("Download completed:", result.data.fileName);
      return result.data;
    } else {
      throw new Error(`Error ${result.code}: ${result.message}`);
    }
  } catch (error) {
    console.error("Failed to download document:", error);
    return null;
  }
};

// Sử dụng
const token = localStorage.getItem("econtract_token");
const downloadResult = await downloadDocument("DOC_12345678", token);

if (downloadResult) {
  console.log(`File size: ${downloadResult.fileSize} bytes`);
  console.log(`Signatures: ${downloadResult.signatures.length}`);
}
```

### C# (.NET)

```csharp
public class DownloadDocumentRequest
{
    public string documentId { get; set; }
}

public class DownloadDocumentResponse
{
    public bool success { get; set; }
    public string message { get; set; }
    public int code { get; set; }
    public DownloadData data { get; set; }
}

public class DownloadData
{
    public string documentId { get; set; }
    public string fileName { get; set; }
    public long fileSize { get; set; }
    public string downloadUrl { get; set; }
    public string fileContent { get; set; }
    public DateTime createdAt { get; set; }
    public SignatureInfo[] signatures { get; set; }
}

public class SignatureInfo
{
    public string signerName { get; set; }
    public string signerEmail { get; set; }
    public DateTime signedAt { get; set; }
    public string certificateInfo { get; set; }
}

// Sử dụng
public async Task<byte[]> DownloadDocumentAsync(string documentId, string token)
{
    var client = new HttpClient();
    client.DefaultRequestHeaders.Add("Authorization", token);

    var request = new DownloadDocumentRequest { documentId = documentId };
    var json = JsonSerializer.Serialize(request);
    var content = new StringContent(json, Encoding.UTF8, "application/json");

    var response = await client.PostAsync("https://domain/api/econ/downloadDocument", content);
    var responseJson = await response.Content.ReadAsStringAsync();
    var result = JsonSerializer.Deserialize<DownloadDocumentResponse>(responseJson);

    if (result.success)
    {
        // Convert base64 to byte array
        var pdfBytes = Convert.FromBase64String(result.data.fileContent);

        // Save to file
        await File.WriteAllBytesAsync(result.data.fileName, pdfBytes);

        return pdfBytes;
    }
    else
    {
        throw new Exception($"Error {result.code}: {result.message}");
    }
}
```

## Use Cases

### 1. Batch download multiple documents

```javascript
const downloadMultipleDocuments = async (documentIds, token) => {
  const results = [];
  const downloadPromises = documentIds.map(async (documentId) => {
    try {
      const result = await downloadDocument(documentId, token);
      results.push({ documentId, success: true, data: result });
    } catch (error) {
      results.push({ documentId, success: false, error: error.message });
    }
  });

  await Promise.all(downloadPromises);

  const successful = results.filter((r) => r.success);
  const failed = results.filter((r) => !r.success);

  console.log(`Downloaded ${successful.length} documents successfully`);
  if (failed.length > 0) {
    console.log(`Failed to download ${failed.length} documents:`, failed);
  }

  return results;
};
```

### 2. Preview PDF in browser

```javascript
const previewDocument = async (documentId, token) => {
  try {
    const response = await fetch("https://domain/api/econ/downloadDocument", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
      body: JSON.stringify({ documentId }),
    });

    const result = await response.json();

    if (result.success) {
      // Convert base64 to blob
      const binaryString = atob(result.data.fileContent);
      const bytes = new Uint8Array(binaryString.length);
      for (let i = 0; i < binaryString.length; i++) {
        bytes[i] = binaryString.charCodeAt(i);
      }

      const blob = new Blob([bytes], { type: "application/pdf" });
      const url = window.URL.createObjectURL(blob);

      // Open in new tab for preview
      window.open(url, "_blank");

      // Or embed in iframe
      const iframe = document.createElement("iframe");
      iframe.src = url;
      iframe.width = "100%";
      iframe.height = "600px";
      document.getElementById("pdf-preview").appendChild(iframe);

      return url;
    }
  } catch (error) {
    console.error("Failed to preview document:", error);
  }
};
```

### 3. Download with progress tracking

```javascript
class DocumentDownloader {
  constructor(token) {
    this.token = token;
    this.downloadQueue = [];
    this.isProcessing = false;
    this.onProgress = null;
    this.onComplete = null;
  }

  addToQueue(documentId, fileName) {
    this.downloadQueue.push({ documentId, fileName, status: "pending" });
  }

  onProgressUpdate(callback) {
    this.onProgress = callback;
  }

  onDownloadComplete(callback) {
    this.onComplete = callback;
  }

  async processQueue() {
    if (this.isProcessing) return;

    this.isProcessing = true;
    const total = this.downloadQueue.length;
    let completed = 0;

    for (const item of this.downloadQueue) {
      try {
        item.status = "downloading";
        this.updateProgress(
          completed,
          total,
          `Downloading ${item.fileName}...`
        );

        const result = await downloadDocument(item.documentId, this.token);

        item.status = "completed";
        item.result = result;
        completed++;

        this.updateProgress(completed, total, `Downloaded ${item.fileName}`);

        if (this.onComplete) {
          this.onComplete(item);
        }
      } catch (error) {
        item.status = "failed";
        item.error = error.message;
        completed++;

        this.updateProgress(
          completed,
          total,
          `Failed to download ${item.fileName}`
        );
      }
    }

    this.isProcessing = false;
    this.updateProgress(total, total, "All downloads completed");
  }

  updateProgress(completed, total, message) {
    if (this.onProgress) {
      this.onProgress({
        completed,
        total,
        percentage: Math.round((completed / total) * 100),
        message,
      });
    }
  }

  getResults() {
    return {
      total: this.downloadQueue.length,
      completed: this.downloadQueue.filter(
        (item) => item.status === "completed"
      ).length,
      failed: this.downloadQueue.filter((item) => item.status === "failed")
        .length,
      details: this.downloadQueue,
    };
  }
}

// Sử dụng
const downloader = new DocumentDownloader(token);

downloader.onProgressUpdate((progress) => {
  console.log(`Progress: ${progress.percentage}% - ${progress.message}`);
  updateProgressBar(progress.percentage);
});

downloader.onDownloadComplete((item) => {
  console.log(`Downloaded: ${item.fileName}`);
});

// Add documents to queue
const documentsToDownload = [
  { id: "DOC_12345678", name: "contract_001.pdf" },
  { id: "DOC_87654321", name: "contract_002.pdf" },
  { id: "DOC_11111111", name: "contract_003.pdf" },
];

documentsToDownload.forEach((doc) => {
  downloader.addToQueue(doc.id, doc.name);
});

await downloader.processQueue();
const results = downloader.getResults();
console.log("Download Summary:", results);
```

### 4. Verify PDF signatures

```javascript
const verifyDocumentSignatures = async (documentId, token) => {
  const downloadResult = await downloadDocument(documentId, token);

  if (!downloadResult) return null;

  const verification = {
    documentId,
    fileName: downloadResult.fileName,
    isValid: true,
    signatures: [],
    errors: [],
  };

  downloadResult.signatures.forEach((signature, index) => {
    const signatureVerification = {
      order: index + 1,
      signerName: signature.signerName,
      signerEmail: signature.signerEmail,
      signedAt: signature.signedAt,
      certificateInfo: signature.certificateInfo,
      isValid: true,
      warnings: [],
    };

    // Check signature timing
    const signedDate = new Date(signature.signedAt);
    const now = new Date();
    const daysSinceSign = Math.floor(
      (now - signedDate) / (1000 * 60 * 60 * 24)
    );

    if (daysSinceSign > 365) {
      signatureVerification.warnings.push("Signature is older than 1 year");
    }

    // Check certificate info
    if (!signature.certificateInfo.includes("CN=")) {
      signatureVerification.isValid = false;
      signatureVerification.warnings.push("Invalid certificate format");
    }

    verification.signatures.push(signatureVerification);
  });

  // Overall validation
  verification.isValid = verification.signatures.every((sig) => sig.isValid);

  if (verification.signatures.length === 0) {
    verification.isValid = false;
    verification.errors.push("No signatures found in document");
  }

  return verification;
};
```

### 5. Auto-archive completed documents

```javascript
class DocumentArchiver {
  constructor(token, archiveSettings) {
    this.token = token;
    this.archiveSettings = archiveSettings;
  }

  async archiveCompletedDocuments(documentIds) {
    const archived = [];
    const failed = [];

    for (const documentId of documentIds) {
      try {
        const downloadResult = await downloadDocument(documentId, this.token);

        if (downloadResult) {
          // Create archive folder structure
          const archiveDate = new Date().toISOString().split("T")[0]; // YYYY-MM-DD
          const folderPath = `${this.archiveSettings.basePath}/${archiveDate}`;

          // Save file with metadata
          const archiveData = {
            documentId,
            fileName: downloadResult.fileName,
            fileSize: downloadResult.fileSize,
            archivedAt: new Date().toISOString(),
            signatures: downloadResult.signatures,
            fileContent: downloadResult.fileContent,
          };

          // Save to archive (implementation depends on storage system)
          await this.saveToArchive(folderPath, archiveData);

          archived.push(documentId);
        }
      } catch (error) {
        failed.push({ documentId, error: error.message });
      }
    }

    return { archived, failed };
  }

  async saveToArchive(folderPath, archiveData) {
    // Implementation depends on your archive system
    // Could be: AWS S3, Google Drive, local file system, etc.
    console.log(`Archiving to ${folderPath}/${archiveData.fileName}`);

    // Example: Save to local storage
    if (typeof localStorage !== "undefined") {
      const archiveKey = `archive_${archiveData.documentId}`;
      localStorage.setItem(archiveKey, JSON.stringify(archiveData));
    }
  }
}
```

## Error Handling

| Code | Message                   | Cause                     | Solution                     |
| ---- | ------------------------- | ------------------------- | ---------------------------- |
| 195  | Document not found        | Document ID không tồn tại | Kiểm tra Document ID         |
| 204  | Document not completed    | Tài liệu chưa hoàn thành  | Đợi tài liệu hoàn thành      |
| 401  | Unauthorized              | Token không hợp lệ        | Re-authenticate              |
| 665  | No permission to download | Không có quyền tải xuống  | Kiểm tra quyền truy cập      |
| 500  | System error              | Lỗi hệ thống              | Thử lại hoặc liên hệ support |

## File Size Considerations

:::warning Lưu ý về kích thước file

- File PDF có thể có kích thước lớn (thường 1-10MB)
- Base64 encoding làm tăng kích thước file ~33%
- Cân nhắc sử dụng `downloadUrl` thay vì `fileContent` cho file lớn
- Implement progress tracking cho download file lớn
  :::

## Security Best Practices

- ✅ **Validate permissions** trước khi download
- ✅ **Log download activities** để audit
- ✅ **Verify file integrity** sau khi download
- ✅ **Scan for malware** nếu cần thiết
- ✅ **Implement rate limiting** để tránh abuse
- ✅ **Use HTTPS** cho tất cả download requests

---
