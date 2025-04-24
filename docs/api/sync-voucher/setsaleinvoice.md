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
| CustomerCode | VARCHAR(32) | Có | Mã khách hàng |
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
| JobCode | VARCHAR(32) | Không | Mã vụ việc |
| DeptCode | VARCHAR(32) | Không | Mã bộ phận |
| ContractCode | VARCHAR(32) | Không | Mã hợp đồng |
| ExpenseCode | VARCHAR(32) | Không | Mã phí |

## Ví dụ request

```json
{
  "form": "setSaleInvoice",
  "data": [
    {
      "VoucherId": "SI20230001",
      "CustomerCode": "KH001",
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
          "TaxRate": "10",
          "TaxAmount": 1200000,
          "TotalAmount": 13200000,
          "JobCode": "VV001",
          "DeptCode": "BP001",
          "ContractCode": "HD001",
          "ExpenseCode": "PHI001"
        },
        {
          "RefNumber": 2,
          "ItemCode": "VT002",
          "Uom": "Cái",
          "Quantity": 2,
          "UnitPrice": 6000000,
          "Amount": 12000000,
          "TaxRate": "10",
          "TaxAmount": 1200000,
          "TotalAmount": 13200000,
          "JobCode": "VV001",
          "DeptCode": "BP001",
          "ContractCode": "HD001",
          "ExpenseCode": "PHI002"
        }
      ]
    }
  ]
}
```

## Lưu ý quan trọng

1. Khác với hóa đơn mua hàng, hóa đơn bán hàng có thông tin thuế được tích hợp ngay trong chi tiết hàng hóa (không có mảng `tax` riêng biệt).
2. Mỗi dòng chi tiết hóa đơn bán hàng đều có thông tin về thuế suất và tiền thuế.
3. Trường `TotalAmount` trong chi tiết hàng hóa là tổng tiền đã bao gồm thuế (`Amount + TaxAmount`).

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
    public string CustomerCode { get; set; }
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
    public string JobCode { get; set; }
    public string DeptCode { get; set; }
    public string ContractCode { get; set; }
    public string ExpenseCode { get; set; }
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