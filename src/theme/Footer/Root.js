import React, { useEffect } from 'react';
import { useHistory, useLocation } from '@docusaurus/router';

function FixTrailingSlash() {
  const history = useHistory();
  const location = useLocation();

  useEffect(() => {
    const { pathname, search, hash } = location;
    
    // Chỉ xử lý khi có trailing slash và không phải root
    if (pathname !== '/' && pathname.endsWith('/')) {
      const newPath = pathname.slice(0, -1) + search + hash;
      
      // Sử dụng replace để không tạo history entry mới
      history.replace(newPath);
    }
  }, [location, history]);

  return null;
}

export default function Root({ children }) {
  return (
    <>
      <FixTrailingSlash />
      {children}
    </>
  );
}