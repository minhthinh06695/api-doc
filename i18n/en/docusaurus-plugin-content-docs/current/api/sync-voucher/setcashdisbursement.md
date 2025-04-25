# Cash Disbursement Voucher

The `setCashDisbursement` form is used to synchronize cash disbursement voucher information into the Fast system via the [Sync Voucher API](../sync-voucher).

## Voucher Structure

The cash disbursement voucher consists of two main parts:

1. **Header (General Information)**: Contains the main information of the cash disbursement voucher.
2. **Detail (Details)**: Contains detailed information about the disbursement items.

## Data Fields

### Header (General Information)

| Attribute      | Type        | Required | Description                          |
|----------------|-------------|----------|--------------------------------------|
| VoucherId      | String(64)  | ✔️       | Voucher ID                           |
| VoucherDate    | Date        | ✔️       | Voucher date                         |
| VoucherNumber  | String(12)  | ✔️       | Voucher number                       |
| CustomerCode   | String(32)  | ✔️       | Customer code                        |
| Recipient      | String(128) |          | Name of the recipient                |
| Address        | String(128) |          | Address of the recipient             |
| CreditAccount  | String(32)  | ✔️       | Credit account (Accounting account)  |
| Description    | String(512) |          | Description                          |
| Currency       | String(3)   | ✔️       | Currency code ("VND", "USD", "EUR", etc.) |
| ExchangeRate   | Long        | ✔️       | Exchange rate                        |
| TotalAmount    | Long        | ✔️       | Total amount                         |

### Detail (Details)

| Attribute      | Type        | Required | Description                          |
|----------------|-------------|----------|--------------------------------------|
| RefNumber      | Long        | ✔️       | Reference number                     |
| DebitAccount   | String(32)  | ✔️       | Debit account (Accounting account)   |
| Amount         | Long        | ✔️       | Amount                               |
| JobCode        | String(32)  |          | Job code                             |
| DeptCode       | String(32)  |          | Department code                      |
| ContractCode   | String(32)  |          | Contract code                        |
| ExpenseCode    | String(32)  |          | Expense code                         |

## Example Request

```json
{
  "form": "setCashDisbursement",
  "data": [
    {
      "VoucherId": "PC20230001",
      "VoucherDate": "2023-04-15",
      "VoucherNumber": "PC0001",
      "CustomerCode": "KH001",
      "Recipient": "John Doe",
      "Address": "123 ABC Street, District 1, Ho Chi Minh City",
      "CreditAccount": "111",
      "Description": "Payment to supplier",
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

## Important Notes

1. The `VoucherId` field must be unique in the system to avoid duplicate vouchers.
2. Ensure all required fields are filled in.
3. Dates must follow the ISO format (YYYY-MM-DD).
4. The credit account (`CreditAccount`) and debit account (`DebitAccount`) must be valid accounts in the accounting system.

## Example Code in C#

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
        // Create request body
        var requestBody = new
        {
            form = "setCashDisbursement",
            data = new[] { disbursement }
        };

        // Call API
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
    public string Recipient { get; set; }
    public string Address { get; set; }
    public string CreditAccount { get; set; }
    public string Description { get; set; }
    public string Currency { get; set; }
    public decimal ExchangeRate { get; set; }
    public List<CashDisbursementDetail> Detail { get; set; }
}

public class CashDisbursementDetail
{
    public int RefNumber { get; set; }
    public string DebitAccount { get; set; }
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