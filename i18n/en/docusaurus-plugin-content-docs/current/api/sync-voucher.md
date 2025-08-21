# Vouchers

The `SyncVoucher` API is used to synchronize complex hierarchical vouchers (such as invoices or orders with details). This API supports synchronizing data with a hierarchical JSON structure instead of the simpler structure used by the [Sync Data API](./sync-data).

## Endpoint

<blockquote>
  <pre><code><b>POST</b> /api/SyncVoucher</code></pre>
</blockquote>

## Headers

| Name          | Value            | Description                  |
| ------------- | ---------------- | ---------------------------- |
| Content-Type  | application/json | The data type of the request |
| Authorization | your_token_here  | Authentication token         |

## Request Body

The request body has the following structure:

```json
{
  "form": "form_name",
  "data": [
    {
      "field1": "value1",
      "field2": "value2",
      "detail": [
        {
          "detailField1": "detailValue1",
          "detailField2": "detailValue2"
        }
        // Other detail rows
      ],
      "tax": [
        {
          "taxField1": "taxValue1",
          "taxField2": "taxValue2"
        }
        // Other tax rows
      ]
    }
    // Other vouchers
  ]
}
```

Where:

- **form**: The form name defined in the synchronization details of each voucher.
- **data**: An array of voucher objects, each of which may contain sub-arrays representing child tables.

## Response

### Success (200 OK)

```json
{
  "success": true,
  "messages": "SUCCESS",
  "records": 10,
  "fkey": "key_123",
  "code": 200
}
```

Where:

- **success**: `true` if the synchronization is successful.
- **messages**: Result message.
- **records**: Number of records synchronized.
- **fkey**: Reference key for the result (if any).
- **code**: Status code.

### Error

```json
{
  "success": false,
  "messages": "Error message",
  "code": error_code
}
```

## Error Codes

| Code | Description          |
| ---- | -------------------- |
| 200  | Success              |
| 201  | Form does not exist  |
| 202  | Data is empty        |
| 400  | Invalid request      |
| 401  | Authentication error |
| 500  | Server error         |
| 601  | Data structure error |

## Supported Forms

The `SyncVoucher` API supports the following forms:

- [Purchase Invoice (setPurchaseInvoice)](sync-voucher/setpurchaseinvoice)
- [Sales Invoice (setSaleInvoice)](sync-voucher/setsaleinvoice)
- [Salee Return Invoice (setSaleReturn)](sync-voucher/setsalereturn)
- [Warehouse Receipt (setReceipt)](sync-voucher/setreceipt)
- [Issue Voucher (setIssue)](sync-voucher/setissue)
- [Cash Receipt Voucher (setCashReceipt)](sync-voucher/setcashreceipt)
- [Cash Disbursement Voucher (setCashDisbursement)](sync-voucher/setcashdisbursement)

## Handling Hierarchical Data

### Relationship Between Tables

The `SyncVoucher` API processes data with a hierarchical structure:

1. **Main Data (header)**: Contains general information about the voucher.
2. **Detail Data (detail/tax)**: Contains detailed information linked to the main data.

The relationship between the main data and the detail data is defined in the XML configuration.

### Data Processing Rules

1. **Voucher ID (VoucherId)**: Must be unique for each voucher and is used to link tables.
2. **Transaction Handling**: The entire synchronization process is performed in a single transaction. If an error occurs at any step, the entire data is rolled back.
3. **Data Validation**: Data is validated against the XML mapping configuration before being saved to the database.

## Notes on Usage

1. Ensure that the data sent complies with the structure and constraints defined in the configuration file.
2. Required fields (Required="true") must be provided with values.
3. The API has a caching mechanism and eliminates duplicate requests, which optimizes performance but may cause issues if you want to resend the same data.
4. When sending hierarchical vouchers, the names of the child arrays (such as "detail", "tax") must match the names defined in the configuration file.

## Error Handling

When an error occurs, the API will return detailed error messages in the `messages` field. Below are some common errors and how to resolve them:

1. **Form does not exist (201)**: Check the form name in the request.
2. **Data is empty (202)**: Ensure the data array is not empty.
3. **Data structure error (601)**: Verify the data structure, especially the required fields and data types.

## C# Code Example

```csharp
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;

public class SyncPurchaseInvoice
{
    private readonly HttpClient _client = new HttpClient();
    private readonly string _baseUrl = "https://api.example.com/api";
    private readonly string _authToken;

    public SyncPurchaseInvoice(string authToken)
    {
        _authToken = authToken;
        _client.DefaultRequestHeaders.Authorization =
            new System.Net.Http.Headers.AuthenticationHeaderValue("Bearer", _authToken);
    }

    public async Task<ApiResult> SyncInvoice(PurchaseInvoice invoice)
    {
        // Create request body
        var requestBody = new
        {
            form = "setPurchaseInvoice",
            data = new[] { invoice }
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

public class PurchaseInvoice
{
    public string VoucherId { get; set; }
    public string SupplierCode { get; set; }
    public DateTime VoucherDate { get; set; }
    public string VoucherNumber { get; set; }
    public string Description { get; set; }
    public string Currency { get; set; }
    public decimal ExchangeRate { get; set; }
    public decimal TotalQuantity { get; set; }
    public decimal TotalNetAmount { get; set; }
    public decimal TotalTaxAmount { get; set; }
    public decimal TotalAmount { get; set; }
    public List<PurchaseInvoiceDetail> detail { get; set; }
    public List<PurchaseInvoiceTax> tax { get; set; }
}

public class PurchaseInvoiceDetail
{
    public int RefNumber { get; set; }
    public string ItemCode { get; set; }
    public string Uom { get; set; }
    public decimal Quantity { get; set; }
    public decimal UnitPrice { get; set; }
    public decimal Amount { get; set; }
    public string JobCode { get; set; }
    public string DeptCode { get; set; }
    public string ContractCode { get; set; }
    public string ExpenseCode { get; set; }
}

public class PurchaseInvoiceTax
{
    public string VatInvoiceNumber { get; set; }
    public DateTime VatInvoiceDate { get; set; }
    public string VatInvoiceSymbol { get; set; }
    public decimal TotalAmount { get; set; }
    public string TaxRate { get; set; }
    public decimal TaxAmount { get; set; }
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
