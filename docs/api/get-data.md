---
sidebar_position: 5
---

# Truy vấn dữ liệu

API `getData` được sử dụng để truy vấn dữ liệu từ hệ thống. API này cho phép truy vấn dữ liệu dựa trên các tham số lọc đã được định nghĩa.

## Endpoint

```http
POST /api/getData
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
  "param1": "giá_trị1",
  "param2": "giá_trị2",
  ...
}
```

Trong đó:
- **form**: Tên form được định nghĩa trong cấu hình (bắt buộc)
- Các tham số khác: Là các tham số lọc dữ liệu, được xác định bởi cấu hình form

## Response

### Thành công (200 OK)

```json
{
  "success": true,
  "messages": "SUCCESS",
  "data": [
    {
      "field1": "value1",
      "field2": "value2",
      ...
    },
    ...
  ]
}
```

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
| 400 | Request không hợp lệ |
| 401 | Lỗi xác thực |
| 500 | Lỗi server |

## Cơ chế hoạt động

API `getData` hoạt động bằng cách:

1. Xác định stored procedure cần gọi dựa trên tên form
2. Xác định các tham số lọc được phép cho form
3. Chỉ lấy các tham số được định nghĩa từ request body
4. Thực thi stored procedure với các tham số đã xác định
5. Trả về kết quả dưới dạng mảng JSON

## Caching

API `getData` có tích hợp cơ chế caching để tối ưu hiệu suất:

1. Kết quả truy vấn được lưu trong cache với key được tạo từ tên form và hash của request
2. Khi nhận được request giống hệt nhau, API sẽ trả về kết quả từ cache
3. Cache có thời gian hết hạn được cấu hình trong hệ thống (mặc định là 15 phút)
4. API `invalidateCache` có thể được sử dụng để xóa cache cho một form cụ thể

## Các ví dụ truy vấn

### Truy vấn danh sách khách hàng

```json
{
  "form": "getCustomers",
  "customerGroup": "G001",
  "status": "1"
}
```

### Truy vấn danh sách hóa đơn theo khoảng thời gian

```json
{
  "form": "getInvoices",
  "fromDate": "2023-01-01",
  "toDate": "2023-03-31",
  "customerId": "KH001"
}
```

### Truy vấn chi tiết chứng từ theo mã

```json
{
  "form": "getVoucherDetails",
  "voucherId": "PI20230001"
}
```

## Xóa cache

Trong một số trường hợp, bạn cần xóa cache để đảm bảo dữ liệu được trả về là mới nhất. Bạn có thể sử dụng API `invalidateCache`:

```http
POST /api/invalidateCache
Content-Type: application/json
Authorization: {token}

{
  "form": "tên_form"
}
```

## Lưu ý khi sử dụng

1. **Hiệu suất truy vấn**: Hạn chế truy vấn dữ liệu lớn bằng cách sử dụng các tham số lọc
2. **Caching**: Sử dụng cache để tối ưu hiệu suất, nhưng cũng cần xóa cache khi dữ liệu thay đổi
3. **Tham số lọc**: Chỉ sử dụng các tham số lọc đã được định nghĩa cho form

## Ví dụ mã nguồn

### Ví dụ với JavaScript

```javascript
async function getData(token, form, params) {
  const requestBody = {
    form: form,
    ...params
  };

  const response = await fetch('https://api.example.com/api/getData', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': token
    },
    body: JSON.stringify(requestBody)
  });

  if (!response.ok) {
    throw new Error(`Error: ${response.status} - ${response.statusText}`);
  }

  return await response.json();
}

// Sử dụng
const token = 'your_token_here';
const result = await getData(token, 'getCustomers', { status: '1' });

if (result.success) {
  console.log(`Found ${result.data.length} customers`);
  console.log(result.data);
} else {
  console.error(`Error: ${result.messages}`);
}
```

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
    private readonly string _token;

    public GetDataExample(string token)
    {
        _token = token;
        _client.DefaultRequestHeaders.Authorization = 
            new System.Net.Http.Headers.AuthenticationHeaderValue(_token);
    }

    public async Task<dynamic> GetData(string form, object parameters)
    {
        // Tạo dynamic object từ parameters
        var requestObj = new System.Dynamic.ExpandoObject() as IDictionary<string, object>;
        requestObj.Add("form", form);
        
        // Thêm các tham số nếu có
        if (parameters != null)
        {
            var props = parameters.GetType().GetProperties();
            foreach (var prop in props)
            {
                var value = prop.GetValue(parameters);
                if (value != null)
                {
                    requestObj.Add(prop.Name, value);
                }
            }
        }
        
        // Gọi API
        var content = new StringContent(
            JsonConvert.SerializeObject(requestObj),
            Encoding.UTF8,
            "application/json");

        var response = await _client.PostAsync($"{_baseUrl}/getData", content);
        response.EnsureSuccessStatusCode();

        return JsonConvert.DeserializeObject<dynamic>(
            await response.Content.ReadAsStringAsync());
    }
}

// Sử dụng
var api = new GetDataExample("your_token_here");
var result = await api.GetData("getCustomers", new { status = "1" });

if (result.success)
{
    Console.WriteLine($"Found {result.data.Count} customers");
    foreach (var customer in result.data)
    {
        Console.WriteLine($"{customer.ma_kh}: {customer.ten_kh}");
    }
}
else
{
    Console.WriteLine($"Error: {result.messages}");
}
```