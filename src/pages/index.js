import React from 'react';
import { Redirect } from '@docusaurus/router';
import { useLocation } from '@docusaurus/router';

export default function Home() {
    const location = useLocation();

    // Kiểm tra xem URL hiện tại có chứa '/en/' không
    const isEnglish = location.pathname.includes('/en/');

    // Chuyển hướng đến trang tương ứng với ngôn ngữ
    return isEnglish ? <Redirect to="/en/docs/intro" /> : <Redirect to="/docs/intro" />;
}