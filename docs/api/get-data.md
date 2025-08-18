# Lấy dữ liệu

API `GetData` được sử dụng để đối tác lấy thông tin dữ liệu từ Fast (bao gồm các danh mục, chứng từ, báo cáo...). API này hỗ trợ truy xuất dữ liệu danh mục và chứng từ theo các tiêu chí như mã khóa chính hoặc khoảng thời gian.

## Endpoint

<blockquote>
  <pre><code><b>POST</b> /api/GetData</code></pre>
</blockquote>

## Headers

| Tên           | Giá trị          | Mô tả                    |
| ------------- | ---------------- | ------------------------ |
| Content-Type  | application/json | Kiểu dữ liệu của request |
| Authorization | your_token_here  | Token xác thực           |

## Request Body

Request body có cấu trúc như sau:

```json
{
  "form": "tên_form",
  "Id": "mã_của_khóa_chính",
  "dateFrom": "ngày_từ",
  "dateTo": "ngày_đến"
}
```

Trong đó:

- **form**: Tên form ứng với từng loại dữ liệu danh mục/chứng từ cần lấy
- **Id**: Mã khóa chính của danh mục/Chứng từ mà đối tác đã đồng bộ sang Fast. Ví dụ:
  - Danh mục khách hàng: mã khách hàng (CustomerCode)
  - Danh mục vụ việc: mã vụ việc (JobCode)
  - Chứng từ: mã chứng từ của đối tác (VoucherId)
- **dateFrom**: Ngày bắt đầu của khoảng thời gian cập nhật dữ liệu (Modified) trên hệ thống Fast
- **dateTo**: Ngày kết thúc của khoảng thời gian cập nhật dữ liệu (Modified) trên hệ thống Fast

## Response

### Thành công (200 OK)

```json
{
  "success": true,
  "messages": "SUCCESS",
  "records": 10,
  "data": list_data_ket_qua,
  "code": 200
}
```

Trong đó:

- **success**: `true` nếu truy xuất dữ liệu thành công
- **messages**: Thông báo kết quả
- **records**: Số lượng bản ghi trả về
- **data**: Mảng chứa dữ liệu kết quả tương ứng với form yêu cầu
- **code**: Mã trạng thái

### Lỗi

```json
{
  "success": false,
  "messages": "Thông báo lỗi",
  "code": mã_lỗi
}
```

## Mã lỗi

| Mã  | Mô tả                |
| --- | -------------------- |
| 200 | Thành công           |
| 201 | Form không tồn tại   |
| 202 | Dữ liệu trống        |
| 400 | Request không hợp lệ |
| 401 | Lỗi xác thực         |
| 500 | Lỗi server           |
| 601 | Lỗi cấu trúc dữ liệu |

## Các form hỗ trợ

API GetData hỗ trợ, lấy thông tin các form sau:

**Danh mục**

- Danh mục khách hàng/nhà cung cấp (getCustomer)
- Danh mục vật tư (getItem)
- Danh mục kho (getSite)
- Danh mục bộ phận (getDepartment)
- Danh mục vụ việc (getJob)
- Danh mục hợp đồng (getContract)
- Danh mục phí (getExpense)

**Chứng từ**

- Hóa đơn mua hàng (getPurchaseInvoice)
- Hóa đơn bán hàng (getSaleInvoice)
- Phiếu nhập hàng bán trả lại (getSaleReturn)
- Phiếu nhập kho (getReceipt)
- Phiếu xuất kho (getIssue)
- Phiếu thu tiền mặt (getCashReceipt)
- Phiếu chi tiền mặt (getCashDisbursement)

**Ngoài ra API `GetData` Còn hỗ trợ**

- Lấy tồn kho tức thời của vật tư (getStock)
- Lấy số dư công nợ khách hàng (getBalance)

## Lưu ý khi sử dụng

1. Đảm bảo rằng thông tin xác thực được cung cấp đúng trong header `Authorization`.
2. Với các truy vấn theo khoảng thời gian, định dạng ngày tháng cần theo chuẩn ISO (YYYY-MM-DD).
3. Khi chỉ cần truy xuất một bản ghi cụ thể, nên sử dụng tham số `Id` thay vì khoảng thời gian.
4. Nếu không cung cấp tham số `Id` hoặc khoảng thời gian, API sẽ trả về dữ liệu mặc định theo cấu hình của hệ thống.

## Xử lý lỗi

Khi gặp lỗi, API sẽ trả về thông báo lỗi chi tiết trong trường `messages`. Dưới đây là một số lỗi phổ biến và cách khắc phục:

1. **Form không tồn tại (201)**: Kiểm tra lại tên form trong request.
2. **Dữ liệu trống (202)**: Điều chỉnh lại khoảng thời gian hoặc mã Id để bao gồm dữ liệu có tồn tại.
3. **Lỗi cấu trúc dữ liệu (601)**: Kiểm tra lại cấu trúc và định dạng của các tham số trong request.

## Ví dụ mã nguồn

### Ví dụ với C#

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
        // Chuẩn bị request body
        var requestBody = new
        {
            form = "getCustomer",
            Id = customerCode
        };

        // Gọi API
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
        // Chuẩn bị request body với khoảng thời gian
        var requestBody = new
        {
            form = "getJob",
            dateFrom = fromDate.ToString("yyyy-MM-dd"),
            dateTo = toDate.ToString("yyyy-MM-dd")
        };

        // Gọi API
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
