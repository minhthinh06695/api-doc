---
sidebar_position: 1
---

# GetTemplate

## Endpoint

> ```http
> POST /api/econ/getTemplate
> ```

## Mô tả

Lấy danh sách mẫu tài liệu mà người dùng có quyền truy cập.

## Headers

```http
Content-Type: application/json
Authorization: {accessToken}
```

:::info Xác thực bắt buộc
API này yêu cầu token xác thực. Vui lòng tham khảo [GetToken API](/econtract/authentication/get-token) để lấy token.
:::

## Request Body

```json
{}
```

## Response

### Thành công (200 OK)

```json
{
  "success": true,
  "message": "Successfully",
  "code": 200,
  "data": [
    {
      "templateCode": "TEMPLATE_001",
      "templateName": "Hợp đồng mua bán",
      "description": "Template hợp đồng mua bán hàng hóa",
      "category": "COMMERCIAL",
      "fields": [
        {
          "fieldName": "buyer_name",
          "fieldType": "text",
          "required": true,
          "description": "Tên bên mua"
        },
        {
          "fieldName": "seller_name",
          "fieldType": "text",
          "required": true,
          "description": "Tên bên bán"
        },
        {
          "fieldName": "contract_date",
          "fieldType": "date",
          "required": true,
          "description": "Ngày ký hợp đồng"
        },
        {
          "fieldName": "total_amount",
          "fieldType": "number",
          "description": "Tổng giá trị hợp đồng"
        },
        {
          "fieldName": "notes",
          "fieldType": "text",
          "description": "Ghi chú bổ sung"
        }
      ]
    },
    {
      "templateCode": "TEMPLATE_002",
      "templateName": "Hợp đồng lao động",
      "description": "Template hợp đồng lao động",
      "category": "EMPLOYMENT",
      "fields": [
        {
          "fieldName": "employee_name",
          "fieldType": "text",
          "required": true,
          "description": "Tên nhân viên"
        },
        {
          "fieldName": "position",
          "fieldType": "text",
          "required": true,
          "description": "Vị trí công việc"
        },
        {
          "fieldName": "salary",
          "fieldType": "number",
          "description": "Mức lương"
        },
        {
          "fieldName": "start_date",
          "fieldType": "date",
          "required": true,
          "description": "Ngày bắt đầu làm việc"
        }
      ]
    }
  ]
}
```

### Thất bại

```json
{
  "success": false,
  "message": "No templates found or no permission",
  "code": 204,
  "data": []
}
```

## Response Fields

| Attribute              | Type    | Description                       |
| ---------------------- | ------- | --------------------------------- |
| `success`              | boolean | Trạng thái thành công của request |
| `message`              | string  | Thông báo kết quả                 |
| `code`                 | number  | HTTP status code                  |
| `data`                 | array   | Danh sách templates               |
| `templateCode`         | string  | Mã định danh template             |
| `templateName`         | string  | Tên hiển thị template             |
| `description`          | string  | Mô tả template                    |
| `category`             | string  | Danh mục template                 |
| `fields`               | array   | Danh sách trường dữ liệu          |
| `fields[].fieldName`   | string  | Tên trường                        |
| `fields[].fieldType`   | string  | Loại dữ liệu                      |
| `fields[].required`    | boolean | Bắt buộc hay không                |
| `fields[].description` | string  | Mô tả trường                      |

## Field Types

| Field Type | Description           | Example Value        |
| ---------- | --------------------- | -------------------- |
| `text`     | Chuỗi văn bản         | "Công ty ABC"        |
| `number`   | Số                    | 1000000000           |
| `date`     | Ngày (YYYY-MM-DD)     | "2024-08-21"         |
| `email`    | Địa chỉ email         | "user@example.com"   |
| `phone`    | Số điện thoại         | "0901234567"         |
| `boolean`  | Giá trị đúng/sai      | true, false          |
| `select`   | Lựa chọn từ danh sách | "option1", "option2" |

## Template Categories

| Category      | Description         |
| ------------- | ------------------- |
| `COMMERCIAL`  | Hợp đồng thương mại |
| `EMPLOYMENT`  | Hợp đồng lao động   |
| `SERVICE`     | Hợp đồng dịch vụ    |
| `RENTAL`      | Hợp đồng thuê       |
| `PARTNERSHIP` | Hợp đồng hợp tác    |
| `OTHER`       | Loại khác           |

## Code Examples

### cURL

```bash
curl -X POST https://domain/api/econ/getTemplate \
  -H "Content-Type: application/json" \
  -H "Authorization: your_access_token" \
  -d '{}'
```

### JavaScript

