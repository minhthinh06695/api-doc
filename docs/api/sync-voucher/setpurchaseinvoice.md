# Hóa đơn mua hàng

Form `setPurchaseInvoice` được sử dụng để đồng bộ thông tin hóa đơn mua hàng thông qua API SyncVoucher.

## Cấu trúc chứng từ

Chứng từ hóa đơn mua hàng gồm 3 phần chính:

1. **Header (Thông tin chung)**: Chứa thông tin chính của hóa đơn mua hàng
2. **Detail (Chi tiết hàng hóa)**: Chứa thông tin chi tiết về các mặt hàng mua
3. **Tax (Thông tin thuế)**: Chứa thông tin về thuế VAT của hóa đơn

## Các trường dữ liệu

### Header (Thông tin chung)

| Attribute    | Type        | Required | Description          |
|--------------|-------------|----------|----------------------|
| VoucherId    | String(64)  | ✔️       | Mã chứng từ          |
| SupplierCode | String(32)  | ✔️       | Mã nhà cung cấp, chính là mã khách hàng trong Danh mục khách hàng |
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
| JobCode      | String(32)  |          | Mã vụ việc           |
| DeptCode     | String(32)  |          | Mã bộ phận           |
| ContractCode | String(32)  |          | Mã hợp đồng          |
| ExpenseCode  | String(32)  |          | Mã phí               |

### Tax (Thông tin thuế)

| Attribute        | Type        | Required | Description          |
|------------------|-------------|----------|----------------------|
| VatInvoiceNumber | String(32)  | ✔️       | Số hóa đơn VAT       |
| VatInvoiceDate   | Date        | ✔️       | Ngày hóa đơn VAT     |
| VatInvoiceSymbol | String(32)  |          | Ký hiệu hóa đơn      |
| TotalAmount      | Long        | ✔️       | Tiền trước thuế      |
| TaxRate          | String(8)   | ✔️       | Thuế suất            |
| TaxAmount        | Long        | ✔️       | Tiền thuế            |

## Ví dụ request

```json
{
  "form": "setPurchaseInvoice",
  "data": [
    {
      "VoucherId": "PI20230001",
      "SupplierCode": "NCC001",
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
          "JobCode": "VV001",
          "DeptCode": "BP001",
          "ContractCode": "HD001",
          "ExpenseCode": "PHI001"
        },
        {
          "RefNumber": 2,
          "ItemCode": "VT002",
          "Uom": "Cái",
          "Quantity": 3,
          "UnitPrice": 5000000,
          "Amount": 15000000,
          "JobCode": "VV002",
          "DeptCode": "BP002",
          "ContractCode": "HD002",
          "ExpenseCode": "PHI002"
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

## Lưu ý quan trọng

1. Trường `VoucherId` phải là duy nhất trong hệ thống để tránh trùng lặp chứng từ.
2. Đảm bảo các trường bắt buộc đều được điền đầy đủ.
3. Ngày tháng phải được định dạng theo chuẩn ISO (YYYY-MM-DD).

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