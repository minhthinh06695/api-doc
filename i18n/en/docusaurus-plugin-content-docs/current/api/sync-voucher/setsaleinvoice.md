# Sales Invoice

The `setSaleInvoice` form is used to synchronize sales invoice information into the Fast system via the [Document Synchronization API](../sync-voucher).

## Document Structure

The sales invoice document consists of two main parts:

1. **Header (General Information)**: Contains the main information of the sales invoice.
2. **Detail (Item Details)**: Contains detailed information about the sold items.

## Data Fields

### Header (General Information)

| Attribute       | Type        | Required | Description                                                                 |
|-----------------|-------------|----------|-----------------------------------------------------------------------------|
| VoucherId       | String(64)  | ✔️       | Partner's document ID: a **unique** and **identifying** code for the transaction sent to Fast to request document creation. |
| CustomerCode    | String(32)  | ✔️       | Customer code                                                              |
| VoucherDate     | Date        | ✔️       | Document date                                                              |
| VoucherNumber   | String(12)  |          | Document number. If empty, the Fast system will assign it based on the declared document book. If no book is declared, it will auto-increment. |
| Description     | String(512) |          | Description                                                                |
| Currency        | String(3)   |          | Currency type ("VND", "USD", "EUR", etc.).<br/>{{CURRENCY_DEFAULT}}<br/>   |
| ExchangeRate    | Long        |          | Exchange rate <br/>{{EXRATE_DEFAULT}}<br/>                                 |
| <span class="highlight-key">detail</span> | List[Object]  | ✔️       | List of item details                                                       |
| TotalQuantity   | Long        | ✔️       | Total quantity of <span class="highlight-key">detail</span>                |
| TotalNetAmount  | Long        | ✔️       | Total pre-tax amount of <span class="highlight-key">detail</span>          |
| TotalDiscountAmount | Long    | ✔️       | Total discount amount of <span class="highlight-key">detail</span>         |
| TotalTaxAmount  | Long        | ✔️       | Total tax amount of <span class="highlight-key">detail</span>              |
| TotalAmount     | Long        | ✔️       | Total post-tax amount of <span class="highlight-key">detail</span>         |
| Status         | String(1)   |          | {{VC_STATUS_EN}} |

### Content of <span class="highlight-key">detail</span>

| Attribute       | Type        | Required | Description                                                                 |
|-----------------|-------------|----------|-----------------------------------------------------------------------------|
| RefNumber       | Long        | ✔️       | Sequence number                                                            |
| ItemCode        | String(32)  | ✔️       | Item code                                                                  |
| Uom             | String(32)  | ✔️       | Unit of measurement                                                        |
| SiteCode        | String(32)  | ✔️       | Warehouse code                                                             |
| Promotion       | Byte        |          | {{PROMOTION_EN}}        | 
| Quantity        | Long        | ✔️       | Quantity                                                                   |
| UnitPrice       | Long        | ✔️       | Unit price                                                                 |
| Amount          | Long        | ✔️       | Pre-tax amount                                                             |
| Discount        | Long        |          | Discount amount                                                            |
| TaxRate         | Long        | ✔️       | {{TAX_RATE}}                                                               |
| TaxAmount       | Long        | ✔️       | Tax amount. **Formula:** (Amount - Discount) × (TaxRate/100)               |
| TotalAmount     | Long        | ✔️       | Total post-tax amount                                                      |
| JobCode         | String(32)  |          | Job code                                                                   |
| DeptCode        | String(32)  |          | Department code                                                            |
| ContractCode    | String(32)  |          | Contract code                                                              |
| ExpenseCode     | String(32)  |          | Expense code                                                               |

## Example Request

```json
{
  "form": "setSaleInvoice",
  "data": [
    {
      "VoucherId": "SI20230001",
      "CustomerCode": "KH001",
      "VoucherDate": "2023-04-15",
      "VoucherNumber": "HD0001",
      "Description": "Sales to customer ABC",
      "Currency": "VND",
      "ExchangeRate": 1,
      "TotalQuantity": 3,
      "TotalNetAmount": 24000000,
      "TotalDiscountAmount": 1000000,
      "TotalTaxAmount": 2300000,
      "TotalAmount": 25300000,
      "Status": "1",
      "detail": [
        {
          "RefNumber": 1,
          "ItemCode": "VT001",
          "Uom": "Piece",
          "SiteCode": "WAREHOUSE",
          "Promotion": 0,
          "Quantity": 1,
          "UnitPrice": 12000000,
          "Amount": 12000000,
          "Discount": 500000,
          "TaxRate": 10,
          "TaxAmount": 1150000,
          "TotalAmount": 12650000,
          "JobCode": "JOB001",
          "DeptCode": "DEPT001",
          "ContractCode": "CON001",
          "ExpenseCode": "EXP001"
        },
        {
          "RefNumber": 2,
          "ItemCode": "VT002",
          "Uom": "Piece",
          "SiteCode": "WAREHOUSE",
          "Promotion": 0,
          "Quantity": 2,
          "UnitPrice": 6000000,
          "Amount": 12000000,
          "Discount": 500000,
          "TaxRate": 10,
          "TaxAmount": 1150000,
          "TotalAmount": 12650000,
          "JobCode": "JOB001",
          "DeptCode": "DEPT001",
          "ContractCode": "CON001",
          "ExpenseCode": "EXP002"
        }
      ]
    }
  ]
}
```

## Important Notes

1. The `VoucherId` field must be unique in the system to avoid duplicate invoices.
2. Each item detail in the sales invoice includes information about the tax rate and tax amount.
3. Dates must be formatted according to the ISO standard (yyyy-MM-dd).
4. The `TotalAmount` field in the item details is the total amount including tax (`Amount - Discount + TaxAmount`).