```javascript
const getTemplates = async (token) => {
  try {
    const response = await fetch("https://domain/api/econ/getTemplate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
      body: JSON.stringify({}),
    });

    const result = await response.json();

    if (result.success) {
      console.log("Available templates:", result.data);
      return result.data;
    } else {
      throw new Error(result.message);
    }
  } catch (error) {
    console.error("Failed to get templates:", error);
    return null;
  }
};

// Sử dụng
const token = localStorage.getItem("econtract_token");
const templates = await getTemplates(token);

if (templates && templates.length > 0) {
  templates.forEach((template) => {
    console.log(
      `Template: ${template.templateName} (${template.templateCode})`
    );
    console.log(`Category: ${template.category}`);
    console.log(`Fields: ${template.fields.length}`);
  });
} else {
  console.log("No templates available");
}
```

### C# (.NET)

```csharp
public class GetTemplateResponse
{
    public bool success { get; set; }
    public string message { get; set; }
    public int code { get; set; }
    public TemplateData[] data { get; set; }
}

public class TemplateData
{
    public string templateCode { get; set; }
    public string templateName { get; set; }
    public string description { get; set; }
    public string category { get; set; }
    public TemplateField[] fields { get; set; }
}

public class TemplateField
{
    public string fieldName { get; set; }
    public string fieldType { get; set; }
    public bool required { get; set; }
    public string description { get; set; }
}

// Sử dụng
public async Task<TemplateData[]> GetTemplatesAsync(string token)
{
    var client = new HttpClient();
    client.DefaultRequestHeaders.Add("Authorization", token);

    var content = new StringContent("{}", Encoding.UTF8, "application/json");
    var response = await client.PostAsync("https://domain/api/econ/getTemplate", content);
    var responseJson = await response.Content.ReadAsStringAsync();
    var result = JsonSerializer.Deserialize<GetTemplateResponse>(responseJson);

    return result.success ? result.data : new TemplateData[0];
}
```

## Use Cases

### 1. Hiển thị danh sách template cho user chọn

```javascript
const buildTemplateSelector = async (token) => {
  const templates = await getTemplates(token);

  const selector = document.getElementById("template-selector");
  selector.innerHTML = '<option value="">Chọn template...</option>';

  templates.forEach((template) => {
    const option = document.createElement("option");
    option.value = template.templateCode;
    option.textContent = `${template.templateName} - ${template.description}`;
    selector.appendChild(option);
  });
};
```

### 2. Validation fields khi tạo document

```javascript
const validateDocumentData = (templateCode, documentData, templates) => {
  const template = templates.find((t) => t.templateCode === templateCode);
  if (!template) {
    throw new Error("Template not found");
  }

  const errors = [];

  template.fields.forEach((field) => {
    const value = documentData[field.fieldName];

    // Kiểm tra required fields
    if (field.required && (!value || value === "")) {
      errors.push(`Field '${field.fieldName}' is required`);
    }

    // Kiểm tra data type
    if (value && field.fieldType === "number" && isNaN(value)) {
      errors.push(`Field '${field.fieldName}' must be a number`);
    }

    if (value && field.fieldType === "email" && !isValidEmail(value)) {
      errors.push(`Field '${field.fieldName}' must be a valid email`);
    }

    if (value && field.fieldType === "date" && !isValidDate(value)) {
      errors.push(
        `Field '${field.fieldName}' must be a valid date (YYYY-MM-DD)`
      );
    }
  });

  return errors;
};
```

### 3. Auto-generate form dựa trên template

```javascript
const generateFormFromTemplate = (template) => {
  const form = document.createElement("form");

  template.fields.forEach((field) => {
    const div = document.createElement("div");
    div.className = "form-group";

    const label = document.createElement("label");
    label.textContent = field.description;
    if (field.required) {
      label.textContent += " *";
      label.className = "required";
    }

    let input;
    switch (field.fieldType) {
      case "text":
      case "email":
      case "phone":
        input = document.createElement("input");
        input.type = field.fieldType === "email" ? "email" : "text";
        break;
      case "number":
        input = document.createElement("input");
        input.type = "number";
        break;
      case "date":
        input = document.createElement("input");
        input.type = "date";
        break;
      case "boolean":
        input = document.createElement("input");
        input.type = "checkbox";
        break;
      default:
        input = document.createElement("input");
        input.type = "text";
    }

    input.name = field.fieldName;
    input.required = field.required;

    div.appendChild(label);
    div.appendChild(input);
    form.appendChild(div);
  });

  return form;
};
```

## Error Handling

| Code | Message                       | Cause                  | Solution                       |
| ---- | ----------------------------- | ---------------------- | ------------------------------ |
| 204  | No templates found            | Không có template nào  | Liên hệ admin để thêm template |
| 401  | Unauthorized                  | Token không hợp lệ     | Re-authenticate                |
| 665  | No permission on organization | Không có quyền đơn vị  | Kiểm tra quyền org             |
| 666  | No permission on department   | Không có quyền bộ phận | Kiểm tra quyền dept            |
| 500  | System error                  | Lỗi hệ thống           | Thử lại hoặc liên hệ support   |

---

**Tiếp theo:** Tìm hiểu [GetStatusList API](/econtract/template/get-status-list) để lấy danh sách trạng thái tài liệu.
