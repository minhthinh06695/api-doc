# Get Data

The `GetData` API is used for partners to retrieve data from Fast (including catalogs, documents, reports, etc.). This API supports querying catalog data and documents based on criteria such as primary key or time range.

## Endpoint

<blockquote>
  <pre><code><b>POST</b> /api/GetData</code></pre>
</blockquote>

## Headers

| Name | Value | Description |
|-----|--------|-------|
| Content-Type | application/json | Request data type |
| Authorization | your_token_here | Authentication token |

## Request Body

The request body has the following structure:

```json
{
  "form": "form_name",
  "Id": "primary_key_value",
  "dateFrom": "start_date",
  "dateTo": "end_date"
}
```

Where:
- **form**: Form name corresponding to the type of catalog/document data to be retrieved
- **Id**: Primary key of the catalog/document that the partner has synchronized to Fast. For example:
  - Customer catalog: customer code (CustomerCode)
  - Project catalog: project code (JobCode)
  - Document: partner's document code (VoucherId)
- **dateFrom**: Start date of the data update time range (Modified) on the Fast system
- **dateTo**: End date of the data update time range (Modified) on the Fast system

## Response

### Success (200 OK)

```json
{
  "success": true,
  "messages": "SUCCESS",
  "records": 10,
  "data": result_data_list,
  "code": 200
}
```

Where:
- **success**: `true` if data retrieval is successful
- **messages**: Result message
- **records**: Number of records returned
- **data**: Array containing the result data corresponding to the requested form
- **code**: Status code

### Error

```json
{
  "success": false,
  "messages": "Error message",
  "code": error_code
}
```

## Error Codes

| Code | Description |
|----|-------|
| 200 | Success |
| 201 | Form does not exist |
| 202 | Empty data |
| 400 | Invalid request |
| 401 | Authentication error |
| 500 | Server error |
| 601 | Data structure error |

## Supported Forms

The GetData API supports retrieving information from the following forms:

**Catalogs**
- Customer/supplier catalog (getCustomer)
- Item catalog (getItem)
- Warehouse catalog (getSite)
- Department catalog (getDepartment)
- Project catalog (getJob)
- Contract catalog (getContract)
- Expense catalog (getExpense)

**Documents**
- Purchase invoices (getPurchaseInvoice)
- Sales invoices (getSaleInvoice)
- Sales return receipts (getSaleReturn)
- Goods receipt notes (getReceipt)
- Goods issue notes (getIssue)
- Cash receipts (getCashReceipt)
- Cash disbursements (getCashDisbursement)

**Additionally, the `GetData` API also supports**
- Retrieving real-time inventory of items (getStock)
- Retrieving customer account balance (getBalance)

## Usage Notes

1. Ensure that authentication information is correctly provided in the `Authorization` header.
2. For time range queries, date format should follow ISO standard (YYYY-MM-DD).
3. When retrieving a specific record, it's recommended to use the `Id` parameter instead of a time range.
4. If neither `Id` parameter nor time range is provided, the API will return default data according to system configuration.

## Error Handling

When an error occurs, the API will return detailed error messages in the `messages` field. Below are some common errors and how to resolve them:

1. **Form does not exist (201)**: Check the form name in the request.
2. **Empty data (202)**: Adjust the time range or Id code to include existing data.
3. **Data structure error (601)**: Check the structure and format of the parameters in the request.

## Code Examples

### Example with C#

```csharp
using Newtonsoft.Json;
using System;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;

public class GetDataExample
{
    private readonly HttpClient _client = new HttpClient();
    private readonly string _baseUrl = "https://api.example.com/api";
    private readonly string _authToken;

    public GetDataExample(string authToken)
    {
        _authToken = authToken;
        _client.DefaultRequestHeaders.Authorization = 
            new System.Net.Http.Headers.AuthenticationHeaderValue("Bearer", _authToken);
    }

    public async Task<ApiResult> GetCustomerData(string customerCode)
    {
        // Prepare request body
        var requestBody = new
        {
            form = "getCustomer",
            Id = customerCode
        };

        // Call API
        var content = new StringContent(
            JsonConvert.SerializeObject(requestBody),
            Encoding.UTF8,
            "application/json");

        var response = await _client.PostAsync($"{_baseUrl}/GetData", content);
        response.EnsureSuccessStatusCode();

        return JsonConvert.DeserializeObject<ApiResult>(
            await response.Content.ReadAsStringAsync());
    }
    
    public async Task<ApiResult> GetJobsByDateRange(DateTime fromDate, DateTime toDate)
    {
        // Prepare request body with date range
        var requestBody = new
        {
            form = "getJob",
            dateFrom = fromDate.ToString("yyyy-MM-dd"),
            dateTo = toDate.ToString("yyyy-MM-dd")
        };

        // Call API
        var content = new StringContent(
            JsonConvert.SerializeObject(requestBody),
            Encoding.UTF8,
            "application/json");

        var response = await _client.PostAsync($"{_baseUrl}/GetData", content);
        response.EnsureSuccessStatusCode();

        return JsonConvert.DeserializeObject<ApiResult>(
            await response.Content.ReadAsStringAsync());
    }
}

public class ApiResult
{
    [JsonProperty("success")]
    public bool Success { get; set; }

    [JsonProperty("messages")]
    public string Messages { get; set; }

    [JsonProperty("records")]
    public int Records { get; set; }
    
    [JsonProperty("data")]
    public object Data { get; set; }

    [JsonProperty("code")]
    public int Code { get; set; }
}
```