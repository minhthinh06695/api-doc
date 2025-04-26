# Purchase Invoice

The `setPurchaseInvoice` form is used to synchronize purchase invoice information into the Fast system via the [Sync Voucher API](../sync-voucher).

## Voucher Structure

The purchase invoice consists of three main parts:

1. **Header (General Information)**: Contains the main information of the purchase invoice.
2. **Detail (Item Details)**: Contains detailed information about the purchased items.
3. **Tax (Tax Information)**: Contains VAT information of the invoice.

## Data Fields

### Header (General Information)

| Attribute      | Type        | Required | Description                          |
|----------------|-------------|----------|--------------------------------------|
| VoucherId      | String(64)  | ✔️       | Voucher ID: a **unique** identifier for the transaction sent by the partner to Fast for voucher creation. |
| SupplierCode   | String(32)  | ✔️       | Supplier code, which is the customer code in the Customer Category. |
| VoucherDate    | Date        | ✔️       | Voucher date                         |
| VoucherNumber  | String(12)  |          | Voucher number. If empty, the Fast system will assign a number based on the configured voucher book. If no book is configured, it will auto-increment. |
| Description    | String(512) |          | Description                          |
| Currency       | String(3)   |          | Currency code ("VND", "USD", "EUR", etc.).<br/>{{CURRENCY_DEFAULT_EN}}<br/> |
| ExchangeRate   | Long        |          | Exchange rate <br/>{{EXRATE_DEFAULT_EN}}<br/> |
| <span class="highlight-key">detail</span> | List[Object]  | ✔️       | List of item details                 |
| <span class="highlight-key">tax</span>    | List[Object]  |          | List of tax information              |
| TotalQuantity  | Long        | ✔️       | Total quantity of items in <span class="highlight-key">detail</span> |
| TotalNetAmount | Long        | ✔️       | Total net amount of <span class="highlight-key">detail</span> |
| TotalTaxAmount | Long        | ✔️       | Total tax amount of <span class="highlight-key">tax</span> |
| TotalAmount    | Long        | ✔️       | Total amount after tax               |

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

### Content of <span class="highlight-key">tax</span>

| Attribute        | Type        | Required | Description                          |
|------------------|-------------|----------|--------------------------------------|
| VatInvoiceNumber | String(32)  | ✔️       | VAT invoice number                   |
| VatInvoiceDate   | Date        | ✔️       | VAT invoice date                     |
| VatInvoiceSymbol | String(32)  |          | VAT invoice symbol                   |
| TotalNetAmount   | Long        | ✔️       | Net amount before tax                |
| TaxRate          | String(8)   | ✔️       | Tax rate                             |
| TaxAmount        | Long        | ✔️       | Tax amount                           |

## Example Request

```json
{
  "form": "setPurchaseInvoice",
  "data": [
    {
      "VoucherId": "PI20230001",
      "SupplierCode": "SUP001",
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
          "ItemCode": "ITEM001",
          "Uom": "Piece",
          "SiteCode": "WAREHOUSE",
          "Quantity": 2,
          "UnitPrice": 10000000,
          "Amount": 20000000,
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
          "UnitPrice": 5000000,
          "Amount": 15000000,
          "JobCode": "JOB002",
          "DeptCode": "DEPT002",
          "ContractCode": "CON002",
          "ExpenseCode": "EXP002"
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
3. Dates must follow the ISO format (yyyy-MM-dd).