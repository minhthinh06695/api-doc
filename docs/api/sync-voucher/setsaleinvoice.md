# Hóa đơn bán hàng

Form `setSaleInvoice` được sử dụng để đồng bộ thông tin hóa đơn bán hàng thông qua API SyncVoucher.

## Cấu trúc chứng từ

Chứng từ hóa đơn bán hàng gồm 2 phần chính:

1. **Header (Thông tin chung)**: Chứa thông tin chính của hóa đơn bán hàng
2. **Detail (Chi tiết hàng hóa)**: Chứa thông tin chi tiết về các mặt hàng bán

## Các trường dữ liệu

### Header (Thông tin chung)

| Param | Kiểu dữ liệu | Bắt buộc | Mô tả |
|-------|-------------|----------|-------|
| VoucherId | VARCHAR(64) | Có | Mã chứng từ |
| CustomerId | VARCHAR(32) | Có | Mã khách hàng |
| VoucherDate | DATE | Có | Ngày chứng từ |
| VoucherNumber | VARCHAR(32) | Có | Số chứng từ |
| Description | NVARCHAR(500) | Không | Diễn giải |
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
| Amount | DECIMAL(18,2) | Có | Thành tiền |
| TaxRate | VARCHAR(8) | Có | Thuế suất |
| TaxAmount | DECIMAL(18,4) | Có | Tiền thuế |
| TotalAmount | DECIMAL(18,4) | Có | Tổng tiền (bao gồm thuế) |
| VoucherId | VARCHAR(64) | Có | Mã chứng từ (từ cha) |
| Job | VARCHAR(32) | Không | Mã vụ việc |
| Hbl | VARCHAR(512) | Không | Số House B/L |
| Mbl | VARCHAR(512) | Không | Số Master B/L |

## Ví dụ request

```json
{
  "form": "setSaleInvoice",
  "data": [
    {
      "VoucherId": "SI20230001",
      "CustomerId": "KH001",
      "VoucherDate": "2023-04-15",
      "VoucherNumber": "HD0001",
      "Description": "Bán hàng cho khách hàng ABC",
      "Currency": "VND",
      "ExchangeRate": 1,
      "detail": [
        {
          "RefNumber": 1,
          "ItemCode": "VT001",
          "Uom": "Cái",
          "Quantity": 1,
          "UnitPrice": 12000000,
          "Amount": 12000000,
          "TaxRate": "10%",
          "TaxAmount": 1200000,
          "TotalAmount": 13200000,
          "Job": "VV001",
          "Hbl": "HBL123456",
          "Mbl": "MBL789012"
        },
        {
          "RefNumber": 2,
          "ItemCode": "VT002",
          "Uom": "Cái",
          "Quantity": 2,
          "UnitPrice": 6000000,
          "Amount": 12000000,
          "TaxRate": "10%",
          "TaxAmount": 1200000,
          "TotalAmount": 13200000,
          "Job": "VV001",
          "Hbl": "HBL123456",
          "Mbl": "MBL789012"
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

public class SyncSaleInvoice
{
    private readonly HttpClient _client = new HttpClient();
    private readonly string _baseUrl = "https://api.example.com/api";
    private readonly string _authToken;

    public SyncSaleInvoice(string authToken)
    {
        _authToken = authToken;
        _client.DefaultRequestHeaders.Authorization = 
            new System.Net.Http.Headers.AuthenticationHeaderValue("Bearer", _authToken);
    }

    public async Task<ApiResult> SyncInvoice(SaleInvoice invoice)
    {
        // Tạo request body
        var requestBody = new
        {
            form = "setSaleInvoice",
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

public class SaleInvoice
{
    public string VoucherId { get; set; }
    public string CustomerId { get; set; }
    public DateTime VoucherDate { get; set; }
    public string VoucherNumber { get; set; }
    public string Description { get; set; }
    public string Currency { get; set; }
    public decimal ExchangeRate { get; set; }
    public List<SaleInvoiceDetail> detail { get; set; }
}

public class SaleInvoiceDetail
{
    public int RefNumber { get; set; }
    public string ItemCode { get; set; }
    public string Uom { get; set; }
    public decimal Quantity { get; set; }
    public decimal UnitPrice { get; set; }
    public decimal Amount { get; set; }
    public string TaxRate { get; set; }
    public decimal TaxAmount { get; set; }
    public decimal TotalAmount { get; set; }
    public string VoucherId { get; set; }
    public string Job { get; set; }
    public string Hbl { get; set; }
    public string Mbl { get; set; }
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

1. Khác với hóa đơn mua hàng, hóa đơn bán hàng có thông tin thuế được tích hợp ngay trong chi tiết hàng hóa (không có mảng `tax` riêng biệt).
2. Mỗi dòng chi tiết hóa đơn bán hàng đều có thông tin về thuế suất và tiền thuế.
3. Trường `TotalAmount` trong chi tiết hàng hóa là tổng tiền đã bao gồm thuế (`Amount + TaxAmount`).
4. Trường `VoucherId` trong chi tiết phải trùng với `VoucherId` của header để đảm bảo tính toàn vẹn dữ liệu.
5. Giá trị `TaxRate` có thể được biểu thị dưới dạng phần trăm (ví dụ: "10%") hoặc dạng số (ví dụ: "10").
6. Đảm bảo tổng giá trị của các dòng chi tiết khớp với tổng giá trị của hóa đơn.