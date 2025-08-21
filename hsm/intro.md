---
sidebar_position: 1
slug: /
---

# Fast HSM - Tích hợp kỹ thuật

Chào mừng bạn đến với **Fast HSM** - Giải pháp ký số và mã hóa dữ liệu an toàn của Fast.

## Giới thiệu

Fast HSM cung cấp các APIs mạnh mẽ để đối tác có thể tích hợp các tính năng:

- 🔐 **Ký số điện tử** - Ký số các tài liệu, dữ liệu quan trọng
- 🛡️ **Mã hóa dữ liệu** - Mã hóa/giải mã theo chuẩn JWE (AES)
- 📋 **Quản lý chứng thư số** - Lấy thông tin và quản lý certificates
- 🔑 **Xác thực an toàn** - Hệ thống token-based authentication

## Quy trình tích hợp Fast HSM

```mermaid
sequenceDiagram
    autonumber
    participant Partner
    participant Application as HSM Service

    %% Buoc 1: Dang ky thu cong
    Note over Partner,Application: Partner liên hệ nhà cung cấp để nhận credentials (username, password).

    %% Buoc 2: Xac thuc va lay Access Token
    Note over Partner,Application: Xác thực và Lấy Token
    Partner->>Application: POST /api/account/gettoken (username, password)
    activate Application
    Application->>Application: Kiểm tra thông tin, tạo token
    Application-->>Partner: 200 OK (Access Token)
    deactivate Application

    %% Buoc 3: Lay thong tin Certificate
    Note over Partner,Application: Lấy thông tin Certificate
    Partner->>Application: POST /api/certificate/getinfosn (kèm Access Token)
    activate Application
    Application->>Application: Truy xuất thông tin certificate
    Application-->>Partner: 200 OK (Dữ liệu Certificate)
    deactivate Application

    %% Buoc 4: Su dung cac dich vu HSM
    loop Sử dụng các dịch vụ chữ ký số
        alt Ký số điện tử
            Partner->>Application: POST /api/sign/signhash (dữ liệu cần ký, Token)
            activate Application
            Application->>Application: Thực hiện ký hash
            Application-->>Partner: 200 OK (Dữ liệu đã ký)
            deactivate Application
        else Mã hóa dữ liệu
            Partner->>Application: POST /api/sign/encryptjwe (dữ liệu cần mã hóa, Token)
            activate Application
            Application->>Application: Thực hiện mã hóa JWE
            Application-->>Partner: 200 OK (Dữ liệu đã mã hóa)
            deactivate Application
        else Giải mã dữ liệu
            Partner->>Application: POST /api/sign/decryptjwe (dữ liệu cần giải mã, Token)
            activate Application
            Application->>Application: Thực hiện giải mã JWE
            Application-->>Partner: 200 OK (Dữ liệu đã giải mã)
            deactivate Application
        end
    end

    Note over Partner,Application: Tích hợp thành công!\nHệ thống sẵn sàng sử dụng đầy đủ các tính năng.
```

## Lợi ích

### ✅ Bảo mật cao

- Chứng thư số được lưu trữ an toàn trong HSM
- Mã hóa theo chuẩn quốc tế JWE (AES)
- Token-based authentication

### ✅ Dễ tích hợp

- RESTful APIs đơn giản
- Documentation chi tiết với examples
- Hỗ trợ multiple hash signing

### ✅ Hiệu suất cao

- Xử lý batch signing (nhiều hash cùng lúc)
- Response time nhanh
- Scalable architecture

## Các APIs có sẵn

| API                          | Mục đích                   | Phương thức |
| ---------------------------- | -------------------------- | ----------- |
| `/api/account/gettoken`      | Xác thực và lấy token      | POST        |
| `/api/certificate/getinfosn` | Lấy thông tin chứng thư số | POST        |
| `/api/sign/encryptjwe`       | Mã hóa dữ liệu theo JWE    | POST        |
| `/api/sign/decryptjwe`       | Giải mã dữ liệu JWE        | POST        |
| `/api/sign/signhash`         | Ký số dữ liệu (batch)      | POST        |

## Bắt đầu

1. **[Xác thực và bảo mật](/hsm/authentication)** - Tìm hiểu cách lấy token
2. **[Quản lý chứng thư số](/hsm/certificate)** - APIs về certificate
3. **[Mã hóa dữ liệu](/hsm/encryption)** - Encrypt/Decrypt với JWE
4. **[Ký số điện tử](/hsm/signing)** - Digital signature APIs

## Hỗ trợ

- 📧 **Email**: info@fast.com.vn
- 📞 **Hotline**: (028) 7108-8788 (Ext. 3)
- 🌐 **Website**: [fast.com.vn](https://fast.com.vn)

---

**Sẵn sàng bắt đầu?** Hãy bắt đầu với [Xác thực và bảo mật](/hsm/authentication) để lấy token truy cập.
