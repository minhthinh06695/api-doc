# Hóa đơn bán hàng

Form `setSaleInvoice` được sử dụng để đồng bộ thông tin hóa đơn bán hàng thông qua API SyncVoucher.

## Cấu trúc chứng từ

Chứng từ hóa đơn bán hàng gồm 2 phần chính:

1. **Header (Thông tin chung)**: Chứa thông tin chính của hóa đơn bán hàng
2. **Detail (Chi tiết hàng hóa)**: Chứa thông tin chi tiết về các mặt hàng bán

## Các trường dữ liệu

### Header (Thông tin chung)

| Attribute    | Type        | Required | Description          |
|--------------|-------------|----------|----------------------|
| VoucherId    | String(64)  | ✔️       | Mã chứng từ          |
| CustomerCode | String(32)  | ✔️       | Mã khách hàng        |
| VoucherDate  | Date        | ✔️       | Ngày chứng từ        |
| VoucherNumber| String(12)  | ✔️       | Số chứng từ          |
| Description  | String(512) |          | Diễn giải            |
| Currency     | String(3)   | ✔️       | Loại tiền            |
| ExchangeRate | Long        | ✔️       | Tỷ giá               |

### Detail (Chi tiết hàng hóa)

| Attribute    | Type        | Required | Description          |
|--------------|-------------|----------|----------------------|
| RefNumber    | Long        | ✔️       | Số thứ tự            |
| ItemCode     | String(32)  | ✔️       | Mã hàng              |
| Uom          | String(32)  | ✔️       | Đơn vị tính          |
| Quantity     | Long        | ✔️       | Số lượng             |
| UnitPrice    | Long        | ✔️       | Đơn giá              |
| Amount       | Long        | ✔️       | Thành tiền           |
| TaxRate      | String(8)   |

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