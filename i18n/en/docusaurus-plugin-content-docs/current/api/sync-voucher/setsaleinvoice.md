# Sales Invoice

The `setSaleInvoice` form is used to synchronize sales invoice information into the Fast system via the [Sync Voucher API](../sync-voucher).

## Voucher Structure

The sales invoice consists of two main parts:

1. **Header (General Information)**: Contains the main information of the sales invoice.
2. **Detail (Item Details)**: Contains detailed information about the sold items.

## Data Fields

### Header (General Information)

| Attribute         | Type        | Required | Description                          |
|-------------------|-------------|----------|--------------------------------------|
| VoucherId         | String(64)  | ✔️       | Voucher ID                           |
| CustomerCode      | String(32)  | ✔️       | Customer code                        |
| VoucherDate       | Date        | ✔️       | Voucher date                         |
| VoucherNumber     | String(12)  | ✔️       | Voucher number                       |
| Description       | String(512) |          | Description                          |
| Currency          | String(3)   | ✔️       | Currency code ("VND", "USD", "EUR", etc.) |
| ExchangeRate      | Long        | ✔️       | Exchange rate                        |
| TotalQuantity     | Long        | ✔️       | Total quantity                       |
| TotalNetAmount    | Long        | ✔️       | Total amount before tax              |
| TotalDiscountAmount | Long      | ✔️       | Total discount amount                |
| TotalTaxAmount    | Long        | ✔️       | Total tax amount                     |
| TotalAmount       | Long        | ✔️       | Total amount after tax               |

### Detail (Item Details)

| Attribute         | Type        | Required | Description                          |
|-------------------|-------------|----------|--------------------------------------|
| RefNumber         | Long        | ✔️       | Reference number                     |
| ItemCode          | String(32)  | ✔️       | Item code                            |
| Uom               | String(32)  | ✔️       | Unit of measure                      |
| Quantity          | Long        | ✔️       | Quantity                             |
| UnitPrice         | Long        | ✔️       | Unit price                           |
| Amount            | Long        | ✔️       | Amount before tax                    |
| Discount          | Long        | ✔️       | Discount amount                      |
| TaxRate           | String(8)   | ✔️       | Tax rate                             |
| TaxAmount         | Long        | ✔️       | Tax amount  **Formula:** (Amount - Discount) × (TaxRate/100) |
| TotalAmount       | Long        | ✔️       | Total amount after tax               |
| JobCode           | String(32)  |          | Job code                             |
| DeptCode          | String(32)  |          | Department code                      |
| ContractCode      | String(32)  |          | Contract code                        |
| ExpenseCode       | String(32)  |          | Expense code                         |

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
      "Description": "Bán hàng cho khách hàng ABC",
      "Currency": "VND",
      "ExchangeRate": 1,
      "TotalQuantity": 3,
      "TotalNetAmount": 24000000,
      "TotalDiscountAmount": 1000000,
      "TotalTaxAmount": 2300000,
      "TotalAmount": 25300000,
      "detail": [
        {
          "RefNumber": 1,
          "ItemCode": "VT001",
          "Uom": "Cái",
          "SiteCode": "KHOHANG",
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
          "ExpenseCode": "PHI001"
        },
        {
          "RefNumber": 2,
          "ItemCode": "VT002",
          "Uom": "Cái",
          "SiteCode": "KHOHANG",
          "Quantity": 2,
          "UnitPrice": 6000000,
          "Amount": 12000000,
          "Discount": 500000,
          "TaxRate": 10,
          "TaxAmount": 1150000,
          "TotalAmount": 12650000,
          "JobCode": "VV001",
          "DeptCode": "BP001",
          "ContractCode": "HD001",
          "ExpenseCode": "PHI002"
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