'use client';

import { useRouter, usePathname } from 'next/navigation';
import { useTranslation } from '@/components/I18nProvider';

export function LocaleSwitcher() {
  const router = useRouter();
  const pathname = usePathname();
  const { i18n } = useTranslation();
  
  const languages = [
    { code: 'en', label: 'English' },
    { code: 'zh', label: '中文' },
    { code: 'es', label: 'Español' },
    { code: 'fr', label: 'Français' },
    { code: 'de', label: 'Deutsch' },
  ];

  const changeLanguage = (locale: string) => {
    // Get current path without the locale prefix
    const pathParts = pathname.split('/');
    if (pathParts[1] && ['en', 'zh', 'es', 'fr', 'de'].includes(pathParts[1])) {
      // Replace the current locale with the new one
      pathParts[1] = locale;
    } else {
      // Add the locale to the path
      pathParts.splice(1, 0, locale);
    }
    
    const newPath = pathParts.join('/') || `/${locale}`;
    router.push(newPath);
  };

  return (
    <div className="flex gap-2">
      {languages.map((lang) => (
        <button
          key={lang.code}
          onClick={() => changeLanguage(lang.code)}
          className={`px-3 py-1 rounded-md text-sm font-medium ${
            i18n.language === lang.code
              ? 'bg-blue-600 text-white'
              : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
          }`}
        >
          {lang.label}
        </button>
      ))}
    </div>
  );
}