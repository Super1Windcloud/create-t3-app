/** @type {import('next-i18next').UserConfig} */
module.exports = {
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'zh', 'es', 'fr', 'de'], // Add or remove languages as needed
  },
  localePath: './public/locales',
  fallbackLng: 'en',
  lng: 'en', // Default language
  debug: process.env.NODE_ENV === 'development',
  // Special options for react-i18next
  react: {
    useSuspense: false,
  },
  // Key separator for nested translations
  keySeparator: false, // We prefer to use nested objects for translations
  // Namespace usage
  ns: ['common'], // Define your namespaces here
  defaultNS: 'common',
};