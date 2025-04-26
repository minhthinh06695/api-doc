# Đồng bộ chứng từ 

API `SyncVoucher` được sử dụng để đồng bộ các chứng từ phức tạp có cấu trúc phân cấp (như hóa đơn, đơn hàng có chi tiết). API này hỗ trợ đồng bộ dữ liệu với cấu trúc JSON phân cấp thay vì đơn giản như [API Đồng bộ danh mục](./sync-data).

## Endpoint

<blockquote>
  <pre><code><b>POST</b> /api/SyncVoucher</code></pre>
</blockquote>

## Headers

| Tên | Giá trị | Mô tả |
|-----|--------|-------|
| Content-Type | application/json | Kiểu dữ liệu của request |
| Authorization | your_token_here | Token xác thực |

## Request Body

Request body có cấu trúc như sau:

```json
{
  "form": "tên_form",
  "data": [
    {
      "field1": "value1",
      "field2": "value2",
      "detail": [
        {
          "detailField1": "detailValue1",
          "detailField2": "detailValue2"
        },
        // Các dòng chi tiết khác
      ],
      "tax": [
        {
          "taxField1": "taxValue1",
          "taxField2": "taxValue2"
        },
        // Các dòng thuế khác
      ]
    },
    // Các chứng từ khác
  ]
}
```

Trong đó:
- **form**: Tên form được định nghĩa trong phần chi tiết đồng bộ của từng chứng từ
- **data**: Mảng các object chứng từ, mỗi object có thể chứa các mảng con

## Response

### Thành công (200 OK)

```json
{
  "success": true,
  "messages": "SUCCESS",
  "records": 10,
  "fkey": "key_123",
  "code": 200
}
```

Trong đó:
- **success**: `true` nếu đồng bộ thành công
- **messages**: Thông báo kết quả
- **records**: Số lượng bản ghi đã đồng bộ
- **fkey**: Khóa tham chiếu kết quả (nếu có)
- **code**: Mã trạng thái

### Lỗi

```json
{
  "success": false,
  "messages": "Thông báo lỗi",
  "code": mã_lỗi
}
```

## Mã lỗi

| Mã | Mô tả |
|----|-------|
| 200 | Thành công |
| 201 | Form không tồn tại |
| 202 | Dữ liệu trống |
| 400 | Request không hợp lệ |
| 401 | Lỗi xác thực |
| 500 | Lỗi server |
| 601 | Lỗi cấu trúc dữ liệu |

## Các form hỗ trợ

API SyncVoucher hỗ trợ các form sau:

- [Hóa đơn mua hàng (setPurchaseinvoice)](sync-voucher/setpurchaseinvoice)
- [Hóa đơn bán hàng (setSaleinvoice)](sync-voucher/setsaleinvoice)
- [Phiếu thu tiền mặt (setCashReceipt)](sync-voucher/setcashreceipt)
- [Phiếu chi tiền mặt (setCashDisbursement)](sync-voucher/setcashdisbursement)

## Xử lý dữ liệu phân cấp

### Quan hệ giữa các bảng

API SyncVoucher xử lý dữ liệu có cấu trúc phân cấp:

1. **Dữ liệu chính (header)**: Chứa thông tin chung của chứng từ
2. **Dữ liệu chi tiết (detail/tax)**: Chứa thông tin chi tiết, được liên kết với dữ liệu chính

Việc liên kết giữa dữ liệu chính và dữ liệu chi tiết được xác định trong cấu hình XML.

### Quy tắc xử lý dữ liệu

1. **Mã chứng từ (VoucherId)**: Phải là duy nhất cho mỗi chứng từ và được sử dụng để liên kết các bảng.
2. **Xử lý giao dịch**: Toàn bộ quá trình đồng bộ được thực hiện trong một transaction, nếu có lỗi xảy ra tại bất kỳ bước nào, toàn bộ dữ liệu sẽ được rollback.
3. **Xác thực dữ liệu**: Dữ liệu được kiểm tra theo cấu hình trong file XML mapping trước khi lưu vào database.

