# Purchase Invoice

The `setPurchaseInvoice` form is used to synchronize purchase invoice information into the Fast system via the [Sync Voucher API](../sync-voucher).

## Voucher Structure

The purchase invoice consists of three main parts:

1. **Header (General Information)**: Contains the main information of the purchase invoice.
2. **Detail (Item Details)**: Contains detailed information about the purchased items.
3. **Tax (Tax Information)**: Contains VAT information for the invoice.

## Data Fields

### Header (General Information)

| Attribute       | Type        | Required | Description                          |
|-----------------|-------------|----------|--------------------------------------|
| VoucherId       | String(64)  | ✔️       | Voucher ID                           |
| SupplierCode    | String(32)  | ✔️       | Supplier code (same as customer code in the Customer Category) |
| VoucherDate     | Date        | ✔️       | Voucher date                         |
| VoucherNumber   | String(12)  | ✔️       | Voucher number                       |
| Description     | String(512) |          | Description                          |
| Currency        | String(3)   | ✔️       | Currency type ("VND", "USD", "EUR", etc.) |
| ExchangeRate    | Long        | ✔️       | Exchange rate                        |
| TotalQuantity   | Long        | ✔️       | Total quantity                       |
| TotalNetAmount  | Long        | ✔️       | Total amount before tax              |
| TotalTaxAmount  | Long        | ✔️       | Total tax amount                     |
| TotalAmount     | Long        | ✔️       | Total amount after tax               |

### Detail (Item Details)

| Attribute       | Type        | Required | Description                          |
|-----------------|-------------|----------|--------------------------------------|
| RefNumber       | Long        | ✔️       | Reference number                     |
| ItemCode        | String(32)  | ✔️       | Item code                            |
| Uom             | String(32)  | ✔️       | Unit of measure                      |
| Quantity        | Long        | ✔️       | Quantity                             |
| UnitPrice       | Long        | ✔️       | Unit price                           |
| Amount          | Long        | ✔️       | Amount                               |
| JobCode         | String(32)  |          | Job code                             |
| DeptCode        | String(32)  |          | Department code                      |
| ContractCode    | String(32)  |          | Contract code                        |
| ExpenseCode     | String(32)  |          | Expense code                         |

### Tax (Tax Information)

| Attribute        | Type        | Required | Description                          |
|------------------|-------------|----------|--------------------------------------|
| VatInvoiceNumber | String(32)  | ✔️       | VAT invoice number                   |
| VatInvoiceDate   | Date        | ✔️       | VAT invoice date                     |
| VatInvoiceSymbol | String(32)  |          | VAT invoice symbol                   |
| TotalNetAmount   | Long        | ✔️       | Amount before tax                    |
| TaxRate          | String(8)   | ✔️       | Tax rate                             |
| TaxAmount        | Long        | ✔️       | Tax amount                           |

## Example Request

```json
{
  "form": "setPurchaseInvoice",
  "data": [
    {
      "VoucherId": "PI20230001",
      "SupplierCode": "NCC001",
      "VoucherDate": "2023-04-15",
      "VoucherNumber": "ABC0001",
      "Description": "Purchase goods from supplier ABC",
      "Currency": "VND",
      "ExchangeRate": 1,
      "TotalQuantity": 5,
      "TotalNetAmount": 35000000,
      "TotalTaxAmount": 3500000,
      "TotalAmount": 38500000,
      "detail": [
        {
          "RefNumber": 1,
          "ItemCode": "VT001",
          "Uom": "Piece",
          "Quantity": 2,
          "UnitPrice": 10000000,
          "Amount": 20000000,
          "JobCode": "VV001",
          "DeptCode": "BP001",
          "ContractCode": "HD001",
          "ExpenseCode": "PHI001"
        },
        {
          "RefNumber": 2,
          "ItemCode": "VT002",
          "Uom": "Piece",
          "Quantity": 3,
          "UnitPrice": 5000000,
          "Amount": 15000000,
          "JobCode": "VV002",
          "DeptCode": "BP002",
          "ContractCode": "HD002",
          "ExpenseCode": "PHI002"
        }
      ],
      "tax": [
        {
          "VatInvoiceNumber": "0000123",
          "VatInvoiceDate": "2023-04-15",
          "VatInvoiceSymbol": "AA/20E",
          "TotalNetAmount": 35000000,
          "TaxRate": "10",
          "TaxAmount": 3500000
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