# Issue Voucher

The `setIssue` form is used to synchronize issue voucher information into the Fast system via the Sync Voucher API.

## Voucher Structure

The issue voucher consists of two main parts:

1. **Header (General Information)**: Contains the main information of the issue voucher.
2. **Detail (Item Details)**: Contains detailed information about the issued items.

## Data Fields

### Header (General Information)

| Attribute      | Type        | Required | Description                          |
|----------------|-------------|----------|--------------------------------------|
| VoucherId      | String(64)  | ✔️       | Voucher ID: a **unique** identifier for the transaction sent by the partner to Fast for voucher creation. |
| CustomerCode   | String(32)  | ✔️       | Customer code                        |
| VoucherDate    | Date        | ✔️       | Voucher date                         |
| VoucherNumber  | String(12)  | ✔️       | Voucher number. If empty, the Fast system will assign a number based on the configured voucher book. If no book is configured, it will auto-increment. |
| Description    | String(512) |          | Description                          |
| Currency       | String(3)   |          | Currency code ("VND", "USD", "EUR", etc.).<br/>{{CURRENCY_DEFAULT_EN}}<br/> |
| ExchangeRate   | Long        |          | Exchange rate <br/>{{EXRATE_DEFAULT_EN}}<br/> |
| <span class="highlight-key">detail</span> | List[Object]  | ✔️       | List of item details                 |
| TotalQuantity  | Long        | ✔️       | Total quantity of items in <span class="highlight-key">detail</span> |
| TotalAmount    | Long        | ✔️       | Total amount of <span class="highlight-key">detail</span> |
| Status         | String(1)   |          | {{VC_STATUS_EN}} |

### Content of <span class="highlight-key">detail</span>

| Attribute      | Type        | Required | Description                          |
|----------------|-------------|----------|--------------------------------------|
| RefNumber      | Long        | ✔️       | Reference number                     |
| ItemCode       | String(32)  | ✔️       | Item code                            |
| Uom            | String(32)  | ✔️       | Unit of measure                      |
| SiteCode       | String(32)  | ✔️       | Warehouse code                       |
| Quantity       | Long        | ✔️       | Quantity                             |
| UnitPrice      | Long        | ✔️       | Unit price                           |
| Amount         | Long        | ✔️       | Amount                               |
| JobCode        | String(32)  |          | Job code                             |
| DeptCode       | String(32)  |          | Department code                      |
| ContractCode   | String(32)  |          | Contract code                        |
| ExpenseCode    | String(32)  |          | Expense code                         |

## Example Request

```json
{
  "form": "setIssue",
  "data": [
    {
      "VoucherId": "IS20230001",
      "CustomerCode": "CUST001",
      "VoucherDate": "2023-04-15",
      "VoucherNumber": "IS0001",
      "Description": "Issue items to customer ABC",
      "Currency": "VND",
      "ExchangeRate": 1,
      "TotalQuantity": 5,
      "TotalAmount": 28000000,
      "Status": "1",
      "detail": [
        {
          "RefNumber": 1,
          "ItemCode": "ITEM001",
          "Uom": "Piece",
          "SiteCode": "WAREHOUSE",
          "Quantity": 2,
          "UnitPrice": 6000000,
          "Amount": 12000000,
          "JobCode": "JOB001",
          "DeptCode": "DEPT001",
          "ContractCode": "CON001",
          "ExpenseCode": "EXP001"
        },
        {
          "RefNumber": 2,
          "ItemCode": "ITEM002",
          "Uom": "Piece",
          "SiteCode": "WAREHOUSE",
          "Quantity": 3,
          "UnitPrice": 5333333,
          "Amount": 16000000,
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
2. Dates must follow the ISO format (yyyy-MM-dd).