# Cash Receipt Voucher

The `setCashReceipt` form is used to synchronize cash receipt voucher information into the Fast system via the [Sync Voucher API](../sync-voucher).

## Voucher Structure

The cash receipt voucher consists of two main parts:

1. **Header (General Information)**: Contains the main information of the cash receipt voucher.
2. **Detail (Details)**: Contains detailed information about the receipt items.

## Data Fields

### Header (General Information)

| Attribute      | Type        | Required | Description                          |
|----------------|-------------|----------|--------------------------------------|
| VoucherId      | String(64)  | ✔️       | Voucher ID: a **unique** identifier for the transaction sent by the partner to Fast for voucher creation. |
| VoucherDate    | Date        | ✔️       | Voucher date                         |
| VoucherNumber  | String(12)  |          | Voucher number. If empty, the Fast system will assign a number based on the configured voucher book. If no book is configured, it will auto-increment. |
| CustomerCode   | String(32)  | ✔️       | Customer code                        |
| Payer          | String(128) |          | Name of the payer                    |
| Address        | String(128) |          | Address of the payer                 |
| DebitAccount   | String(32)  | ✔️       | Debit account (Accounting account)   |
| Description    | String(512) |          | Description                          |
| Currency       | String(3)   |          | Currency code ("VND", "USD", "EUR", etc.).<br/>{{CURRENCY_DEFAULT_EN}}<br/> |
| ExchangeRate   | Long        |          | Exchange rate <br/>{{EXRATE_DEFAULT_EN}}<br/> |
| <span class="highlight-key">detail</span> | List[Object]  | ✔️       | List of receipt details              |
| TotalAmount    | Long        | ✔️       | Total receipt amount of <span class="highlight-key">detail</span> |
| Status         | String(1)   |          | {{VC_STATUS_EN}} |

### Content of <span class="highlight-key">detail</span>

| Attribute      | Type        | Required | Description                          |
|----------------|-------------|----------|--------------------------------------|
| RefNumber      | Long        | ✔️       | Reference number                     |
| CreditAccount  | String(32)  | ✔️       | Credit account (Accounting account)  |
| Amount         | Long        | ✔️       | Amount                               |
| JobCode        | String(32)  |          | Job code                             |
| DeptCode       | String(32)  |          | Department code                      |
| ContractCode   | String(32)  |          | Contract code                        |
| ExpenseCode    | String(32)  |          | Expense code                         |

## Example Request

```json
{
  "form": "setCashReceipt",
  "data": [
    {
      "VoucherId": "CR20230001",
      "VoucherDate": "2023-04-15",
      "VoucherNumber": "CR0001",
      "CustomerCode": "CUST001",
      "Payer": "John Doe",
      "Address": "123 ABC Street, District 1, Ho Chi Minh City",
      "DebitAccount": "111",
      "Description": "Customer payment",
      "Currency": "VND",
      "ExchangeRate": 1,
      "TotalAmount": 15000000,
      "Status": "1",
      "detail": [
        {
          "RefNumber": 1,
          "CreditAccount": "131",
          "Amount": 10000000,
          "JobCode": "JOB001",
          "DeptCode": "DEPT001",
          "ContractCode": "CON001",
          "ExpenseCode": "EXP001"
        },
        {
          "RefNumber": 2,
          "CreditAccount": "511",
          "Amount": 5000000,
          "JobCode": "JOB002",
          "DeptCode": "DEPT002",
          "ContractCode": "CON002",
          "ExpenseCode": "EXP002"
        }
      ]
    }
  ]
}
```

## Important Notes

1. The `VoucherId` field must be unique in the system to avoid duplicate vouchers.
2. Ensure all required fields are filled in.
3. Dates must follow the ISO format (yyyy-MM-dd).
4. The debit account (`DebitAccount`) and credit account (`CreditAccount`) must be valid accounts in the accounting system.