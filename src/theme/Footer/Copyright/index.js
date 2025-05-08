// Ví dụ - bạn cần điều chỉnh dựa trên code thực tế trong file Copyright/index.js
import React from 'react';
// Có thể cần import thêm các thứ khác nếu file gốc dùng

export default function FooterCopyright({ copyright }) { // Tên props có thể khác
  // Thay vì chỉ return {copyright} hoặc một div đơn giản
  // Hãy return cấu trúc bạn muốn:
  return (
    <div className="footer__copyright-container"> {/* Class CSS của bạn */}
      <span>{copyright}</span> {/* Hoặc bạn có thể hardcode text ở đây nếu muốn, nhưng dùng biến copyright sẽ lấy từ config */}
      {/* Phần thêm vào */}
      <div className="footer__badge-container"> {/* Class CSS của bạn */}
        <a href="https://www.dmca.com/Protection/Status.aspx?id=1cf486c2-1a98-4957-b780-f0bd5249a962&refurl=https://fast.com.vn/" target="_blank" rel="noopener noreferrer" aria-label="DMCA Protected">
          <img src="/developers/img/dmca-logo.png" alt="DMCA Protected" className="footer__badge-icon dmca-badge" /> {/* Class CSS của bạn */}
        </a>
        <img src="/developers/img/iso-logo.png" alt="ISO Certified" className="footer__badge-icon iso-badge" />
      </div>
      {/* Kết thúc phần thêm vào */}
    </div>
  );
}