## Lưu ý khi sử dụng

1. Đảm bảo rằng dữ liệu gửi đi tuân thủ đúng cấu trúc và ràng buộc được định nghĩa trong file cấu hình.
2. Các trường bắt buộc (Required="true") phải được cung cấp giá trị.
3. API có cơ chế cache và loại bỏ request trùng lặp, điều này giúp tối ưu hiệu suất nhưng cũng có thể gây ra vấn đề nếu bạn muốn gửi lại cùng một dữ liệu.
4. Khi gửi chứng từ có cấu trúc phân cấp, tên của các mảng con (như "detail", "tax") phải khớp với tên được định nghĩa trong file cấu hình.

## Xử lý lỗi

Khi gặp lỗi, API sẽ trả về thông báo lỗi chi tiết trong trường `messages`. Dưới đây là một số lỗi phổ biến và cách khắc phục:

1. **Form không tồn tại (201)**: Kiểm tra lại tên form trong request.
2. **Dữ liệu trống (202)**: Đảm bảo mảng data không rỗng.
3. **Lỗi cấu trúc dữ liệu (601)**: Kiểm tra lại cấu trúc dữ liệu, đặc biệt là các trường bắt buộc và kiểu dữ liệu.

## Ví dụ mã nguồn C#

```csharp
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;

public class SyncPurchaseInvoice
{
    private readonly HttpClient _client = new HttpClient();
    private readonly string _baseUrl = "https://api.example.com/api";
    private readonly string _authToken;

    public SyncPurchaseInvoice(string authToken)
    {
        _authToken = authToken;
        _client.DefaultRequestHeaders.Authorization = 
            new System.Net.Http.Headers.AuthenticationHeaderValue("Bearer", _authToken);
    }

    public async Task<ApiResult> SyncInvoice(PurchaseInvoice invoice)
    {
        // Tạo request body
        var requestBody = new
        {
            form = "setPurchaseInvoice",
            data = new[] { invoice }
        };

        // Gọi API
        var content = new StringContent(
            JsonConvert.SerializeObject(requestBody),
            Encoding.UTF8,
            "application/json");

        var response = await _client.PostAsync($"{_baseUrl}/SyncVoucher", content);
        response.EnsureSuccessStatusCode();

        return JsonConvert.DeserializeObject<ApiResult>(
            await response.Content.ReadAsStringAsync());
    }
}

public class PurchaseInvoice
{
    public string VoucherId { get; set; }
    public string SupplierCode { get; set; }
    public DateTime VoucherDate { get; set; }
    public string VoucherNumber { get; set; }
    public string Description { get; set; }
    public string Currency { get; set; }
    public decimal ExchangeRate { get; set; }
    public decimal TotalQuantity { get; set; }
    public decimal TotalNetAmount { get; set; }
    public decimal TotalTaxAmount { get; set; }
    public decimal TotalAmount { get; set; }
    public List<PurchaseInvoiceDetail> detail { get; set; }
    public List<PurchaseInvoiceTax> tax { get; set; }
}

public class PurchaseInvoiceDetail
{
    public int RefNumber { get; set; }
    public string ItemCode { get; set; }
    public string Uom { get; set; }
    public decimal Quantity { get; set; }
    public decimal UnitPrice { get; set; }
    public decimal Amount { get; set; }
    public string JobCode { get; set; }
    public string DeptCode { get; set; }
    public string ContractCode { get; set; }
    public string ExpenseCode { get; set; }
}

public class PurchaseInvoiceTax
{
    public string VatInvoiceNumber { get; set; }
    public DateTime VatInvoiceDate { get; set; }
    public string VatInvoiceSymbol { get; set; }
    public decimal TotalAmount { get; set; }
    public string TaxRate { get; set; }
    public decimal TaxAmount { get; set; }
}

public class ApiResult
{
    public bool Success { get; set; }
    public string Messages { get; set; }
    public int Records { get; set; }
    public string Fkey { get; set; }
    public int Code { get; set; }
}
```