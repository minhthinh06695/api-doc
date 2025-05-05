---
title: Synchronize Master Data
---

# Synchronize Master Data

The `SyncData` API is used to synchronize master data (categories) from the partner's system into the internal system. This API supports synchronizing simple, non-hierarchical data.

## Endpoint

<blockquote>
  <pre><code><b>POST</b> /api/SyncData</code></pre>
</blockquote>

## Headers

| Name           | Value               | Description            |
|----------------|---------------------|------------------------|
| Content-Type   | application/json    | The data type of the request |
| Authorization  | your_token_here     | Authentication token   |

## Request Body

The request body has the following structure:

```json
{
  "form": "form_name",
  "data": [
    {
      "column1": "value1",
      "column2": "value2",
      ...
    },
    ...
  ]
}
```

Where:
- **form**: The form name defined in the synchronization details of each category.
- **data**: An array of objects containing the data to be synchronized.

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

| Code | Description                     |
|------|---------------------------------|
| 200  | Success                         |
| 201  | Form does not exist             |
| 202  | Data is empty                   |
| 400  | Invalid request                 |
| 401  | Authentication error            |
| 500  | Server error                    |
| 601  | Data structure error            |

## Supported Forms

The `SyncData` API supports the following forms:

- [Customer/Supplier Category (setCustomer)](sync-data/setcustomer)
- [Item Category (setItem)](sync-data/setitem)
- [Unit Conversion Category (setUomConversion)](sync-data/setuomconversion)
- [Warehouse Category (setSite)](sync-data/setsite)
- [Department Category (setDepartment)](sync-data/setdepartment)
- [Job Category (setJob)](sync-data/setjob)
- [Contract Category (setContract)](sync-data/setcontract)
- [Expense Category (setExpense)](sync-data/setexpense)

## Notes on Usage

1. Ensure that the data sent complies with the structure and constraints defined in the configuration file.
2. Required fields (Required="true") must be provided with values.
3. The API has a caching mechanism and eliminates duplicate requests, which optimizes performance but may cause issues if you want to resend the same data.

## Error Handling

When an error occurs, the API will return detailed error messages in the `messages` field. Below are some common errors and how to resolve them:

1. **Form does not exist (201)**: Check the form name in the request.
2. **Data is empty (202)**: Ensure the data array is not empty.
3. **Data structure error (601)**: Verify the data structure, especially the required fields and data types.

## Example Code

### Example with C#

```csharp
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Data;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;

public class SyncDataExample
{
    private readonly HttpClient _client = new HttpClient();
    private readonly string _baseUrl = "https://api.example.com/api";
    private readonly string _authToken;

    public SyncDataExample(string authToken)
    {
        _authToken = authToken;
        _client.DefaultRequestHeaders.Authorization = 
            new System.Net.Http.Headers.AuthenticationHeaderValue("Bearer", _authToken);
    }

    public async Task<ApiResult> SyncCustomers(List<Customer> customers)
    {
        // Create DataTable from customer list
        DataTable dataTable = new DataTable();
        dataTable.Columns.Add("CustomerCode", typeof(string));
        dataTable.Columns.Add("CustomerName", typeof(string));
        dataTable.Columns.Add("Address", typeof(string));
        dataTable.Columns.Add("PhoneNumber", typeof(string));
        dataTable.Columns.Add("TaxCode", typeof(string));
        dataTable.Columns.Add("Email", typeof(string));
        dataTable.Columns.Add("status", typeof(string));

        foreach (var customer in customers)
        {
            dataTable.Rows.Add(
                customer.Code,
                customer.Name,
                customer.Address,
                customer.Phone,
                customer.TaxCode,
                customer.Email,
                "1" // Active status
            );
        }

        // Prepare request body
        var requestBody = new
        {
            form = "setCustomer",
            data = dataTable
        };

        // Call API
        var content = new StringContent(
            JsonConvert.SerializeObject(requestBody),
            Encoding.UTF8,
            "application/json");

        var response = await _client.PostAsync($"{_baseUrl}/SyncData", content);
        response.EnsureSuccessStatusCode();

        return JsonConvert.DeserializeObject<ApiResult>(
            await response.Content.ReadAsStringAsync());
    }
}

public class Customer
{
    public string Code { get; set; }
    public string Name { get; set; }
    public string Address { get; set; }
    public string Phone { get; set; }
    public string TaxCode { get; set; }
    public string Email { get; set; }
}

public class ApiResult
{
    [JsonProperty("success")]
    public bool Success { get; set; }

    [JsonProperty("messages")]
    public string Messages { get; set; }

    [JsonProperty("records")]
    public int Records { get; set; }

    [JsonProperty("fkey")]
    public string Fkey { get; set; }

    [JsonProperty("code")]
    public int Code { get; set; }
}
```