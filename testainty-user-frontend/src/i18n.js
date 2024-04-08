import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import Backend from 'i18next-http-backend';
import LanguageDetector from 'i18next-browser-languagedetector';

// Define the available languages in your application
const availableLanguages = ['en', 'en-US', 'es'];

// Configure language detection options
const detectionOptions = {
  order: ['navigator', 'htmlTag', 'path', 'subdomain'],
  lookupQuerystring: 'lng',
};

i18n

  .use(Backend)
  .use(LanguageDetector)
  .use(initReactI18next) // Initialize react-i18next
  .init({
    fallbackLng: 'en-US', // Default language if no language is detected
    debug: true, // Enable debug mode (you can disable this in production)
    supportedLngs: availableLanguages, // Allow only specified languages
    detection: detectionOptions, // Configure language detection
    interpolation: {
      escapeValue: false, // Not needed for React as it escapes by default
    }
  });

export default i18n;
