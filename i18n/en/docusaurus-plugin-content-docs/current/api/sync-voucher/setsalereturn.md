# Sales Return Receipt

The `setSaleReturn` form is used to synchronize sales return receipt information into the Fast system through the [Voucher Synchronization API](../sync-voucher).

## Document Structure

The sales return receipt document consists of 2 main parts:

1. **Header (General Information)**: Contains the main information of the sales return receipt
2. **Detail (Item Details)**: Contains detailed information about returned items

## Data Fields

### Header (General Information)

| Attribute    | Type        | Required | Description          |
|--------------|-------------|----------|----------------------|
| VoucherId    | String(64)  | ✔️       | Partner's document ID: a **unique** and **identifying** code for the partner's transaction when sending to Fast to request document creation|
| CustomerCode | String(32)  | ✔️       | Customer code        |
| VoucherDate  | Date        | ✔️       | Document date        |
| VoucherNumber| String(12)  |          | Document number, if empty, the Fast system will assign according to the declared document book; if no book is declared, it will be auto-incremented|
| Description  | String(512) |          | Description          |
| Currency     | String(3)   |          | Currency type ("VND","USD","EUR"...).<br/>{{CURRENCY_DEFAULT}}<br/>|
| ExchangeRate | Long        |          | Exchange rate <br/>{{EXRATE_DEFAULT}}<br/>|
| <span class="highlight-key">detail</span>          | List[Object]  |✔️      | List of item details |
| TotalQuantity| Long        | ✔️       | Total quantity of <span class="highlight-key">detail</span>|
| TotalNetAmount| Long        | ✔️       | Total amount before tax of <span class="highlight-key">detail</span>|
| TotalDiscountAmount| Long  | ✔️       | Total discount amount of <span class="highlight-key">detail</span>|
| TotalTaxAmount| Long       | ✔️       | Total tax amount of <span class="highlight-key">detail</span>|
| TotalAmount  | Long        | ✔️       | Total amount after tax of <span class="highlight-key">detail</span>|
| Status       | String(1)   |          | {{VC_STATUS_EN}} |

### Content of <span class="highlight-key">detail</span>

| Attribute    | Type        | Required | Description          |
|--------------|-------------|----------|----------------------|
| RefNumber    | Long        | ✔️       | Sequence number      |
| ItemCode     | String(32)  | ✔️       | Item code            |
| Uom          | String(32)  | ✔️       | Unit of measure      |
| SiteCode     | String(32)  | ✔️       | Warehouse code       |
| Quantity     | Long        | ✔️       | Quantity             |
| Promotion    | Byte        |          | {{PROMOTION_EN}}        |
| UnitPrice    | Long        | ✔️       | Unit price           |
| Amount       | Long        | ✔️       | Amount before tax    |
| Discount     | Long        |          | Discount amount      |
| TaxRate      | Long        | ✔️       | {{TAX_RATE_EN}}        |
| TaxAmount    | Long        | ✔️       | Tax amount. **Formula:** (Amount - Discount) × (TaxRate/100) |
| TotalAmount  | Long        | ✔️       | Total amount after tax |
| JobCode      | String(32)  |          | Job code             |
| DeptCode     | String(32)  |          | Department code      |
| ContractCode | String(32)  |          | Contract code        |
| ExpenseCode  | String(32)  |          | Expense code         |
| SaleInvId    | Varchar(64) |          | **VoucherId** of the sales invoice|
| SaleInvRefNumber | Long    |          | **RefNumber** of the sales invoice |

## Request Example

```json
{
  "form": "setSaleReturn",
  "data": [
    {
      "VoucherId": "SR20230001",
      "CustomerCode": "KH001",
      "VoucherDate": "2023-04-20",
      "VoucherNumber": "PNTL0001",
      "Description": "Customer returned goods",
      "Currency": "VND",
      "ExchangeRate": 1,
      "TotalQuantity": 2,
      "TotalNetAmount": 18000000,
      "TotalDiscountAmount": 800000,
      "TotalTaxAmount": 1720000,
      "TotalAmount": 18920000,
      "Status": "1",
      "detail": [
        {
          "RefNumber": 1,
          "ItemCode": "VT001",
          "Uom": "Piece",
          "SiteCode": "KHOHANG",
          "Promotion": 0,
          "Quantity": 1,
          "UnitPrice": 12000000,
          "Amount": 12000000,
          "Discount": 500000,
          "TaxRate": 10,
          "TaxAmount": 1150000,
          "TotalAmount": 12650000,
          "JobCode": "VV001",
          "DeptCode": "BP001",
          "ContractCode": "HD001",
          "ExpenseCode": "PHI001",
          "SaleInvId": "SI20230001",
          "SaleInvRefNumber": 1
        },
        {
          "RefNumber": 2,
          "ItemCode": "VT002",
          "Uom": "Piece",
          "SiteCode": "KHOHANG",
          "Promotion": 0,
          "Quantity": 1,
          "UnitPrice": 6000000,
          "Amount": 6000000,
          "Discount": 300000,
          "TaxRate": 10,
          "TaxAmount": 570000,
          "TotalAmount": 6270000,
          "JobCode": "VV001",
          "DeptCode": "BP001",
          "ContractCode": "HD001",
          "ExpenseCode": "PHI002",
          "SaleInvId": "SI20230001",
          "SaleInvRefNumber": 2
        }
      ]
    }
  ]
}
```

## Important Notes

1. The `VoucherId` field must be unique in the system to avoid document duplication.
2. Dates must be formatted according to ISO standard (yyyy-MM-dd).
3. The `SaleInvId` and `SaleInvRefNumber` fields are used to link to the original sales invoice.