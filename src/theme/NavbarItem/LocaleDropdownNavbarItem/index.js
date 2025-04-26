import React from 'react';
import { useHistory, useLocation } from '@docusaurus/router';
import { useActiveDocContext } from '@docusaurus/plugin-content-docs/client';
import { useAllDocsData } from '@docusaurus/plugin-content-docs/client';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import { translate } from '@docusaurus/Translate';
import { useAlternatePageUtils } from '@docusaurus/theme-common/internal';
// Import component gốc
import DefaultLocaleDropdownNavbarItem from '@theme-original/NavbarItem/LocaleDropdownNavbarItem';

export default function LocaleDropdownNavbarItem(props) {
    const history = useHistory();
    const location = useLocation();
    const {
        i18n: { currentLocale, locales, localeConfigs },
    } = useDocusaurusContext();

    // Tạo một phiên bản của component gốc
    const Original = DefaultLocaleDropdownNavbarItem;

    // Ghi đè hàm onClick
    const handleLocaleClick = (newLocale) => {
        const currentPath = location.pathname;

        // Từ vi đến en
        if (currentLocale === 'vi' && newLocale === 'en') {
            if (currentPath.startsWith('/docs/')) {
                const newPath = currentPath.replace('/docs/', '/en/docs/');
                history.push(newPath);
                return;
            }
        }
        // Từ en đến vi
        else if (currentLocale === 'en' && newLocale === 'vi') {
            if (currentPath.startsWith('/en/docs/')) {
                const newPath = currentPath.replace('/en/docs/', '/docs/');
                history.push(newPath);
                return;
            }
        }

        // Sử dụng xử lý mặc định cho các trường hợp khác
        const alternatePageUtils = useAlternatePageUtils();
        const altPath = alternatePageUtils.createUrl({
            locale: newLocale,
            fullyQualified: false,
        });

        history.push(altPath);
    };

    // Tạo props mới với hàm onClick tùy chỉnh
    const customProps = {
        ...props,
        dropdownItemsProps: locales.map((locale) => {
            return {
                value: locale,
                label: localeConfigs[locale].label,
                to: '#',
                onClick: () => handleLocaleClick(locale),
                target: '_self',
                autoAddBaseUrl: false,
            };
        }),
    };

    return <Original {...customProps} />;
}