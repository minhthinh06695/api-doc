# Phiếu thu tiền

Form `setCashReceipt` được sử dụng để đồng bộ thông tin phiếu thu tiền thông qua API SyncVoucher.

## Cấu trúc chứng từ

Chứng từ phiếu thu tiền gồm 2 phần chính:

1. **Header (Thông tin chung)**: Chứa thông tin chính của phiếu thu tiền
2. **Detail (Chi tiết)**: Chứa thông tin chi tiết về các khoản thu

## Các trường dữ liệu

### Header (Thông tin chung)

| Param | Kiểu dữ liệu | Bắt buộc | Mô tả |
|-------|-------------|----------|-------|
| VoucherId | VARCHAR(64) | Có | Mã chứng từ |
| VoucherDate | DATE | Có | Ngày chứng từ |
| VoucherNumber | VARCHAR(12) | Có | Số chứng từ |
| CustomerCode | VARCHAR(32) | Có | Mã khách hàng |
| Payer | NVARCHAR(128) | Không | Người nộp tiền |
| Address | NVARCHAR(128) | Không | Địa chỉ người nộp tiền |
| DebitAccount | VARCHAR(32) | Có | Tài khoản nợ (Tài khoản kế toán) |
| Description | NVARCHAR(500) | Không | Diễn giải |
| Currency | VARCHAR(5) | Có | Loại tiền |
| ExchangeRate | DECIMAL(18,4) | Có | Tỷ giá |

### Detail (Chi tiết)

| Param | Kiểu dữ liệu | Bắt buộc | Mô tả |
|-------|-------------|----------|-------|
| RefNumber | DECIMAL(5,0) | Có | Số thứ tự |
| CreditAccount | VARCHAR(32) | Có | Mã tài khoản có (Tài khoản kế toán) |
| Amount | DECIMAL(18,2) | Có | Số tiền |
| JobCode | VARCHAR(32) | Không | Mã vụ việc |
| DeptCode | VARCHAR(32) | Không | Mã bộ phận |
| ContractCode | VARCHAR(32) | Không | Mã hợp đồng |
| ExpenseCode | VARCHAR(32) | Không | Mã phí |

## Ví dụ request

```json
{
  "form": "setCashReceipt",
  "data": [
    {
      "VoucherId": "PT20230001",
      "VoucherDate": "2023-04-15",
      "VoucherNumber": "PT0001",
      "CustomerCode": "KH001",
      "Payer": "Nguyễn Văn A",
      "Address": "Số 123 Đường ABC, Quận 1, TP.HCM",
      "DebitAccount": "111",
      "Description": "Thu tiền khách hàng",
      "Currency": "VND",
      "ExchangeRate": 1,
      "detail": [
        {
          "RefNumber": 1,
          "CreditAccount": "131",
          "Amount": 10000000,
          "JobCode": "VV001",
          "DeptCode": "BP001",
          "ContractCode": "HD001",
          "ExpenseCode": "PHI001"
        },
        {
          "RefNumber": 2,
          "CreditAccount": "511",
          "Amount": 5000000,
          "JobCode": "VV002",
          "DeptCode": "BP002",
          "ContractCode": "HD002",
          "ExpenseCode": "PHI002"
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
4. Tài khoản nợ (`DebitAccount`) và tài khoản có (`CreditAccount`) phải là những tài khoản hợp lệ trong hệ thống kế toán.

## Ví dụ mã nguồn C#

```csharp
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;

public class SyncCashReceipt
{
    private readonly HttpClient _client = new HttpClient();
    private readonly string _baseUrl = "https://api.example.com/api";
    private readonly string _authToken;

    public SyncCashReceipt(string authToken)
    {
        _authToken = authToken;
        _client.DefaultRequestHeaders.Authorization = 
            new System.Net.Http.Headers.AuthenticationHeaderValue("Bearer", _authToken);
    }

    public async Task<ApiResult> SyncReceipt(CashReceipt receipt)
    {
        // Tạo request body
        var requestBody = new
        {
            form = "setCashReceipt",
            data = new[] { receipt }
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

public class CashReceipt
{
    public string VoucherId { get; set; }
    public DateTime VoucherDate { get; set; }
    public string VoucherNumber { get; set; }
    public string CustomerCode { get; set; }
    public string Payer { get; set; }
    public string Address { get; set; }
    public string DebitAccount { get; set; }
    public string Description { get; set; }
    public string Currency { get; set; }
    public decimal ExchangeRate { get; set; }
    public List<CashReceiptDetail> detail { get; set; }
}

public class CashReceiptDetail
{
    public int RefNumber { get; set; }
    public string CreditAccount { get; set; }
    public decimal Amount { get; set; }
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