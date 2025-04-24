# Đồng bộ chứng từ 

API `SyncVoucher` được sử dụng để đồng bộ các chứng từ phức tạp có cấu trúc phân cấp (như hóa đơn, đơn hàng có chi tiết). API này hỗ trợ đồng bộ dữ liệu với cấu trúc JSON phân cấp thay vì DataTable đơn giản như SyncData.

## Endpoint

```http
POST /api/SyncVoucher
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
      "field1": "value1",
      "field2": "value2",
      "detail": [
        {
          "detailField1": "detailValue1",
          "detailField2": "detailValue2"
        },
        // Các dòng chi tiết khác
      ],
      "tax": [
        {
          "taxField1": "taxValue1",
          "taxField2": "taxValue2"
        },
        // Các dòng thuế khác
      ]
    },
    // Các chứng từ khác
  ]
}
```

Trong đó:
- **form**: Tên form được định nghĩa trong phần chi tiết đồng bộ của từng chứng từ
- **data**: Mảng các object chứng từ, mỗi object có thể chứa các mảng con đại diện cho các bảng con

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

API SyncVoucher hỗ trợ các form sau:

- [Hóa đơn mua hàng (setPurchaseinvoice)](sync-voucher/setpurchaseinvoice)
- [Hóa đơn bán hàng (setSaleinvoice)](sync-voucher/setsaleinvoice)

## Xử lý dữ liệu phân cấp

### Quan hệ giữa các bảng

API SyncVoucher xử lý dữ liệu có cấu trúc phân cấp:

1. **Dữ liệu chính (header)**: Chứa thông tin chung của chứng từ
2. **Dữ liệu chi tiết (detail/tax)**: Chứa thông tin chi tiết, được liên kết với dữ liệu chính

Việc liên kết giữa dữ liệu chính và dữ liệu chi tiết được xác định trong cấu hình XML.

### Quy tắc xử lý dữ liệu

1. **Mã chứng từ (VoucherId)**: Phải là duy nhất cho mỗi chứng từ và được sử dụng để liên kết các bảng.
2. **Xử lý giao dịch**: Toàn bộ quá trình đồng bộ được thực hiện trong một transaction, nếu có lỗi xảy ra tại bất kỳ bước nào, toàn bộ dữ liệu sẽ được rollback.
3. **Xác thực dữ liệu**: Dữ liệu được kiểm tra theo cấu hình trong file XML mapping trước khi lưu vào database.

## Lưu ý khi sử dụng

1. Đảm bảo rằng dữ liệu gửi đi tuân thủ đúng cấu trúc và ràng buộc được định nghĩa trong file cấu hình.
2. Các trường bắt buộc (Required="true") phải được cung cấp giá trị.
3. API có cơ chế cache và loại bỏ request trùng lặp, điều này giúp tối ưu hiệu suất nhưng cũng có thể gây ra vấn đề nếu bạn muốn gửi lại cùng một dữ liệu.
4. Khi gửi chứng từ có cấu trúc phân cấp, tên của các mảng con (như "detail", "tax") phải khớp với tên được định nghĩa trong file cấu hình.

## Xử lý lỗi

Khi gặp lỗi, API sẽ trả về thông báo lỗi chi tiết trong trường `messages`. Dưới đây là một số lỗi phổ biến và cách khắc phục:

1. **Form không tồn tại (201)**: Kiểm tra lại tên form trong request.
2. **Dữ liệu trống (202)**: Đảm bảo mảng data không rỗng.
3. **Lỗi cấu trúc dữ liệu (601)**: Kiểm tra lại cấu trúc dữ liệu, đặc biệt là các trường bắt buộc và kiểu dữ liệu.