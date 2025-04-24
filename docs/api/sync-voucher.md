# Đồng bộ chứng từ 

API `SyncVoucher` được sử dụng để đồng bộ các chứng từ phức tạp có cấu trúc phân cấp (như hóa đơn, đơn hàng có chi tiết). API này hỗ trợ đồng bộ dữ liệu với cấu trúc JSON phân cấp thay vì DataTable đơn giản như SyncData.

## Endpoint

```http
POST /api/SyncVoucher
```

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
- **form**: Tên form được định nghĩa trong file cấu hình XML mapping
- **data**: Mảng các object chứng từ, mỗi object có thể chứa các mảng con đại diện cho các bảng con

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

### Hóa đơn mua hàng (setPurchaseInvoice)

Sử dụng để đồng bộ thông tin hóa đơn mua hàng.

#### Cấu trúc chứng từ

1. **Header (Thông tin chung)**: Chứa thông tin chính của hóa đơn mua hàng
2. **Detail (Chi tiết hàng hóa)**: Chứa thông tin chi tiết về các mặt hàng mua
3. **Tax (Thông tin thuế)**: Chứa thông tin về thuế VAT của hóa đơn

#### Các trường dữ liệu của Header

| Param | Kiểu dữ liệu | Bắt buộc | Mô tả |
|-------|-------------|----------|-------|
| VoucherId | VARCHAR(64) | Có | Mã chứng từ |
| SupplierId | VARCHAR(32) | Có | Mã nhà cung cấp |
| VoucherDate | DATE | Có | Ngày chứng từ |
| VoucherNumber | VARCHAR(32) | Có | Số chứng từ |
| Description | NVARCHAR(512) | Không | Diễn giải |
| Currency | VARCHAR(5) | Có | Loại tiền |
| ExchangeRate | DECIMAL(18,4) | Có | Tỷ giá |

#### Các trường dữ liệu của Detail (Chi tiết hàng hóa)

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

#### Các trường dữ liệu của Tax (Thông tin thuế)

| Param | Kiểu dữ liệu | Bắt buộc | Mô tả |
|-------|-------------|----------|-------|
| VatInvoiceNumber | VARCHAR(32) | Có | Số hóa đơn VAT |
| VatInvoiceDate | DATE | Có | Ngày hóa đơn VAT |
| VatInvoiceSymbol | VARCHAR(32) | Không | Ký hiệu hóa đơn |
| TotalAmount | DECIMAL(18,4) | Có | Tiền trước thuế |
| TaxRate | VARCHAR(8) | Có | Thuế suất |
| TaxAmount | DECIMAL(18,4) | Có | Tiền thuế |

#### Ví dụ request

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

### Hóa đơn bán hàng (setSaleInvoice)

Sử dụng để đồng bộ thông tin hóa đơn bán hàng.

#### Cấu trúc chứng từ

1. **Header (Thông tin chung)**: Chứa thông tin chính của hóa đơn bán hàng
2. **Detail (Chi tiết hàng hóa)**: Chứa thông tin chi tiết về các mặt hàng bán

#### Các trường dữ liệu của Header

| Param | Kiểu dữ liệu | Bắt buộc | Mô tả |
|-------|-------------|----------|-------|
| VoucherId | VARCHAR(64) | Có | Mã chứng từ |
| CustomerId | VARCHAR(32) | Có | Mã khách hàng |
| VoucherDate | DATE | Có | Ngày chứng từ |
| VoucherNumber | VARCHAR(32) | Có | Số chứng từ |
| Description | NVARCHAR(500) | Không | Diễn giải |
| Currency | VARCHAR(5) | Có | Loại tiền |
| ExchangeRate | DECIMAL(18,4) | Có | Tỷ giá |

#### Các trường dữ liệu của Detail (Chi tiết hàng hóa)

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

#### Ví dụ request

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

## Ví dụ mã nguồn

### Ví dụ với C#

```csharp
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;

public class SyncVoucherExample
{
    private readonly HttpClient _client = new HttpClient();
    private readonly string _baseUrl = "https://api.example.com/api";
    private readonly string _authToken;

    public SyncVoucherExample(string authToken)
    {
        _authToken = authToken;
        _client.DefaultRequestHeaders.Authorization = 
            new System.Net.Http.Headers.AuthenticationHeaderValue("Bearer", _authToken);
    }

    public async Task<ApiResult> SyncPurchaseInvoice(PurchaseInvoice invoice)
    {
        // Chuyển đổi invoice thành JObject
        JObject invoiceObj = JObject.FromObject(invoice);
        
        // Tạo request body
        var requestBody = new
        {
            form = "setPurchaseInvoice",
            data = new[] { invoiceObj }
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
    [JsonProperty("success")]
    public bool Success { get; set; }

    [JsonProperty("messages")]
    public string Messages { get; set; }

    [JsonProperty("records")]
    public int Records { get; set; }

    [JsonProperty("fkey")]
    public string Fkey { get; set; }

    [JsonProperty("code")]
    public int Code { get; set; }
}
```