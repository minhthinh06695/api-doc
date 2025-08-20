import React from 'react';

// Tạm thời disable tất cả custom logic để tránh hydration issues
export default function Root({ children }) {
  return children;
}