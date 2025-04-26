# Warehouse Receipt

The `setReceipt` form is used to synchronize warehouse receipt information into the Fast system through the [Voucher Synchronization API](../sync-voucher).

## Voucher Structure

The warehouse receipt voucher consists of 2 main parts:

1. **Header (General Information)**: Contains the main information of the warehouse receipt
2. **Detail (Goods Details)**: Contains detailed information about the received items

## Data Fields

### Header (General Information)

| Attribute    | Type        | Required | Description          |
|--------------|-------------|----------|----------------------|
| VoucherId    | String(64)  | ✔️       | Voucher ID           |
| CustomerCode | String(32)  | ✔️       | Customer code|
| VoucherDate  | Date        | ✔️       | Voucher date         |
| VoucherNumber| String(12)  | ✔️       | Voucher number. If empty, the Fast system will assign according to the declared voucher book. If no voucher book is declared, it will be auto-incremented |
| Description  | String(512) |          | Description          |
| Currency     | String(3)   |          | Currency type ("VND","USD","EUR"...).<br/>{{CURRENCY_DEFAULT}}<br/>|
| ExchangeRate | Long        |          | Exchange rate <br/>{{EXRATE_DEFAULT}}<br/>|
| <span class="highlight-key">detail</span>       | List[Object]| ✔️       | List of goods details |
| TotalQuantity| Long        | ✔️       | Total quantity of goods in <span class="highlight-key">detail</span>|
| TotalAmount  | Long        | ✔️       | Total amount of <span class="highlight-key">detail</span>|

### Content of <span class="highlight-key">detail</span>

| Attribute    | Type        | Required | Description          |
|--------------|-------------|----------|----------------------|
| RefNumber    | Long        | ✔️       | Sequence number      |
| ItemCode     | String(32)  | ✔️       | Item code            |
| Uom          | String(32)  | ✔️       | Unit of measure      |
| SiteCode     | String(32)  | ✔️       | Warehouse code       |
| Quantity     | Long        | ✔️       | Quantity             |
| UnitPrice    | Long        | ✔️       | Unit price           |
| Amount       | Long        | ✔️       | Total amount         |
| JobCode      | String(32)  |          | Job code             |
| DeptCode     | String(32)  |          | Department code      |
| ContractCode | String(32)  |          | Contract code        |
| ExpenseCode  | String(32)  |          | Expense code         |

## Request Example

```json
{
  "form": "setReceipt",
  "data": [
    {
      "VoucherId": "RC20230001",
      "CustomerCode": "KH001",
      "VoucherDate": "2023-04-15",
      "VoucherNumber": "NK0001",
      "Description": "Goods receipt from supplier XYZ",
      "Currency": "VND",
      "ExchangeRate": 1,
      "TotalQuantity": 5,
      "TotalAmount": 28000000,
      "detail": [
        {
          "RefNumber": 1,
          "ItemCode": "VT001",
          "Uom": "Piece",
          "SiteCode": "WAREHOUSE",
          "Quantity": 2,
          "AverageCost": 0,
          "UnitPrice": 6000000,
          "Amount": 12000000,
          "JobCode": "JOB001",
          "DeptCode": "DEP001",
          "ContractCode": "CTR001",
          "ExpenseCode": "EXP001"
        },
        {
          "RefNumber": 2,
          "ItemCode": "VT002",
          "Uom": "Piece",
          "SiteCode": "WAREHOUSE",
          "Quantity": 3,
          "AverageCost": 0,
          "UnitPrice": 5333333,
          "Amount": 16000000,
          "JobCode": "JOB002",
          "DeptCode": "DEP002",
          "ContractCode": "CTR002",
          "ExpenseCode": "EXP002"
        }
      ]
    }
  ]
}
```

## Important Notes

1. The `VoucherId` field must be unique in the system to avoid voucher duplication.
2. Dates must be formatted according to ISO standard (yyyy-MM-dd).