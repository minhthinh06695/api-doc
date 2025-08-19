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

function FixLocaleRouting() {
  const history = useHistory();
  const location = useLocation();

  useEffect(() => {
    const { pathname } = location;
    
    // Fix specific route issues for locale switching
    if (pathname === '/developers/en/docs/intro' && document.title.includes('404')) {
      // Force reload if we hit a 404 on a valid route
      setTimeout(() => {
        window.location.reload();
      }, 100);
    }
    
    // Handle potential missing routes
    if (pathname.startsWith('/developers/en/docs/') && document.title.includes('404')) {
      // Try fallback to Vietnamese equivalent
      const vietnamesePath = pathname.replace('/developers/en/docs/', '/developers/docs/');
      history.replace(vietnamesePath);
    }
  }, [location, history]);

  return null;
}

export default function Root({ children }) {
  return (
    <>
      <FixTrailingSlash />
      <FixLocaleRouting />
      {children}
    </>
  );
}