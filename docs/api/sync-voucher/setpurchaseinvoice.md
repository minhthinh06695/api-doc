# Hóa đơn mua hàng

Form `setPurchaseInvoice` được sử dụng để đồng bộ thông tin hóa đơn mua hàng thông qua API SyncVoucher.

## Cấu trúc chứng từ

Chứng từ hóa đơn mua hàng gồm 3 phần chính:

1. **Header (Thông tin chung)**: Chứa thông tin chính của hóa đơn mua hàng
2. **Detail (Chi tiết hàng hóa)**: Chứa thông tin chi tiết về các mặt hàng mua
3. **Tax (Thông tin thuế)**: Chứa thông tin về thuế VAT của hóa đơn

## Các trường dữ liệu

### Header (Thông tin chung)

| Param | Kiểu dữ liệu | Bắt buộc | Mô tả |
|-------|-------------|----------|-------|
| VoucherId | VARCHAR(64) | Có | Mã chứng từ |
| SupplierId | VARCHAR(32) | Có | Mã nhà cung cấp |
| VoucherDate | DATE | Có | Ngày chứng từ |
| VoucherNumber | VARCHAR(32) | Có | Số chứng từ |
| Description | NVARCHAR(512) | Không | Diễn giải |
| Currency | VARCHAR(5) | Có | Loại tiền |
| ExchangeRate | DECIMAL(18,4) | Có | Tỷ giá |

### Detail (Chi tiết hàng hóa)

| Param | Kiểu dữ liệu | Bắt buộc | Mô tả |
|-------|-------------|----------|-------|
| RefNumber | DECIMAL(5,0) | Có | Số thứ tự |
| ItemCode | VARCHAR(32) | Có | Mã hàng |
| Uom | NVARCHAR(32) | Có | Đơn vị tính |
| Quantity | DECIMAL(18,4) | Có | Số lượng |
| UnitPrice | DECIMAL(18,4) | Có | Đơn giá |
| Amount | DECIMAL(18,4) | Có | Thành tiền |
| Job | VARCHAR(32) | Không | Mã vụ việc |
| Hbl | VARCHAR(512) | Không | Số House B/L |
| Mbl | VARCHAR(512) | Không | Số Master B/L |

### Tax (Thông tin thuế)

| Param | Kiểu dữ liệu | Bắt buộc | Mô tả |
|-------|-------------|----------|-------|
| VatInvoiceNumber | VARCHAR(32) | Có | Số hóa đơn VAT |
| VatInvoiceDate | DATE | Có | Ngày hóa đơn VAT |
| VatInvoiceSymbol | VARCHAR(32) | Không | Ký hiệu hóa đơn |
| TotalAmount | DECIMAL(18,4) | Có | Tiền trước thuế |
| TaxRate | VARCHAR(8) | Có | Thuế suất |
| TaxAmount | DECIMAL(18,4) | Có | Tiền thuế |

## Ví dụ request

```json
{
  "form": "setPurchaseInvoice",
  "data": [
    {
      "VoucherId": "PI20230001",
      "SupplierId": "NCC001",
      "VoucherDate": "2023-04-15",
      "VoucherNumber": "ABC0001",
      "Description": "Mua hàng hóa từ nhà cung cấp ABC",
      "Currency": "VND",
      "ExchangeRate": 1,
      "detail": [
        {
          "RefNumber": 1,
          "ItemCode": "VT001",
          "Uom": "Cái",
          "Quantity": 2,
          "UnitPrice": 10000000,
          "Amount": 20000000,
          "Job": "VV001",
          "Hbl": "HBL123456",
          "Mbl": "MBL789012"
        },
        {
          "RefNumber": 2,
          "ItemCode": "VT002",
          "Uom": "Cái",
          "Quantity": 3,
          "UnitPrice": 5000000,
          "Amount": 15000000,
          "Job": "VV002",
          "Hbl": "HBL123456",
          "Mbl": "MBL789012"
        }
      ],
      "tax": [
        {
          "VatInvoiceNumber": "0000123",
          "VatInvoiceDate": "2023-04-15",
          "VatInvoiceSymbol": "AA/20E",
          "TotalAmount": 35000000,
          "TaxRate": "10",
          "TaxAmount": 3500000
        }
      ]
    }
  ]
}
```

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
    public string SupplierId { get; set; }
    public DateTime VoucherDate { get; set; }
    public string VoucherNumber { get; set; }
    public string Description { get; set; }
    public string Currency { get; set; }
    public decimal ExchangeRate { get; set; }
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
    public string Job { get; set; }
    public string Hbl { get; set; }
    public string Mbl { get; set; }
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

## Lưu ý quan trọng

1. Trường `VoucherId` phải là duy nhất trong hệ thống để tránh trùng lặp chứng từ.
2. Đảm bảo các trường bắt buộc đều được điền đầy đủ.
3. Ngày tháng phải được định dạng theo chuẩn ISO (YYYY-MM-DD).
4. Số tiền (`Amount`, `TotalAmount`, `TaxAmount`) phải được tính toán chính xác.
5. Trường `Currency` và `ExchangeRate` phải phù hợp với chính sách tiền tệ của doanh nghiệp.