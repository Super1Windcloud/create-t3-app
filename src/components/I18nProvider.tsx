'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';

interface TranslationContextType {
  t: (key: string, options?: { [key: string]: any }) => string;
  i18n: {
    language: string;
    changeLanguage: (lng: string) => void;
  };
}

const TranslationContext = createContext<TranslationContextType | undefined>(undefined);

// Simple translation function
const translate = (key: string, resources: any, lng: string, options?: { [key: string]: any }): string => {
  const translation = key.split('.').reduce((acc: any, part: string) => {
    return acc && acc[part] ? acc[part] : null;
  }, resources[lng] || {});

  if (translation && typeof translation === 'string') {
    // Handle interpolation: replace {{variable}} with actual values
    let result = translation;
    if (options) {
      Object.keys(options).forEach(optionKey => {
        result = result.replace(new RegExp(`{{\\s*${optionKey}\\s*}}`, 'g'), options[optionKey]);
      });
    }
    return result;
  }

  // Return the key itself if translation is not found
  return key;
};

interface TranslationProviderProps {
  children: React.ReactNode;
}

export function TranslationProvider({ children }: TranslationProviderProps) {
  const [currentLocale, setCurrentLocale] = useState('en');
  const [translationResources, setTranslationResources] = useState<{ [key: string]: any }>({});
  const pathname = usePathname() || '/';
  const router = useRouter();
  
  // Extract locale from pathname
  useEffect(() => {
    const pathParts = pathname.split('/').filter(part => part !== '');
    const localeFromPath = pathParts[0]; // First part after filtering empty strings
    
    // Check if the extracted part is a valid locale
    if (localeFromPath && ['en', 'zh', 'es', 'fr', 'de'].includes(localeFromPath)) {
      setCurrentLocale(localeFromPath);
      loadResources(localeFromPath);
    } else {
      // Default to 'en' if no valid locale is found in path
      loadResources('en');
    }
  }, [pathname]);

  const loadResources = async (locale: string) => {
    if (translationResources[locale]) return; // Already loaded

    try {
      const resources = await import(`../../public/locales/${locale}/common.json`);
      setTranslationResources(prev => ({
        ...prev,
        [locale]: { common: resources.default }
      }));
    } catch (error) {
      console.error(`Failed to load translations for locale: ${locale}`, error);
      // Try to load English as fallback
      if (locale !== 'en') {
        try {
          const resources = await import(`../../public/locales/en/common.json`);
          setTranslationResources(prev => ({
            ...prev,
            [locale]: { common: resources.default }
          }));
        } catch (fallbackError) {
          console.error('Failed to load fallback translations', fallbackError);
        }
      }
    }
  };

  const t = (key: string, options?: { [key: string]: any }) => {
    return translate(key, translationResources, currentLocale, options);
  };

  const changeLanguage = (lng: string) => {
    // Update the URL to reflect the new locale
    const pathParts = pathname.split('/').filter(part => part !== '');
    
    if (pathParts[0] && ['en', 'zh', 'es', 'fr', 'de'].includes(pathParts[0])) {
      // If there's already a locale in the path, replace it
      pathParts[0] = lng;
    } else {
      // If there's no locale in the path, add it at the beginning
      pathParts.unshift(lng);
    }
    
    const newPath = `/${pathParts.join('/')}` || `/${lng}`;
    router.push(newPath);
    setCurrentLocale(lng);
  };

  const contextValue: TranslationContextType = {
    t,
    i18n: {
      language: currentLocale,
      changeLanguage
    }
  };

  return (
    <TranslationContext.Provider value={contextValue}>
      {children}
    </TranslationContext.Provider>
  );
}

export function useTranslation() {
  const context = useContext(TranslationContext);
  if (context === undefined) {
    throw new Error('useTranslation must be used within a TranslationProvider');
  }
  return context;
}