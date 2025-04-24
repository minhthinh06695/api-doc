# Phiếu thu tiền

Form `setCashReceipt` được sử dụng để đồng bộ thông tin phiếu thu tiền vào hệ thống Fast thông qua [API Đồng bộ chứng từ](../sync-voucher).

## Cấu trúc chứng từ

Chứng từ phiếu thu tiền gồm 2 phần chính:

1. **Header (Thông tin chung)**: Chứa thông tin chính của phiếu thu tiền
2. **Detail (Chi tiết)**: Chứa thông tin chi tiết về các khoản thu

## Các trường dữ liệu

### Header (Thông tin chung)

| Attribute    | Type        | Required | Description          |
|--------------|-------------|----------|----------------------|
| VoucherId    | String(64)  | ✔️       | Mã chứng từ          |
| VoucherDate  | Date        | ✔️       | Ngày chứng từ        |
| VoucherNumber| String(12)  | ✔️       | Số chứng từ          |
| CustomerCode | String(32)  | ✔️       | Mã khách hàng        |
| Payer        | String(128) |          | Người nộp tiền       |
| Address      | String(128) |          | Địa chỉ người nộp tiền |
| DebitAccount | String(32)  | ✔️       | Tài khoản nợ (Tài khoản kế toán) |
| Description  | String(512) |          | Diễn giải            |
| Currency     | String(3)   | ✔️       | Loại tiền ("VND","USD","EUR"...)|
| ExchangeRate | Long        | ✔️       | Tỷ giá               |
| TotalAmount  | Long        | ✔️       | Tổng số tiền              |

### Detail (Chi tiết)

| Attribute    | Type        | Required | Description          |
|--------------|-------------|----------|----------------------|
| RefNumber    | Long        | ✔️       | Số thứ tự            |
| CreditAccount| String(32)  | ✔️       | Mã tài khoản có (Tài khoản kế toán) |
| Amount       | Long        | ✔️       | Số tiền              |
| JobCode      | String(32)  |          | Mã vụ việc           |
| DeptCode     | String(32)  |          | Mã bộ phận           |
| ContractCode | String(32)  |          | Mã hợp đồng          |
| ExpenseCode  | String(32)  |          | Mã phí               |

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
      "Amount": 15000000,
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