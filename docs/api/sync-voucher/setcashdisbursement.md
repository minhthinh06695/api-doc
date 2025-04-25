# Phiếu chi tiền

Form `setCashDisbursement` được sử dụng để đồng bộ thông tin phiếu chi tiền vào hệ thống Fast thông qua [API Đồng bộ chứng từ](../sync-voucher).

## Cấu trúc chứng từ

Chứng từ phiếu chi tiền gồm 2 phần chính:

1. **Header (Thông tin chung)**: Chứa thông tin chính của phiếu chi tiền
2. **Detail (Chi tiết)**: Chứa thông tin chi tiết về các khoản chi

## Các trường dữ liệu

### Header (Thông tin chung)

| Attribute    | Type        | Required | Description          |
|--------------|-------------|----------|----------------------|
| VoucherId    | String(64)  | ✔️       | Mã chứng từ          |
| VoucherDate  | Date        | ✔️       | Ngày chứng từ        |
| VoucherNumber| String(12)  | ✔️       | Số chứng từ          |
| CustomerCode | String(32)  | ✔️       | Mã khách hàng        |
| Recipient         | String(128) |      | Tên người nhận tiền  |
| Address      | String(128) |          | Địa chỉ người nhận tiền |
| CreditAccount| String(32)  | ✔️       | Tài khoản có (Tài khoản kế toán) |
| Description  | String(512) |          | Diễn giải            |
| Currency     | String(3)   | ✔️       | Loại tiền ("VND","USD","EUR"...) |
| ExchangeRate | Long        | ✔️       | Tỷ giá               |
| TotalAmount  | Long        | ✔️       | Tổng số tiền              |

### Detail (Chi tiết)

| Attribute    | Type        | Required | Description          |
|--------------|-------------|----------|----------------------|
| RefNumber    | Long        | ✔️       | Số thứ tự            |
| DebitAccount | String(32)  | ✔️       | Mã tài khoản nợ (Tài khoản kế toán) |
| Amount       | Long        | ✔️       | Số tiền              |
| JobCode      | String(32)  |          | Mã vụ việc           |
| DeptCode     | String(32)  |          | Mã bộ phận           |
| ContractCode | String(32)  |          | Mã hợp đồng          |
| ExpenseCode  | String(32)  |          | Mã phí               |

## Ví dụ request

```json
{
  "form": "setCashDisbursement",
  "data": [
    {
      "VoucherId": "PC20230001",
      "VoucherDate": "2023-04-15",
      "VoucherNumber": "PC0001",
      "CustomerCode": "KH001",
      "Recipient": "Nguyễn Văn A",
      "Address": "Số 123 Đường ABC, Quận 1, TP.HCM",
      "CreditAccount": "111",
      "Description": "Chi tiền cho nhà cung cấp",
      "Currency": "VND",
      "ExchangeRate": 1,
      "TotalAmount": 11000000,
      "detail": [
        {
          "RefNumber": 1,
          "DebitAccount": "331",
          "Amount": 8000000,
          "JobCode": "VV001",
          "DeptCode": "BP001",
          "ContractCode": "HD001",
          "ExpenseCode": "PHI001"
        },
        {
          "RefNumber": 2,
          "DebitAccount": "641",
          "Amount": 3000000,
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
4. Tài khoản có (`CreditAccount`) và tài khoản nợ (`DebitAccount`) phải là những tài khoản hợp lệ trong hệ thống kế toán.

## Ví dụ mã nguồn C#

```csharp
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;

public class SyncCashDisbursement
{
    private readonly HttpClient _client = new HttpClient();
    private readonly string _baseUrl = "https://api.example.com/api";
    private readonly string _authToken;

    public SyncCashDisbursement(string authToken)
    {
        _authToken = authToken;
        _client.DefaultRequestHeaders.Authorization = 
            new System.Net.Http.Headers.AuthenticationHeaderValue("Bearer", _authToken);
    }

    public async Task<ApiResult> SyncDisbursement(CashDisbursement disbursement)
    {
        // Tạo request body
        var requestBody = new
        {
            form = "setCashDisbursement",
            data = new[] { disbursement }
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

public class CashDisbursement
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
    public decimal TotalAmount { get; set; }
    public List<CashDisbursementDetail> detail { get; set; }
}

public class CashDisbursementDetail
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