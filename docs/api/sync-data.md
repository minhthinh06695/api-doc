---
title: Đồng bộ dữ liệu danh mục
---

# Đồng bộ dữ liệu danh mục

API `SyncData` được sử dụng để đồng bộ dữ liệu master (dữ liệu danh mục) từ hệ thống của đối tác vào hệ thống nội bộ. API này hỗ trợ đồng bộ các dữ liệu đơn giản, không phân cấp thông qua cấu trúc DataTable.

## Endpoint

```http
POST /api/SyncData
```

## Headers

| Tên | Giá trị | Mô tả |
|-----|--------|-------|
| Content-Type | application/json | Kiểu dữ liệu của request |
| Authorization | your_token_here | Token xác thực |

## Request Body

Request body có cấu trúc như sau:

```json
{
  "form": "tên_form",
  "data": [
    {
      "cột1": "giá_trị1",
      "cột2": "giá_trị2",
      ...
    },
    ...
  ]
}
```

Trong đó:
- **form**: Tên form được định nghĩa trong phần chi tiết đồng bộ của từng danh mục
- **data**: Mảng các object chứa dữ liệu cần đồng bộ

## Response

### Thành công (200 OK)

```json
{
  "success": true,
  "messages": "SUCCESS",
  "records": 10,
  "fkey": "key_123",
  "code": 200
}
```

Trong đó:
- **success**: `true` nếu đồng bộ thành công
- **messages**: Thông báo kết quả
- **records**: Số lượng bản ghi đã đồng bộ
- **fkey**: Khóa tham chiếu kết quả (nếu có)
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

| Mã | Mô tả |
|----|-------|
| 200 | Thành công |
| 201 | Form không tồn tại |
| 202 | Dữ liệu trống |
| 400 | Request không hợp lệ |
| 401 | Lỗi xác thực |
| 500 | Lỗi server |
| 601 | Lỗi cấu trúc dữ liệu |

## Các form hỗ trợ

API SyncData hỗ trợ các form sau:

- [Danh mục khách hàng/nhà cung cấp (setCustomer)](sync-data/setcustomer)
- [Danh mục vật tư (setItem)](sync-data/setitem)
- [Danh mục kho (setSite)](sync-data/setsite)
- [Danh mục bộ phận (setDepartment)](sync-data/setdepartment)
- [Danh mục vụ việc (setJob)](sync-data/setjob)


## Lưu ý khi sử dụng

1. Đảm bảo rằng dữ liệu gửi đi tuân thủ đúng cấu trúc và ràng buộc được định nghĩa trong file cấu hình.
2. Các trường bắt buộc (Required="true") phải được cung cấp giá trị.
3. API có cơ chế cache và loại bỏ request trùng lặp, điều này giúp tối ưu hiệu suất nhưng cũng có thể gây ra vấn đề nếu bạn muốn gửi lại cùng một dữ liệu.

## Xử lý lỗi

Khi gặp lỗi, API sẽ trả về thông báo lỗi chi tiết trong trường `messages`. Dưới đây là một số lỗi phổ biến và cách khắc phục:

1. **Form không tồn tại (201)**: Kiểm tra lại tên form trong request.
2. **Dữ liệu trống (202)**: Đảm bảo mảng data không rỗng.
3. **Lỗi cấu trúc dữ liệu (601)**: Kiểm tra lại cấu trúc dữ liệu, đặc biệt là các trường bắt buộc và kiểu dữ liệu.

## Ví dụ mã nguồn

### Ví dụ với C#

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
        // Tạo DataTable từ danh sách khách hàng
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

        // Chuẩn bị request body
        var requestBody = new
        {
            form = "setCustomers",
            data = dataTable
        };

        // Gọi API
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